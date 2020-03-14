import {LocalDateTime} from "js-joda";

export type DrinkTrackerLogValue = {
    date: LocalDateTime;
    drinks: number;
}