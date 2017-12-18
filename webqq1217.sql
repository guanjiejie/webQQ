/*
Navicat MySQL Data Transfer

Source Server         : wampsql
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : webqq

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2017-12-17 19:18:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `webqq_friends`
-- ----------------------------
DROP TABLE IF EXISTS `webqq_friends`;
CREATE TABLE `webqq_friends` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `friendid` varchar(1800) DEFAULT NULL COMMENT '好友ID',
  `groupingid` int(3) DEFAULT NULL COMMENT '好友所属分组ID',
  `createtime` varchar(20) DEFAULT NULL,
  `updatetime` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  CONSTRAINT `webqq_friends_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `webqq_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of webqq_friends
-- ----------------------------
INSERT INTO `webqq_friends` VALUES ('1', '10001', '10002', '1', null, null);
INSERT INTO `webqq_friends` VALUES ('2', '10002', '10001', '2', null, null);
INSERT INTO `webqq_friends` VALUES ('3', '10001', '10003', '3', null, null);
INSERT INTO `webqq_friends` VALUES ('7', '10003', '10001', '1', null, null);
INSERT INTO `webqq_friends` VALUES ('8', '10001', '10002', '1', null, null);
INSERT INTO `webqq_friends` VALUES ('9', '10001', '10002', '1', null, null);

-- ----------------------------
-- Table structure for `webqq_grouping`
-- ----------------------------
DROP TABLE IF EXISTS `webqq_grouping`;
CREATE TABLE `webqq_grouping` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `userid` int(5) DEFAULT NULL COMMENT '用户ID',
  `groupname` varchar(20) DEFAULT NULL COMMENT '分组名称',
  `createtime` varchar(20) DEFAULT NULL,
  `updatetime` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  CONSTRAINT `webqq_grouping_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `webqq_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of webqq_grouping
-- ----------------------------
INSERT INTO `webqq_grouping` VALUES ('1', '10000', '我的好友', null, null);
INSERT INTO `webqq_grouping` VALUES ('3', '10001', '分组2', null, null);
INSERT INTO `webqq_grouping` VALUES ('4', '10001', '新的分组', null, null);

-- ----------------------------
-- Table structure for `webqq_msg`
-- ----------------------------
DROP TABLE IF EXISTS `webqq_msg`;
CREATE TABLE `webqq_msg` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `fromid` varchar(5) DEFAULT NULL COMMENT '发送方',
  `toid` varchar(5) DEFAULT NULL COMMENT '接受方',
  `type` varchar(2) DEFAULT NULL COMMENT '消息内容，01：好友请求；02：聊天信息',
  `content` varchar(200) DEFAULT NULL COMMENT '消息内容',
  `createtime` varchar(20) DEFAULT NULL COMMENT '创建时间',
  `updatetime` varchar(20) DEFAULT NULL COMMENT '更新时间',
  `isRead` int(1) DEFAULT '0' COMMENT '是否已读，0：未处理；1：已处理',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of webqq_msg
-- ----------------------------
INSERT INTO `webqq_msg` VALUES ('17', '10001', '10002', '01', '', '2017-12-15 10:32:22', null, '1');

-- ----------------------------
-- Table structure for `webqq_user`
-- ----------------------------
DROP TABLE IF EXISTS `webqq_user`;
CREATE TABLE `webqq_user` (
  `id` int(5) NOT NULL AUTO_INCREMENT COMMENT '用户ID\r\n',
  `nickname` varchar(16) DEFAULT NULL COMMENT '昵称',
  `username` varchar(16) DEFAULT NULL COMMENT '姓名',
  `age` int(3) DEFAULT NULL COMMENT '年龄',
  `sign` varchar(200) DEFAULT NULL COMMENT '个性签名',
  `avatar` varchar(200) DEFAULT NULL COMMENT '头像地址',
  `phone` varchar(15) DEFAULT NULL COMMENT '手机号码',
  `password` varchar(15) DEFAULT NULL COMMENT '密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10004 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of webqq_user
-- ----------------------------
INSERT INTO `webqq_user` VALUES ('10000', null, null, null, null, null, null, null);
INSERT INTO `webqq_user` VALUES ('10001', '知足常乐', '关关关', '18', '这是一个签名，哈哈', null, '17612155550', '123456');
INSERT INTO `webqq_user` VALUES ('10002', 'test', null, null, '俺是用户222，哈哈', null, null, '123456');
INSERT INTO `webqq_user` VALUES ('10003', '3号', null, null, '大家好，我是3号', null, null, '123456');
