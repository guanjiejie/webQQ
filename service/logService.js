/**
 * Created by Administrator on 2017-12-13.
 */

var log4js = require('log4js');

log4js.configure({
    appenders: {
        general: {
            type: 'dateFile',
            filename: './log/logs.log'
        }
    },
    categories: {
        default: {
            appenders: ['general'], level: 'debug'
        }
    }
});

module.exports = log4js;

