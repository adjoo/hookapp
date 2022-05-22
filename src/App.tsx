import React, {useEffect} from 'react'
import './App.css';
import {Header} from './components/Header/Header';
import {LoginPage} from "./components/Login/LoginPage";
import Desktop from "./components/Desktop/Desktop";
import {AppStateType} from "./redux/redux-store";
import {connect} from "react-redux";
import {getAuthStatus, setAuthStatus, removeAuthStatus} from "./redux/auth-reducer";

type PropsType = MapStateToPropsType & MapDispatchToPropsType

const App: React.FC<PropsType> = (props) => {
    //init app
    //get auth status
    useEffect(() => {
        return () => {
            props.getAuthStatus()  //prevents double function call
        }
    },[]);

    return (
        <div className="app__wrapper">
            <Header login={props.login} isAuth={props.isAuth} removeAuthStatus={props.removeAuthStatus}/>
            {
                props.isAuth
                    ? <Desktop/>
                    : <LoginPage setAuthStatus={props.setAuthStatus}/>
            }
        </div>
    );
}

type MapStateToPropsType = {
    isAuth: boolean,
    login: string | null,
}
const MapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})
type MapDispatchToPropsType = {
    getAuthStatus: () => void,
    removeAuthStatus: () => void
    setAuthStatus: (email: string, password: string,rememberMe: boolean) => void
}

export default connect(MapStateToProps, {getAuthStatus,removeAuthStatus,setAuthStatus})(App);
