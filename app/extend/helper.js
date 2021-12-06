'use strict';

const bcrypt = require('bcryptjs');
module.exports = {
  // 加密
  encrypt(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  },
  // 对比
  compare(password, hash) {
    return bcrypt.compareSync(password, hash);
  },
};
