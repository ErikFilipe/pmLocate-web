(function () {
    "use strict";

    module.exports = function (app, messaging, ensureAuthenticated) {

        app.get("/test", ensureAuthenticated, function (req, res) {
            messaging.notification(req.query.destinatary, req.query.message).then(function (message) {
                return res.status(200).send(message);
            }).catch(function (err) {
                return res.status(500).send(err);
            });

        });

    }


}());