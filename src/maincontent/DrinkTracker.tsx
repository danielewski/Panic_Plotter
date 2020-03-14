import React from 'react'
import Styles from './DrinkTracker.module.scss'

export default class DrinkTracker extends React.Component {
    render() {
        return (
            <div className={Styles.DrinkTracker}>
                <button onClick={() => alert("Thanks for clicking this useless button. What are you even doing here?")}>
                    Useless
                </button>
            </div>
        )
    }
}