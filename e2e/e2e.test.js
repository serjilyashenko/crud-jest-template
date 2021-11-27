import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from './utils/requests'
import {startServer} from './utils/startServer'
import {dropDb} from './utils/db'

let server

beforeAll(async () => {
  server = startServer()
})

beforeEach(() => dropDb())

afterAll(() => {
  server.close()
})

test('e2e scenario 1', async () => {
  const emptyPersonsResponse = await getRequest('/persons')
  expect(emptyPersonsResponse.status).toBe(200)
  expect(emptyPersonsResponse.body).toEqual([])

  const personBody = {name: 'Carl'}
  const newPersonResponse = await postRequest('/persons', personBody)
  expect(newPersonResponse.status).toBe(201)
  expect(newPersonResponse.body).toEqual(
    expect.objectContaining({id: expect.stringContaining('-'), ...personBody}),
  )

  const personId = newPersonResponse.body.id
  const createdPeronResponse = await getRequest(`/persons/${personId}`)
  expect(createdPeronResponse.status).toBe(200)
  expect(createdPeronResponse.body).toEqual({id: personId, ...personBody})

  const updatedPersonBody = {
    ...createdPeronResponse.body,
    name: 'Carl Lagerfeld',
  }
  const updatedPersonResponse = await putRequest(
    `/persons/${personId}`,
    updatedPersonBody,
  )
  expect(updatedPersonResponse.status).toBe(200)
  expect(updatedPersonResponse.body).toEqual(updatedPersonBody)

  const deleteResponse = await deleteRequest(`/persons/${personId}`)
  expect(deleteResponse.status).toBe(204)
  expect(deleteResponse.body).toBeNull()

  const tryPersonResponse = await getRequest(`/persons/${personId}`)
  expect(tryPersonResponse.status).toBe(404)
})

test('e2e scenario 2', async () => {
  const emptyResponse = await getRequest('/some/non/existing/resource')
  expect(emptyResponse.status).toBe(404)
  expect(typeof emptyResponse.body).toBe('string')
})
