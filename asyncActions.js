const redux = require('redux');

const {createStore} = redux;
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')


const initialState = {
    loading : false,
    users :  [],
    error: ''
    
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

const fetchUsersRequest = () => {
    return {
        type : FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = users => {
    return {
        type : FETCH_USERS_SUCCESS,
        payload : users
    }
}

const fetchUsersFailure = error => {
    return {
        type : FETCH_USERS_FAILURE,
        payload : error
    }
}

const reducer = (state=initialState,action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading:true
            }
        
        case FETCH_USERS_SUCCESS:
            return {
                loading:false,
                users : action.payload,
                error: ''

            }

        case FETCH_USERS_FAILURE:
            return {
                loading:false,
                users :[],
                error : action.payload
            }
    }
}

const fetchUsers = () => {
    //thunk allows action createor to return a  function(pure or impure) instead of an action object
    //the function is allowed to have side effects such as async api calls
    //and dispatch actions to be handled by user
    return function(dispatch){
        dispatch(fetchUsersRequest())     //to set loading to true
        axios.get('https://jsonplaceholer.typicode.com/users')
        .then(response => {
            //here response.data is array of users
            const users = response.data.map(user => user.id)
            dispatch(fetchUsersSuccess(users))
        }).catch(error => {
            dispatch(fetchUsersFailure(error.message))
        })
    }
}

const store = createStore(reducer,applyMiddleware(thunkMiddleware))
store.subscribe(()=>{console.log(store.getState())})
store.dispatch(fetchUsers())