'use strict';

const express = require('express');
const ejs = require('ejs');
const superagent = require('superagent');
const cors = require('cors');
const pg = require('pg');
require('dotenv').config();
const app = express();


app.use(cors());

const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');


const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', error => console.log(error));
client.connect();


app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));


app.get('/', (req, res) => {
  res.render('../views/pages/index');
});

function getBooks(request, response) {
  lest SQL = 'SELECT * from books;';

  return client.query(SQL)
  .then(results => response.render('index', {books: books.rows}))
  .catch(err => console.error(err));
  
}





app.post('/search', getResults);

function getResults(request, response) {
  console.log('my request body:', request.body);
  // response.sendfile('../views/pages/searches/show', {root: './public'});
  let input = request.body;
  fetchData(input)
    .then(result => response.send(result));
}
let fetchData = (input =>{
  console.log('fetch is running');
  let query = input.bookSearch;
  let searchType = input.search;
  console.log( 'query and searchType', query, searchType);

  let titleUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}:intitle=${query}`;
  let authorUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}:inauthor=${query}`;
  let URL = '';
  console.log('ourURLs', titleUrl, authorUrl);
  if (searchType === 'author'){
    URL = authorUrl;
  } else if (searchType = 'title'){
    URL = titleUrl;
  }
  console.log('ifElse ran');

  return superagent.get(URL).then(result => {
    console.log('running');
    const allBooks = result.body.items.map(info => {
      const newBook = new Book(info);
      console.log('newBook', newBook);
      return newBook;
    });
    console.log('allBooks', allBooks);
    // renderBooks(allBooks);
    
    return allBooks;
  });
});

function Book(data) {
  this.selfLink = data.selfLink;
  this.author = data.volumeInfo.authors;
  this.title = data.volumeInfo.title;
}

// app.get('/seach', (response)=>{
//   response.render('show', {newBook: allBooks })
// })

// function renderBooks(books){
//   console.log('renderBooks');
//   response.render('show', {newBook: books,});
// };
app.get('../views/pages/searches/show');

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
=======
'use strict';

const express = require('express');
const ejs = require('ejs');
const superagent = require('superagent');
const cors = require('cors');
const pg = require('pg');
require('dotenv').config();
const app = express();


app.use(cors());

const PORT = process.env.PORT || 3000;


// const client = new pg.Client(process.env.DATABASE_URL);
// client.on('error', error => console.error(error));
// client.connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('../views/pages/index');
});


app.post('/show', getResults);

function getResults(request, response) {
  console.log('my request body:', request.body);
  // response.sendfile('../views/pages/searches/show', {root: './public'});
  let input = request.body;
  fetchData(input)
    .then(result => {
      console.log(result);
      response.render('pages/searches/show', {renderedBooks: result,})
    });

}
let fetchData = (input =>{
  console.log('fetch is running');
  let query = input.bookSearch;
  let searchType = input.search;
  console.log( 'query and searchType', query, searchType);

  let titleUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}:intitle=${query}`;
  let authorUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}:inauthor=${query}`;
  let URL = '';
  console.log('ourURLs', titleUrl, authorUrl);
  if (searchType === 'author'){
    URL = authorUrl;
  } else if (searchType = 'title'){
    URL = titleUrl;
  }
  console.log('ifElse ran');

  return superagent.get(URL).then(result => {
    console.log('running');
    const allBooks = result.body.items.map(info => {
      const newBook = new Book(info);
      console.log('newBook', newBook);
      return newBook;
    });
    console.log('allBooks', allBooks);
    // renderBooks(allBooks);
    // console.log(response);
    // response.render('show', {newBook, allBooks,});
    return allBooks;
  });
});

function Book(data) {
  this.selfLink = data.selfLink;
  this.author = data.volumeInfo.authors;
  this.title = data.volumeInfo.title;
  this.img_url = data.volumeInfo.imageLinks.thumbnail;
  this.description = data.volumeInfo.description;
}

// app.get('/seach', (request, response)=>{
//   response.render('show', {newBook: })
// })

// function renderBooks(books){
//   console.log('renderBooks');
//   response.render('show', {newBook: books,});
// };
app.get('../views/pages/searches/show');

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });