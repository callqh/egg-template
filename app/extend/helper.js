'use strict';

const bcrypt = require('bcryptjs');
module.exports = {
  // 加密
  encrypt(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  },
  // 密码对比
  compare(password, hash) {
    return bcrypt.compareSync(password, hash);
  },
  // 将字符串转换为int类型
  toInt(str) {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
  },
  // 过滤掉query中的limit字段
  filterLimit(data) {
    if (!data) return data;
    const result = {};
    for (const prop in data) {
      if (prop !== 'limit' && prop !== 'offset') {
        result[prop] = data[prop];
      }
    }
    return result;
  },
};
