const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
if(req.session.authorization){
    let token = req.session.authorization['access'];
    jwt.verify(token, "access_token", (err,customer) =>{

        if(!err){
            req.customer= customer;
            next();
          
        }else{
            res.status(403).json({message:"Unauthorized"});
            

        }
    });
} else{
    return res.status(403).json({message:"Customer is not authorized."});
}

});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
