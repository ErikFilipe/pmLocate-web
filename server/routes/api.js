var tableify = require('tableify');

(function () {
    "use strict";

    const query = require('../models/pm-locate-model');

    module.exports = function (app, passport, messaging) {

        var ensureAuthenticated = function (req, res, next) {
            return req.isAuthenticated() || process.isLocal ? next() : res.redirect("/login");
        };

        require("./partials/loginHandler")(app, passport, messaging);
        require("./partials/topicHandler")(app, messaging, ensureAuthenticated);

        app.get("/", ensureAuthenticated, function (req, res) {
            return res.status(200).render("../src/index.html");
        });

        app.get("/teste", ensureAuthenticated, function (req, res) {
            console.log("Route: /teste");
            return res.status(200);
        });

        app.get("/typel", ensureAuthenticated, function (req, res) {
            query.pmLocate()
            .then(data => {
              if (data.active){
                var html = data.data;
                res.status(200).json(html);
                //res.status(200).json({status: "done", code: "00", info: data.data, details:[{message: "There is shipments //waiting accountability.", object: "accountability: listPendings"}]});
              } else {
                res.status(200).json({status: "No records found!"});
              }
            })
            .catch(err => res.status(400).json( {status: "error", code: "99", info: "Unexpected error.", details: [{message: err.message, object: "accountability: listPendings"}]} ) );

            console.log("Route: /claim");
            //return res.status(200);
        });

    };

}());
