// Script to serve 'build' folder with a proxy.

const connect = require('connect');
const http = require('http');
const path = require('path');
const chalk = require('chalk');

const favicon = require('serve-favicon');
const serveStatic = require('serve-static');
const { createProxyMiddleware } = require('http-proxy-middleware');

const proxyTarget = require('./package.json').proxy;

const app = connect();

app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));

app.use(
  serveStatic('../build', {
    etag: false,
    cacheControl: false
  })
);

app.use(createProxyMiddleware({ target: proxyTarget, createProxyMiddleware }));

console.log(
  `${chalk.red('Ignore the "serve -s build" message above, instead go to:')}`
);
console.log(`${chalk.blue('http://localhost:3001')}`);

http.createServer(app).listen(3001);
