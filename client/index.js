import React from 'react';
import { render } from 'react-dom';
// we will import APP
import App from './App.jsx'
import { BrowserRouter as Router } from "react-router-dom";
import './stylesheets/styles.css';

render (
    <Router>
        <App/>
    </Router>,
    document.getElementById('root'),
);


