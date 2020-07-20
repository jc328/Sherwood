#! /usr/bin/env node
const token = 'sk_1fb6b7fde025474eb0dc97be193d2eb2';
const sandboxToken = 'Tsk_52c6de67190f4fb7aa10ae91d4c9dd5c'
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const csurf = require('csurf');
const fetch = require('node-fetch');
const session = require('express-session');
const { check, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const { User, Transaction, Stock } = require('./models');
const { userValidators, loginValidator, sellTransaction } = require('./validators')
const { loginUser, restoreUser, logoutUser, requireAuth } = require('./auth')

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

app.use(session({
  name: 'sws.sid',
  secret: 'robin',
  resave: false,
  saveUninitialized: false
}));
app.use(restoreUser)

app.get('/', asyncHandler(async (req, res, next) => {
  if(!res.locals.authenticated) {
    res.render('landingPage');
  } else {
    res.redirect('/dashboard')
  }
}));


app.get('/login-page', asyncHandler(async (req, res) => {
  res.render('login-page', { title: 'Log in: Sherwood Wealth Services'});
}));

app.post('/login-page', loginValidator, asyncHandler(async (req, res) => {
  let validationErrors = validationResult(req);
  let errs = new Array();

  if (validationErrors.isEmpty()) {
    let user = await User.findOne({ where: { email: req.body.email }});

    if (user) {
      let hash = user.password;
      bcrypt.compare(req.body.password, hash, function(err, result) {
        if (result) {
          loginUser(req, res, user);
          return res.redirect('/')
        } else {
          errs.push("This email or password could not be found.")
          res.render('login-page', {
          msg: `${errs}`
          });
        }
      });
    } else {
      errs.push("This email or password could not be found.")
      res.render('login-page', {
        msg: `${errs}`
      })
    }
  } else {
    errs = validationErrors.errors.map(err => err.msg)
    errs = errs.join(" ");
    res.render('login-page', {
      msg: `${errs}`
    })
  }
}))

app.get('/landing-page', asyncHandler(async (req, res) => {
  res.render('landingPage');
}));

app.get('/signup', asyncHandler(async(req, res) => {
  res.render('signup')
}))

app.post('/signup', userValidators, asyncHandler(async(req, res) => {
  let validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    const password = req.body.password;
    let hashes = await [];

    bcrypt.genSalt(saltRounds, function(err, salt) {
      hashes.push(salt)
      bcrypt.hash(password, salt, function(err, hash) {
        hashes.push(hash)
       })
    });
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt)

    let user = await User.create({
      email: req.body.email,
      password: hash,
      salt: salt,
      session_token: req.session.id,
      account_balance: 100000,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await user.save();
    loginUser(req, res, user);
    res.redirect('/dashboard')
  } else {
    let errs = validationErrors.errors.map(err => err.msg);
    errs = errs.join(" ");
    res.render('signup', {
      msg2: `${errs}`
    })
  }
}));

app.get('/news', asyncHandler(async (req, res) => {
  res.render('news-section', { title: 'News' });

}))

app.get('/dashboard', requireAuth, asyncHandler(async (req, res) => {
  let userId = req.session.auth.userId;
  const stockData = await Stock.findAll({
    attributes: ["symbol", "fullName"]
  })
  let data = ''
  res.render('dashboardPage', { stockData, data, userId });
}));

app.get('/search', asyncHandler(async (req, res) => {
  const stockData = await Stock.findAll({
    attributes: ["symbol", "fullName"]
  })
  let data = '';
  res.render('searchbar', { stockData, data });
}));

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

app.get('/api/price/:id(\\w+)', asyncHandler(async (req, res) => {
  const stockSymbol = req.params.id;
  const priceRequest = await fetch(`https://sandbox.iexapis.com/stable/stock/${stockSymbol}/price?token=${sandboxToken}`, {
    method: 'get',
    body: JSON.stringify(res.body),
    headers: { 'Content-Type': 'application/json' }
  })
  const price = await priceRequest.json();
  res.json(price)
}));

app.get('/api/chart/intraday-prices/:id(\\w+)', asyncHandler(async (req, res) => {
  const stockSymbol = req.params.id;
  const intradayPriceRequest = await fetch(`https://sandbox.iexapis.com/stable/stock/${stockSymbol}/intraday-prices?token=${sandboxToken}`, {
    method: 'get',
    body: JSON.stringify(res.body),
    headers: { 'Content-Type': 'application/json' }
  })
  const intradayPrices = await intradayPriceRequest.json();

  res.json(intradayPrices)
}));

app.get('/chart/:id(\\w+)', asyncHandler(async (req, res) => {
  const stockSymbol = req.params.id;
  const companyInfoRequest = await fetch(`https://sandbox.iexapis.com/stable/stock/${stockSymbol}/company?token=${sandboxToken}`, {
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

app.get('/stocks/:id(\\w+)', asyncHandler(async (req, res) => {
  const userId = Number(req.session.auth.userId);
  const stockSymbol = req.params.id;
  const stock = await Stock.findOne({ where: { symbol: stockSymbol } });

  const stockId = stock.id;
  const companyInfoRequest = await fetch(`https://sandbox.iexapis.com/stable/stock/${stockSymbol}/company?token=${sandboxToken}`, {
    method: 'get',
    body: JSON.stringify(res.body),
    headers: { 'Content-Type': 'application/json' }
  })
  const companyInfo = await companyInfoRequest.json();
  const companyName = companyInfo.companyName;
  const priceRequest = await fetch(`https://sandbox.iexapis.com/stable/stock/${stockSymbol}/price?token=${sandboxToken}`, {
    method: 'get',
    body: JSON.stringify(res.body),
    headers: { 'Content-Type': 'application/json' }
  })
  const price = await priceRequest.json();

  const prevTransaction = await Transaction.findOne({ where: {
    stock_id: stockId,
    user_id: userId,
  }});

  let currentOwnedShares;
  if (prevTransaction) {
    currentOwnedShares = prevTransaction.share_quantity;
  }
  if (!prevTransaction) {
    currentOwnedShares = 0;
  }

  const stockData = await Stock.findAll({
    attributes: ["symbol", "fullName"]
  })
  let data = ''

  // if (res.locals.authenticated) {
    // res.render('stockPage', {
    //   stockSymbol,
    //   companyName,
    //   price,
    //   auth: true, user:
    //   req.session.auth.userId,
    //   shares: currentOwnedShares,
    //   stockData
    // })
  // } else {
  //   res.render('stockPage', { stockSymbol, companyName, price })
  // }

  if (res.locals.authenticated) {
    finnhubClient.companyProfile2({'symbol': stockSymbol}, (error, data, response) => {
      finnhubClient.companyNews(stockSymbol, "2020-06-01", "2020-07-17", (error, news, response) => {
        if (error) {
            console.error(error);
        } else {
          res.render('stockPage', { stockSymbol, companyName, price, stockData, data, news,
            auth: true, user:
              req.session.auth.userId,
              shares: currentOwnedShares,
            })
        }
      });
    });
  } else {
    res.render('stockPage', { stockSymbol, companyName, price });
  }

}));

app.post('/transactions/buy', asyncHandler(async (req, res) => {
  const userId = Number(req.session.auth.userId);
  const shares = req.body;
  const stockSymbol = shares.symbol;
  const stock = await Stock.findOne({ where: { symbol: stockSymbol } });
  const stockId = stock.id;
  let boughtNum = Number(shares.boughtNumber);

  if (shares.buysell === 'sell') {
    boughtNum = boughtNum*-1
  }

  const priceRequest = await fetch(`https://sandbox.iexapis.com/stable/stock/${stockSymbol}/price?token=${sandboxToken}`, {
    method: 'get',
    body: JSON.stringify(res.body),
    headers: { 'Content-Type': 'application/json' }
  })
  const price = await priceRequest.json();

  const user = await User.findByPk(userId);

  if (Number(user.account_balance) > ((Number(boughtNum) * price))) {
    user.account_balance = `${Number(user.account_balance) - (Number(boughtNum) * price)}`;
    await user.save();
    await Transaction.create({
      price: price,
      share_quantity: boughtNum,
      stock_id: stockId,
      user_id: userId,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    res.redirect('/dashboard')
  } else {
    res.redirect(`/stocks/${stockSymbol}`)
  }
}));

app.post('/stocks', asyncHandler(async (req, res) => {
  const sym = await Stock.findOne({
    attributes: ["symbol"],
    where: {
      'fullName' : req.body.search
    }
  })
  let ticker = (sym == null ? req.body.search : sym.symbol)
  res.redirect(`/stocks/${ticker}`)
}))

app.post('/transactions/sell', asyncHandler(async (req, res) => {
  const userId = Number(req.session.auth.userId);
  const shares = req.body;
  const stockSymbol = shares.symbol;
  const soldNum = shares.soldNumber;
  const stock = await Stock.findOne({ where: { symbol: stockSymbol } });
  const stockId = stock.id;
  const priceRequest = await fetch(`https://sandbox.iexapis.com/stable/stock/${stockSymbol}/price?token=${sandboxToken}`, {
    method: 'get',
    body: JSON.stringify(res.body),
    headers: { 'Content-Type': 'application/json' }
  })
  const price = await priceRequest.json();
  const companyInfoRequest = await fetch(`https://sandbox.iexapis.com/stable/stock/${stockSymbol}/company?token=${sandboxToken}`, {
    method: 'get',
    body: JSON.stringify(res.body),
    headers: { 'Content-Type': 'application/json' }
  })
  const companyInfo = await companyInfoRequest.json();
  const prevTransaction = await Transaction.findOne({ where: {
    stock_id: stockId,
    user_id: userId,
  }});

  const user = await User.findByPk(userId);

  if (Number(user.account_balance) > ((Number(soldNum) * price))) {
    user.account_balance = `${Number(user.account_balance) + (Number(soldNum) * price)}`;
    await user.save();
    await Transaction.create({
      price: price,
      share_quantity: -soldNum,
      stock_id: stockId,
      user_id: userId,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    res.redirect('/dashboard')
  } else {
    res.redirect(`/stocks/${stockSymbol}`)
  }
}));

app.post('/logout', (req, res) => {
  logoutUser(req, res);
  res.redirect('login-page');
});

// app.use((req, res, next) => {
//   const err = new Error("The requested resource couldn't be found.");
//   err.status = 404;
//   next(err);
// });

app.get('/instructions', asyncHandler(async (req, res) => {
  res.render('website-navigation');
}));

const port = Number.parseInt(process.env.PORT, 10) || 8080;

app.listen(port, () => {
  console.log(`Listening on port:${port}...`);
});
