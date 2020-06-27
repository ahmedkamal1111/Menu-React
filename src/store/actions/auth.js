import * as actionTypes from './actionTypes';
import axios from 'axios';
export const authStart=()=>{
return{
    type:actionTypes.AUTH_START
};
};

export const authSuccess=(token,userId)=>{
    return{
    type:actionTypes.AUTH_SUCCESS,
    token:token,
    userId:userId
};
};

export const authFail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    };
};

export const logout=()=>{
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout=(expirationTime)=>{
    return dispatch=>{
        setTimeout(()=>{
        dispatch(logout())
        },expirationTime*1000);
    };
};

export const auth=(email,password,signUp)=>{
    return dispatch=>{
        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC6I8QLe6JArQweNVr-irHUXVFDWdOPQCI';
        if(!signUp){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC6I8QLe6JArQweNVr-irHUXVFDWdOPQCI';
        }
        axios.post(url,authData)
        .then(respone=>{
            console.log(respone);
            dispatch(authSuccess(respone.data.idToken,respone.data.localId));
            dispatch(checkAuthTimeout(respone.data.expiresIn));
        })
    };
};