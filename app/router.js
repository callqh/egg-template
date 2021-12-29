'use strict';
/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;

  // jwt验证
  const jwt = app.middleware.jwt(app.config.jwt);

  router.get('/', controller.home.index);
  router.post('/user/login', controller.user.login);
  router.post('/user/create', controller.user.create);
  router.get('/user/logout', jwt, controller.user.logout);
  router.resources('menu', '/menu', jwt, controller.menu);
};
