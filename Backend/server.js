let username ="Azaam"
console.log("username: "+username);
const { time } = require('node:console');
const http= require('node:http');

function 
handelRequest(request,response){
    request.server="mypage";
    response.statusCode=200;

    if (request.url==="/currenttime"){

        response.end('<h1>'+ new Date().toISOString()+'</h1>');

    } else if (request.url==="/"){

        response.end('<h1>Hello Azaam</h1>');

    }


}
const server =http.createServer (handelRequest);
server.listen(3000);
