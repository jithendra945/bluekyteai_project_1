// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from './App';
import Signup from './Signup';
import Login from './Login';
import reportWebVitals from './reportWebVitals';

import './App.css';
import AddTask from './AddTask';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/add-task/:taskId" element={<AddTask />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
