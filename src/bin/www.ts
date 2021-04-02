import app from '../app'
import debug from 'debug'
import http from 'http'
/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT ?? '3000')
app.set('port', port)

/**
 * Create HTTP server.
 */

const server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort (val: string): boolean | string | number {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError (error: { syscall: string, code: any }): void {
  if (error.syscall !== 'listen') {
    throw new Error()
  }

  const bind =
    typeof port === 'string' ? `Pipe ${port}` : `Port ${Number(port)}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
    default:
      throw new Error()
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening (): void {
  const addr = server.address()
  const bind =
    typeof addr === 'string' ? `pipe ${addr}` : `port ${Number(addr?.port)}`
  debug('Listening on ' + bind)
}

export {}
