import React,{Component} from "react";
import produce from "immer"
import {connect} from 'react-redux'
import {config} from '../../config/config'
import Cookies from 'js-cookie'

// import { bindActionCreators } from "redux";

import * as authActions from "../../store/authActions"

const axios = require('axios').default;
class Login extends Component {
    state={
        userName: "",
        password: "",
        authSuccess: -1,
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

    onClickLogout=(e)=>{

        e.preventDefault();
        const authSignOutUrl=config.rootUri+"/_api/auth/signout"
        const jwtToken=Cookies.get('jwtToken');
        
        const headers = { 
            'Authorization': 'Bearer '+jwtToken
        };
        
        const req = { 
            userName: this.props.auth_username,            
         };

        axios.post(authSignOutUrl, req, {  })
          .then((response)=> {
            console.log("Signout Response",response);
             this.props.setAuth(response.data);

             this.setState({
                userName: "",
                password:""
            });
        
          })
          .catch((error)=> {
            console.log(error);
          });
    }

    onClickLogin=(e)=>{
        e.preventDefault();
        // Axios will automatically serialize the object into JSON format
        //  it will also set our Content-Type header to application/json:
        const authUrl=config.rootUri+"/_api/auth/signin"
        const headers = { 
            'Authorization': 'Bearer',
            'My-Custom-Header': 'foobar'
        };
        const req = { 
            userName: this.state.userName,
            password: this.state.password
         };

        axios.post(authUrl, req, { headers })
          .then((response)=> {
            console.log("Authentication Response",response);
            this.state.authSuccess=1;
            this.props.setAuth(response.data);
            this.setState({
                userName: "",
                password:""
            });
        
          })
          .catch((error)=> {

            this.setState({
                authSuccess : 0,
                password    : "",
            });
            setTimeout(() => {
                this.setState({authSuccess: -1});
            }, 5000)

            console.log(error);
          });
    }

    componentDidMount(){
        // this.onClickLogin();
    }
    
    render() {   
        if (!this.props.auth_loggedIn){
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
                            {this.state.authSuccess==0 && (
                                <div className="alert alert-danger mt-2" role="alert">
                                    Login Failed
                                </div>
                            )}
                                                
                        </form>
                    </div>                   
                </React.Fragment>
            );
        }
        else{
            return(
                <React.Fragment>
                    <span>Dear <b>{this.props.auth_fullName} </b></span>
                    <span>
                        You are Logged in as {this.props.auth_username}
                    </span>
                    <button 
                        className="btn btn-lg btn-primary mt-2" 
                        onClick={e=>this.onClickLogout(e)}
                        // onClick={(e)=>(this.onClickLogin(e))}
                        >
                            Log Out
                    </button>   
                </React.Fragment>
            )
            
        }


        
    }
}
 
const mapStateToProps=state=>{
    return{
        auth_loggedIn:   state.auth.loggedIn,
        auth_fullName:   state.auth.fullName,
        auth_username:   state.auth.username,

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

export default connect(mapStateToProps,mapDispatchToProps)(Login);