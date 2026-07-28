const http = require("http");
const path = require("path");
const fs = require("fs");

const d = path.join(__dirname, "data")
if(!fs.existsSync(d)) fs.mkdirSync(d)

const server = http.createServer((req, res) => {
    if(req.url == "/create"){
        fs.writeFile(path.join(d, "log.txt"), "Hello from Node js", ()=>{
            console.log("File Created");
        })
        res.write("Create");
        res.end();
    } else if(req.url == "/update") {
        fs.appendFile(path.join(d,"log.txt"), "\nNew Line appended", ()=>{
            console.log("File Updated");
        })
        res.write("Update");
        res.end();
    } else if(req.url == "/delete") {
        fs.unlink(path.join(d, "log.txt"), ()=>{
            console.log("File Deleted");
        })
        res.write("Delete");
        res.end();
    } else {
        const text = fs.readFile(path.join(d, "log.txt"),"utf8", (err, data)=>{
            console.log(data);
            res.writeHead(200, {"content-type": "text/html"});
            res.write(`${data} <a href='/create'>Create</a><a href='/update'>Update</a><a href='/delete'>Delete</a>`);
            res.end();
        })
    }
})

server.listen(3000, () => {
    console.log("Server is running on port 3000");
})