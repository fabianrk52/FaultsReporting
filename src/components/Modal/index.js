import React from 'react';
import Registration from '../Registration'

import './Modal.css';

const dictionary = {
    registration: 'הרשמה',
}

const modal = (props) => {
    return (
        <div>
            <div className="modal-wrapper"
                style={{
                    transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                <div className="modal-header">
                    <h3>{props.title}</h3>
                    <span className="close-modal-btn" onClick={props.close}>×</span>
                </div>
                <div className="modal-body">
                    {props.type === dictionary.registration ? 
                    <Registration>
                    </Registration> : 
                    null}
                </div>
                <div className="modal-footer">
                    <button className="btn btn-success btn-lg mt-1">{props.save}</button>
                </div>
            </div>
        </div>
    )
}

export default modal;