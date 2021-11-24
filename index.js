const redux = require('redux');
const reduxLogger = require('redux-logger')
const {createStore,combineReducers,applyMiddleware} = redux;
const {createLogger } = reduxLogger;
const logger = createLogger()


const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'



function buyCake(){
  
    return {
        type:BUY_CAKE,
        info:'First redux action'
    }
}

function buyIcecream(){
    return {
        type:BUY_ICECREAM
    }
}

const initialCakeState = {
    numOfCakes : 10,
}

const initialIcecreamState = {
    numOfIcecreams : 15,
}


const cakeReducer = (state=initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE:return {
           
            ...state,
            numOfCakes : state.numOfCakes - 1
        }
        
        default:
            return state
    }
}

const icecreamReducer = (state=initialIcecreamState, action) => {
    switch (action.type) {
        case BUY_ICECREAM:return {
           
            ...state,
            numOfIcecreams : state.numOfIcecreams - 1
        }
        
        default:
            return state
    }
}

const rootReducer = combineReducers({
    cake:cakeReducer,
    icecream:icecreamReducer
})
const store = createStore(rootReducer,applyMiddleware(logger))
console.log('Initial state',store.getState())

//all logs get handled by logger
const unsubscribe = store.subscribe(()=> {})


store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())


unsubscribe()