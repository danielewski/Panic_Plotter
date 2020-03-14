import React from 'react';
import styles from './App.module.scss';
import DrinkTracker from "./maincontent/DrinkTracker";

function App() {
    return (
        <div className={styles.App}>
            <DrinkTracker/>
        </div>
    );
}

export default App;
