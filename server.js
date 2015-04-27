var http = require("http"),
    cache = require('memory-cache'),
    request = require("request");

var port = process.env.PORT || 3000;
var ttl = process.env.TTL || 60000;

var sendResponse = function(res, data) {
  res.writeHead(data.statusCode,
              data.headers);
  res.end(data.body);
}

http.createServer(function (req, res) {
    var url = require('url').parse(req.url, true);
    if (url.path == '/_health') {
      res.writeHead(200);
      res.end("I'm alive!!!");
      return;
    }
    else if (url.path.indexOf('/sheets/') === 0) {  // Startswith '/sheets/'?
      var sheetPath = url.path.substr(7);
      console.log(sheetPath);

      //  Google sheets api already sends cors headers, no need for corser 
      var data = cache.get(sheetPath);
      if(data == null) {
        request({url: 'https://spreadsheets.google.com' + sheetPath}, function(err, resp, body) {
          data = {
            statusCode : resp.statusCode,
            headers : resp.headers,
            body : body
          };
          if (!err && resp.statusCode == 200) {
            cache.put(sheetPath, data, ttl);
          }
          return sendResponse(res, data);
        });
      }
      else {
        console.log("From cache");
        return sendResponse(res, data);
      }
    }
    else {
      res.writeHead(404);
      res.end("Not found.\n");
    }
}).listen(port, function() {
  console.log("Server listening on port " + port);
});