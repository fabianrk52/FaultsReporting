import React from 'react'
import './styles.css'

export default class Register extends React.Component {
    state = {
        username: '',
        password: '',
        telephone: '',
        unitName: '',
        reporterTask: '',
    }

    onChange = (e) => {
        const value = e.target.checked === undefined ? e.target.value : e.target.checked;
        this.setState({
            [e.target.name]: value,
        })

    }
    render() {
        return (
            <div className="box-input mx-auto">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">@</span>
                        <input name='username' placeholder='Username' onChange={e => this.onChange(e)} value={this.state.username} />
                    </div>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">@</span>
                        <input name='password' placeholder='Password' type='password' onChange={e => this.onChange(e)} value={this.state.password} />
                    </div>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">@</span>
                        <input name='username' telephone='Telephone' onChange={e => this.onChange(e)} value={this.state.telephone} value={this.state.telephone} />
                    </div>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">@</span>
                        <input name='unitname' placeholder='UnitName' onChange={e => this.onChange(e)} value={this.state.username} value={this.state.unitName} />
                    </div>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">@</span>
                        <input name='reporterTask' placeholder='ReportrTask' onChange={e => this.onChange(e)} value={this.state.reporterTask} value={this.state.reporterTask} />
                    </div>
                </div>
            </div>
        );
    }
}