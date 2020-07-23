<!--
 * @Author: yqj
 * @Date: 2020-07-22 20:33:15
 * @LastEditTime: 2020-07-23 14:14:43
 * @Description: 
--> 

### 安装依赖

```
cnpm install 或 yarn add
```

### 启动项目

```
npm start
```


### plop
---

#### 1.1 使用plop创建文件
运行 `npm run plop`即可找到`plopfile.js`入口文件。
```
yarn plop 或 npm run plop
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

#### 1.2 入口文件`plopfile.js`说明
在`plopfile.js` 配置了两种命令 <font color='#d453'>创建组件、创建页面</font>
```
// 引入命令的配置
const { componentGenerator, pageGenerator } = require('./generator/index.js');
module.exports = (plop)=>{
  plop.setGenerator('创建组件', componentGenerator)
  plop.setGenerator('创建页面', pageGenerator)
}
```

#### 1.3 `generator`目录结构

```
├ generators    // 生成器
  ├─component   // 创建组件相关
  ├─utils       // 工具函数
  ├─page        // 创建页面相关
  └─index.js    // 入口文件
```
**创建页面相关**



