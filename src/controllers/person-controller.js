import {removePerson, getPerson, updatePerson} from '../model/persons'

function getIdFromRequest(request) {
  const url = new URL(request.url, `http://${request.headers.host}`)
  const pathArray = url.pathname.split('/')
  return pathArray[2]
}

export function personController(request, response) {
  switch (request.method) {
    case 'GET': {
      const id = getIdFromRequest(request)
      const person = getPerson(id)
      if (person) {
        response.writeHead(200, {'Content-Type': 'application/json'})
        response.end(JSON.stringify(person))
      } else {
        response.writeHead(404)
        response.end('404: Not Found')
      }
      break
    }
    case 'PUT':
      {
        const id = getIdFromRequest(request)
        const person = getPerson(id)
        if (person) {
          let data = ''
          request.on('data', chunk => {
            data += chunk
          })
          request.on('end', () => {
            try {
              const updatedPerson = updatePerson(id, JSON.parse(data))
              response.writeHead(201, {'Content-Type': 'application/json'})
              response.end(JSON.stringify(updatedPerson))
            } catch (e) {
              response.writeHead(400)
              response.end('500: Server Error')
            }
          })
        } else {
          response.writeHead(404)
          response.end('404: Not Found')
        }
      }
      break
    case 'DELETE': {
      const id = getIdFromRequest(request)
      const person = getPerson(id)
      if (person) {
        removePerson(id)
        response.writeHead(200)
        response.end()
      } else {
        response.writeHead(404)
        response.end('404: Not Found')
      }
      break
    }
    default:
      response.writeHead(405)
      response.end('405: Method not allowed')
  }
}
