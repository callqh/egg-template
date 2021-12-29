'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Menu = app.model.define('menu', {
    // 默认id为int类型，主键，自增
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    /** ====== 删除字段会将数据库中对应字段的数据也删除，属于危险操作，请三思而后行 ======= */
    /** ====== 此处新增字段 ======= */
    title: STRING(32),
    auth: INTEGER,
    level: INTEGER,
    url: STRING(32),
    path: STRING(255),
    p_id: INTEGER,
  });

  return Menu;
};
