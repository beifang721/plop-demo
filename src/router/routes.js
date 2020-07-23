/*
 * @Author: yqj
 * @Date: 2020-07-23 10:06:02
 * @LastEditTime: 2020-07-23 17:07:12
 * @Description: 
 */ 

import DemoA from '../pages/demoA';

 

import Page01 from "../pages/Page01";
const routes = [
  {
    path: '/',
    components: DemoA,
    exact: true,
    name: 'DemoA',
    isLink: true
  },




  {
    path: '/page01',
    components: Page01,
    name: 'page01',
    isLink: true
  },
]

    


export default routes;