import {personsController} from './controllers/persons-controller'
import {personController} from './controllers/person-controller'

export function app(request, response) {
  request.on('error', err => {
    console.error(err)
    response.writeHead(400)
    response.end('400: Bad Request')
  })

  const url = new URL(request.url, `http://${request.headers.host}`)

  if (url.pathname === '/persons') {
    personsController(request, response)
    return
  }
  if (url.pathname.startsWith('/persons')) {
    personController(request, response)
    return
  }

  response.writeHead(404)
  response.end('404: Not Found')
}
