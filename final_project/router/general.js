const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here

  const username = req.body.username;
  const password = req.body.password;
  if(isValid(username)){
    users.push({username,password});
        return  res.status(200).json({message: "User successfully registered"});
  }
      return  res.status(401).json({message: "User cannot be registered."});

});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
      res.send(JSON.stringify(books,null,10));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here

  const isbn = req.params.isbn;
  if(books[isbn]===isbn){
      res.send(JSON.stringify(books[isbn]));
  }


});
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  if (books[author]===author){
        res.send(JSON.stringify(books[author]));
  }
});


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
   if(books[title]===title){
    res.send(JSON.stringify(books[title]));
   }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
   const review = req.params.review;
   if (books[review]===review){
        res.send(JSON.stringify(books[review]));
   }
});

module.exports.general = public_users;
