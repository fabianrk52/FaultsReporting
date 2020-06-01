import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainPage from './components/MainPage';
import Login from './components/Login';
import {Route, HashRouter} from "react-router-dom";

ReactDOM.render(
    <div id="index" className="container-fluid fill" style={{paddingRight: 0, paddingLeft: 0}}>
        <HashRouter>
            <Route exact path="/" component={Login}></Route>
            <Route exact path="/app" component={MainPage}></Route>
        </HashRouter>
    </div>
    , document.getElementById('root')
);
