
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
  Detail,
  Home,
  MyList
} from './views'

function App() {
  return (
    <Router>
      <div className='navbar'><Link to="/">Home</Link><Link to="/myPokemon">My Pokemon</Link></div>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/detail/:name">
          <Detail />
        </Route>
        <Route path="/myPokemon">
          <MyList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
