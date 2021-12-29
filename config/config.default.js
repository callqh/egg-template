/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});
  config.keys = appInfo.name + '_1638434639777_3997';
  config.middleware = [];

  config.jwt = {
    secret: 'terminus_fe_1638845188542',
  };

  // 配置接口请求间隔
  config.limit = {
    interval: 1000,
  };

  config.session = {
    key: 'TRANTOR_EGG',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
  };

  // 开启中间件
  config.middleware = ['limit'];

  // 安全配置 （https://eggjs.org/zh-cn/core/security.html）
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    // 允许访问接口的白名单
    domainWhiteList: [],
  };
  // 需要配置sequelize选项连接本地数据库
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    password: 'wofule',
    database: 'database_development',
  };
  // 错误处理
  config.onerror = {};
  return {
    ...config,
  };
};
