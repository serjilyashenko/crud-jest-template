import {request} from 'http'
import {port} from './const'

function wrappedRequest(options, data) {
  return new Promise(resolve => {
    const req = request(options, res => {
      let buffer = ''

      res.on('data', d => {
        buffer += d
      })

      res.on('end', () => {
        if (buffer) {
          try {
            resolve({
              status: res.statusCode,
              body: JSON.parse(buffer.toString()),
            })
          } catch (error) {
            resolve({
              status: res.statusCode,
              body: buffer.toString(),
            })
          }
        } else {
          resolve({status: res.statusCode, body: null})
        }
      })
    })

    req.on('error', error => {
      console.error(error)
    })

    if (data) {
      req.write(data)
    }
    req.end()
  })
}

export function getRequest(path) {
  return wrappedRequest({
    hostname: 'localhost',
    port,
    path,
    method: 'GET',
  })
}

export function postRequest(path, data) {
  const body = JSON.stringify(data)

  return wrappedRequest(
    {
      hostname: 'localhost',
      port,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': body.length,
      },
    },
    body,
  )
}

export function putRequest(path, data) {
  const body = JSON.stringify(data)

  return wrappedRequest(
    {
      hostname: 'localhost',
      port,
      path,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': body.length,
      },
    },
    body,
  )
}

export function deleteRequest(path) {
  return wrappedRequest({
    hostname: 'localhost',
    port,
    path,
    method: 'DELETE',
  })
}
