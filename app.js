const port = process.env.PORT || 8000; 
var http = require('http');
var fs = require('fs');
const path = require("path");

http.createServer((request, response)=> {
    let filePath = request.url;

    if (filePath == '/') {
        filePath = '/index.html';
    }
    filePath = __dirname+filePath;

    let fileExtension = path.extname(filePath);

    let contentType = 'text/html';

    switch (fileExtension) {
        case ".css":
            contentType = "text/css";
        break;
        case ".js":
            contentType = "text/javascript";
        break;
        case ".html":
            contentType = "text/html";
            break;
        default:
            contentType = "text/html";
    }


   fs.readFile(filePath,{encoding:"UTF-8"}, (error,content)=>{
       if(!error) {

           response.writeHead(200, {"Content-Type": contentType});
           response.write(content);
           response.end();
       } else {


           response.writeHead(404, {"Content-Type": "text/html"});
           response.write("error file");
           response.end();
       }
       })

   }).listen(port);
/*
fs.readFile('./portafolio/index.html', function (err, html) {

        if (err) throw err;    
    
        http.createServer(function(request, response) {  
            response.writeHeader(200, {"Content-Type": "text/html"});  
            response.write(html);  
            response.end();  
        }).listen(port);
    });
*/