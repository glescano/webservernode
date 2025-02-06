"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const server = http_1.default.createServer((req, resp) => {
    var _a, _b;
    console.log(req.url);
    // resp.writeHead(200, {'content-type': 'text/html'});
    // resp.write('<h1>Hola Mundo!</h1>');
    // resp.end();
    // const data = {name:'John Doe', age:30, city:'New York'};
    // resp.writeHead(200, {'content-type':'application/json'});
    // resp.end(JSON.stringify(data));
    // switch (req.url) {
    //     case '/':
    //         const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
    //         resp.writeHead(200, { 'content-type': 'text/html' });
    //         resp.end(htmlFile);
    //         break;
    //     case '/css/styles.css':
    //         const cssFile = fs.readFileSync('./public/css/styles.css', 'utf-8')
    //         resp.writeHead(200, { 'content-type': 'text/css' });
    //         resp.end(cssFile);
    //         break;
    //     case '/js/app.js':
    //         const jsFile = fs.readFileSync('./public/js/app.js', 'utf-8')
    //         resp.writeHead(200, { 'content-type': 'application/javascript' });
    //         resp.end(jsFile);
    //         break;
    //     default:
    //         resp.writeHead(404, { 'content-type': 'text/html' });
    //         resp.end();
    //}
    if (req.url === '/') {
        const htmlFile = fs_1.default.readFileSync('./public/index.html', 'utf-8');
        resp.writeHead(200, { 'content-type': 'text/html' });
        resp.end(htmlFile);
        return;
    }
    if ((_a = req.url) === null || _a === void 0 ? void 0 : _a.endsWith('.js')) {
        resp.writeHead(200, { 'content-type': 'application/javascript' });
    }
    else if ((_b = req.url) === null || _b === void 0 ? void 0 : _b.endsWith('.css')) {
        resp.writeHead(200, { 'content-type': 'text/css' });
    }
    const responseContent = fs_1.default.readFileSync(`./public${req.url}`, 'utf-8');
    resp.end(responseContent);
});
server.listen(8080, () => {
    console.log('Server running on host 8080');
});
