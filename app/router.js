'use strict';
/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;

  // jwt验证
  const jwt = app.middleware.jwt(app.config.jwt);

  router.get('/', controller.home.index);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/create', controller.user.create);
  router.get('/api/user/logout', jwt, controller.user.logout);
  router.resources('menu', '/api/menu', jwt, controller.menu);
};
