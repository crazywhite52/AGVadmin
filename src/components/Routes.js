import React from "react";
import { Route, Switch } from "react-router-dom";

import login from "./authlogin/Login";
import IndexPage from "./pages/Index"
import AGV001 from "./pages/AGV001";
import CancelProduct from './pages/CancelProduct';
import AGV003 from './pages/AGV003';
import AGV004 from './pages/AGV004';
import AGV005 from './pages/AGV005';
import AGV006 from './pages/AGV006';
import AGV007 from './pages/AGV007';
import AGV008 from './pages/AGV008';
import AGV009 from './pages/AGV009';
import AGV010 from './pages/AGV010';
import AGV011 from './pages/AGV011';
import AGV012 from './pages/AGV012';
import AGV012_2 from './pages/panel/TbAgv12_2'
class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={login} />
        <Route path="/Login" exact component={login} />
        <Route path="/index" exact component={IndexPage} />
        <Route path="/AGV001" exact component={AGV001} />
        <Route path="/AGV002" exact component={CancelProduct} />
        <Route path="/AGV003" exact component={AGV003} />
        <Route path="/AGV004" exact component={AGV004} />
        <Route path="/AGV005" exact component={AGV005} />
        <Route path="/AGV006" exact component={AGV006} />
        <Route path="/AGV007" exact component={AGV007} />
        <Route path="/AGV008" exact component={AGV008} />
        <Route path="/AGV009" exact component={AGV009} />
        <Route path="/AGV010" exact component={AGV010} />
        <Route path="/AGV011" exact component={AGV011} />
        <Route path="/AGV012" exact component={AGV012} />
        <Route path="/AGV012_2" exact component={AGV012_2} />

      </Switch>
    );
  }
}

export default Routes;
