import http from 'http'
import {personController} from './api/person/controller'

function requestListener(request, response) {
  request.on('error', err => {
    console.error(err)
    response.writeHead(400)
    response.end('400: Bad Request')
  })

  const url = new URL(request.url, `http://${request.headers.host}`)

  switch (url.pathname) {
    case '/persons':
      personController(request, response)
      break
    default:
      response.writeHead(404)
      response.end('404: Not Found')
  }
}

const server = http.createServer(requestListener)
server.listen(8080)
