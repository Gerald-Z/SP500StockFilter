'use strict';
var request = require('request');

import Stock from '@models/stock';

// const Stock = require('./models/stock');
require("dotenv").config();

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key


const fetchData = async (symbol) => {
  var intradayURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + symbol + '&interval=5min&apikey=' + process.env.API_KEY;
  var dailyURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=full&symbol=' + symbol + '&apikey=' + process.env.API_KEY;
  var companyOverviewURL = 'https://www.alphavantage.co/query?function=OVERVIEW&symbol=' + symbol + '&apikey=' + process.env.API_KEY;

  let priceRes, overviewRes; 

  request.get({
      url: companyOverviewURL,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        console.log('Error:', err);
      } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
      } else {
        // data is successfully parsed as a JSON object:
        overviewRes = data;
      }
  });

  request.get({
    url: dailyURL,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      priceRes = data;
    }
  });

  return priceRes, overviewRes;


}

const logData = async (symbol) => {
  const {dailyRes, overviewRes} = await fetchData(symbol);

  if (dailyRes) {
    await Stock.create({
      symbol: symbol,
      price: dailyRes['Time Series (Daily)']['2024-04-18'],
      name: overviewRes.Name,
      industry: overviewRes.Industry,
      marketCap: overviewRes.MarketCapitalization,
      pe: overviewRes.PERatio,
      divYield: overviewRes.DividendYield,
      beta: overviewRes.Beta,
      profitMargin: overviewRes.ProfitMargin
    })
  }
}

logData('IBM');





