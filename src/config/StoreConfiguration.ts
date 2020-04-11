import thunk from 'redux-thunk';
import * as DrinkTrackerReducers from "../reduxstate/DrinkTrackerReducers";
import {DrinkTrackerState} from "../reduxstate/DrinkTrackerReducers";
import {applyMiddleware, combineReducers, createStore, Store} from "redux";

export interface AppState {
    drinkTrackerState: DrinkTrackerState;
}

const rootReducer = combineReducers<AppState>({
    drinkTrackerState: DrinkTrackerReducers.reducer,
});

export default function configureStore(): Store<AppState, any> {
    const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
    return store;
}