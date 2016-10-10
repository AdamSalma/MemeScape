// #!/usr/bin/env node
'use strict';

import app from './app';
import http from 'http';
import config from '../../config';

const debug = require('debug')('server:server');
const port = normalizePort(config.server.port);

app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// Normalize a port into a number, string, or false.
function normalizePort(val) {
    let port = parseInt(val, 10);
    if (isNaN(port)) return val;  // named pipe
    if (port >= 0) return port;   // port number
    return false;
}


// Event listener for HTTP server "error" event.
function onError(error) {
    if (error.syscall !== 'listen') throw error;

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// Event listener for HTTP server "listening" event.
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.info("Connected to localhost:%s.\n", port)
}