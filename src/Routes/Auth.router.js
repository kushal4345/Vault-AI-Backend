const express = require('express');
const Authrouter = express.Router();
const {Signup,Login,Logout,ForgotPassword} = require('../Controllers/Auth.controller');


Authrouter.post('/signup', Signup); // Route for user signup
Authrouter.post('/login', Login); // Route for user login
Authrouter.post('/logout', Logout); // Route for user logout
Authrouter.post('/forgotpassword', ForgotPassword); // Route for forgot password


module.exports = Authrouter;