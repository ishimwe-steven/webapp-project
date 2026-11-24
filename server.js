const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    let file = req.url === '/login'
        ? 'login.html'
        : 'index.html';

    const filePath = path.join(__dirname, file);

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            return res.end('Page not found');
        }

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        res.end(content);
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`WebApp running on port ${PORT}`);
});
