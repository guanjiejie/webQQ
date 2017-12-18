/**
 * Created by Administrator on 2017-12-06.
 */

var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');

var log4js = require('../service/logService');
var log = log4js.getLogger();

var dbQuery = {
    query : function(sql, params, callback){
        var pool = mysql.createPool(dbConfig.mysql);
        pool.getConnection(function (err, connection) {
            if(err){
                log.error('queryUtils:' + err);
                callback(err, null);
                return;
            }
            connection.query(sql, params, function (err, result) {
                if(err){
                    log.error('queryUtils:' + err);
                    callback(err, null);
                    return;
                }
                callback(err, result);
                connection.release();
            })
        })
    },
    getCurrTime: function(){
        var date = new Date();
        var str = date.getFullYear() + "-" + this.numFormat(date.getMonth() + 1) + "-" + this.numFormat(date.getDate())
            + " " + this.numFormat(date.getHours()) + ":" + this.numFormat(date.getMinutes()) + ":" + this.numFormat(date.getSeconds());
        return str;
    },
    numFormat : function (num){
        return String(num).length == 1 ? "0"+num : num;
    }
};
module.exports = dbQuery;