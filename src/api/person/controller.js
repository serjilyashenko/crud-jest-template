export function personController(request, response) {
  switch (request.method) {
    case 'GET':
      response.writeHead(200)
      response.end('GET ALL')
      break
    case 'POST':
      response.writeHead(200)
      response.end('CREATE PERSON')
      break
    default:
      response.writeHead(405)
      response.end('405: Method not allowed')
  }
}
