import React from "react";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {Button, Card, Typography} from 'antd';
import {tableStatusTextType, tableStatusType, tableType} from "../../redux/restaurant-reducer";

const {Title, Text} = Typography;


type PropsType = MapStateToPropsType & MapDispatchToPropsType
const Desktop: React.FC<PropsType> = (props) => {
    return (
        <div>
            <HallGrid {...props}/>
        </div>
    )
}
type MapStateToPropsType = {
    tables: Array<tableType>
    tableStatusText: tableStatusTextType
}
const MapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    tables: state.restaurant.tables,
    tableStatusText: state.restaurant.tableStatusText
})
type MapDispatchToPropsType = {}
export default connect(MapStateToProps,)(Desktop)


//стиль раскладки ячеек
const gridStyle = {
    width: '33%',
    minHeight: '12rem',
};
//сетка зала со столами
const HallGrid: React.FC<PropsType> = ({tables, ...props}) => {
    return (
        <div>
            <Card title="Главный зал">
                {tables.map((t) => {
                    return <Card.Grid style={gridStyle} key={t.id}> 
                        <TableCard id={t.id} guests={t.guests}
                                   status={t.status} receiptAmount={t.receiptAmount} attention={t.attention}
                                   tableStatusText={props.tableStatusText}
                        />
                    </Card.Grid>
                })
                }
            </Card>
        </div>
    )
}
//стол
type TableCardPropsType = { tableStatusText: tableStatusTextType } & tableType
const TableCard: React.FC<TableCardPropsType> = (props) => {
    const title = props.attention
        ? <Title level={5} type={"danger"}>Стол №{(props.id < 10) ? '0' + props.id : props.id} требуется внимание!</Title>
        : <Title level={5}>Стол №{(props.id < 10) ? '0' + props.id : props.id}</Title>
    let body
    switch (props.status) {
        case "closed":
            body = <><Text>Статус: {props.tableStatusText[props.status]}</Text><br/></>
            break
        case "unavailable":
            body = <><Text type="secondary">Статус: {props.tableStatusText[props.status]}</Text><br/></>
            break
        case "open":
            body = <><Text type="success">Статус: {props.tableStatusText[props.status]}</Text><br/>
                <Text>Чек: {props.receiptAmount} руб.</Text><br/>
                <Text>Гостей за столом: {props.guests}</Text></>
            break
        default:
            break
    }
    return <>{title}{body}<TableActionButtons status={props.status} /></>
}

type TableActionButtonsPropsType = {
    status: tableStatusType
}
const TableActionButtons: React.FC<TableActionButtonsPropsType> = ({status}) => {
    let buttons;
    switch (status) {
        case "closed":
            buttons = <div>
            <Button type="primary">Открыть стол</Button>
        </div>
            break
        case "unavailable":
            buttons = <div></div>
            break
        case "open":
            buttons = <div>
            <Button type="primary">Закрыть стол</Button>
        </div>
            break
    }
    return <>{buttons}</>


}
