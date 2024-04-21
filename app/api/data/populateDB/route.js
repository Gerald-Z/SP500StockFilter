'use strict';
var request = require('request-promise');
const util = require('util');

import Stock from '@models/stock';
import { connectTodb } from "@utils/database";
import { NextRequest, NextResponse } from "next/server";

require("dotenv").config();

const fetchURL = async (url) => {
    const returned = await request.get({
        url: url,
        json: true,
        headers: {'User-Agent': 'request'}
      }, (err, res, data) => {
        if (err) {
          console.log('Error:', err);
        } else if (res.statusCode !== 200) {
          console.log('Status:', res.statusCode);
        } else {
          return data;
        }
    });
    return returned;
}

const fetchData = async (symbol) => {
    var intradayURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + symbol + '&interval=5min&apikey=' + process.env.API_KEY;
    var dailyURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=full&symbol=' + symbol + '&apikey=' + process.env.API_KEY;
    var companyOverviewURL = 'https://www.alphavantage.co/query?function=OVERVIEW&symbol=' + symbol + '&apikey=' + process.env.API_KEY;
  
   let priceRes = await fetchURL(dailyURL);
   let overviewRes = await fetchURL(companyOverviewURL);
  // console.log('Price Res: ', priceRes);
  // console.log('Overview Res: ', overviewRes);
   const returned = {dailyRes: priceRes, overviewRes: overviewRes};
   return returned;
}
  


const handler = async (req, res) => {
  //  console.log("Populate DB Handler is triggered");
    const symbol = req.nextUrl.searchParams.get('symbol');
  //  console.log("Symbol: ", symbol);

    const {dailyRes, overviewRes} = await fetchData(symbol);
 //  console.log('Price Res 2: ', dailyRes);
 //  console.log('Overview Res 2: ', overviewRes);    
   await connectTodb();

    if (dailyRes && overviewRes) {
        try {
            await Stock.create({
                symbol: symbol,
                price: dailyRes['Time Series (Daily)']['2024-04-18']['4. close'],
                name: overviewRes.Name,
                industry: overviewRes.Industry,
                marketCap: overviewRes.MarketCapitalization,
                pe: overviewRes.PERatio === 'None' ? 0 : overviewRes.PERatio,
                divYield: overviewRes.DividendYield === 'None' ? 0 : overviewRes.DividendYield,
                beta: overviewRes.Beta,
                profitMargin: overviewRes.ProfitMargin === 'None' ? 0 : overviewRes.ProfitMargin,
              });
              return NextResponse.json({
                message: "This update was successful!"
              }, {
                status: 200,
              })
        } catch (error) {
            return NextResponse.json({
                message: "Something went wrong: " + error
            }, {
                status: 400,
            })
        }
    } else {
        return NextResponse.json({
            message: "Something went wrong with fetching data from third-party API."
        }, {
            status: 400,
        })
    }
}


export { handler as POST};