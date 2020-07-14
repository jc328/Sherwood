#! /usr/bin/env node
const token = 'Tsk_52c6de67190f4fb7aa10ae91d4c9dd5c';
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const csurf = require('csurf');
const fetch = require('node-fetch');

const { Stock } = require('./models');

const app = express();

const csrfProtection = csurf({ cookie : true });
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/assets'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended : false }));

app.get('/', asyncHandler(async (req, res) => {
  res.send('HOME');
}));

app.get('/login-page', asyncHandler(async (req, res) => {
  res.render('login-page', { title: 'Log in: Sherwood Wealth Services'});
}));

app.get('/landing-page', asyncHandler(async (req, res) => {
  res.render('landing-page');
}));

app.get('/api/chart/price/:id(\\w+)', asyncHandler(async (req, res) => {
  const stockSymbol = req.params.id;
  const priceRequest = await fetch(`https://sandbox.iexapis.com/stable/stock/${stockSymbol}/price?token=${token}`, {
    method: 'get',
    body: JSON.stringify(res.body),
    headers: { 'Content-Type': 'application/json' }
  })
  const price = await priceRequest.json();

  res.json(price)
}));

// /stock/{symbol}/intraday-prices

app.get('/api/chart/intraday-prices/:id(\\w+)', asyncHandler(async (req, res) => {
  const stockSymbol = req.params.id;
  const intradayPriceRequest = await fetch(`https://sandbox.iexapis.com/stable/stock/${stockSymbol}/intraday-prices?token=${token}`, {
    method: 'get',
    body: JSON.stringify(res.body),
    headers: { 'Content-Type': 'application/json' }
  })
  const intradayPrices = await intradayPriceRequest.json();

  res.json(intradayPrices)
}));

app.get('/chart/:id(\\w+)', asyncHandler(async (req, res) => {
  const stockSymbol = req.params.id;
  const stock = await Stock.findOne({ where: { symbol: stockSymbol }});

  res.render('chart', { stockSymbol })
}));

const port = Number.parseInt(process.env.PORT, 10) || 8080;

app.listen(port, () => {
  console.log(`Listening on port:${port}...`);
});
