import * as authAction from "./authActions";

const initialState={
    username: "",
    IsAdmin: 0,
    jwtTocken:"",
    groups:[],

}

const reducer=(state=initialState,action)=>{
    if (action.type==authAction.SET_AUTH){
        
    }    
    return state;

}

export default reducer;