/**
 * Created by Administrator on 2017-12-07.
 */

var friendssql = {
    // 查询用户好友及分组信息
    queryfriendInfoByUserId: 'select b.id,b.nickname,b.sign,b.avatar,d.groupingid,c.groupname from (' +
    ' select * from webqq_user as a where a.id in( ' +
    'select friendid from webqq_friends where userid = ? or userid = "10000"' +
    ')' +
    ') as b ' +
    'LEFT JOIN webqq_friends as d on b.id = d.friendid' +
    ' LEFT JOIN webqq_grouping as c on d.groupingid = c.id ' +
    'where d.userid = ?',
    //当前默认添加进‘我的好友’分组
    addFriend: 'insert into `webqq_friends`(userid, friendid, groupingid )values (?, ?, ?);',
};

module.exports = friendssql;
