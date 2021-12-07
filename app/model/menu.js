'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Menu = app.model.define('menu', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING(30),
    level: INTEGER,
    describe: STRING(255),
    created_at: DATE,
    updated_at: DATE,
  });

  return Menu;
};
