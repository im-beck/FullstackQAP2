const http = require('http');
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

// Instantiate an Event Emitter
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

// Function to format current date in YYYY-MM-DD format
function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Function to create log file path for the current date
function getLogFilePath() {
    const logDirectory = './logs';
    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory);
    }
    const currentDate = getCurrentDate();
    return path.join(logDirectory, `log_${currentDate}.txt`);
}

// Function to log events to console and disk file
function logEvent(eventType, eventData) {
    const logFilePath = getLogFilePath();
    const logMessage = `[${eventType.toUpperCase()}] ${new Date().toISOString()} - ${eventData}\n`;

    // Log to console
    console.log(logMessage);

    // Log to disk file
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error(`Error writing to log file: ${err}`);
        }
    });
}

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
            res.writeHead(404, { 'Content-Type': 'text/html'});
            res.write('<h1>404 Not Found</h1>');
            res.end();
            // Emit event for unsuccessful response
            myEmitter.emit('httpStatusCode', 404);
        } else {
            // If file found, respond with the content of the HTML file
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
            // Emit event for successful response
            myEmitter.emit('httpStatusCode', 200);
        }
    });
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Emitting events for route access
myEmitter.on('routeAccess', (route) => {
    logEvent('routeAccess', `Route accessed: ${route}`);
});

// Emitting event for non-home routes
myEmitter.on('nonHomeRouteAccess', (route) => {
    logEvent('nonHomeRouteAccess', `Non-home route accessed: ${route}`);
});

// Emitting event for successful file read
myEmitter.on('fileRead', (filePath) => {
    logEvent('fileRead', `File read successfully: ${filePath}`);
});

// Emitting event for HTTP status codes
myEmitter.on('httpStatusCode', (statusCode) => {
    logEvent('httpStatusCode', `HTTP Status Code: ${statusCode}`);
});
