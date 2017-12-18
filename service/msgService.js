/**
 * Created by Administrator on 2017-12-07.
 */
var log4js = require('./logService');
var dbQuery = require('../db/queryUtils');
var msgSql = require('../db/msgsql');

var loger = log4js.getLogger();

var msgService = {
    addMsg: function (fromid, toid, type, content, isRead, callback) {
        dbQuery.query(msgSql.addMsg, [fromid, toid, type, content, dbQuery.getCurrTime(), isRead], function (err, result) {
            if (err) {
                //console.log(err);
                loger.error("msgService.msgService:" + err);
            }
            callback(err, result);
        });
    }
}

module.exports = msgService;
