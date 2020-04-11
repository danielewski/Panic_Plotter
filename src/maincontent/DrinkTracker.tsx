import React from 'react'
import styles from './DrinkTracker.module.scss'
import {DrinkTrackerLogValue} from "../models/DrinkTrackerLog";
import * as firebase from "firebase";
import {LocalDateTime} from "@js-joda/core";

export default class DrinkTracker extends React.Component {
    state = {
        drinkInput: 0,
        drinkCount: 0,
        log: [] as DrinkTrackerLogValue[],
    }

    componentDidMount() {
        const {updateLocalLog, deserialize} = this;
        firebase.database().ref('/drinks').once('value').then(function (snapshot) {
            if (snapshot.val()) {
                const data = Object.values(snapshot.val() as DrinkTrackerLogValue[] || undefined);
                const deserializedData = deserialize(data).sort((a, b) => b.date.compareTo(a.date));
                updateLocalLog(deserializedData);
            }
        });
    };

    deserialize = (data: DrinkTrackerLogValue[]) => {
        return Object.values(data).map(entry => {
                return {
                    drinks: entry.drinks,
                    date: LocalDateTime.parse(entry.date.toString())
                }
            }
        );
    }

    updateLocalLog = (log: DrinkTrackerLogValue[]) => {
        const drinkCount = this.getDrinkCount(log);
        this.setState({
            log: log,
            drinkCount: drinkCount
        });
    }

    getDrinkCount = (log: DrinkTrackerLogValue[]) => {
        return log.map(drink => drink.drinks).reduce((accumulator, drinks) => accumulator + drinks);
    }

    updateDrinkInput = (drinkInput: number) => {
        this.setState(drinkInput > 0 ? {drinkInput: drinkInput, buttonDisabled: false} : {
            drinkInput: 0,
            buttonDisabled: true
        });
    }

    saveNewDrinks = () => {
        firebase.database().ref('drinks/').push({
            drinks: this.state.drinkInput,
            date: LocalDateTime.now().toString(),
        }).then(() => window.location.reload(true));
    }

    localDateTimeToUsTime = (dateTime: LocalDateTime) => {
        const dayHour = dateTime.hour();
        const ampmHour = dayHour === 0 || dayHour === 12 ? 12 : dayHour % 12;
        const min = dateTime.minute();
        const ampm = dayHour > 12 ? "PM" : "AM";
        return (`${ampmHour}:${min} ${ampm}`);
    }

    buildLog = () => {
        const {log} = this.state;
        return log.map((entry: DrinkTrackerLogValue) => {
            const drinkText = entry.drinks > 1 ? "Drinks" : "Drink";
            return `${entry.drinks} ${drinkText} ${this.localDateTimeToUsTime(entry.date)}`;
        });
    }

    clearDrinkHistory = () => {
        const emptyObject = {};
        firebase.database().ref('drinks/').set(emptyObject).then(() => window.location.reload(true));
    }

    getHistory = () => {
        if (this.state.drinkCount === 0) {
            return <></>;
        }
        return (
            <>
                <div className={styles.Log}>
                    {this.buildLog().map((entry, count) => <div key={`entry${count}`}>{entry}</div>)}
                </div>
                <div className={styles.Button}>
                    <button onClick={this.clearDrinkHistory}>
                        Clear
                    </button>
                </div>
            </>
        );
    }

    render() {
        return (
            <div className={styles.DrinkTracker}>
                <span className={styles.Total}>Daily Total: <b>{this.state.drinkCount}</b></span>
                <input type='number' value={this.state.drinkInput} placeholder={'Drinks to add'}
                       onChange={(e) => this.updateDrinkInput(parseInt(e.target.value))}/>
                <div className={styles.Button}>
                    <button disabled={this.state.drinkCount === 0} onClick={this.saveNewDrinks}>
                        Submit
                    </button>
                </div>
                {this.getHistory()}
            </div>
        )
    }
}