import React,{Component} from "react";
import loginImage from "../media/login.gif"
import Login from "../components/Login/Login"

class LoginPage extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center',height:'500px'}}>
                    {/* <span>LEGO</span> */}
                    <Login></Login>
                </div>
            </React.Fragment>
        );
    }
}
 
export default LoginPage;