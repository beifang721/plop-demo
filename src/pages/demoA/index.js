/*
 * @Author: yqj
 * @Date: 2020-07-23 09:45:45
 * @LastEditTime: 2020-07-23 10:44:16
 * @Description: 
 */ 
import React, { useState, memo } from 'react';

import api from '../../api';

import  './index.scss';

const DemoA = memo(
  function DemoA(props) {
    
    return (
      <div className='demo_box'>
        DemoA 页面
      </div>
    )

  }
)

export default DemoA;