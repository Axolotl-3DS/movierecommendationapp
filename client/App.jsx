// Top level React component (wrapper class)
import React from "react";
import Main from "./containers/Main.jsx";
import Home from './containers/Home.jsx';
import { Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Main}/>
                <Route exact path='/home' component={Home}/>
            </Switch>
        </Router>
    ); 
}
export default App;