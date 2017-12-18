/**
 * Created by Administrator on 2017-12-06.
 */

var msgSQL = {
    //查找用户的消息
    queryList : 'SELECT  m.id, m.fromid, m.toid, m.type, m.content, m.isRead, u.nickname, u.avatar FROM webqq_msg m ' +
        'LEFT JOIN webqq_user u on m.fromid = u.id' +
        ' where toid = ? and type = ?',
    //使用id查询信息
    queryMsg : 'SELECT * from webqq_msg where id = ?',
    //更新信息状态
    updateIsRead : 'UPDATE webqq_msg SET isRead = 1 where id = ?',
    addMsg : 'INSERT INTO webqq_msg(fromid, toid, type, content, createtime, isRead) value (?, ?, ?, ?, ?, ?)',
}

module.exports = msgSQL;
