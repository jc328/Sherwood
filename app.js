#! /usr/bin/env node
const token = 'Tsk_52c6de67190f4fb7aa10ae91d4c9dd5c';
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const csurf = require('csurf');
const fetch = require('node-fetch');

const { User, Transaction, Stock } = require('./models');
const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "bs6u9h7rh5rdv3m40reg"
const finnhubClient = new finnhub.DefaultApi()
const app = express();

const csrfProtection = csurf({ cookie : true });
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/assets'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended : false }));

app.get('/', asyncHandler(async (req, res) => {
  res.send('HOME-THIS PAGE SHOULD BE DIRECTED TO EITHER THE LOGIN PAGE IF NOT SIGNED IN OR TO THE SPLASH/LANDING PAGE IF SIGNED IN');
}));

app.get('/login-page', asyncHandler(async (req, res) => {
  res.render('login-page', { title: 'Log in: Sherwood Wealth Services'});
}));

app.get('/landing-page', asyncHandler(async (req, res) => {
  res.render('landing-page');
}));

app.get('/search', asyncHandler(async (req, res) => {
  finnhubClient.companyProfile2({'symbol': 'DIS'}, (error, data, response) => {
    finnhubClient.companyNews("AAPL", "2020-06-01", "2020-07-14", (error, news, response) => {
      if (error) {
          console.error(error);
      } else {
          // let breakingNews = news[0]
          res.render('searchbar', {data, news})
      }
  });
  });
}))

app.get('/news', asyncHandler(async (req, res) => {
  res.render('news-section', { title: 'News' });
}));

app.post('/search', asyncHandler(async (req, res) => {

  finnhubClient.companyProfile2({'symbol': req.body.search}, (error, data, response) => {
    finnhubClient.companyNews(req.body.search, "2020-06-01", "2020-07-14", (error, news, response) => {
      if (error) {
          console.error(error);
      } else {
          // let breakingNews = news[0]
          res.render('searchbar', {data, news})
      }
  });
  });
}))

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
  // const stock = await Stock.findOne({ where: { symbol: stockSymbol }});
  const companyInfoRequest = await fetch(`https://sandbox.iexapis.com/stable/stock/${stockSymbol}/company?token=${token}`, {
    method: 'get',
    body: JSON.stringify(res.body),
    headers: { 'Content-Type': 'application/json' }
  })
  const companyInfo = await companyInfoRequest.json();
  const companyName = companyInfo.companyName;

  res.render('chart', { stockSymbol, companyName })
}));

app.get('/api/transactions/:id(\\d+)', asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const userTransactions = await Transaction.findAll({ where: {
    user_id: userId
  }});

  res.json(userTransactions);
}));

app.get('/portfolio-chart', asyncHandler(async (req, res) => {
  // const user = await User.findByPk(1);
  res.render('portfolio-chart');
}));

const port = Number.parseInt(process.env.PORT, 10) || 8080;

app.listen(port, () => {
  console.log(`Listening on port:${port}...`);
});
