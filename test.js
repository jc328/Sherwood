// This is a test file to ensure I don't destroy our repo and understand how to 
// create branches, git add, git status, and commit- AARON

// const fetch = require('node-fetch');


// //Fetched the latest articles from WSJ
// fetch(`https://newsapi.org/v2/top-headlines?sources=the-wall-street-journal&apiKey=58543dc1941d49f887c59aaa67e23f4e`)
//   .then((res) => (res.json())
//   .then((json) => console.log(json)));

//WORKS
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('58543dc1941d49f887c59aaa67e23f4e');

// To query sources
// All options are optional
newsapi.v2.sources({
  category: 'business',
  language: 'en',
  country: 'us'
}).then(response => {
  console.log(response);
  /*
    {
      status: "ok",
      sources: [...]
    }
  */
});