let http = require('http');
let fs = require('fs');
let url = require('url');
let path = require('path');
let util = require('util');
let mime = require('mime');
let Player = require('player');

let server = http.createServer(function (req, res) {

    let pathname = decodeURI(url.parse(req.url).pathname);

    let error = function (status, errText) {
        res.statusCode = status;
        res.end(errText);
    };

    function sendFile(filepath, res) {
        let fileStream = fs.createReadStream(filepath);
        fileStream.pipe(res);

        fileStream
            .on('error', err => {
                if (err.code === 'ENOENT') {
                    error(404,'Not found');
                } else {
                    console.error(err);
                    if (!res.headersSent) {
                        error(500,'Internal error' );
                    } else {
                        res.end();
                    }

                }
            })
            .on('open', () => {
                res.setHeader('Content-Type', mime.lookup(filepath));
            });

        res
            .on('close', () => {
                fileStream.destroy();
            });

    }


    switch (req.method) {
        case 'GET':

            if (pathname === '/') {
                sendFile('index.html', res);
            }
            //TODO: fix favicon
            else if (pathname === '/favicon.ico') {
                error(404, 'Not found');
            }
            else  {
                let path = pathname.substr(1);
                sendFile(path, res);
            }
            break;

        case 'POST':
            //TODO: add POST.
            break;

        case 'DELETE':
            deleteFile('files' + pathname);
            break;

        default:
            return error(502, 'Not implemented');
    }

});


server.listen(8000);
console.log("Server running at http://127.0.0.1:8000/");
module.exports = server;