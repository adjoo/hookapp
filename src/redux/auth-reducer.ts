import {authApi} from "../api";
import {Dispatch} from "react";
import {AppStateType, InferActionTypes} from "./redux-store";
import { ThunkAction } from "redux-thunk";

const AUTH_REDUCER_SET_AUTH_STATUS = 'AUTH_REDUCER_SET_AUTH_STATUS'

//Reducer of auth data and login page
const InitialState = {
    isAuth: false,
    login: null as string | null,
}
type InitialStateType = typeof  InitialState

const authReducer = (state = InitialState, action: ActionsTypes) => {
    switch (action.type) {
        case AUTH_REDUCER_SET_AUTH_STATUS:
            return {
                ...state,
                isAuth: action.payload.isAuth,
                login: action.payload.login,
            }
        default:
            return state
    }
}

//задача взять обьект actions получить список экшенов.
type ActionsTypes = InferActionTypes<typeof actions>
export const actions = {
    /*/as const означает вывести самый узкий тип для того что слева, а точнее поставить атрибут readonly
    //const args = [8, 5];
        // const args: number[]
    //const angle = Math.atan2(...args); // error! Expected 2 arguments, but got 0 or more.
    //const args = [8, 5] as const;
        // const args: readonly [8, 5]
    // const angle = Math.atan2(...args); // okay*/
    updateAuthStatus: (isAuth: boolean, login: string | null,) => ({type: "AUTH_REDUCER_SET_AUTH_STATUS", payload: {login,isAuth}} as const),

}

//THUKN's and their required types
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
//get auth status and login
export const getAuthStatus = (): ThunkType => async (dispatch) => {
    const response = await authApi.getAuthStatus()
    const isAuth = !response.resultCode
    if (isAuth) {
        const login = response.data.login
        dispatch(actions.updateAuthStatus(isAuth,login))
    } else {
        dispatch(actions.updateAuthStatus(false,null))
    }



}
//logout user
export const removeAuthStatus = (): ThunkType => async (dispatch) => {
    const response = await authApi.logout()
    if (!response.resultCode) {
        dispatch(actions.updateAuthStatus(false,null))
    }

}
//login user
export const setAuthStatus = (email: string, password: string,rememberMe: boolean): ThunkType => async (dispatch) => {
    const response = await authApi.login(email,password,rememberMe)
    if (!response.resultCode) {
        await dispatch(getAuthStatus())
    }

}
export default authReducer