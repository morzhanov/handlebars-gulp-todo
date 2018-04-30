const stat = require('node-static')
const port = process.env.PORT || 3000
const http = require('http')
const file = new stat.Server('.', {
  cache: 3600,
  gzip: true
})
http.createServer(function (request, response) {
  request.addListener('end', function () {
    file.serve(request, response)
  }).resume()
}).listen(port)
