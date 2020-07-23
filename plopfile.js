/*
 * @Author: yqj
 * @Date: 2020-07-23 10:57:15
 * @LastEditTime: 2020-07-23 14:05:39
 * @Description: 
 */ 

const { componentGenerator, pageGenerator } = require('./generator/index.js');
module.exports = (plop)=>{
  plop.setGenerator('创建组件', componentGenerator)
  plop.setGenerator('创建页面', pageGenerator)
}