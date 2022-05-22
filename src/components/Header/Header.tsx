import React, {useEffect, useState} from 'react'
import s from './Header.module.css'
import {Button, Typography} from 'antd'
import logo from './../../assets/logo.png'

type PropsType = {
    login: string | null
    isAuth: boolean,
    removeAuthStatus: () => void
}
export const Header: React.FC<PropsType> = (props) => {

    const [isAuth, setIsAuthState] = useState(props.isAuth)
    const [login, setLoginState] = useState(props.login)

    useEffect(() => {
        setIsAuthState(props.isAuth)
    }, [props.isAuth,])
    useEffect(() => {
        setLoginState(props.login)
    }, [props.login,])
    const onLogout = () => {
        props.removeAuthStatus()
    }

    return (
        <header className={s.body}>
            <div className={s.logo}><img src={logo} alt="logo"/></div>
            <Typography.Title level={3} type={"success"} >Hookan App</Typography.Title>
            <div>
                {isAuth
                    ? <Button type="ghost" onClick={onLogout}>logout: {login}</Button>
                    : <Button type="primary">login</Button>
                }

            </div>
        </header>
    )
}
