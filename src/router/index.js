/*
 * @Author: yqj
 * @Date: 2020-07-23 09:45:06
 * @LastEditTime: 2020-07-23 13:15:41
 * @Description: 
 */
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import routes from './routes';

export default function () {
  return (
    <>
      <Router>
        <div>
          {
            routes.map((item, key) => {
              if (item.isLink) {
                return  <Link style={{marginLeft:10}} to={item.path} key={key}>{item.name}</Link>
              }
            })
          }
          {
            routes.map((item, key) => {
              if (item.exact) {
                return <Route key={key} exact path={item.path} component={item.components} />
              } else {
                return <Route key={key} path={item.path} component={item.components} />
              }
            })
          }
        </div>
      </Router>
    </>
  )
}