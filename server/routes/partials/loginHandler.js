(function () {
    "use strict";

    module.exports = function (app, passport) {
        app.get("/login", passport.authenticate("openidconnect", {}));

        app.get("/auth/sso/callback", function(req,res,next) {
            passport.authenticate("openidconnect", {
                "successRedirect": req.session.originalUrl || "/",
                "failureRedirect": "/failure"
            })(req, res, next);
        });

        app.get("/failure", function(req, res) {
            return res.status(500).send("login failed");
        });

        app.get("/userInfo", function (req, res) {
            return res.status(200).send(req.user || {
                "firstName": "Daniel",
                "picture": "https://w3-services1.w3-969.ibm.com/myw3/unified-profile-photo/v1/image/dcerag@br.ibm.com",
                "email": "dcerag@br.ibm.com"
            });
        });

        app.post("/logout", function (req, res) {
            res.clearCookie("connect.sid");
            req.session.destroy(function () {
                req.logout();
                res.redirect("https://w3id.sso.ibm.com/auth/sps/samlidp/saml20/sloinitial?RequestBinding=HTTPRedirect&PartnerId=https://proxxicts-dev.mybluemix.net&NameIdFormat=email");
            });
        });
    };

}());