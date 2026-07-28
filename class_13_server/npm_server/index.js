const http = require('http');

const server = http.createServer((req, res)=>{
    console.log('Hello from the server');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Hello in the browser</h1>')
    res.end()
})

server.listen(3002, ()=>{
    console.log('Server is running on port 3002');
})