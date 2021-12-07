
'use strict';

const BaseController = require('./BaseController');

class dataController extends BaseController {
  /**
   * 查询数据
   * @接口格式 /data
   * @请求方法 GET请求
   * @example /data?limit=10&...
   */
  async index() {
    const { ctx } = this;
    const body = ctx.request.query;

    try {
      const query = {
        where: ctx.helper.filterLimit(body),
        limit: ctx.helper.toInt(body.limit),
        offset: ctx.helper.toInt(body.offset),
      };
      const data = await ctx.model.Data.findAll(query);
      this.success({ list: data });
    } catch (err) {
      this.fail(500, err);
    }
  }
  /**
   * 查询对应id数据
   * @接口格式 /data/id
   * @请求方法 GET请求
   */
  async show() {
    const ctx = this.ctx;
    const id = ctx.helper.toInt(ctx.params.id);
    try {
      const list = await ctx.model.Data.findByPk(id);
      this.success({ list });
    } catch (err) {
      this.fail(500, err);
    }
  }
  /**
   * 新增
   * @接口格式 /data
   * @请求方法 POST请求
   */
  async create() {
    const { ctx } = this;
    const body = ctx.request.body;
    try {
      const user = await ctx.model.Data.create(body);
      this.success(user);
    } catch (err) {
      this.fail(500, err);
    }
  }

  /**
   * 更新
   * @接口格式 /data/id
   * @请求方法 PUT请求
   */
  async update() {
    const ctx = this.ctx;
    const id = ctx.helper.toInt(ctx.params.id);
    try {
      const data = await ctx.model.Data.findByPk(id);
      if (!data) {
        this.fail(404, '没有查询到对应ID=id的数据');
        return;
      }
      const body = ctx.request.body;
      await data.update(body);
      this.success(data);
    } catch (err) {
      this.fail(500, err);
    }
  }

  /**
   * 删除
   * @接口格式 /data/id
   * @请求方法 DELETE请求
   */
  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.toInt(ctx.params.id);
    try {
      const user = await ctx.model.Data.findByPk(id);
      if (!user) {
        this.fail(404, '没有查询到对应ID=id的数据');
        return;
      }
      await user.destroy();
      this.success(user);
    } catch (err) {
      this.fail(500, err);
    }
  }
}
module.exports = dataController;
