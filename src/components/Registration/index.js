import React, { useState, useEffect } from 'react';
import './Registration.css'

export default function Registration() {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [reporter, setReporter] = useState('')
    const [unitName, setUnitName] = useState('')

    return (
        <div className="Registration">

            <div className="box-input mx-auto">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">@</span>
                        <input name='username' placeholder='Username' onChange={e => this.onChange(e)} value={userName} />
                    </div>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">@</span>
                        <input name='password' placeholder='Password' type='password' onChange={e => this.onChange(e)} value={password} />
                    </div>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">@</span>
                        <input name='phone' telephone='Telephone' onChange={e => this.onChange(e)} value={phone} />
                    </div>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">@</span>
                        <input name='unitname' placeholder='UnitName' onChange={e => this.onChange(e)} value={unitName} />
                    </div>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">@</span>
                        <input name='reporterTask' placeholder='ReportrTask' onChange={e => this.onChange(e)} value={reporter} />
                    </div>
                </div>
            </div>
        </div>

    );
}