var HTTP_PORT = 80
  , REDIS_HOST  = process.env.REDIS_PORT_6379_TCP_ADDR
  , REDIS_PORT  = 6379

var redis = require('redis')
  , http = require('http')
  , redisClient = redis.createClient(REDIS_PORT, REDIS_HOST)

redisClient.on('error', function(err) {
  console.log(err)
})

redisClient.set('hits', 0, redis.print)

http.createServer(function(req, res) {
  if( /favicon\.ico$/.test(req.url) ) return res.end()
  redisClient.incr('hits', function(err, hits) {
    console.log('incrementing hits', hits)
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('Hello World * ' + hits)
  })
}).listen(HTTP_PORT, '0.0.0.0', function() {
  console.log('Server running at http://127.0.0.1:' + HTTP_PORT)
})
