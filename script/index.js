'use strict';

const fs = require('fs-jetpack');
const path = require('path');
const template = require('./template');
const root = filepath => path.resolve(__dirname, `../app/${filepath}`);

/**
 * 生成文件
 * @param {*} name 文件名
 */
const createController = name => {
  fs.write(root(`controller/${name}`), template(name));
};

/**
 * 生成
 */
const createCRUD = () => {
  const controllerFileList = fs.list(root('controller'));
  const modelFileList = fs.list(root('model'));
  // 找出有哪些model没有生成接口
  const result = modelFileList.filter(
    item => !controllerFileList.includes(item)
  );
  // 生成对应的controller文件
  result.forEach(file => {
    createController(file);
  });
};

createCRUD();
// const getFile
module.exports = createCRUD;
