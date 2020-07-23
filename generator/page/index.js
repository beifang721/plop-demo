/*
 * @Author: yqj
 * @Date: 2020-07-23 11:01:41
 * @LastEditTime: 2020-07-23 18:44:30
 * @Description: 
 */ 

const componentExist = require('../utils/index.js');

module.exports = {
 description: '创建page页面',
 prompts:[
   {
     type: 'input',
     name: 'dir',
     message: '请输入 page 文件夹名称!',
     validate: value => {
       if ((/.+/).test(value)) {
         return componentExist(value) ? '组件名 或 page名已经存在' : true
       }
       return '请输入page 文件夹名称'
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
   {
     type: 'confirm',
     name: 'hasLink',
     default: true,
     message: '是否增加link?'
   },
   {
     type: 'confirm',
     name: 'hasComponents',
     default: true,
     message: '是否创建components文件夹?'
   },
 ],
 actions: (data)=>{
   const { dir, hasScss, hasApi, hasComponents, hasLink } = data;
   const actions = [];
   
   actions.push({
     type:'add',
     path: './src/pages/{{properCase dir}}/index.js',
     templateFile: 'generator/page/page.hbs'
   })

   if(hasScss) {
     actions.push({
       type:'add',
       path: './src/pages/{{properCase dir}}/index.scss',
       templateFile: 'generator/page/page.scss.hbs'
     })
   }

   if(hasComponents){
     actions.push({
       type:'add',
       path: './src/pages/{{properCase dir}}/components/.gitkeep',
     })
   }
   
   // routes.js文件 增加路由
   actions.push({
      type:'append',
      pattern: /(?=(const))/,
      path: './src/router/routes.js',
      template: 'import {{ properCase dir }} from "../pages/{{properCase dir}}";\n'
   })
   
   actions.push({
     type:'append',
     pattern: /(?=(\]))/,
     path: './src/router/routes.js',
     templateFile: 'generator/page/router.hbs'
   })

   return actions;
 }
}