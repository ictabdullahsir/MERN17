/**
 * ============================================================================
 * NODE.JS BEGINNER CORE CONCEPTS CHEATSHEET
 * ============================================================================
 * * 1. RUNNING JAVASCRIPT IN NODE
 * Execute this file in your terminal:
 * $ node cheatsheet.js
 */

console.log("🚀 Node.js Core Concepts Cheatsheet Initialized!");


/**
 * ============================================================================
 * 2. ARCHITECTURE CONCEPT SNAPSHOT
 * ============================================================================
 * - Single-threaded vs Multi-threaded: Node runs your code on a single main thread,
 * offloading heavy OS operations (like file system/network tasks) using 'libuv'.
 * - Synchronous vs Asynchronous: Synchronous code runs line-by-line (blocking);
 * Asynchronous schedules tasks to run in the background (non-blocking).
 */


/**
 * ============================================================================
 * 3. MODULE SYSTEM (CommonJS)
 * ============================================================================
 * Break your large applications into smaller modular files.
 */

// --- Inside a dummy file named 'mathModule.js' ---
const mathModuleExample = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b
};
// Exporting: module.exports = mathModuleExample;

// --- Inside your main file ('app.js') ---
// Importing: const math = require('./mathModule');
console.log("\n--- Module System Example ---");
console.log(`Add (5 + 3): ${mathModuleExample.add(5, 3)}`);
console.log(`Subtract (5 - 3): ${mathModuleExample.subtract(5, 3)}`);


/**
 * ============================================================================
 * 4. NPM & PACKAGE.JSON QUICK REFERENCE
 * ============================================================================
 * - Initialize a project configuration: $ npm init -y
 * - Install packages:                  $ npm install <package-name>
 * * package.json anatomy:
 * {
 * "name": "my-app",
 * "version": "1.0.0",
 * "main": "index.js",        // The primary entry point
 * "scripts": {
 * "start": "node index.js" // Shortcut run via: npm start
 * },
 * "dependencies": {}         // Tracks third-party libraries installed
 * }
 */


/**
 * ============================================================================
 * 5. THE NATIVE URL MODULE
 * ============================================================================
 * Used to parse string-based web addresses into clear program-accessible chunks.
 */

const url = require('url');
const sampleAddress = 'http://localhost:8080/dashboard.html?user=alex&role=admin';

const parsedUrl = url.parse(sampleAddress, true);

console.log("\n--- URL Module Example ---");
console.log(`Host:     ${parsedUrl.host}`);       // 'localhost:8080'
console.log(`Pathname: ${parsedUrl.pathname}`);   // '/dashboard.html'
console.log(`Query Object:`, parsedUrl.query);   // { user: 'alex', role: 'admin' }
console.log(`User query value: ${parsedUrl.query.user}`); // 'alex'


/**
 * ============================================================================
 * 6. NATIVE HTTP MODULE & CREATING A SERVER
 * ============================================================================
 * Spawns an HTTP network listener instance to handle network request/responses.
 */

const http = require('http');

// Uncomment the block below to run a web server when launching this file:
/*
const PORT = 3000;
const server = http.createServer((req, res) => {
    // 1. Set response headers (HTTP Status 200 OK, content type HTML)
    res.writeHead(200, { 'Content-Type': 'text/html' });
    
    // 2. Write data stream out to client browser
    res.write('<h1>Welcome to your first Node.js HTTP Server!</h1>');
    
    // 3. Close connection handshake loop 
    res.end();
});

server.listen(PORT, () => {
    console.log(`\n🌍 Server actively listening at http://localhost:${PORT}/`);
});
*/