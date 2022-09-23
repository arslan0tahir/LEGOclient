import React,{Component} from "react";
import produce from "immer"
import {connect} from 'react-redux'
import {config} from '../../config/config'
import Cookies from 'js-cookie'
import _ from 'underscore';

// import { bindActionCreators } from "redux";

import * as authActions from "../../store/authActions"

const axios = require('axios').default;
class Login extends Component {
    state={
        username: "",
        password: "",
        authSuccess: -1,
    };
    
    onChangeUserName=(e)=>{

        
        const nextState = produce(this.state, draft => {
            draft.username = e.target.value;
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

        //# get the value of cookie sotred during login
        const jwtToken=Cookies.get('jwtToken');
        
        const headers = { 
            'Authorization': 'Bearer '+jwtToken
        };
        
        const req = {auth:this.props.auth}

        axios.post(authSignOutUrl, req, {headers})
          .then((response)=> {
            console.log("Signout Response",response.data);
            
            //### update state after logout from server 
            this.props.setAuth(response.data.auth);

            //### delete cookie after logout
            Cookies.set('jwtToken','')

            //### reset local state
            this.setState({
                username: "",
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
            username: this.state.username,
            password: this.state.password
         };

        axios.post(authUrl, req, { headers })
          .then((response)=> {
            console.log("Authentication Response",response);

            if (!_.isUndefined(response.data.auth.jwtToken)){
                //### set jwtToken  in cookie to be accessed at React client
                Cookies.set('jwtToken',response.data.auth.jwtToken)

                //### set this local state to transform signin component to signout functionality
                this.state.authSuccess=1;
                
                //### after placing token in cookie remove it from state 
                response.data.auth.jwtToken='';

                //### update the global state in store
                this.props.setAuth(response.data.auth);  
                
                //### reset username and password to null 
                this.setState({
                    username: "",
                    password:""
                });
            }
            else{
                this.setState({
                    authSuccess : 0,
                    password    : "",
                });
                setTimeout(() => {
                    this.setState({authSuccess: -1});
                }, 5000)
            }

            
        
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
                                    value={this.state.username}
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
        auth:            state.auth

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