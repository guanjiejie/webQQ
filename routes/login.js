/**
 * Created by Administrator on 2017-11-28.
 */
var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/usersql');
var log4js = require('../service/logService');
var logger = log4js.getLogger();

var pool = mysql.createPool(dbConfig.mysql);

var responseJSON = function (res, ret, flag) {
    if (flag) {
        res.json({code: '000', msg: ret});
    } else {
        res.json({code: '-200', msg: ret});
    }
}

router.get('/', function (req, res, next) {
    res.render('./demo/login');
});


router.get('/addUser', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        connection.query(userSQL.insert, [req.body.id, req.body.nickname], function (err, result) {
            if (result) {
                result = '添加成功';
            }
            responseJSON(res, result);
            connection.release();
        })
    })
});

router.use('/login', function (req, res, next) {
    var param = req.query || req.params;
    var id = req.body.id;
    var password = req.body.password;
    if (typeof id === 'undefined' || id === '') {
        res.send({code: '001', msg: '请输入账号'});
        return;
    } else if (typeof password === 'undefined' || password === '') {
        res.send({code: '001', msg: '请输入密码'});
    }
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log(err);
            console.log(typeof err);
            // responseJSON(res, ret);
            logger.error("routes.login.login:" + err);
            //res.json(err);
            res.json({code: '001', msg: '系统错误'});
            return;
        }
        connection.query(userSQL.userLoginByPassword, [id, password], function (err, result) {
            if (err) {
                console.log(err);
                console.log(typeof err);
               // responseJSON(res, ret);
                logger.error("routes.login.login:" + err);
                res.json({code: '001', msg: '系统错误'});
            }
            if (result.length == 0) {
                result = "账号或密码错误";
                res.json({code: '001', msg: '账号或密码错误'});
                connection.release();
            } else {
                req.session.isLogin = true;
                req.session.userId = id;
                req.session.nickname = result[0].nickname;
                for (var r in result) {
                    delete r.password;
                }
                connection.release();
                //res.redirect('/?id=' + id);
                res.json({code: '000', msg: '登录成功'});
            }

        });
    });
});

module.exports = router;