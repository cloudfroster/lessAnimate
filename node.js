var port = (process.env.VMC_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost');
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var mime = require("./server/mime").types;

var serverRoot = 'server/index.html';

var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    var realPath = 'server' + pathname;
    if(realPath == 'server/') realPath = serverRoot;
    var ext = path.extname(realPath);
	ext = ext ? ext.slice(1) : 'unknown';
    path.exists(realPath, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(realPath, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });

                    response.end(err);
                } else {
                    var contentType = mime[ext] || "text/plain";
					response.writeHead(200, {'Content-Type': contentType});
					response.write(file, "binary");
					response.end();
                    response.write(file, "binary");

                    response.end();
                }
            });
        }
    });
});

server.listen(port, host);