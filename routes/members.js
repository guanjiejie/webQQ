/**
 * Created by Administrator on 2017-11-27.
 */
var express = require('express');
var router = express.Router();
var dbQuery = require('../db/queryUtils');
var userSQL = require('../db/usersql');
var friendssql = require('../db/friendssql');
var friendService = require('../service/friendService');

router.get('/mine', function (req, res, next) {
    /*res.header("Access-Control-Allow-Origin", "*");*/
    var userId = req.session.userId;
    var userInfo;
    var json = {data: {}};
    dbQuery.query(userSQL.getUserInfoById, [userId], function (err, result) {
        if (result.length > 0) {
            delete result[0].password;
            userInfo = result[0];
            userInfo.username = userInfo.nickname;
            json.data.mine = userInfo;

            dbQuery.query(friendssql.queryfriendInfoByUserId, [userId, userId], function (err, result) {
                console.log(result);
                if (result.length > 0) {
                    var friend = [];
                    var t = 0;

                    result[0].username = result[0].nickname;
                    friend[0] = {};
                    //friend[0].username = result[0].nickname;
                    friend[0].id = result[0].groupingid;
                    friend[0].groupname = result[0].groupname;
                    friend[0].list = [];
                    friend[0].list.push(result[0]);
                    for (var i = 1; i < result.length; i++) {
                        if (result[i].groupingid == friend[t].id) {
                            friend[t].list.push(result[i]);
                        } else {
                            t++;
                            friend[t] = {};
                            result[i].username = result[i].nickname;
                            friend[t].id = result[i].groupingid;
                            friend[t].groupname = result[i].groupname;
                            friend[t].list = [];
                            friend[t].list.push(result[i]);
                        }
                    }
                    json.data.friend = friend;
                }
                json.code = "000";
                json.msg = '';
                res.send(JSON.stringify(json));
            });
            /*       var json = {
             "code": 0 //0表示成功，其它表示失败
             , "msg": "" //失败信息
             , "data": {

             //我的信息
             "mine": {
             "username": userInfo.nickname //我的昵称
             , "id": userInfo.userId //我的ID
             , "status": "online" //在线状态 online：在线、hide：隐身
             , "sign": userInfo.sign //我的签名
             , "avatar": userInfo.avatar //我的头像
             }
             //好友列表
             , "friend": [{
             "groupname": "前端码" //好友分组名
             , "id": 1 //分组ID
             , "list": [{ //分组下的好友列表
             "username": "贤心" //好友昵称
             , "id": "10002" //好友ID
             , "avatar": "a.jpg" //好友头像
             , "sign": "这些都是测试数据，实际使用请严格按照该格式返回" //好友签名
             , "status": "online" //若值为offline代表离线，online或者不填为在线
             }]
             }]

             //群组列表
             , "group": [{
             "groupname": "前端群" //群组名
             , "id": "101" //群组ID
             , "avatar": "a.jpg" //群组头像
             }]
             }
             };*/


        }
    });
});

router.use('/addFriend', function(req, res, next){
    console.log("44");
    friendService.addFriend(req.body.fromid, req.body.toid, '', function(err, result){
        if(err){
            console.log(err);
            res.json({code: '001', msg: '内部错误'});
        }else{
            res.json({code: '000', msg: '添加成功'});
        }
    })


   /* query(friendssql.addFriend, [req.body.fromid, req.body.toid], function(err, result){
        if(err){
            res.json({code: '001', msg: '添加失败'});
        }else{
            res.json({code: '000', msg: '添加成功'});
        }
    })*/
});


//   res.send(JSON.stringify(json));

module.exports = router;