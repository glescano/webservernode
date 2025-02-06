import http2 from 'http2';
import fs from 'fs';

const server = http2.createSecureServer({
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt'),
},(req, resp) => {
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
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
        resp.writeHead(200, { 'content-type': 'text/html' });
        resp.end(htmlFile);
        return;
    }

    if (req.url?.endsWith('.js')){
        resp.writeHead(200, {'content-type': 'application/javascript'});
    } else if (req.url?.endsWith('.css')){
        resp.writeHead(200, {'content-type' : 'text/css'});
    } 

    try{
        const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');
        resp.end(responseContent);
    } catch(error){
        resp.writeHead(404, { 'content-type': 'text/html' });
        resp.end();
    }    

});

server.listen(8080, () => {
    console.log('Server running on host 8080');
});