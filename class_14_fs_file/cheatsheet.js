const http = require("http")
const  fs = require("fs")
const  path = require("path")
const  EventEmitter = require("events");

const log = new EventEmitter();
log.on("do", (act, file) => console.log(`[${act}] triggered on: ${file}`));

const dir = path.join(__dirname, "data"),
  file = path.join(dir, "log.txt");
if (!fs.existsSync(dir)) fs.mkdirSync(dir); // Sync check on boot

http
  .createServer((req, res) => {
    const done = (msg) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`<h3>${msg}</h3><a href="/">Home</a>`);
    };
    const name = path.basename(file);

    if (req.url === "/create") {
      fs.writeFile(file, "Hello Node!", () => {
        log.emit("do", "CREATE", name);
        done("File Created");
      });
    } else if (req.url === "/update") {
      fs.appendFile(file, "\nMore text!", () => {
        log.emit("do", "UPDATE", name);
        done("File Updated");
      });
    } else if (req.url === "/delete") {
      fs.unlink(file, () => {
        log.emit("do", "DELETE", name);
        done("File Deleted");
      });
    } else {
      // Read / Dashboard Route
      fs.readFile(file, "utf8", (err, data) => {
        log.emit("do", "READ", name);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`<h2>Data: ${err ? "Empty" : data}</h2>
                <a href="/create">Create</a> | <a href="/update">Update</a> | <a href="/delete">Delete</a>`);
      });
    }
  })
  .listen(3000, () => console.log("Server live at http://localhost:3000"));
