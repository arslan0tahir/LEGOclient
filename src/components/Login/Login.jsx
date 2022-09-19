import React,{Component} from "react";
import produce from "immer"
import {connect} from 'react-redux'
import {config} from '../../config/config'


// import { bindActionCreators } from "redux";

import * as authActions from "../../store/authActions"

const axios = require('axios').default;
class Login extends Component {
    state={
        userName: "",
        password: "",
    };
    
    onChangeUserName=(e)=>{

        
        const nextState = produce(this.state, draft => {
            draft.userName = e.target.value;
        })
        this.setState(nextState)
    }

    onChangePassword=(e)=>{

        
        const nextState = produce(this.state, draft => {
            draft.password = e.target.value;
        })
        this.setState(nextState)
    }

    onClickLogin=(e)=>{
        e.preventDefault();
        // Axios will automatically serialize the object into JSON format
        //  it will also set our Content-Type header to application/json:
        const authUrl=config.rootUri+"/_api/auth/signin"
        const headers = { 
            'Authorization': 'Bearer my-token',
            'My-Custom-Header': 'foobar'
        };
        const req = { 
            userName: this.state.userName,
            password: this.state.password
         };

        axios.post(authUrl, req, { headers })
          .then(function (response) {
            console.log(response);
            this.props.setAuth(response);
        
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    componentDidMount(){
        // this.onClickLogin();
    }
    
    render() {   
        return (
        <React.Fragment>
            <div style={{width: '100%', maxWidth: '330px', padding: '15px'}}>
                <form className="">
                    <div className="form-floating mb-3 mt-3">
                        <input 
                            type="" 
                            className="form-control" 
                            id="login-username" 
                            placeholder="User Name" 
                            value={this.state.userName}
                            onChange={(e) => (this.onChangeUserName(e))} 
                        />
                        <label htmlFor="login-username">User Name</label>
                    </div>                
                    <div className="form-floating">
                        <input 
                            type="password" 
                            className="form-control" 
                            id="login-password" 
                            placeholder="Password" 
                            value={this.state.password}
                            onChange={(e)=>(this.onChangePassword(e))}
                        />
                        <label htmlFor="login-password">Password</label>
                    </div>
                    <button 
                        className="w-100 btn btn-lg btn-primary mt-2" 
                        onClick={(e)=>(this.onClickLogin(e))}>
                            Sign in
                    </button>                    
                </form>
            </div>
            
        </React.Fragment>);
    }
}
 
const mapStateToProps=state=>{
    return{
        // propName: state (defined in reduce)
    }
}

const mapDispatchToProps=dispatch =>{
    return{
        // example
        // onIncrement:()=>dispatch({type:'INCREMENT'})
        setAuth: (res)=>dispatch({type: authActions.SET_AUTH, payload: res})
    }
}

export default connect(mapStateToProps)(Login);