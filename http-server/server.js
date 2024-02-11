const http = require('http');

const server = http.createServer((req, res) => {
    // Parsing the requested URL
    const url = req.url;

    // Using a switch statement to determine the action based on the route
    switch (url) {
        case '/':
            console.log('Requested route: /');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<h1>Welcome to the homepage!</h1>');
            res.end();
            break;
        case '/about':
            console.log('Requested route: /about');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<h1>About Us</h1>');
            res.end();
            break;
        case '/contact':
            console.log('Requested route: /contact');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<h1>Contact Us</h1>');
            res.end();
            break;
        case '/products':
            console.log('Requested route: /products');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<h1>Our Products</h1>');
            res.end();
            break;
        case '/subscribe':
            console.log('Requested route: /subscribe');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<h1>Subscribe</h1>');
            res.end();
            break;
        default:
            console.log('Requested route not found');
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write('<h1>404 Not Found</h1>');
            res.end();
            break;
    }
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
