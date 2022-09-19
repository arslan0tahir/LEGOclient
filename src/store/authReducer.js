import * as authAction from "./authActions";
import produce from "immer"

const initialState={
    username: "",
    IsAdmin: 0,
    jwtTocken:"",
    groups:[],

}

const reducer=(state=initialState,action)=>{
    if (action.type==authAction.SET_AUTH){

        const nextState = produce(state, draft => {
            draft.username= "Arslan Tahir";
            draft.IsAdmin= 0;
            draft.jwtTocken="";
            draft.groups=[];
        })
        return nextState;
        
    }    
    return state;

}

export default reducer;