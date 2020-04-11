import {LocalDateTime} from "@js-joda/core";

export type DrinkTrackerLogValue = {
    date: LocalDateTime;
    drinks: number;
}