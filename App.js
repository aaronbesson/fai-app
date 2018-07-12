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
            apiKey: "AIzaSyCX4VSs-0vNU1t6F_AZU5c_obA4d9DoIYk",
            authDomain: "filter-and-industrial-a3c23.firebaseapp.com",
            databaseURL: "https://filter-and-industrial-a3c23.firebaseio.com",
            projectId: "filter-and-industrial-a3c23",
            storageBucket: "filter-and-industrial-a3c23.appspot.com",
            messagingSenderId: "281438456060"
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