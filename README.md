<!--
 * @Author: yqj
 * @Date: 2020-07-22 20:33:15
 * @LastEditTime: 2020-07-24 10:06:14
 * @Description: 
--> 

### 首先看下效果图：

![](https://user-gold-cdn.xitu.io/2020/7/23/1737af490c62a298?w=1305&h=683&f=gif&s=837643)
### 安装依赖

```
cnpm install 或 yarn add
```

### 启动项目

```
npm start
```


### Plop
---
#### 前言

在开发中，我们经常复制粘贴，复制完又删除，每天重复的劳动，枯燥且无聊。在vscode中我们可以通过基本的配置快捷键生成代码片段。一些基础的是可以的，但在项目中还是难以满足，因此动态生成基本配置是尤为重要的。`Plop.js`脚手架可以更好的自定义配置，通过命令快速创建基础模版。

#### 1、 Plop基础说明

**安装**
```
// 全局安装
npm i -g plop

// 本地安装
npm i --save-dev plop

```

**`package.json`配置脚本**
```
"scripts": {
  "plop": "plop"
}
```


**plop命令参数**
```
// 执行指定配置
plop 配置名称

// 执行指定配置并设置参数
plop 配置名称 输入参数

// 执行 plopfile 文件
--plopfile 文件路径

// 设置工作路径
--cwd

// 帮助
-h, --help

// 全局初始化
-i, --init

// 显示版本
-v, --version
```


**在项目的根目录创建`plopfile.js`入口文件**

```
// 执行npm run plop 默认将该文件作为执行入口
module.exports = (plop)=>{}
```
plop参数是一个对象，包含了`generator`的api，我主要用到的是`setGenerator`。

`setGenerator(name, config)` name: 生成器的名字 config: 生成器配置信息

```
module.exports = function (plop) {
    // controller generator
    plop.setGenerator('controller', {
        description: 'application controller logic',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'controller name please'
        }],
        actions: [{
            type: 'add',
            path: 'src/{{name}}.js',
            templateFile: 'plop-templates/controller.hbs'
        }]
    });
}
```

**config参数** 
- description `string` 描述生成器的行为
- prompts `Array<Object>` 命令行交互配置 [相关配置](https://github.com/SBoudrias/Inquirer.js#inquirerregisterpromptname-prompt)
  
  * type `string` 交互类型 `input` `confirm` `list` `checkbox` 等
  * name `string` 存储当前问题的变量
  * message `string` 问题描述
  * default 默认值
  * validate 对当前的回答验证
  * when `Function` 根据前面的问题，判断当前问题是否被回答
- actions `Function(data)/Array<Object>` [相关配置](https://plopjs.com/documentation/#interface-actionconfig)

  * type `string` 动作的类型 `add(新增文件)` `append(在某个位置插入)` `modify(修改文件)` 
  * data 返回给模版的数据
  * path 操作的路径
  * template 模版
  * templateFile 模版文件路径(包含template)

 模版是基于参考：[Handlebars](https://handlebarsjs.com/zh/guide/#%E4%BB%80%E4%B9%88%E6%98%AF-handlebars%EF%BC%9F)


#### 2、 plop实战

**入口文件`plopfile.js`说明**

在`plopfile.js` 配置了两种命令 <font color='#d453'>创建组件、创建页面</font>
```
// 引入命令的配置
const { componentGenerator, pageGenerator } = require('./generator/index.js');
module.exports = (plop)=>{
  plop.setGenerator('创建组件', componentGenerator)
  plop.setGenerator('创建页面', pageGenerator)
}
```

**`generator`目录结构**

```
├ generators    // 生成器
  ├─component   // 创建组件相关
  ├─utils       // 工具函数
  ├─page        // 创建页面相关
  └─index.js    // 入口文件
```


**page 创建页面的相关配置:**

  先了解目录配置，以便明白下面命令交互

  <img width=400 src='https://user-gold-cdn.xitu.io/2020/7/23/1737b37e3fd8f3b0?w=788&h=870&f=jpeg&s=61326'/>
  
  顶部的`gif`，就是用`Plop`**生成页面**的效果图!!!

  **`index.js`入口文件:** 

该配置毕竟复杂，一步一步的分析也是很容易理解的。

根据每个问题(message)解读prompts和actions:

1.  请输入 `page` 文件夹名称! 

    在询问中，添加了重名验证，输入不对会有相关提示， 输入的名称保存至`dir`变量中。

2.  是否创建scss文件?

    用户选择创建scss文件，选择结果是`Boolean`保存在`hasScss`变量中。

3.  是否导入api?

    同2。作用：顶部是否导入封装好的Api（benApi没有做封装）。

4.  是否增加link?

    同2。作用：导航中是否现实。

5.  是否创建components文件夹?

    同2。作用：页面是否生成components文件夹。
    
创建页面相关代码：   
```
 // generator/page/index.js
  // 验证组件是否已经存在
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
      message: '是增加link?'
    },
    {
      type: 'confirm',
      name: 'hasComponents',
      default: true,
      message: '是否创建components文件夹?'
    },
  ],
  actions: (data)=>{
    // data就是上述问题数据，  name作为属性
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
        pattern: /(?=(const))/,  //匹配 const在前面插入
        path: './src/router/routes.js',
        template: 'import {{ properCase dir }} from "../pages/{{properCase dir}}";\n'
    })
    
    actions.push({
      type:'append',
      pattern: /(?=(\]))/, //匹配 ] 在前面插入
      path: './src/router/routes.js',
      templateFile: 'generator/page/router.hbs'
    })
    return actions;
  }
}
```

其中 `properCase` 将 `dir` 转为大驼峰的格式，常用的关键词：
  -  `camelCase`：changeFormatToThis 小驼峰
  -  `properCase`：ChangeFormatToThis 大驼峰
  -  `snakeCase`: change_format_to_this 下划线分割

更多请参考相关[文档](https://github.com/plopjs/plop#case-modifiers)    
    
**模版文件**



 ```
 // ./generator/page/page.hbs 入口文件
 import React, { useState, useEffect, memo } from 'react';
import { Message } from '../../components';

{{#if hasApi}}
import api from '../../api';
{{/if}}

{{#if hasScss}}
import './index.scss';
{{/if}}

const {{ properCase dir }} = memo(
  function {{ properCase dir }} (props){


    {{#if hasApi}}
    useEffect(() => {
      const {{ camelCase dir }}Api = async(data='') => {
        try {

          const { data, status, message } = await api('');

          if (status === 1000) {
            // do something
          } else {
            Message.error(message)
          }
        } catch (error) {

        }
      }
      // {{ camelCase dir }}Api();  //请求api
    }, []);
    {{/if}}


    return (
      <div{{#if hasScss}} className='{{snakeCase dir}}_box'{{/if}}>
        {{ dir }}页面
      </div>
    )

  }
)

export default {{ properCase dir }};

 ```
 完整的示例请参考[项目地址]()顺便求个star

### 写在最后
上述的只是作为一个简单的配置，实战中可以根据项目的特点制定模版，可以大大的提升开发效率。如果您看完后，觉得游泳池欢迎点赞，谢谢！！！

参考：
[Plop](https://plopjs.com/documentation/#using-prompts)
[Inquirer](https://github.com/SBoudrias/Inquirer.js)
[handlebar](https://handlebarsjs.com/zh/guide/)
[前端工程化之plop的使用](https://blog.csdn.net/u012733501/article/details/106858603)






