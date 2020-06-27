import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState={
    token:null,
    userId:null,
    error:null,
    loading:null
}

        const authStart=(state=initialState ,action)=>{
                return updateObject(state,{error:null,loading:true});
            }
        const authSuccess=(state=initialState,action)=>{
                return updateObject(state,
                    {error:null,
                     loading:false,
                     token:action.token,
                     userId:action.userId
                    });
            }
        
        const authFail=(state=initialState,action)=>{
                    return updateObject(state,{error:action.error,loading:false });
                }

        const authLogout = (state=initialState, action) => {
                    return updateObject(state, { token: null, userId: null });
                };

            const reducer=(state=initialState ,action)=>{
                switch(action.type){
                    case actionTypes.AUTH_SUCCESS:return authSuccess(state=initialState,action);
                    case actionTypes.AUTH_START:return authStart(state=initialState ,action);
                    case actionTypes.AUTH_FAIL:return authFail(state=initialState,action);
                    case actionTypes.AUTH_LOGOUT:return authLogout(state=initialState,action);
                    default:
                    return state;
                }
            }
export default reducer;