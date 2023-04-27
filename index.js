var http = require('http');
var url = require('url');
var fs = require('fs');

let errPage;
fs.readFile('./404.html', (err, data) => {
  errPage = data;
})

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  if (filename === './') {
    filename = './index';
  }
  filename += '.html';
  fs.readFile(filename, function(err, data) {
    if (err) { 
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.write(errPage);
      return res.end();
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);   