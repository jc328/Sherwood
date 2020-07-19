// This is a test file to ensure I don't destroy our repo and understand how to 
// create branches, git add, git status, and commit- AARON

// const fetch = require('node-fetch');


// //Fetched the latest articles from WSJ
// fetch(`https://newsapi.org/v2/top-headlines?sources=the-wall-street-journal&apiKey=58543dc1941d49f887c59aaa67e23f4e`)
//   .then((res) => (res.json())
//   .then((json) => console.log(json)));

//WORKS
// const NewsAPI = require('newsapi');
// const newsapi = new NewsAPI('58543dc1941d49f887c59aaa67e23f4e');

// // To query sources
// // All options are optional
// newsapi.v2.sources({
//   category: 'business',
//   language: 'en',
//   country: 'us'
// }).then(response => {
//   console.log(response);
//   /*
//     {
//       status: "ok",
//       sources: [...]
//     }
//   */
// });

const token = 'Tsk_52c6de67190f4fb7aa10ae91d4c9dd5c';
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const csurf = require('csurf');
const fetch = require('node-fetch');
const { check, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const { User, Transaction, Stock } = require('./models');
const { userValidators, transactionValidtor } = require('./validators')
const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "bs6u9h7rh5rdv3m40reg"
const finnhubClient = new finnhub.DefaultApi()
const app = express();

const csrfProtection = csurf({ cookie: true });
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/assets'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));



window.addEventListener("DOMContentLoaded", event => {
  const stock = document.getElementsByClassName('right-span');

  stock.addEventListener('submit', event => {
    app.get('/search', asyncHandler(async(req, res) => {
      const stockData = await Stock.findAll({
        attributes: ["symbol", "fullName"]
      });
      let data = ''
      res.render('searchbar', { stockData, data });
    }));
    res.redirect('/search/:id')
  });
});