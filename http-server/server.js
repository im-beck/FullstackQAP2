const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Parsing the requested URL
    const url = req.url;

    // If the root URL is requested, serve index.html
    if (url === '/') {
        // Set file path to index.html
        let filePath = './views/index.html';

        // Read the HTML file from disk
        fs.readFile(filePath, (err, data) => {
            if (err) {
                // If file not found, respond with 404 Not Found
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write('<h1>404 Not Found</h1>');
                res.end();
            } else {
                // If file found, respond with the content of index.html
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                res.end();
            }
        });
    } else {
        // For other routes, construct file path and serve corresponding HTML file
        let filePath = './views' + url + '.html';

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
            }
        });
    }
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

