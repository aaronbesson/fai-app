import React, { Component } from 'react';
import { StyleSheet, ListView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Container, Header, Content, Left, Right, Button, Icon, Body, Title, List, StyleProvider, Text } from 'native-base';
import PartItem from './PartItem';
import AddParts from './AddParts';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import Drawer from 'react-native-drawer';
import * as actions from '../lib/actions';
import ControlPanel from './ControlPanel';
import { wpApiBaseUrl } from '../config';
import Loader from './Loader';

class PartsList extends Component {

    state = {
        title: 'My Parts List',
        drawerOpen: false,
        addPartView: false
    }

    componentWillMount() {
        this.props.showLoader();
        this.props.replaceInitialParts();
    }

    onDrawerButtonPress = () => {
        if(this.state.drawerOpen) {
            this.setState({drawerOpen: false});
            this._drawer.close();
        } else {
            this.setState({drawerOpen: true});
            this._drawer.open();
        }
    }

    handleAddButton = () => {
        this.setState({ title: 'Add New Part', addPartView: true });
    }

    handleMoreButton = () => {
        alert('test');
    }

    handleCancelButton = () => {
        this.setState({ title: 'My Parts List', addPartView: false });
    }
    
    renderList() {
        console.log(this.props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(this.props.parts);

        if(this.props.loading) {
            return (
                <Container style={styles.loaderContainer}>
                    <Loader size="large" />
                </Container>
            )
        } else {
            if(this.state.addPartView) {
                return (
                    <AddParts/>
                )
            } else {
                return (
                    <ListView
                        dataSource={this.dataSource}
                        renderRow={(rowData) => <PartItem parts={rowData} />}
                    />
                )
            }
        }
    }

    renderAddButton = () => {
        if(this.state.addPartView) {
            return (
                <Right>
                    <Button transparent onPress={this.handleCancelButton.bind(this)}>
                        <Text style={{color:'white'}}>Cancel</Text>
                    </Button>
                </Right>
            )
        } else {
            return (
                <Right>
                    <Button transparent onPress={this.handleAddButton.bind(this)}>
                        <Icon name='add' style={styles.headerButtons} />
                    </Button>
                    <Button transparent onPress={this.handleMoreButton.bind(this)}>
                        <Icon name='more' style={styles.headerButtons} />
                    </Button>
                </Right>
                
            )
        }
    }

    renderHeader() {
        return (
            <Header style={styles.header}>
                <Left>
                    <Button transparent onPress={this.onDrawerButtonPress.bind(this)}>
                        <Icon name="contact" style={styles.headerButtons} />
                    </Button>
                </Left>
                <Body>
                    <Title>{this.state.title}</Title>
                </Body>
                {this.renderAddButton()}
            </Header>
        )
    }

    render() {
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                content={
                    <ControlPanel />
                }
                acceptDoubleTap
                styles={{main: {shadowColor: '#000000', shadowOpacity: 0.3, shadowRadius: 15}}}
                onOpen={() => {
                    this.setState({drawerOpen: true})
                }}
                onClose={() => {
                    this.setState({drawerOpen: false})
                }}
                captureGestures={false}
                tweenDuration={200}
                panThreshold={0.08}
                disabled={this.state.drawerDisabled}
                openDrawerOffset={(viewport) => {
                    return 50
                }}
                panOpenMask={0.2}
                negotiatePan
                >
                <StyleProvider style={getTheme(material)}>
                    <Container style={styles.container}>
                        {this.renderHeader()}
                        <Content>
                            <List style={{paddingTop:20,paddingBottom:20}}>
                                {this.renderList()}
                            </List>
                        </Content>
                    </Container>
                </StyleProvider>
            </Drawer>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            width: Dimensions.get('window').width
        },
        loaderContainer: {
            flex:1,
            justifyContent: 'center'
        },
        header: {
            backgroundColor: '#FC4141'
        },
        headerButtons: {
            color: '#fff'
        }
    }
)

const mapStateToProps = (state) => {
    const { drawerOpen, hideLoader, loading, addPartView } = state;

    const parts = _.map(state.parts, (val,uid) => {
        return { ...val, uid }
    });

    return {
        parts,
        drawerOpen,
        hideLoader,
        loading,
        addPartView
    }
}
export default connect(mapStateToProps, actions)(PartsList);