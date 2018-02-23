import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from "react-router-dom";
import Home from './page/home';
import About from './page/about';
import 'todomvc-app-css/index.css'


const App = () => <HashRouter>
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
  </Switch>
</HashRouter>;



ReactDOM.render(<App />, document.getElementById('root'));