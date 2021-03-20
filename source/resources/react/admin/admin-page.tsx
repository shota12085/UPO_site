import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Admin } from './components/admin';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Admin />, document.getElementById('admin'));
});