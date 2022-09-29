import React,{Component} from "react";
import {Link } from 'react-router-dom';
import styles from './navBar.module.css';
import { connect } from "react-redux";



class NavBar extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <a className="navbar-brand" href="#">LEGO</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" aria-current="page" to="/">Home </Link>
                            </li>
                            
                            {/* <li className= {"nav-item "+styles.loginClass}>                                
                                <Link className="nav-link" to="/login">Login </Link>
                            </li> */}

                            
                            {/* <li className="nav-item">
                                <a className="nav-link" href="#">Pricing</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown link
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </li> */}

                        </ul>
                        <div className= {" btn nav-item "+styles.loginNav}>
                                {/* <a className="nav-link" href="#">Login</a> */}
                                {this.props.auth.loggedIn===0 &&(
                                    <Link className={"nav-link "+styles.loginNavLink} to="/login">Login </Link>
                                )}
                                
                                {this.props.auth.loggedIn===1 &&(
                                    <Link className={"nav-link "+styles.loginNavLink} to="/login">{this.props.auth.fullName} </Link>
                                )}
                                
                        </div>
                    </div>
                    </nav>
            </React.Fragment>

        );
    }
}
 

 
const mapStateToProps=state=>{
    return{
        auth: state.auth
    }
}

const mapDispatchToProps=dispatch =>{
    return{
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBar);