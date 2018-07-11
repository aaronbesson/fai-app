import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Content, Left, Right, Button, Icon, Body, Title, List, StyleProvider, Text } from 'native-base';
import Drawer from 'react-native-drawer';
import * as actions from '../lib/actions';
import ControlPanel from './ControlPanel.js';
import PartsList from './PartsList.js';

class Parts extends Component {

    state = {
        title: 'My Parts List',
        addPartView: false,
        drawerOpen: false
    }

    closeControlPanel = () => {
        this._drawer.close()
    };

    openControlPanel = () => {
        this._drawer.open()
    };

    _onAddButtonPress() {
       this.setState({addPartView: true, title: 'Add New Part'});
    }

    _renderHeader() {
        return (
            <Header>
                <Left>
                    <Button transparent onPress={this._toggleDrawer.bind(this)}>
                        <Icon name="menu" />
                    </Button>
                </Left>
                <Body>
                    <Title>My Parts List</Title>
                </Body>
                <Right>
                    <Button onPress={this._onAddButtonPress.bind(this)} transparent>
                        <Icon name='add' />
                    </Button>
                </Right>
            </Header>
        )
    }

    render() {
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="static"
                content={
                    <ControlPanel />
                }
                acceptDoubleTap
                styles={{main: {shadowColor: '#000000', shadowOpacity: 0.3, shadowRadius: 15}}}
                onOpen={() => {
                    console.log('onopen')
                    this.setState({drawerOpen: true})
                }}
                onClose={() => {
                    console.log('onclose')
                    this.setState({drawerOpen: false})
                }}
                captureGestures={false}
                tweenDuration={100}
                panThreshold={0.08}
                disabled={this.state.drawerDisabled}
                openDrawerOffset={(viewport) => {
                    return 100
                }}
                panOpenMask={0.2}
                negotiatePan
                >
                <Container style={styles.container}>
                    {this._renderHeader()}
                    <Content>
                        <PartsList />
                    </Content>
                </Container>
            </Drawer>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            width: Dimensions.get('window').width
        }
    }
)

const mapStateToProps = (state) => {
    const { addPartView, drawerOpen } = state;

    return {
        addPartView,
        drawerOpen
    }
}

export default connect(mapStateToProps, null)(Parts);