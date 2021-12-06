'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // json web token鉴权
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },

  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
};
