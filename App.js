import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './src/lib/reducers/PartReducer';
import Thunk from 'redux-thunk';
import Login from './src/components/Login';
import Loader from './src/components/Loader';
import PartsList from './src/components/PartsList';

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(Thunk));

export default class App extends Component {
    state = {
        loggedIn: null,
        loading: true
    }
    
    _openDrawer = () => {
        this._openDrawer.open()
    }

    _closeDrawer = () => {
        this._openDrawer.close()
    }

    componentWillMount() {
        this.setState({ loading: false });

        firebase.initializeApp({
            apiKey: "AIzaSyBapJKYDNxHPF6fEN3ICaCOafSGpKWimrE",
            authDomain: "filter-and-industrial-app.firebaseapp.com",
            databaseURL: "https://filter-and-industrial-app.firebaseio.com",
            projectId: "filter-and-industrial-app",
            storageBucket: "filter-and-industrial-app.appspot.com",
            messagingSenderId: "483513992730"
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderInitialView() {
        switch (this.state.loggedIn) {
            case true:
                return <PartsList />
            case false:
                return <Login />;
            default:
                return <Loader size="large" />
        }
    }
    
    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    {this.renderInitialView()}
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});