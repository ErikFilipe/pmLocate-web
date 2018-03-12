(function () {
    "use strict";
    module.exports = {
        "notification": function (destinatary, message) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve("Message: " + message + " sent to: " + destinatary);
                }, 5000);
            });
        }
    }

}());