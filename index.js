const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8080;
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')

//  below line helps form data to be converted into req.body
app.use(express.urlencoded());
// below line helps to decode cookies to req.cookies
app.use(cookieParser());

// below line helps to find assets folder
app.use(express.static('./assets'));

// telling app to use express layouts
// this should be above routes beccause the routes render views
app.use(expressLayouts)

// extract style and script from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

// create session cookie
app.use(session({
    name:'codeial',
    //todo change the secret before deploy in profuction
    secret: 'blahsomething',
    saveUninitialized:false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));


app.use(passport.initialize());
app.use(passport.session());

// use express router
app.use('/', require('./routes'));

// firing up the server at the port 8080
app.listen(port, function(err){
    if(err){
        console.log("Error starting server");
    }

    console.log("Server started at port:",port);
}); 