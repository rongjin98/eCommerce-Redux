import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer } from './reducers/productReducers'

const reducer = combineReducers({
    productList: productListReducer, //the variable name that will show on the redux, "productList"
})
const initialState = {}
const middleware = [thunk]
const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store