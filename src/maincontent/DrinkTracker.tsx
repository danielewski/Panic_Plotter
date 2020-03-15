import React from 'react'
import styles from './DrinkTracker.module.scss'
import {DrinkTrackerLogValue} from "../models/DrinkTrackerLog";
import {LocalDateTime} from 'js-joda'
import * as firebase from "firebase";

export default class DrinkTracker extends React.Component {

    componentDidMount() {
        // let log: DrinkTrackerLogValue[] = [];
        // firebase.database().ref().once('value').then(function (snapshot) {
        //     log = (snapshot.val());
        //     for (let entry in log){
        //         console.log({entry})
        //     }
        // });
        // this.updateLog(log);
    }

    state = {
        drinkInput: 0,
        drinkCount: 0,
        log: [] as DrinkTrackerLogValue[],
        buttonDisabled: true
    }

    updateLog = (log: DrinkTrackerLogValue[]) => {
        this.setState({log: log});
    }

    updateDrinkInput = (drinkInput: number) => {
        this.setState(drinkInput > 0 ? {drinkInput: drinkInput, buttonDisabled: false} : {
            drinkInput: 0,
            buttonDisabled: true
        });
    }

    updateDrinkCount = () => {
        const {drinkInput, drinkCount, log} = this.state;
        const updatedDrinkCount: number = drinkInput + drinkCount;
        log.unshift({date: LocalDateTime.now(), drinks: drinkInput});
        this.setState({drinkCount: updatedDrinkCount, drinkInput: 0, log, buttonDisabled: true});
    }

    localDateTimeToUsTime = (dateTime: LocalDateTime) => {
        const dayHour = dateTime.hour();
        const ampmHour = dayHour % 12;
        const min = dateTime.minute();
        const ampm = dayHour > 12 ? "PM" : "AM";
        return (`${ampmHour}:${min} ${ampm}`);
    }

    buildLog = () => {
        const {log} = this.state;
        return log.map((entry) => {
            const drinkText = entry.drinks > 1 ? "Drinks" : "Drink";
            return `${entry.drinks} ${drinkText} ${this.localDateTimeToUsTime(entry.date)}`;
        });
    }

    render() {
        return (
            <div className={styles.DrinkTracker}>
                <span className={styles.Total}>Daily Total: <b>{this.state.drinkCount}</b></span>
                <input type='number' value={this.state.drinkInput} placeholder={'Drinks to add'}
                       onChange={(e) => this.updateDrinkInput(parseInt(e.target.value))}/>
                <div className={styles.Submit}>
                    <button disabled={this.state.buttonDisabled} onClick={this.updateDrinkCount}>
                        Submit
                    </button>
                </div>
                <div className={styles.Log}>
                    {this.buildLog().map((entry) => <div>{entry}</div>)}
                </div>
            </div>
        )
    }
}