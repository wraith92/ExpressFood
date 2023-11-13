import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, applyMiddleware,combineReducers} from 'redux';
import thunk from 'redux-thunk';

// import reducers
import UserReducer from '../reducer/UserReducer';
import PlatReducer from '../reducer/PlatReducer';


const rootReducer = combineReducers({
    users:UserReducer,
    plats:PlatReducer
});
const middleware = [thunk];

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);
export default store;