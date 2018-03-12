/*eslint-env node*/

(function () {
    "use strict";

    var cfenv = require('cfenv');
    var appEnv = cfenv.getAppEnv();

    require("dotenv").config({
        "silent": true
    });
    process.isLocal = /localhost/.test(appEnv.bind) || appEnv.isLocal;

    var express = require('express');
    var engines = require("consolidate");
    var app = express();
    var cookieSession = require("cookie-session");
    var cookieParser = require("cookie-parser");
    var passport = require("passport");
    var messaging = require("./server/helpers/messaging");

    const routes = require('./server/routes/api');

    app.use(cookieParser());
    app.use(cookieSession({
        "secret": process.env.APP_SECRET,
        "maxAge": 86400000,
        "saveUninitialized": false,
        "resave": false,
        "name": "jsessionid",
        "keys": "jsessionid",
        "cookie": {
            "secure": true,
            "httpOnly": true
        }
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.engine("html", engines.ejs);
    app.set("view engine", "ejs");
    app.set("views", __dirname + "/client");
    app.use(express.static(__dirname + '/client'));

    require("./server/helpers/passport")(passport);
    require("./server/routes/api")(app, passport, messaging);

    //Serving the back-end
    app.use('/api', routes);

    var dt = new Date();

    app.listen(appEnv.port, '0.0.0.0', function() {
        console.log("server starting on " + appEnv.url + " - time: " + dt);
    });
}());
