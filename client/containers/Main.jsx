const regeneratorRuntime = require("regenerator-runtime");
import React from "react";
import Login from "../components/Login.jsx";

const Main = (props) => {
  return (
    <div id='Main' className='container'>
      <Login />
    </div>
  );
};
export default Main;