'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // 用户登录、注册相关
  router.post('/user/login', controller.user.login);
  router.post('/user/crate', controller.user.create);
  router.post('/user/logout', app.jwt, controller.user.logout);

  // data
  router.resources('data', '/data', controller.data);
  router.resources('menu', '/menu', controller.menu);
};
