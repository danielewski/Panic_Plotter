import * as firebase from "firebase";
import {DrinkTrackerLogValue} from "../models/DrinkTrackerLog";
import DrinkTrackerDeserialize from "./DrinkTrackerDeserialize";

export const url = '';

export const fetchMainModel = () => {
    let mainData: DrinkTrackerLogValue[] = [];
    firebase.database().ref('/drinks').once('value').then(function (snapshot) {
        if (snapshot.val()) {
            const data = Object.values(snapshot.val() as DrinkTrackerLogValue[]);
            DrinkTrackerDeserialize(data).sort((a, b) => b.date.compareTo(a.date)).forEach(entry => mainData.push(entry));
        }
    });
    return mainData;
}