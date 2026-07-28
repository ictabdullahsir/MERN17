console.log("First Line")
setTimeout(() => {
    console.log("Second Line")
}, 1000)
console.log("Third Line")

// First Line print koro
// settimeout web-api te jabe // Event loop call stack empty hote wait korbe
// Third Line print koro
// Event loop call stack empty dekhe settimeout er callback queue theke function ta call stack e niye asbe
// Second Line print koro

const m = setInterval(() => {
    console.log("This will print every 2 seconds");
}, 2000)

setTimeout(() => {
    clearInterval(m); // Stop the interval after 10 seconds
    console.log("Interval stopped after 10 seconds");
}, 10000)