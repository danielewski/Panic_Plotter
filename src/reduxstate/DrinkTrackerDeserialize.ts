import {DrinkTrackerLogValue} from "../models/DrinkTrackerLog";
import {LocalDateTime} from "js-joda";

export default (data: DrinkTrackerLogValue[]) => {
    return Object.values(data).map(entry => {
            return {
                drinks: entry.drinks,
                date: LocalDateTime.parse(entry.date.toString())
            }
        }
    );
}