import * as authAction from "./authActions";
import produce from "immer"

const initialState={
    loggedIn:0,
    fullName: "guest",
    username: "guest",
    IsAdmin: 0,
    jwtTocken:"",
    groups:[],

}


const reducer=(state=initialState,action)=>{
    const { type, payload } = action;
    if (type==authAction.SET_AUTH){        
        let nextState = produce(state, draft => {
                draft.loggedIn=payload.loggedIn;
                draft.fullName= payload.fullName;
                draft.username=payload.username;
                draft.IsAdmin= 0;
                draft.jwtTocken="";
                draft.groups=[];
        })
        // console.log(nextState)
        return nextState;
        
    }    
    return state;

}




export default reducer;