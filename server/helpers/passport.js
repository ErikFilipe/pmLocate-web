(function () {
    "use strict";

    var OpenIDConnectStrategy = require("passport-idaas-openidconnect").IDaaSOIDCStrategy;
    var ssoConfigs = require("../configs/ssoConfigs");

    module.exports = function (passport) {
        passport.serializeUser(function (user, done) {
            done(null, user);
        });

        passport.deserializeUser(function (user, done) {
            done(null, user);
        });

        passport.use("openidconnect", new OpenIDConnectStrategy(ssoConfigs, function (iss, sub, profile, accessToken, refreshToken, params, done) {
            process.nextTick(function () {
                profile.accessToken = accessToken;
                profile.refreshToken = refreshToken;
                done(null, profile);
            });
        }));
    }
}());