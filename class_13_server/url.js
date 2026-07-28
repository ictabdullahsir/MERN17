const u = require('url');

const myUrl = 'http://facebook.com/dashboard.html?user=alex&role=admin';

const parsedUrl = u.parse(myUrl, true);

console.log(parsedUrl.host);
console.log(parsedUrl.pathname);
console.log(parsedUrl.query);
console.log(parsedUrl.query.user);