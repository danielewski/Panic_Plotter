import {DrinkTrackerLogValue} from "../models/DrinkTrackerLog";
import {Reducer} from "redux";
import {DrinkTrackerActions} from "./DrinkTrackerActions";

export interface DrinkTrackerState {
    drinkTrackerLog: DrinkTrackerLogValue[];
}

const initialDrinkTrackerState: DrinkTrackerState = {
    drinkTrackerLog: [],
}

export const reducer: Reducer<DrinkTrackerState, DrinkTrackerActions> = (state = initialDrinkTrackerState, action) => {
    return {...state, drinkTrackerLog: action.drinkLog}
};