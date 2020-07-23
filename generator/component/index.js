/*
 * @Author: yqj
 * @Date: 2020-07-23 11:20:45
 * @LastEditTime: 2020-07-23 18:18:43
 * @Description: 
 */ 
const componentExist = require('../utils/index.js');

module.exports = {
  description: '创建全局组件或局部组件',
  prompts:[
    {
      type: 'list',
      name: 'type',
      suffix:'global(全局组件)，part(局部组件)',
      choices:[
        'part',
        'global',
      ]
    },
    {
      type: 'input',
      name: 'dir',
      message: '请输入page文件夹名称(组件所在的page)!',
      when: data=>{
        console.log(data);
        return data.type === 'part'
      },
      validate: value=> {
        if (!(/.+/).test(value)) {
          return '请输入page名称'
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'componentName',
      message: '请输入组件名称!',
      validate: value => {
        if ((/.+/).test(value)) {
          return componentExist(value) ? '组件名 或 page名已经存在' : true
        }
        return '请输入组件名称'
      }
    },
    {
      type: 'confirm',
      name: 'hasScss',
      default: true,
      message: '是否创建scss文件?'
    },
    {
      type: 'confirm',
      name: 'hasApi',
      default: true,
      message: '是否导入api?'
    },
  ],
  actions: (data) => {
    const { type, dir, hasApi, hasScss } = data;
    const actions =[];
    let tempPath = './src/components/{{ properCase componentName }}';

    if(type === 'part'){ //局部组件
      tempPath = './src/pages/{{ dir }}/components/{{ properCase componentName }}'
    }
    if (hasScss) { // 创建scss
      actions.push({
        type:'add',
        path: `${tempPath}/{{ properCase componentName }}.scss`,
        templateFile: 'generator/component/component.scss.hbs'
      })
    }
    actions.push({
      type:'add',
      path: `${tempPath}/{{ properCase componentName }}.js`,
      templateFile: 'generator/component/component.hbs'
    })
    return actions;
  }
}