'use strict';

const BaseController = require('./BaseController');

class UserController extends BaseController {
  /**
   * 登录
   */
  async login() {
    try {
      const { ctx, app } = this;
      const { username, password } = ctx.request.body;
      if (!username || !password) {
        return this.fail(500, '用户名或者密码为空');
      }
      // 查找数据库中是否有该用户
      const user = await this.getUser(username);
      if (!user) {
        return this.fail(500, '用户不存在');
      }
      // 检查密码是否正确
      const checkPassword = this.ctx.helper.compare(password, user.password);

      if (checkPassword) {
        // 生成token
        const token = app.jwt.sign(
          {
            username,
          },
          app.config.jwt.secret,
          { expiresIn: '10000ms' }
        );
        this.success({ id: user.id, username: user.username, token });
      } else {
        this.fail(500, '密码错误');
      }
    } catch (err) {
      this.fail(err);
    }
  }
  /**
   * 注册
   */
  async create() {
    const ctx = this.ctx;
    const { password, username } = ctx.request.body;
    if (!password || !username) {
      this.fail(400, '请检查用户名或者密码是否为空');
      return;
    }
    const hasUser = await this.getUser(username);
    if (hasUser) {
      this.fail(500, '当前用户已经存在');
      return;
    }
    try {
      const user = await ctx.model.User.create({
        username,
        // 进行加密
        password: this.ctx.helper.encrypt(password),
      });
      this.success({
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        updatedAt: user.updatedAt,
        ceratedAt: user.createdAt,
      });
    } catch (err) {
      this.fail(500, err);
    }
  }
  // TODO 注销
  async logout() {
    // const { ctx } = this;

    this.success({});
  }

  // 查询用户是否存在
  async getUser(username, ...rest) {
    const { ctx } = this;
    const user = await ctx.model.User.findOne({
      where: {
        username,
        ...rest,
      },
    });
    return user;
  }
}
module.exports = UserController;
