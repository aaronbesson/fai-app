import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import firebase from 'firebase';
import {
    Container,
    Header,
    Content,
    Button,
    Text,
    Thumbnail,
    Left,
    View,
    Icon,
    Col,
    Row
} from 'native-base';

export default class ControlPanel extends Component {

    handleProfileButton = () => {
        console.log('testing');
    }

    _handleLogout() {
        firebase.auth().signOut()
        .then(()=>{
            AsyncStorage.removeItem('@usertoken:key')
            .then(() => {
                console.log('Log out successful.')
            })
            .catch(() => {
                console.error('Log out failure.');
            }); 
        })
    }

    render() {
        const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
        return (
        <Container style={styles.container}>
            <Header style={styles.header}>
                <Left>
                    <Thumbnail style={{marginTop:30}} large source={{uri: uri}} />
                    <Text style={styles.headingEmail}>example@gmail.com</Text>
                </Left>
            </Header>
            <Content style={{paddingTop:10}}>
                <TouchableOpacity disabled style={styles.navItem} onPress={() => console.log('test')}>
                    <Row>
                        <Col style={styles.navItemIcon}>
                            <Icon style={{opacity:0.7}} name="contact" />
                        </Col>
                        <Col style={styles.navItemText}>
                            <Text style={{opacity:0.7}}>Profile</Text>
                        </Col>
                    </Row>
                </TouchableOpacity>
                <TouchableOpacity disabled style={styles.navItem}>
                    <Row>
                        <Col style={styles.navItemIcon}>
                            <Icon style={{opacity:0.7}} name="list-box" />
                        </Col>
                        <Col style={styles.navItemText}>
                            <Text style={{opacity:0.7}}>My Parts List</Text>
                        </Col>
                    </Row>
                </TouchableOpacity>
                <TouchableOpacity disabled style={styles.navItem}>
                    <Row>
                        <Col style={styles.navItemIcon}>
                            <Icon style={{opacity:0.7}} name="mail" />
                        </Col>
                        <Col style={styles.navItemText}>
                            <Text style={{opacity:0.7}}>Inbox</Text>
                        </Col>
                    </Row>
                </TouchableOpacity>
                <TouchableOpacity disabled style={styles.navItem}>
                    <Row>
                        <Col style={styles.navItemIcon}>
                            <Icon style={{opacity:0.7}} name="cart" />
                        </Col>
                        <Col style={styles.navItemText}>
                            <Text style={{opacity:0.7}}>Shop</Text>
                        </Col>
                    </Row>
                </TouchableOpacity>
                <TouchableOpacity disabled style={styles.navItem}>
                    <Row>
                        <Col style={styles.navItemIcon}>
                            <Icon style={{opacity:0.7}} name="bookmark" />
                        </Col>
                        <Col style={styles.navItemText}>
                            <Text style={{opacity:0.7}}>Promos</Text>
                        </Col>
                    </Row>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => this._handleLogout()}>
                    <Row>
                        <Col style={styles.navItemIcon}>
                            <Icon name="log-out" />
                        </Col>
                        <Col style={styles.navItemText}>
                            <Text>Log out</Text>
                        </Col>
                    </Row>
                </TouchableOpacity>

            </Content>
        </Container>
        );
    }
}

const styles = new StyleSheet.create(
    {
        container: {
            flex:1
        },
        header: {
            paddingTop: 20,
            height: 200,
            backgroundColor: '#FC4141',
            borderBottomWidth: 0
        },
        headingEmail: {
            color: 'white',
            marginTop: 20
        },
        navItem: {
            paddingTop: 10,
            paddingBottom: 10
        },
        navItemIcon: {
            width: 50,
            paddingLeft: 10,
            paddingRight: 10
        },
        navItemText: {
            justifyContent: 'center'
        },
        navItemDisabled: {
            color: 'gray'
        }
    }
)