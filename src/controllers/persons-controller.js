import {getPersons, addPerson} from '../model/persons'

export function personsController(request, response) {
  switch (request.method) {
    case 'GET': {
      response.writeHead(200, {'Content-Type': 'application/json'})
      response.end(JSON.stringify(getPersons()))
      break
    }
    case 'POST': {
      let data = ''
      request.on('data', chunk => {
        data += chunk
      })
      request.on('end', () => {
        try {
          const newPerson = addPerson(JSON.parse(data))
          response.writeHead(201, {'Content-Type': 'application/json'})
          response.end(JSON.stringify(newPerson))
        } catch (e) {
          response.writeHead(500)
          response.end('500: Server Error')
        }
      })
      break
    }
    default:
      response.writeHead(405)
      response.end('405: Method not allowed')
  }
}
