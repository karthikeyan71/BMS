import React from 'react';
import ReactDOM from 'react-dom';
import Wrapper from './src/wrapper/wrapper';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Wrapper />
  </BrowserRouter>,
  document.getElementById('root')
)
