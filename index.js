const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
        message: "مرحباً بك في تطبيق Aegis!",
        status: "شغال بنجاح وبدون مشاكل 🚀"
    }));
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
