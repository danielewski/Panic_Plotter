import React from 'react';
import styles from './App.module.scss';
import DrinkTracker from "./maincontent/DrinkTracker";
import * as firebase from "firebase";
import {firebaseConfig} from "./models/FirebaseConfig";

function App() {
    return (
        <div className={styles.App}>
            <DrinkTracker/>
        </div>
    );
}

firebase.initializeApp(firebaseConfig);
export default App;
