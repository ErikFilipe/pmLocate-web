const Pool = require("ibm_db").Pool;
const pool = new Pool({
  autoCleanIdle: true
});
const fs = require('fs');
const Q = require('q');
const env = process.env.NODE_ENV || 'local';


let dbConfig = require("./configdb.json")
/*try {
  dbConfig = JSON.parse(fs.readFileSync('server/configs/configdb.json').toString());
} catch (e) {
  console.log(e);
  process.exit(1);
}*/

let cn = "DATABASE="+dbConfig.AMIW.databaseName+
";HOSTNAME="+dbConfig.AMIW.databaseAddress+
";PORT="+dbConfig.AMIW.databasePort+
";PROTOCOL=TCPIP;UID=gamaral"+
";PWD=gpaiva10;AUTHENTICATION=SERVER";

console.log('========= Database Configuration ===========');
console.log('Name:' ,dbConfig.AMIW.databaseName);
console.log('Host:', dbConfig.AMIW.databaseAddress);
console.log('Port:', dbConfig.AMIW.databasePort);
console.log('User:', "moninb");
console.log('Password:', "monyim17");
console.log('============================================');

pool.init(2, cn);

openConnection = () => {
  return Q.ninvoke(pool, 'open', cn);
}

closeConnection = (connection) => {

  if (pool.availablePool[cn] && pool.availablePool[cn].length >= 50) {
    connection.realClose(function(error) {
      if (error) throw error;
    });
  } else {
    connection.close(function(error) {
      if (error) throw error;
    });
  }
}

runQuery = (query, connection) => {
  let deferred = Q.defer();
  let externalConn = false;
  let promise;

  if (connection){
    externalConn = true;
    promise = {
      then: Q.fcall
    };
  } else {
    promise = openConnection();
  }

  promise
  .then((newConnection) => {
    connection = connection || newConnection;
    return Q.ninvoke(connection, 'query', query);
  })
  .then((result) => { deferred.resolve(result); })
  .fail(deferred.reject)
  .fin(() => {
    if (!externalConn) {
      closeConnection(connection);
    }
  });
  return deferred.promise;
}

module.exports = runQuery;
