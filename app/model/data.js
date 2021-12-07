'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Data = app.model.define('data', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING(30),
    describe: STRING(255),
    created_at: DATE,
    updated_at: DATE,
  });

  return Data;
};
