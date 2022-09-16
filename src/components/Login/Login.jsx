import React,{Component} from "react";

class Login extends Component {
    
    
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
                            value={this.props.login.userName}
                            onChange={(e) => this.props.loginCtrl.onUserNameChange(e)} 
                        />
                        <label htmlFor="login-username">User Name</label>
                    </div>                
                    <div className="form-floating">
                        <input type="password" className="form-control" id="login-password" placeholder="Password" value=""/>
                        <label htmlFor="login-password">Password</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary mt-2" type="submit">Sign in</button>                    
                </form>
            </div>
            
        </React.Fragment>);
    }
}
 
export default Login;