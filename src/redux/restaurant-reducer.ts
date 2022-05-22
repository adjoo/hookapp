
const tableStatusText = {
    open:  'Открыт',
    closed: 'Закрыт',
    attention: 'Требуется внимание',
    unavailable: 'Недоступен',
} as const
export type tableStatusTextType = typeof tableStatusText
export type tableStatusType = keyof tableStatusTextType
export type tableType = {
    id: number,
    status: tableStatusType
    guests: number | null //number of guests now
    receiptAmount: Array<any> | null //list of orders
    attention: boolean
}
type InitialStateType = {
    tables: Array<tableType>
    tableStatusText: tableStatusTextType
}

//Reducer of auth data and login page
const InitialState:InitialStateType = {
    tables: [
        {id:1, guests: null, receiptAmount: null, status: "closed", attention: false },
        {id:2, guests: null, receiptAmount: null, status: "closed",attention: false },
        {id:3, guests: 2, receiptAmount: null, status: "open",attention: false},
        {id:3, guests: 8, receiptAmount: null, status: "open",attention: true},
        {id:5, guests: null, receiptAmount: null, status: "unavailable",attention: false },
    ],
    tableStatusText: tableStatusText,
}

type ActionType = any

const restaurantReducer = (state = InitialState, action: ActionType) => {
    switch (action.type) {
        /*case "AUTH_REDUCER_SET_AUTH_STATUS":
            console.log(action.payload.isAuth)
            return {
                ...state,
                isAuth: action.payload.isAuth,
            }*/
        default:
            return state
    }
}




export default restaurantReducer