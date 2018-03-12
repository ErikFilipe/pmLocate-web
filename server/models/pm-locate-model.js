const database = require('../configs/db2');
const Q = require('q');
const quote = require('quote')({
  quotes: '\''
});

/**
 * List all shipments pending accountability (BISTEMLO)
 * @return {object} Shipments with Status 36
 */
//exports.getAccID = (accID, dtIni, dtFim) => {
//  let deferred = Q.defer();
//  let queryString =  "SELECT WEEK_ENDING_DATE AS Week, EMP_SER_NUM AS Serial_Number, EMP_LAST_NAME AS Last_Name, "
//      queryString += "EMP_INITIALS AS Initials, ACCOUNT_ID, WORK_ITEM_ID, "
//      queryString += "OVERTIME_IND, SUM(TOTAL_HRS_EXPENDED) AS TOTAL";
//      queryString += " FROM BMSIW.EMP_LABOR_UV WHERE ACCOUNT_ID = " + quote(accID);
//      //queryString += " AND EMP_SER_NUM = " + quote ("097618");
//      queryString += " AND WEEK_ENDING_DATE Between " + quote (dtIni) + " and " + quote (dtFim);
//      queryString += "Group By WEEK_ENDING_DATE, EMP_SER_NUM, EMP_LAST_NAME, EMP_INITIALS, ACCOUNT_ID, WORK_ITEM_ID, "
//      queryString += "OVERTIME_IND "
//      queryString += "Order By Serial_Number, Week" + ";";

exports.pmLocate = () => {
  let deferred = Q.defer();
  let queryString =  "SELECT DISTINCT "
          queryString += "AL1.CHIS_CONTRACT_NO, "
          queryString += "AL1.SUB_CUST_NUMBER, "
          queryString += "AL1.SUB_CUST_NAME, "
          queryString += "AL1.PROD_TYPE, "
          queryString += "AL1.PROD_MOD, "
          queryString += "AL1.REL_PROD_TYPE, "
          queryString += "AL1.REL_SERIAL, "
          queryString += "AL1.PLANT_ORD_SER_NO, "
          queryString += "AL1.BIL_CUST_EXT, "
          queryString += "AL1.SOURCE_CODE, "
          queryString += "AL1.SVC_START_DATE, "
          queryString += "AL1.SVC_STOP_DATE, "
          queryString += "AL1.SVC_ELEMENT  "
      queryString += "FROM CDW.D2CHISCONCOMP AL1 "
      queryString += "WHERE ((AL1.PROD_TYPE IN ('7042')) AND (AL1.PLANT_ORD_SER_NO LIKE '%4A5FC'))"
      queryString += "OR ((AL1.REL_PROD_TYPE IN ('7042')) AND (AL1.REL_SERIAL LIKE '%4A5FC'))"

  database(queryString)
    .then((result) => {
      for (let prop in result) {
        if (result.hasOwnProperty(prop))
          deferred.resolve({active: true, data: result});
      }
      deferred.resolve({active: false, data: result});
    })
    .catch((err) => {
      console.log(err);
      deferred.resolve({active: false, data: result});
    });

  return deferred.promise;
}
