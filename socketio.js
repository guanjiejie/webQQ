/**
 * Created by Administrator on 2017-11-23.
 */
/*
 封装socket.io,为了获取server以便监听.
 2016年8月8日10:28:24
 */
var socketio = {};
var socket_io = require('socket.io');

var msgService = require('./service/msgService');


var io ;
//获取io
socketio.getSocketio = function(server){

    io = socket_io.listen(server);
    var user = {};

    io.on('connection', function (socket) {
        console.log('连接成功');
        socket.on('click1',function(){
            console.log('监听点击事件');
            var datas = [1,2,3,4,5];
            socket.emit('click2', {datas: datas});
            socket.broadcast.emit('click2',  {datas: datas});
        });
        socket.on('msg', function(data){
            if(user[data.to.id]){
                msgService.addMsg(data.mine.id, data.to.id, '02', data.mine.content, '1', function(err, result){
                    if(err){
                        console.log(err);
                        socket.emit('notice', {code: '001',msg: '消息发送失败！'});
                    }else{
                        io.sockets.sockets[user[data.to.id]].emit("msg", data);
                        socket.emit('notice', {code: '000',msg: '消息发送成功！'});
                    }
                })
            }else{
                msgService.addMsg(data.mine.id, data.to.id, '02', data.mine.content,  '0', function(err, result){
                    if(err){
                        console.log(err);
                        socket.emit('notice', {code: '001',msg: '消息发送失败！'});
                    }else{
                        socket.emit('notice', {code: '000',msg: '消息发送成功！'});
                    }
                });
            }
            });
        socket.on("register", function(id){
            user[id] = socket.id;
        });
    });


};

function sendMsg(socketid, msg){
    io.sockets.sockets(socketid).emit("msg", msg);
}

module.exports = socketio;