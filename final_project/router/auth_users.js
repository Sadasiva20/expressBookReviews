const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
let username = users.find(user => user.username === username);

if(username){
   return true;
}
return false;
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.

let authenticated_users = users.filter((users) => {

    return (users.username === username && users.password === password);
});

if(authenticated_users.length > 0){

    return true;
}
return false;

}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here 
  let username = req.body.username;
  let password = req.body.password;
  if(authenticatedUser(username, password)){
    let token = jwt.sign({
        data:password
    }) 
    req.session.authorization = {accesstoken, username}
    return res.status(200).json({message: "Login successful"});
  }else{

    return res.status(403).json({message: "Invalid credentials"});
  }

});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  let review = req.body.review;
  if(books){

    books[isbn]["reviews"].push(review);
    return res.status(200).json({message: "Review added successfully"});
  }
   else{
    return res.status(400).json({message: "Review was not added."});
   }

});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
