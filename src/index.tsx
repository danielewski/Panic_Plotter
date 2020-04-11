import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import configureStore, {AppState} from "./config/StoreConfiguration";
import {Store} from 'redux';
import {getInitialData} from "./reduxstate/DrinkTrackerActions";

interface Props {
    store: Store<AppState>
}

const Root: React.SFC<Props> = props => {
    return (
        <Provider store={props.store}>
            <App/>
        </Provider>
    );
};

const store = configureStore();
store.dispatch(getInitialData());

ReactDOM.render(<Root store={store}/>, document.getElementById(
    'root'
) as HTMLElement);

serviceWorker.unregister();
