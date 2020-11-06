import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login } from "./Components/login";
import { Home } from "./Components/home";
import './App.css';


function App() {
  return (
    <div className="center">
      <Switch>
        <Route path='/' component={Login} exact  />
        <Route path='/home' component={Home}  />
      </Switch>
    </div>
  );
}

export default App;
