var express = require('express');
var router = express.Router();
var userSQL = require('../db/usersql');
var query = require('../db/queryUtils');
var msgService = require('../service/msgService');

var log4js = require('../service/logService');
var log = log4js.getLogger();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.use('/find', function(req, res, next){
  if(req.body.id){
    query.query(userSQL.getUserById, [req.body.id], function(err, result){
      if(err){
        log.error(err);
        res.send({code: '001', msg: '系统错误'});
      }else{
        var json = {code:'000',msg:'',list:result};
        res.send(json);
      }
    });
  }else{
    res.render("./demo/find");
  }
});

router.use('/addFriend', function(req, res, next){
//fromid, toid, type, content, isRead, callback
    msgService.addMsg(req.session.userId, req.body.toid, '01', '', '0', function(err, result){
      if(err){
        log.error('routes/users/addFriend:' + err);
      }else{
        res.json({code: '000', msg: '请求成功'});
      }
    });
});

module.exports = router;
