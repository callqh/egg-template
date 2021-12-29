'use strict';

module.exports = options => {
  return async function jwt(ctx, next) {
    const token = ctx.request.header.authorization;

    if (token) {
      // 前端传过来是Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoieGl...
      // 我们只需要后面的token不需要bearer
      const tokenStr = token.split(' ')[1];
      try {
        // 解码token并存储到session中
        const decode = ctx.app.jwt.verify(tokenStr, options.secret);
        ctx.username = decode.username;

        if (ctx.session.jwt_token[decode.username]) {
          await next();
        } else {
          ctx.status = 401;
          ctx.body = {
            code: 401,
            msg: 'token失效',
          };
          return;
        }
      } catch (error) {
        ctx.status = 500;
        ctx.body = {
          code: 500,
          msg: error.message,
        };
        return;
      }
    } else {
      ctx.status = 200;
      ctx.body = {
        code: 401,
        msg: '用户未登录，未携带对应token',
      };
      return;
    }
  };
};
