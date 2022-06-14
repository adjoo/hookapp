import React from "react";
import {Button, Card, Typography} from 'antd';
import {connect} from "react-redux";
import {getAuthStatus, removeAuthStatus, setAuthStatus} from "../../redux/auth-reducer";
import DesktopCard from "../common/DesktopCard";
const {Title, Text} = Typography;
const gridStyle = {
    width: '25%',
    minHeight: '12rem',
}



const Desktop: React.FC<any> = () => {
    return <div>
        <h2>Рабочий стол</h2>
        <h4>Создать чек</h4>
        <p>список всех столов...</p>
        <h4>Открытые чеки</h4>
        <p>список всех открытых чеков...</p>
        <DesktopCard title='Чек №101' rows={[[1,'человек'],[1,'чек']]}/>
    </div>
}


const DesktopContainer = connect( )(Desktop)
export default DesktopContainer




