import {createServer} from 'http'
import {app} from '../../src/app'
import {port} from './const'

export function startServer() {
  const server = createServer(app)
  server.listen(port)

  return server
}
