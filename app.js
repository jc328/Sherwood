#! /usr/bin/env node

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const csurf = require('csurf');
const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "bs6u9h7rh5rdv3m40reg"
const finnhubClient = new finnhub.DefaultApi()
const app = express();

const csrfProtection = csurf({ cookie : true });

//Are we using pug?
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/assets'));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended : false }));


const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

app.get('/', asyncHandler(async (req, res) => {
  res.send('HOME');
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



const port = Number.parseInt(process.env.PORT, 10) || 8081;;

app.listen(port, () => {
  console.log(`Listening on port:${port}...`);
});
