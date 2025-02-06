"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer((req, resp) => {
    console.log(req.url);
    resp.writeHead(200, { 'content-type': 'text/html' });
    resp.write('<h1>Hola Mundo!</h1>');
    resp.end();
});
server.listen(8080, () => {
    console.log('Server running on host 8080');
});
