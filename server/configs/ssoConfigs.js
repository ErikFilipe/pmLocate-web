(function () {
    "use strict";

    module.exports = {
        "clientID": process.env.SSO_client_id,
        "clientSecret": process.env.SSO_client_secret,
        "authorizationURL": process.env.SSO_authorization_url,
        "tokenEndpointUrl": process.env.SSO_token_url,
        "tokenURL": process.env.SSO_token_url,
        "issuer": process.env.SSO_issuer_id,
        "skipUserProfile": true,
        "scope": process.env.SSO_scope,
        "response_type": "code",
        "addCACert": process.env.SSO_addCACert,
        "CACertPathList": process.env.SSO_CACertPathList.split(","),
        "callbackURL": process.env.SSO_callback_url
    }

}());
