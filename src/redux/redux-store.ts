import authReducer from "./auth-reducer";
import {applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux";
import {reducer as formReducer} from "redux-form";
import thunkMiddleware from "redux-thunk";
import restaurantReducer from "./restaurant-reducer";
//apply redux-dev-tools extention chrome
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//List of middleware
const middleware = [thunkMiddleware,]
//list of reducers
const rootReducer = combineReducers({
    auth: authReducer,
    restaurant: restaurantReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)))

export default store
//type of state
export type AppStateType =ReturnType<typeof rootReducer>

//PropertiesType возвращает тип Метода из Объекта
//обьявляем джинериковый тип который уточняем через T где Т тип объекта actions
// и если Т это объект у которого есть ключи-строки и значения U
// то вычисли и верни это U или ничего не возвращай
//condition ? trueExpression : falseExpression
//SomeType extends OtherType ? TrueType : FalseType
//передадим typeof {...actions} - вернёт типы методов-функций экшн-криэйторов
type PropertiesType<T> = T extends {[key: string] : infer U } ? U : never

//Определим тип для объектов у которых ключ это строка
//а значение это какаято функция с какимито аргументами котороая чтото возвращает
//Берем тип функции которая лежит внутри обьекта типа actions и возвращаем тип её результата.
//то есть возвращаем тип экшена
//если методов в объекте несколько - они будут перечислены через |
export type InferActionTypes<T extends {[key: string] : (...args: any[])=>any}> = ReturnType<PropertiesType<T>>

(window as any).store = store;