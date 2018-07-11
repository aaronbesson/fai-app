import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, Dimensions, Image, AsyncStorage } from 'react-native';
import { Button, Container } from 'native-base';
import firebase from 'firebase';
import Loader from './Loader';

import { apiurl, wpApiBaseUrl } from '../config';

import { connect } from 'react-redux';
import * as actions from '../lib/actions';

export default class Login extends Component {

    state = {
        email: '',
        password: '',
        error: '',
        token: '',
        loading: false
    };

    _handleLogginButtonPress = () => {
        console.log('logging in...');
        const { email, password } = this.state;
        this.setState({error: '', loading: true});

        // login to wordpress

        fetch(`${wpApiBaseUrl}/jwt-auth/v1/token`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    username: email,
                    password: password
                }
            )
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            // console.log(responseJson);
            if(responseJson.token) {
                console.log('success getting token');
                this.setState({token:responseJson.token})
                this._handleFirebaseAuth();
            } else {
                // handle login failure
                this._onAuthFailed();
                console.log(responseJson);
            }
        })
        .catch((err)=>console.error(err))
        
    };

    _handleFirebaseAuth() {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this._onAuthSuccess.bind(this))
        .catch((err) => {
            console.log(err);
            console.log(email, password);
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(this._onAuthSuccess.bind(this))
                .catch((err) => {
                    this._onAuthFailed.bind(this);
                    this.setState(
                        {
                            error: err.message,
                            loading: false
                        }
                    )
                });
        });  
    }

    _onAuthSuccess = () => {
        AsyncStorage.setItem('@usertoken:key', this.state.token );
        console.log('logged in!');
        this.setState(
            {
                email: '',
                error: '',
                loading: false
            }
        )
    }

    _onAuthFailed() {
        console.log('fail!');
        this.setState(
            {
                error: 'Authentication Failed',
                loading: false
            }
        )
    }

    _renderLoader() {
        if(this.state.loading) {
            return <Loader size="large" />
        } else {
            return (
                <Button full style={[styles.loginButton, styles.button]} onPress={this._handleLogginButtonPress}>
                    <Text style={{color:'white'}}>Login</Text>
                </Button>
            )
        }
    }
    
    render() {
        return (
            <Container style={styles.container}>
                    <Image style={styles.logoStyle} source={require('../assets/logo/logo.png')} />
                <TextInput
                    shadowColor={'#333'}
                    shadowOffset={{width:1, height:2}}
                    shadowOpacity={0.1}
                    style={styles.textInputStyle}
                    placeholder="Email"
                    onChangeText={email => this.setState({email})}
                />
                <TextInput
                    shadowColor={'#333'}
                    shadowOffset={{width:1, height:2}}
                    shadowOpacity={0.1}
                    style={styles.textInputStyle}
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={password => this.setState({password})}
                />
                {this._renderLoader()}
                <Text style={styles.errorMessage}>
                    {this.state.error}
                </Text>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fafafa'
    },
    logoStyle: {
        width: 301,
        height: 41,
        marginBottom: 50
    },
    textInputStyle: {
        width: Dimensions.get('window').width - 20,
        borderRadius: 5,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#fff',
        marginBottom: 10,
        height: 48
    },
    button: {
        borderRadius: 5,
        height: 48
    },
    loginButton: {
        marginBottom: 10,
        color: 'white',
        backgroundColor: '#FC4141'
    },
    fbbutton: {
        backgroundColor: '#3b5998',
    },
    errorMessage: {
        color: 'red',
        marginTop: 10
    }
});