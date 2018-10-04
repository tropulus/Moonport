//var config = require('../config')
var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/fetch', (req,res) => {

    
    var secretkey =  fs.readFileSync('key.txt')
    console.log(secretkey);
    
    /* var url = 'https://pro-api.coinmarketcap.com';

    var myInit = { method: 'GET',
                headers: {
                    'X-CMC_PRO_API_KEY': secretkey
                },
                mode: "cors",
                };

    var myRequest = new Request(url, myInit);

    fetch(myRequest)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log(JSON.stringify(myJson));
  }); */
})

app.listen(3000, () => console.log('listening on port 3000!'))