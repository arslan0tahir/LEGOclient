import NavBar from './components/NavBar/NavBar';
import LoginPage from './pages/LoginPage';
import Dummy from './components/Dummy/Dummy'

import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {connect} from 'react-redux';
import {config} from './config/config';
import _ from 'underscore';
import * as authActions from "./store/authActions"




let Home=(<div>
  <h1>Home Page</h1>
</div>);




class App extends Component {
  constructor(){


    super();

    

    // this.state = {
    //   login:{//name after compenent or page
    //     userName: "test",
    //     password: "",
    //   }    
    // };

  }

  
  componentDidMount(){
    let jwtToken='';
    let auth={}
    try{
      jwtToken=Cookies.get('jwtToken');
      auth=JSON.parse(Cookies.get('auth'));
    }
    catch(e){
      jwtToken='';
      auth={}
    }
    let a=_;

    if (!_.isUndefined(jwtToken) && !_.isUndefined(auth) && jwtToken.length!=0 && !_.isEmpty(auth) ){

      const authResinstateUrl=config.rootUri+"/_api/auth/reinstate"

     const headers = { 
          'Authorization': 'Bearer '+jwtToken
      };
      
      //### sending existing auth cookie  to reinstate login
      const req = {auth:auth}

      axios.post(authResinstateUrl, req, {headers})
        .then((response)=> {
          console.log("Reisntate",response.data);
          
          //### update state after reinstate from server 
          this.props.setAuth(response.data.auth);          
      
        })
        .catch((error)=> {
          //### delete cookie if reinstate failed logout
          Cookies.set('jwtToken','')
          Cookies.set('auth','')
          console.log(error);
        });
    }
    else{
      Cookies.set('jwtToken','');
      Cookies.set('auth',JSON.stringify({}) );
    }


    console.log("App Mounted");
  }

  render() { 
    return (
      <div className="App">
      <NavBar></NavBar>
      <Routes>
                <Route path="/" element={Home} exact />
                
                <Route 
                  path="/login" 
                  element={
                    <LoginPage/>
                  }
                />

                <Route 
                  path="/dummy" 
                  element={
                    <Dummy/>
                  }
                />
                
                {/* <Route path="/shop" component={Shop} /> */}
      </Routes>
    </div>
    );
  }
}

const mapStateToProps=state=>{
  return{
  }
}

const mapDispatchToProps=dispatch =>{
  return{
      setAuth: (res)=>dispatch({type: authActions.SET_AUTH, payload: res})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);



// export default App;










