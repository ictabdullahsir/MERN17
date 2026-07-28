/*******************************************************************************
 * JAVASCRIPT ASYNC & EXECUTION CHEATSHEET
 *******************************************************************************/

// =============================================================================
// 1. EXECUTION CONTEXT & CALL STACK
// =============================================================================
// JS is single-threaded. It executes one "Context" at a time using a Call Stack.
// Global context is created first; function contexts are pushed/popped on top.

function second() {
    console.log("2. Inside second function"); // Runs 2nd
}

function first() {
    console.log("1. Inside first function");  // Runs 1st
    second();
}

first(); 
// Stack order: Global -> first() -> second()
// Pops off:    second() finishes -> first() finishes -> Global finishes


// =============================================================================
// 2. CALLBACKS
// =============================================================================
// A callback is a function passed as an argument to another function, 
// to be executed later (synchronously or asynchronously).

function fetchUser(username, callbackFn) {
    console.log(`\nFetching data for ${username}...`);
    // Simulating database grab, then triggering the callback
    callbackFn({ id: 101, name: username });
}

fetchUser("Alice", function(user) {
    console.log(`Callback executed! User ID is: ${user.id}`);
});


// =============================================================================
// 3. SETTIMEOUT & SETINTERVAL (Web APIs)
// =============================================================================
// Browser/Node features, NOT native JS engine features. They offload work.

// setTimeout: Runs ONCE after a delay (in milliseconds)
setTimeout(() => {
    console.log("Timeout: 1.5 seconds have passed!");
}, 1500);

// setInterval: Runs REPEATEDLY every interval
let counter = 0;
const intervalId = setInterval(() => {
    counter++;
    console.log(`Interval: Tick #${counter}`);
    if (counter === 3) {
        clearInterval(intervalId); // Stops the interval
        console.log("Interval stopped.");
    }
}, 1000);


// =============================================================================
// 4. THE EVENT LOOP (The Invisible Manager)
// =============================================================================
// How JS handles async code without blocking. 
// Flow: Call Stack -> Web API (timer runs) -> Callback Queue -> Event Loop -> Call Stack

console.log("\nEvent Loop Test: Synchronous Start");

setTimeout(() => {
    // This goes to Web API, then Callback Queue.
    // It MUST wait until the Call Stack is completely empty!
    console.log("Event Loop Test: Asynchronous Timer (0ms)");
}, 0);

console.log("Event Loop Test: Synchronous End");
// OUTPUT ORDER: 
// 1. Synchronous Start
// 2. Synchronous End
// 3. Asynchronous Timer (0ms)


// =============================================================================
// 5. PROMISES
// =============================================================================
// Objects representing the eventual completion (or failure) of an async operation.
// States: Pending -> Fulfilled (.then()) OR Rejected (.catch())

const downloadFile = (url) => {
    return new Promise((resolve, reject) => {
        const success = true; // Simulating a successful download
        
        if (success) {
            resolve(`Content from ${url}`); // Sends data to .then()
        } else {
            reject("Network Error 404");     // Sends error to .catch()
        }
    });
};

downloadFile("https://api.example.com/file")
    .then(data => console.log(`Promise Success: ${data}`))
    .catch(err => console.log(`Promise Failed: ${err}`));


// =============================================================================
// 6. ASYNC / AWAIT
// =============================================================================
// Syntactic sugar built on top of Promises. Makes async code look synchronous.
// 'async' keyword allows 'await'. 'await' pauses execution until Promise settles.

async function runWorkflow() {
    try {
        console.log("\nStarting Async/Await Workflow...");
        
        // Pauses here until downloadFile resolves
        const result = await downloadFile("https://api.example.com/data"); 
        console.log(`Async/Await Result: ${result}`);
        
        console.log("Workflow Complete!");
    } catch (error) {
        // Catches any rejected promises in the try block
        console.error(`Caught an error: ${error}`);
    }
}

runWorkflow();