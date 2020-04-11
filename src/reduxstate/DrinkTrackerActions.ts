import {ActionCreator, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {DrinkTrackerLogValue} from "../models/DrinkTrackerLog";
import {DrinkTrackerState} from "./DrinkTrackerReducers";
import * as DrinkTrackerAPI from './DrinkTrackerAPI';

export enum DrinkTrackerActionTypes {
    FETCH_INITIAL_DATA = 'FETCH_INITIAL_DATA'
}

export interface getInitialDataAction {
    type: DrinkTrackerActionTypes.FETCH_INITIAL_DATA;
    drinkLog: DrinkTrackerLogValue[];
}

export type DrinkTrackerActions = getInitialDataAction;
export const getInitialData: ActionCreator<ThunkAction<Promise<any>, DrinkTrackerState, null, getInitialDataAction>> = () => {
    return async (dispatch: Dispatch) => {
        const response = DrinkTrackerAPI.fetchMainModel();
        dispatch({
            drinkLog: response,
            type: DrinkTrackerActionTypes.FETCH_INITIAL_DATA
        });
    }
}