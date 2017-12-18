var express = require('express');
var router = express.Router();

var groupingService = require('../service/groupingService');
var log4js = require('../service/logService');
var log = log4js.getLogger();

router.use('/addGrouping', function(req, res, next){
    var groupingName = req.body.groupingName;
    var userId = req.session.userId;

    groupingService.addGrouping(userId, groupingName, function(err, result){
        if(err){
            log.error('routes.grouping.addGrouping:' + err);
            res.json({code: '001',msg: '分组添加失败!'});
        }else{
            res.json({code: '000', msg: '添加成功'});
        }
    });
});

module.exports = router;
