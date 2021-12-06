'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  success(data) {
    this.ctx.body = {
      code: 200,
      data,
      msg: 'success',
    };
  }
  fail(code, msg) {
    code = code || 404;
    msg = msg || 'not found';
    this.ctx.body = {
      code,
      msg,
    };
  }
}

module.exports = BaseController;
