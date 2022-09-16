import {onUserNameChange,onPasswordChange} from './components/Login/loginCtrl'

// let appCtrl={
//     loginCtrl:loginCtrl //All components will have their controller registered here        
// }


// const appCtrl=function(){
//     console.log("APP Controller",this)
//     return{
//         loginCtrl:loginCtrl() //All components will have their controller registered here        
//     }
//     // console.log(this)

// }
const loginCtrl={onUserNameChange,onPasswordChange};

export default loginCtrl;