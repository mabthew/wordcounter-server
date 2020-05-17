const express = require('express');
const app = express();

const redis = require('redis');

// allow cross-origin requests
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
  }
app.use(allowCrossDomain);

// create redis client
let redisClient = redis.createClient();

// seed corpus
redisClient.on('connect', function(){
  console.log('Connected to Redis...');
});


app.get('/total', (req, res) => {
    redisClient.DBSIZE(function(err,count) {
        console.log(count);
        if (err) {
            res.send("0");
        }
        res.send(count.toString());
    });

    
});

app.listen(3001, () => console.log('Server listening on port 3001!'));