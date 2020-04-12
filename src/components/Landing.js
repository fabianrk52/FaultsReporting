import React from 'react';
import '../styles/Landing.css'
import {useHistory} from "react-router-dom";

export default function Landing(){

    const history = useHistory();
    function moveToRegister(){
        history.push("/Register");
    }

    return(
    <div>
        <div className="headline">
            <h1> ברוכים הבאים למערכת דיווח תקלות</h1>
        </div>
        <div className="table-wrapper">
            <h5>המערכת נועדה לצורך דיווח תקלות מהשטח ישירות ליחידה לטובת קבלת טיפול מהיר ויעיל</h5>
            <li>להרשמה לחץ:</li>
            <button className="Button" onClick={moveToRegister}></button>
        </div>
    </div>
    )
}