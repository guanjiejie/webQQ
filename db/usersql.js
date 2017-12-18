/**
 * Created by Administrator on 2017-11-28.
 */
var UserSQL =
{
    //用户自定义id和昵称，添加用户
    insert: 'INSERT INTO webqq_user(id, nickname) VALUES (?, ?)',
    queryALL: 'SELECT * FROM webqq_user',
    //查询用户普通信息
    getUserById: 'SELECT id, nickname,age,sign,avatar FROM webqq_user WHERE id = ?',
    //查询用户所有信息
    getUserInfoById: 'SELECT id,nickname,username,age,sign,avatar,phone FROM webqq_user WHERE id = ?',
    //用密码验证用户
    userLoginByPassword: 'SELECT id,nickname,age,sign,avatar FROM webqq_user  WHERE id = ? and password = ?',
};

module.exports = UserSQL;