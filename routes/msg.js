/**
 * Created by Administrator on 2017-12-06.
 */
var express = require("express");
var router = express.Router();

var dbQuery = require('../db/queryUtils');
var msgsql = require('../db/msgsql');

var friendService = require('../service/friendService');

var log4js = require('../service/logService');
var loger = log4js.getLogger();
router.use('/listIndex', function(req, res, next){
    res.render('./demo/msgBox');
});

router.use('/list', function(req, res, next){
    dbQuery.query(msgsql.queryList, [req.session.userId, '01'], function(err, result){
        var r = {list: result};
        res.json(r);
    })
});

router.use('/handle', function(req, res, next){
    var msgId = req.body.msgId;
    var isAgree = req.body.isAgree;
    dbQuery.query(msgsql.queryMsg, [msgId], function(err, result){
        if(result.length == 0){
            console.log("未查询到此信息");
            res.json({code: '001', msg: '未查询到此信息'});
        }else{
            //调用添加好友 result[0].fromid; result[0].toid;
            friendService.addFriend(result[0].fromid, result[0].toid, '', function(err, result){
                if(err){
                    loger.error('routes.msg.handle:' + err);
                    res.json({code: '001', msg: '内部错误'});
                }else{
                    res.json({code: '000', msg: '添加成功'});
                    dbQuery.query(msgsql.updateIsRead, [msgId], function(err, result){
                        if(!err){
                            //res.json({code: '000', msg: '添加成功'});
                        }else{
                            //res.json({code: '001', msg: '内部错误'});
                        }
                    });
                }
            })
        }
    });
});

module.exports = router;

