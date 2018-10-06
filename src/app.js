var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const request = require('request');

  


app.post('/portData', (req,res) => {

    let fetchThese = req.body;

  const requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    qs: {
      start: 1,
      limit: 3,
      convert: 'USD',
      sort: "market_cap"
    },
    headers: {
      'X-CMC_PRO_API_KEY': fs.readFileSync('key.txt').toString('ascii')
    },
    json: true,
    gzip: true
  };
  
  request(requestOptions, function (error, response, body) {
    
    console.log('error:', error); 
    console.log('statusCode:', response && response.statusCode);
    let dataResponse = {}
    
    body.data.forEach( (element) => {

        let key = element.symbol;

        dataResponse[key] = {
            name: element.name,
            price: element.quote.USD.price,
            dayMove: element.quote.USD.percent_change_24h,
        }
    }
    )

    let dataResponse2 = {};

    for (let i in fetchThese){
        let key = fetchThese[i]
        dataResponse2[key] = dataResponse[key]
    }

    res.send(dataResponse2)

  });
})

app.listen(5000, () => console.log('listening on port 5000!'))