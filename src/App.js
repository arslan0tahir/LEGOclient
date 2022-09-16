import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import LoginPage from './pages/LoginPage';
import React, { Component } from 'react';
import loginCtrl from './appCtrl'


let Home=(<div>
  <h1>Home Page</h1>
</div>);




class App extends Component {
  constructor(){


    super();

    // this.appCtrl=()=>{console.log(this)};
    // this.appCtrl={...appCtrl()};
    
    // this.appCtrl();
    console.log(loginCtrl)
    this.loginCtrl={...loginCtrl}

    this.state = {
      login:{//name after compenent or page
        userName: "test",
        password: "",
      }    
    };

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
                    <LoginPage 
                      login={this.state.login}
                      loginCtrl={this.loginCtrl}/>
                  }
                />
                
                {/* <Route path="/shop" component={Shop} /> */}
      </Routes>
    </div>
    );
  }
}
 

export default App;










