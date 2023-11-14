import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, applyMiddleware,combineReducers} from 'redux';
import thunk from 'redux-thunk';

// import reducers
import UserReducer from '../reducer/UserReducer';
import PlatReducer from '../reducer/PlatReducer';
import  AuthReducer  from '../reducer/AuthReducers';

const userinfo = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
const rootReducer = combineReducers({
    userinfo:userinfo,
    users:UserReducer,
    plats:PlatReducer,
    userLogin:AuthReducer
});
const middleware = [thunk];

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);
export default store;