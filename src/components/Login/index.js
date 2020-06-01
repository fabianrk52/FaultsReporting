import React, { useState, useEffect } from 'react';
import logoRapat from '../../Assets/Images/mantak.png'
import './Login.css'
// import axios from 'axios'
// import {useHistory} from "react-router-dom";
// import Register from '../Register';

export default function Login() {
    // const history = useHistory();

    const dictionary = {
        user: 'שם משתמש',
        password: 'סיסמה'
    }
    const ENTER_KEY = "Enter";
    const ENTER_KEY_CODE = 13;

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const onKeyPress = (e) => {
        if (e.key == ENTER_KEY || e.code == ENTER_KEY || e.keyCode == ENTER_KEY_CODE) {
            stopBubbling(e)
            onSubmit()
        }
    }

    useEffect(() => {
        window.addEventListener("keypress", onKeyPress)
        return () => window.removeEventListener("keypress", onKeyPress)
    }, [name, password])

    const onSubmit = () => {
        // axios.post('http://' + ServerIp + '/login',
        //     {
        //         name: name,
        //         password: password
        //     })
        //     .then(res => {
        //         if (res.data.token) {
        //             alert("התחברת בהצלחה");
        //             //   setAuth(res.data.token);
        //         }
        //         else {
        //             alert("שם משתמש או סיסמה לא נכונים");
        //         }
        //     })
        //     .catch(err => {
        //     })
    }

    const stopBubbling = (event) => {
        event.preventDefault();
        event.stopPropagation()
    }

    return (
        <div className="Login">
            <div className='logos-box'>
                <img src={logoRapat} alt="Logo" className=" logo Rapat"></img>
            </div>
            <div className="Title">
                <h1><b>ברוכים הבאים למערכת דיווח תקלות</b></h1>
                <h5>המערכת נועדה לצורך דיווח תקלות מהשטח ישירות ליחידה לטובת קבלת טיפול מהיר ויעיל</h5>
            </div>
            <div className="form">
            <h3>כניסה למערכת</h3>
                <div className='Card'>
                    <label>{dictionary.user + ':'}</label>
                    <input name="user" type="text" onChange={e => setName(e.target.value)} required />
                    <label>{dictionary.password + ':'}</label>
                    <input name="password " type="password" onChange={e => setPassword(e.target.value)} required />
                </div>
                <input onClick={onSubmit} type="submit" value="התחבר" className="Button"></input>
            </div>        </div>
    )
}