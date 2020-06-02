import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainPage from './components/MainPage';
import Landing from './components/Landing';
import {Route, HashRouter} from "react-router-dom";

ReactDOM.render(
    <div id="index" className="container-fluid fill" style={{paddingRight: 0, paddingLeft: 0}}>
        <HashRouter>
            <Route exact path="/" component={MainPage}></Route>
            <Route exact path="/app" component={Landing}></Route>
        </HashRouter>
    </div>
    , document.getElementById('root')
);
