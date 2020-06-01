import React from 'react';
import './styles.css'
// import {useHistory} from "react-router-dom";
import Register from '../Register';
// import Login from './LoginComp';

export default function Landing(){
    // const history = useHistory();

    return(
    <div id="landing" className="container-fluid fill">
        <nav className="navbar navbar-dark sticky-top pull-right transparent">
            <a className="navbar-brand" href="#">
                <img src="/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt=""/>
                סמל היחידה
            </a>
            <button className="btn btn-light transparent menu-button" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                אודות
            </button>
            <button className="btn btn-light transparent menu-button" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                אתר הפרויקט
            </button>
            <button className="btn btn-light transparent menu-button" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                צור קשר
            </button>
            <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                כניסה
            </button>
        </nav>
        <br/>
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1 style={{color: "white"}}>
                        <b>ברוכים הבאים<br/>למערכת דיווח תקלות</b>
                    </h1>
                    <br/>
                    <h5 style={{color: "white"}}>המערכת נועדה לצורך דיווח תקלות מהשטח ישירות ליחידה לטובת קבלת טיפול מהיר ויעיל</h5>
                </div>
                <div className="col">
                    <div className="container">
                        <Register/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}