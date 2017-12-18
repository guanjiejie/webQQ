
var dbQuery = require('../db/queryUtils');
var groupingSQL = require('../db/groupingsql');

var log4js = require('./logService');
var log = log4js.getLogger();

var groupingService = {
    addGrouping: function(userId, groupName, callback){
        dbQuery.query(groupingSQL.addGrouping, [userId, groupName, dbQuery.getCurrTime()], function(err, result){
            if(err){
                log.error('service.groupingSerivice.addGrouping:' + err);
            }
            callback(err, result);
        });
    }
}

module.exports = groupingService;
