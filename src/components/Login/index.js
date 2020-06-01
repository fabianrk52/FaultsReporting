import React, { useState, useEffect } from 'react';
import logoRapat from '../../Images/mantak.png'
import './Login.css'
import Registration from '../Registration';
import Modal from '../Modal';
// import axios from 'axios'
// import {useHistory} from "react-router-dom";

export default function Login() {
    // const history = useHistory();

    const dictionary = {
        user: 'שם משתמש',
        password: 'סיסמה',
        registration: 'הרשמה',
        connect: 'התחבר',
        save:"שמור"
    }
    const ENTER_KEY = "Enter";
    const ENTER_KEY_CODE = 13;

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [showRegistration, setShowRegistration] = useState(false)


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
        alert("submit");
    }

    const stopBubbling = (event) => {
        event.preventDefault();
        event.stopPropagation()
    }

    const openRegistration = () => {
        setShowRegistration(true)
    }

    const closeRegistration = () => {
        setShowRegistration(false)
    }
    return (
        <div className="Login">
            <div className='logos-box'>
                <button type="button" className="btn btn-success logo" onClick={openRegistration}>{dictionary.registration}</button>
                <img src={logoRapat} alt="Logo" className="logo Rapat"></img>
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
                <button type="submit" className="btn btn-secondary btn-lg mt-4" onClick={onSubmit}>{dictionary.connect}</button>
            </div>
            <Modal
                className="modal"
                show={showRegistration}
                close={closeRegistration}
                title={dictionary.registration}
                children={Registration}
                save={dictionary.save}
                >
				</Modal>
        </div>
    )
}