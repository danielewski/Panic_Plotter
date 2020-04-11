import {AppState} from "../config/StoreConfiguration";
import {DrinkTrackerLogValue} from "../models/DrinkTrackerLog";
import {createSelector} from 'reselect';

const local = (state: AppState) => state.drinkTrackerState;

export const drinkTrackerLogSelector = (state: AppState) => local(state).drinkTrackerLog;


export const drinkTrackerCountSelector = (drinkTrackerLog: DrinkTrackerLogValue[]) => {
    console.log("HEYY");
    const count = drinkTrackerLog.length === 0 ? 0 : drinkTrackerLog.map(drink => drink.drinks).reduce((accumulator, drinks) => accumulator + drinks);
    console.log(count);
    return count;
}

export const drinkTrackerSumSelector = createSelector([drinkTrackerLogSelector], drinkTrackerCountSelector);