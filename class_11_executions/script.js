const downloadFile = (url) => {
    return new Promise((resolve, reject) => {
        const success = true;
        if(success) {
            resolve(`Content from ${url}`);
        } else {
            reject("Network Error 404");
        }
    })
}

// then
downloadFile("https://api.example.com/file")
    .then(data => console.log(`Promise Success: ${data}`))
    .catch(err => console.log(`Promise Failed: ${err}`))


// async await
async function run(){
    try {
        const s = await downloadFile("https://api.example.com/data")
        console.log(`Async/Await Success: ${s}`)
    } catch(err){
        console.log(`Async/Await Failed: ${err}`)
    }
}
run()