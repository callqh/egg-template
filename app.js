'use strict';
const createCRUD = require('./script/index');

module.exports = app => {
  // 只在开发环境和测试环境有效
  if (app.config.env === 'local' || app.config.env === 'unittest') {
    app.beforeStart(async () => {
      await app.model.sync({ alert: true });
      createCRUD();
    });
  }
};
