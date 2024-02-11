const http = require('http');
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

// Instantiate an Event Emitter
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

const server = http.createServer((req, res) => {
    // Parsing the requested URL
    const url = req.url;

    // Mapping requested URL to file path
    let filePath = './views' + (url === '/' ? '/index' : url) + '.html';

    // Emit events when routes are accessed
    if (url === '/') {
        myEmitter.emit('routeAccess', '/');
    } else {
        myEmitter.emit('routeAccess', url);
        if (url !== '/') {
            myEmitter.emit('nonHomeRouteAccess', url);
        }
    }

    // Read the HTML file from disk
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // If file not found, respond with 404 Not Found
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write('<h1>404 Not Found</h1>');
            res.end();
        } else {
            // If file found, respond with the content of the HTML file
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();

            // Emit event for successful file read
            myEmitter.emit('fileRead', filePath);
        }
    });
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Emitting events for route access
myEmitter.on('routeAccess', (route) => {
    console.log(`Route accessed: ${route}`);
});

// Emitting event for non-home routes
myEmitter.on('nonHomeRouteAccess', (route) => {
    console.log(`Non-home route accessed: ${route}`);
});

// Emitting event for successful file read
myEmitter.on('fileRead', (filePath) => {
    console.log(`File read successfully: ${filePath}`);
});
