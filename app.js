const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const csurf = require('csurf');

const app = express();

const csrfProtection = csurf({ cookie : true });

//Are we using pug?
app.set('view engine', 'pug');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended : false }));

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

app.get('/', asyncHandler(async (req, res) => {
  res.render('layout', {title: 'Sherwood Forest'});
}));



const port = 8080;

app.listen(port, () => {
  console.log(`Listening on port:${port}...`);
});
