const regeneratorRuntime = require("regenerator-runtime");
const axios = require("axios");

import React, { useState, useEffect } from "react";
import { ReactDOM } from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
// import '../stylesheets/styles.css';

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [failed, setFailed] = useState(false);
  const [registered, setRegistered] = useState(false);
  // may need a few more for page behavior
  useEffect(() => {
    console.log(username, password);
    console.log("isLoggedIn state: ", isLoggedIn);
  });

  // right dummy code for sign in / create account buttons
  // for now, just send us to the home page
  async function onLoginClick() {
    await axios
      .post("/login", {
        username,
        password,
      })
      .then((res) => {
        console.log(res);
        if (res.data === "success") {
          setIsLoggedIn(true); //redirect us
        } else {
          // throw component error
          setIsLoggedIn(false);
          setFailed(true);
        }
      });
  }
  async function onRegisterClick() {
    // check agains the data base if this is a valid username / password pair
    await axios
      .post("/login/signup", {
        username,
        password,
      })
      .then((res) => {
        console.log(res);
        // if (res) {
        //     console.log('Registration successful', res)
        // }
        // else {
        //     // throw component error
        //     setIsLoggedIn(false);
        //     setFailed(true);
        // }
      })
      .catch((err) => console.log(err));
  }

  async function googleClick() {
    try {
      await fetch("/auth/google");
    } catch (err) {
      console.log(`googleclick: ${err}`);
    }
  }

  // conditional rendering - if failed is true, render a warning popup
  if (!isLoggedIn) {
    return (
      <div>
        <h1 className='title'>Recommend Me!</h1>
        <div id='logIn' className='textbox'>
          <input
            type='text'
            id='username'
            placeholder={"username"}
            onChange={(e) => setUsername(e.target.value)}
            className='textbox'></input>
          <div></div>
          <input
            type='text'
            id='password'
            placeholder={"password"}
            onChange={(e) => setPassword(e.target.value)}
            className='textbox'></input>
        </div>
        <div className='login' id='buttons'>
          <button className='buttons' id='logInButton' onClick={onLoginClick}>
            Sign in
          </button>
          <div> </div>
          <button className='buttons' id='signup' onClick={onRegisterClick}>
            Create new account
          </button>
          <button className='buttons' id='googleSignup' onClick={googleClick}>
            Create new account with Google
          </button>
        </div>
      </div>
    );
  } else {
    return <Redirect to='/home' />;
  }
}

export default Login;
