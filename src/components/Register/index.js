import  React from 'react'

export default class Register extends React.Component{
    state={
        username: '',
        password:'',
        telephone:'',
        unitName:'', 
        reporterTask:'', 
    }

    onChange = (e)=>{
        const value = e.target.checked === undefined ? e.target.value: e.target.checked;
        this.setState({
            [e.target.name]:value,
        })

    }
    render(){
        return (
        <div>
            <input name='username' placeholder='Username' onChange={e=> this.onChange(e)} value={this.state.username}/>
            <input name='password' placeholder='Password' type='password' onChange={e=> this.onChange(e)} value={this.state.password}/>
            <input name='username' telephone='Telephone' onChange={e=> this.onChange(e)} value={this.state.telephone} value={this.state.telephone}/>
            <input name='unitname' placeholder='UnitName' onChange={e=> this.onChange(e)} value={this.state.username} value={this.state.unitName}/>
            <input name='reporterTask' placeholder='ReportrTask' onChange={e=> this.onChange(e)} value={this.state.reporterTask} value={this.state.reporterTask}/>
            </div>
        );
    }
}