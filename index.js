const redux = require('redux');
const {createStore } = redux;


const BUY_CAKE = 'BUY_CAKE'



//action creator is a function that returns an action
function buyCake(){
     //action is an object having type property
    return {
        type:BUY_CAKE,
        info:'First redux action'
    }
}

//reducer is a function that accepts state and action as arguments, and returns the next state of  the application  ; initial state is also object
const initialState = {
    numOfCakes : 10
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case BUY_CAKE:return {
            //we r telling reducer to make a copy of state and then update numOfCakes
            ...state,
            numOfCakes : state.numOfCakes - 1
        }
        default:
            return state
    }
}
//we r not mutating state object rather returning new object

//creating store
const store = createStore(reducer)
console.log('Initial state',store.getState())
//adding listener to store
const unsubscribe = store.subscribe(()=> console.log('Updated state',store.getState()))

//dispatching actions
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())

//unsubscribe to any changes in store
unsubscribe()