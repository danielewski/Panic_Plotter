import React from 'react'
import {DrinkTrackerLogValue} from "../models/DrinkTrackerLog";
import * as firebase from "firebase";
import {connect} from "react-redux";
import {AppState} from '../config/StoreConfiguration';
import * as DrinkTrackerSelectors from "../reduxstate/DrinkTrackerSelectors";
import {LocalDateTime} from "js-joda";
import {Dispatch} from "redux";
import styles from './DrinkTracker.module.scss'

type Props = StateProps & DispatchProps;

class DrinkTracker extends React.Component<Props> {
    state = {
        drinkInput: 0,
    }

    getDrinkCount = (log: DrinkTrackerLogValue[]) => {
        return log.map(drink => drink.drinks).reduce((accumulator, drinks) => accumulator + drinks);
    }

    updateDrinkInput = (drinkInput: number) => {
        console.log(this.props.drinkLog);
        this.setState(drinkInput > 0 ? {drinkInput: drinkInput, buttonDisabled: false} : {
            drinkInput: 0
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
        const {drinkLog} = this.props;
        return drinkLog.map((entry: DrinkTrackerLogValue) => {
            const drinkText = entry.drinks > 1 ? "Drinks" : "Drink";
            return `${entry.drinks} ${drinkText} ${this.localDateTimeToUsTime(entry.date)}`;
        });
    }

    clearDrinkHistory = () => {
        const emptyObject = {};
        firebase.database().ref('drinks/').set(emptyObject).then(() => window.location.reload(true));
    }

    getHistory = () => {
        if (this.props.drinkLog.length === 0) {
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
        console.log(this.props.drinkCount);
        return (
            <div className={styles.DrinkTracker}>
                <span className={styles.Total}>Daily Total: <b>{this.props.drinkCount}</b></span>
                <input type='number' value={this.state.drinkInput} placeholder={'Drinks to add'}
                       onChange={(e) => this.updateDrinkInput(parseInt(e.target.value))}/>
                <div className={styles.Button}>
                    <button disabled={this.props.drinkCount === 0} onClick={this.saveNewDrinks}>
                        Submit
                    </button>
                </div>
                {this.getHistory()}
            </div>
        )
    }

}

type StateProps = ReturnType<typeof mapStateToProps>;
const mapStateToProps = (state: AppState) => ({
    drinkLog: DrinkTrackerSelectors.drinkTrackerLogSelector(state),
    drinkCount: DrinkTrackerSelectors.drinkTrackerSumSelector(state)
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DrinkTracker);