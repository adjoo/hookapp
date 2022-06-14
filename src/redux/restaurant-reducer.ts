//@Types

//Table Types
import {InferActionTypes} from "./redux-store";

const tableStatusText = {
    open:  'Открыт',
    close: 'Закрыт',
    unavailable: 'Недоступен',
} as const  //Table status description
export type TableStatusTextType = typeof tableStatusText //Table status description type
export type TableStatusType = keyof TableStatusTextType //Table status type
export type TableType = {
    id: number,
    status: TableStatusType
    guests: number | null //number of guests now
    receipts: Array<Receipt>  //list of orders
    attention?: boolean
}

//
//Menu Types
class MenuItem{
    id: number;
    name: string;
    price: number;
    description: string | null;
    constructor(id: number,name: string,price: number,description?: string | null){
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description ? description : null;
    }

}
const menuList: Array<MenuItem> = [
    new MenuItem(0,'Орешки', 500),
    new MenuItem(1,'Вода', 100),
    new MenuItem(2,'Вино', 200),
    new MenuItem(3,'Сок', 300),
]

//Receipt Types
type ReceiptOrderItemType = { //тип пункта в чеке
    menuItem: MenuItem
    quantity: number
}
class Receipt{
    id: number;
    order: Array<ReceiptOrderItemType> ;
    constructor(){
        this.id = Receipt.__getReceiptId
        this.order = [];
        Receipt.receiptsList.push(this);

    }
    get totalAmount(){
        let total = 0;
        this.order.forEach((o)=>{
            total += o.quantity * o.menuItem.price
        })
        return total;
    };

    addItemToOrder(order: ReceiptOrderItemType){
        this.order.push(order)
    };
    static __receiptId = 100;
    static receiptsList = [] as Array<Receipt>; //list of all receipts
    static get __getReceiptId(){
        return this.__receiptId++
    }

}

//Reducer Types
type InitialStateType = {
    tables: Array<TableType>,
    receiptsList: Receipt[],
    menuList: MenuItem[],
}

//Reducer
const InitialState:InitialStateType = {
    tables: [
        {id:0, guests: null, receipts: [new Receipt(),new Receipt()], status: "open" },
        {id:1, guests: null, receipts: [new Receipt(),new Receipt()], status: "open" },
        {id:2, guests: null, receipts: [], status: "close" },
        {id:3, guests: 2, receipts: [], status: "open"},
        {id:3, guests: 8, receipts: [], status: "open"},
        {id:5, guests: null, receipts: [], status: "unavailable"},
    ],
    receiptsList: Receipt.receiptsList,
    menuList: menuList,
}

const restaurantReducer = (state = InitialState, action: ActionsTypes) => {
    switch (action.type) {
        case "RR_OPEN_TABLE":
        {
            const tables = [...state.tables]
            const table = tables[action.tableId]
            table.status = "open";
            table.guests = action.guests;
            return {
                ...state,
                tables: [...tables],
            }}
        case "RR_CLOSE_TABLE":
        {
            const tables = [...state.tables]
            const table = tables[action.tableId]
            table.status = "close";
            table.guests = 0;
            table.receipts = [];
            return {
                ...state,
                tables: [...tables],
            }}
        case "RR_SET_GUESTS_AT_THE_TABLE":
        {
            const tables = [...state.tables]
            const table = tables[action.tableId]
            table.guests = action.guests;
            return {
                ...state,
                tables: [...tables],
            }}
        case "RR_OPEN_RECEIPT":
        {
            const tables = [...state.tables]
            const table = tables[action.tableId]
            table.receipts.push(new Receipt())
            return {
                ...state,
                tables: [...tables],
            }
        }
        case "RR_CLOSE_RECEIPT":
        {   const tables = [...state.tables]
            const table = tables[action.tableId]
            table.receipts.filter((item)=> item !== action.receipt)
            return {
                ...state,
                tables: [...tables],
            }}
        case "RR_ADD_TO_RECEIPT":
        {
            const tables = [...state.tables];
            const receipt =  action.receipt;
            receipt.addItemToOrder(action.receiptItem)
            return {
                ...state,
                tables: [...tables],
            }}
        default:
            return state
    }
}
type ActionsTypes = InferActionTypes<typeof actions>
export const actions = {
    //открыть стол
    openTable: (tableId: number, guests: number) => (
        {type:"RR_OPEN_TABLE" as const, tableId: tableId, guests: guests}),
    closeTable: (tableId: number ) => (
        {type:"RR_CLOSE_TABLE" as const, tableId: tableId,}),
    setGuests: (tableId: number, guests: number ) => (
        {type:"RR_SET_GUESTS_AT_THE_TABLE" as const, tableId: tableId, guests: guests}),
    openReceipt: (tableId: number) => (
        {type:"RR_OPEN_RECEIPT" as const, tableId: tableId}),
    closeReceipt: (tableId: number, receipt: Receipt) => (
        {type:"RR_CLOSE_RECEIPT" as const, tableId: tableId, receipt: receipt}),
    addToReceipt: (receipt: Receipt, receiptItem: ReceiptOrderItemType) =>
        ({type:"RR_ADD_TO_RECEIPT" as const, receipt: receipt, receiptItem: receiptItem}),
}

export default restaurantReducer