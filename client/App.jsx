// Top level React component (wrapper class)
import React from "react";
import Main from "./containers/Main.jsx";
import Home from "./containers/Home.jsx";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
// TODO: Understand correct router syntax (should it be wrapping the app component and the switch component?)

const App = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/home' component={Home} />
      </Switch>
    </Router>
  );
};
export default App;
