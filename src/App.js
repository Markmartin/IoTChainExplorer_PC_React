import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
import 'antd/dist/antd.css';
//导入components
import Home from './home/Home'
import WholeBlock from './block/WholeBlock'
import WholeTransaction from './transaction/WholeTransaction'
import Holder from './holder/Holder'
import TransactionDetail from './transaction/TransactionDetail'
import BlockDetail from './block/BlockDetail'

class App extends Component {
  render() {
    return (
      <Router basename="explorer">
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/blocks" component={WholeBlock} />
            <Route path="/transactions" component={WholeTransaction} />
            <Route path="/holder/:address" component={Holder} />
            <Route path="/transaction/:hash" component={TransactionDetail} />
            <Route path="/block/:blockUUID" component={BlockDetail} />
            <Route component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
