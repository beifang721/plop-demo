import React, { useState, useEffect, memo } from 'react';
import { Message } from '../../components';

import api from '../../api';

import './index.scss';

const Page01 = memo(
  function Page01 (props){


    useEffect(() => {
      const page01Api = async(data='') => {
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
      // page01Api();
    }, []);


    return (
      <div className='page01_box'>
        page01页面
      </div>
    )

  }
)

export default Page01;