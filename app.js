#! /usr/bin/env node
const token = 'Tsk_52c6de67190f4fb7aa10ae91d4c9dd5c';
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const csurf = require('csurf');
const fetch = require('node-fetch');

const bcrypt = require('bcrypt');
const saltRounds = 10;

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

  res.render('landingPage');
}));
app.get('/dashboard', asyncHandler(async (req, res) => {
  res.render('dashboardPage');

  const user = await User.findByPk(userId);
  const balance = user.account_balance;
  res.render('landingPage', { user, balance});

}));
// app.get('/dashboard', asyncHandler(async (req, res) => {
//   res.render('dashboardPage');
// }));

app.get('/login-page', asyncHandler(async (req, res) => {
  res.render('login-page', { title: 'Log in: Sherwood Wealth Services'});
}));

app.post('/login-page', asyncHandler(async (req, res) => {
  let password = req.body.password
  let email = req.body.username
  let random = Math.random()

  let UserData = await User.findOne({
    attributes: ["email", "salt", "password"],
    where: {
      email: email
    }
  })

  if (UserData === null) {
    //if no user is found, creates salt, hashes and updates table
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        User.create({
          email: email,
          password: hash,
          salt: salt,
          session_token: random,
          account_balance: 100000,
          createdAt: new Date(),
          updatedAt: new Date()
      })
    })
  })
      res.render('login-page', {
        msg: '',
        msg1: 'A new user has been created!  Please login with your new credentials'
      })
  } else {
    bcrypt.hash(password, UserData.salt, function(err, hash) {
      if (hash === UserData.password) {
        //Redirect User to the Dashboard - change to dashboard page
        res.render('dashboardPage');
      } else {
        //Password is Wrong, redirect to Login Page
        res.render('login-page', {
          msg: 'Please check your Password'
        })

      }
    })
  }
}))

app.get('/landing-page', asyncHandler(async (req, res) => {
  res.render('landingPage');
}));
app.get('/search', asyncHandler(async (req, res) => {
  res.render('searchbar');
}));


app.get('/dashboard', asyncHandler(async (req, res) => {
  const stockData = await Stock.findAll({
    attributes: ["symbol", "fullName"]
  })
  finnhubClient.companyProfile2({'symbol': 'DIS'}, (error, data, response) => {
    finnhubClient.companyNews("AAPL", "2020-06-01", "2020-07-14", (error, news, response) => {
      if (error) {
          console.error(error);
      } else {
          // let breakingNews = news[0]
          res.render('dashboardPage', {data, news, stockData})
      }
  });
  });
}))

app.get('/news', asyncHandler(async (req, res) => {
  res.render('news-section', { title: 'News' });

}))

app.get('/dashboard-page', asyncHandler(async (req, res) => {
  res.render('dashboardPage');


}));

// app.get('/dashboard-page', asyncHandler(async (req, res) => {
//   res.render('dashboardPage');
// }));

app.post('/search', asyncHandler(async (req, res) => {
  const stockData = await Stock.findAll({
    attributes: ["symbol", "fullName"]
  })
  const sym = await Stock.findOne({
    attributes: ["symbol"],
    where: {
      'fullName' : req.body.search,
    }
  })
  let ticker = (sym == null ? req.body.search : sym.symbol)

  finnhubClient.companyProfile2({'symbol': ticker}, (error, data, response) => {
    finnhubClient.companyNews(ticker, "2020-06-01", "2020-07-14", (error, news, response) => {
      if (error) {
          console.error(error);
      } else {
          // let breakingNews = news[0]
          res.render('searchbar', {data, news, stockData})
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
  const companyInfoRequest = await fetch(`https://sandbox.iexapis.com/stable/stock/${stockSymbol}/company?token=${token}`, {
    method: 'get',
    body: JSON.stringify(res.body),
    headers: { 'Content-Type': 'application/json' }
  })
  const companyInfo = await companyInfoRequest.json();
  const companyName = companyInfo.companyName;

  res.render('chart', { stockSymbol, companyName })
}));

// This should only work if user is logged in
app.get('/api/transactions/:id(\\d+)', asyncHandler(async (req, res) => {
  const userId = req.params.id;
  Stock.hasMany(Transaction, {foreignKey: 'stock_id'});
  Transaction.belongsTo(Stock, {foreignKey: 'stock_id'});
  const userTransactions = await Transaction.findAll({ where: { user_id: userId }, include: [Stock] })

  let rows = new Array();
  userTransactions.forEach(tr => {
    let { share_quantity, createdAt } = tr;
    let { symbol } = tr.Stock;
      rows.push({
        share_quantity,
        symbol,
        createdAt
    });
  })

  res.json(rows)
}));

// This should only work if user is logged in
app.get('/api/balance/:id(\\d+)', asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findByPk(userId);
  const balance = user.account_balance;
  res.json(balance);
}));

// This should only work if user is logged in
app.get('/portfolio-chart', asyncHandler(async (req, res) => {
  // TODO Get user from session ID and render appropriate portfolio info
  // Currently testing User.id 2
  res.render('portfolioChart');
}));

const port = Number.parseInt(process.env.PORT, 10) || 8080;

app.listen(port, () => {
  console.log(`Listening on port:${port}...`);
});
