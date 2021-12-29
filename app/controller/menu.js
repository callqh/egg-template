'use strict';

const BaseController = require('./BaseController');

class MenuController extends BaseController {
  /**
   * 查询数据
   * @接口格式 /menu
   * @请求方法 GET请求
   * @example /menu?limit=10&...
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
      const data = await ctx.model.Menu.findAll(query);
      const result = [];
      const m = new Map();
      data.forEach(item => {
        const obj = { ...item.dataValues };
        obj.children = [];
        m.set(item.id, obj);
        if (item.p_id === 0) {
          result.push(obj);
        }
        if (m.has(item.p_id)) {
          m.get(item.p_id).children.push(item);
        }
      });
      this.success(result);
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
      const list = await ctx.model.Menu.findByPk(id);
      this.success(list);
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
      const user = await ctx.model.Menu.create(body);
      this.success(user);
    } catch (err) {
      this.fail(500, err);
    }
  }

  /**
   * 更新
   * @接口格式 /menu/id
   * @请求方法 PUT请求
   */
  async update() {
    const ctx = this.ctx;
    const id = ctx.helper.toInt(ctx.params.id);
    try {
      const data = await ctx.model.Menu.findByPk(id);
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
   * @接口格式 /menu/id
   * @请求方法 DELETE请求
   */
  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.toInt(ctx.params.id);
    try {
      const user = await ctx.model.Menu.findByPk(id);
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
module.exports = MenuController;
