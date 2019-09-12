"use strict";

const log4js = require('log4js');
var path = require('path');
var baseLogPath = path.resolve(__dirname, '../log/files/log')
// console.log('__dirname', path.resolve(__dirname, '../log/files/log'))
// console.log('baseLogPath', baseLogPath)
// console.log('require.main.filename', require.main.filename)

class LogsFile {

  constructor() {
    /**
     * appenders的简单说明，详情请参考官方文档
     * stdout,out,err 都是自定义参数名
     * type : 'dateFile' 记录日志文件的类型，一定要注意 大小写敏感，不然在linux系统将会报错
     * pattern : 日志文件名的格式
     *
     * categories 作为getLogger方法的键名对你应
     */
    log4js.configure({
      appenders: {
        stdout: {
          type: 'stdout'
        }, //声明此属性可在控制台上打印信息
        out: {
          type: 'dateFile',
          filename: baseLogPath,
          pattern: 'yyyyMMdd-out.log',
          "alwaysIncludePattern": true
        },
        err: {
          type: 'dateFile',
          filename: baseLogPath,
          pattern: 'yyyyMMdd-err.log',
          "alwaysIncludePattern": true
        }
      },
      categories: {
        default: {
          appenders: ['stdout', 'out'],
          level: 'trace'
        },
        error: {
          appenders: ['stdout', 'err'],
          level: 'error'
        }
      }
    });
  }

  createLogs(message, type) {
    if (type === 'success') {
      let logger_out = log4js.getLogger('app'); // 这个app参数值先会在categories中找，找不到就会默认使用default对应的appenders,信息会输出到yyyyMMdd-out.log
      logger_out.trace(JSON.stringify(message));
    } else {
      let logger_err = log4js.getLogger('error');
      logger_err.error(JSON.stringify(message));

      let logger_warn = log4js.getLogger('error'); // error参数值对应categories的error,信息会输出到yyyyMMdd-error.log
      logger_warn.warn(JSON.stringify(message));
    }
  }
}

module.exports = new LogsFile();