/**
 * Created by Administrator on 2017-12-07.
 */

var dbQuery = require('../db/queryUtils');
var userSQL = require('../db/usersql');
var friendssql = require('../db/friendssql');

var log4js = require('./logService');
var log = log4js.getLogger();

var friendService = {
    addFriend : function(fromid, toid, groupingid, callback){
       groupingid = groupingid ? groupingid : '1';
        dbQuery.query(friendssql.addFriend, [fromid, toid, groupingid], function(err, result){
            if(err){
                console.log(err);
                log.error('service.friendserive.addFriend:' + err);
            }
            callback(err, result);
            
        })
    }
}

module.exports = friendService;

