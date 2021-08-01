import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import Login from "../components/Login.jsx";




 
// Here we will later import our sub components

// This should house the entry point of the app - the login page
const Main = (props) => {
    return (
    <div id="Main">
        <Login />
    </div>
    );
};
export default Main;