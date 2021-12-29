'use strict';

module.exports = options => {
  return async function limit(ctx, next) {
    // 获取设置的事件间隔
    const now = Date.now();
    const limit_interval = options.interval;
    const limit_list = ctx.session.limit;
    const url = ctx.originalUrl.split('?')[0];

    if (limit_list && limit_list[url]) {
      ctx.session.limit = {
        [ctx.originalUrl]: now,
      };
      if (now - limit_list[url] < limit_interval) {
        ctx.status = 500;
        ctx.body = {
          msg: '请求过于频繁，请稍后尝试',
          code: 500,
        };
        return;
      }
    }
    ctx.session.limit = {
      [ctx.originalUrl]: now,
    };
    await next();
  };
};
