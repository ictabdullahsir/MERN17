const http = require("http");
const fs = require("fs");
const path = require("path");

const grok_api_key = "xai-6DS17byND2DtjjdGEigPrJkYZc8R5cx0SuvqSg3qM3u1uKx4X7UcQ1uAeJYlWDLQxZLFPBXiZQXkYS68"

function renderPage(result=""){
    const filePath = path.join(__dirname, "random.html");
    let data = fs.readFileSync(filePath, "utf-8");
    data = data.replace("__RESULT__", result)
    return data;
}

const server = http.createServer(async (req, res) => {
    if(req.method=="POST" && req.url=="/ai"){
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString()
        })
        req.on("end", async () => {
            body = new URLSearchParams(body)
            console.log(body.get("prompt"))
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${grok_api_key}`
                },
                body: JSON.stringify({
                    "model": "llama-3.1-8b-instant",
                    "messages": [
                        { role: "user", content: body.get("prompt") }
                    ]
                })
            })
            const data = await response.json()
            // {
            //     "id": "chatcmpl-123",
            //     "object": "chat.completion",
            //     "created": 1677652288,
            //     "model": "llama-3.1-8b-instant",
            //     "choices": [
            //         {
            //             "index": 0,
            //             "message": {
            //                 "role": "assistant",
            //                 "content": "Hello, how can I help you today?"
            //             },
            //             "finish_reason": "stop"
            //         }
            //     ]
            // }
            console.log(data?.choices?.[0]?.message?.content?.trim())
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(renderPage(data?.choices?.[0]?.message?.content?.trim()));
        })

        
    } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(renderPage());
    }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});