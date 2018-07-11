import React, { Component } from 'react';
import { StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import { Container, Content, Button, Text, Form, Item, Input } from 'native-base';
import Loader from './Loader';

import { connect } from 'react-redux';
import * as actions from '../lib/actions';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const Base64 = {
    btoa: (input = '')  => {
        let str = input;
        let output = '';

        for (let block = 0, charCode, i = 0, map = chars;
        str.charAt(i | 0) || (map = '=', i % 1);
        output += map.charAt(63 & block >> 8 - i % 1 * 8)) {

        charCode = str.charCodeAt(i += 3/4);

        if (charCode > 0xFF) {
            throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
        }
        
        block = block << 8 | charCode;
        }
        
        return output;
    },

    atob: (input = '') => {
        let str = input.replace(/=+$/, '');
        let output = '';

        if (str.length % 4 == 1) {
        throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
        }
        for (let bc = 0, bs = 0, buffer, i = 0;
        buffer = str.charAt(i++);

        ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
            bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
        ) {
        buffer = chars.indexOf(buffer);
        }

        return output;
    }
};

class AddParts extends Component {
    state = {
        token: '',
        loading: false
    }

    componentWillMount() {
        AsyncStorage.getItem('@usertoken:key', (err,result) => {
            this.setState({token: result})
        });
    }

    _handleSubmitButtonPress = () => {
        // console.log(this.state.token);
        this.props.showLoader();
        const { token } = this.state;
        const { machineNumberUnitNumberOrRego, oilFIlter1, oilFilter2, fuelFilter1, fuelFilter2, airFilterInner, airFilterOuter, hydraulicFilter1, hydraulicFilter2, transmissionFilter, steeringFilter, coolantFilter, cabinAirFilter, serviceInterval, companyName, loading } = this.props;
        this.props.createNewPart({ token, machineNumberUnitNumberOrRego, oilFIlter1, oilFilter2, fuelFilter1, fuelFilter2, airFilterInner, airFilterOuter, hydraulicFilter1, hydraulicFilter2, transmissionFilter, steeringFilter, coolantFilter, cabinAirFilter, serviceInterval, companyName});
    }

    _renderLoader() {
        if(this.props.loading) {
            return <Loader size="small" />
        } else {
            return (
                <Button transparent onPress={this._handleSubmitButtonPress.bind(this)}>
                    <Text>Submit</Text>
                </Button>
            )
        }
    }

    render() {
        const { machineNumberUnitNumberOrRego, oilFIlter1, oilFilter2, fuelFilter1, fuelFilter2, airFilterInner, airFilterOuter, hydraulicFilter1, hydraulicFilter2, transmissionFilter, steeringFilter, coolantFilter, cabinAirFilter, serviceInterval, companyName} = this.props;

        return (
            <Container>

                <Content>
                    <Form style={{width: Dimensions.get('window').width}}>
                        <Item>
                            <Input
                                style={styles.textInputStyle}
                                placeholder="Machine no., unit no., or rego *"
                                value={machineNumberUnitNumberOrRego}
                                onChangeText={value => this.props.formUpdate({prop: 'machineNumberUnitNumberOrRego', value})}
                            />
                        </Item>
                        
                        <Item>
                            <Input
                                style={styles.textInputStyle}
                                placeholder="Oil filter"
                                value={oilFIlter1}
                                onChangeText={value => this.props.formUpdate({prop: 'oilFIlter1', value})}
                            />
                        </Item>
                        
                        <Item>
                            <Input
                                style={styles.textInputStyle}
                                placeholder="Oil filter no. 2"
                                value={oilFilter2}
                                onChangeText={value => this.props.formUpdate({prop: 'oilFilter2', value})}
                            />
                        </Item>
                        
                        <Item>
                            <Input
                                style={styles.textInputStyle}
                                placeholder="Fuel filter"
                                value={fuelFilter1}
                                onChangeText={value => this.props.formUpdate({prop: 'fuelFilter1', value})}
                            />
                        </Item>
                        
                        <Item>
                            <Input
                                style={styles.textInputStyle}
                                placeholder="Fuel filter no. 2"
                                value={fuelFilter2}
                                onChangeText={value => this.props.formUpdate({prop: 'fuelFilter2', value})}
                            />
                        </Item>
                        
                        <Item>
                            <Input
                                style={styles.textInputStyle}
                                placeholder="Air filter inner"
                                value={airFilterInner}
                                onChangeText={value => this.props.formUpdate({prop: 'airFilterInner', value})}
                            />
                        </Item>
                        
                        <Item>
                            <Input
                                style={styles.textInputStyle}
                                placeholder="Air filter outer"
                                value={airFilterOuter}
                                onChangeText={value => this.props.formUpdate({prop: 'airFilterOuter', value})}
                            />
                        </Item>
                        
                        <Item>
                            <Input
                                style={styles.textInputStyle}
                                placeholder="Hydraulic filter"
                                value={hydraulicFilter1}
                                onChangeText={value => this.props.formUpdate({prop: 'hydraulicFilter1', value})}
                            />
                        </Item>
                        
                        <Item>
                            <Input
                                style={styles.textInputStyle}
                                placeholder="Hydraulic filter no. 2"
                                value={hydraulicFilter2}
                                onChangeText={value => this.props.formUpdate({prop: 'hydraulicFilter2', value})}
                            />
                        </Item>
                        
                        <Item>
                            <Input
                                style={styles.textInputStyle}
                                placeholder="Transmission filter"
                                value={transmissionFilter}
                                onChangeText={value => this.props.formUpdate({prop: 'transmissionFilter', value})}
                            />
                        </Item>
                        
                        <Item>
                            <Input
                                style={styles.textInputStyle}
                                placeholder="Steering filter"
                                value={steeringFilter}
                                onChangeText={value => this.props.formUpdate({prop: 'steeringFilter', value})}
                            />
                        </Item>
                        
                        <Item>
                            <Input
                                style={styles.textInputStyle}
                                placeholder="Coolant filter"
                                value={coolantFilter}
                                onChangeText={value => this.props.formUpdate({prop: 'coolantFilter', value})}
                            />
                        </Item>
                        
                        <Item>
                            <Input
                                style={styles.textInputStyle}
                                placeholder="Cabin air filter"
                                value={cabinAirFilter}
                                onChangeText={value => this.props.formUpdate({prop: 'cabinAirFilter', value})}
                            />
                        </Item>
                        
                        <Item>
                            <Input
                                style={styles.textInputStyle}
                                placeholder="Service interval"
                                value={serviceInterval}
                                onChangeText={value => this.props.formUpdate({prop: 'serviceInterval', value})}
                            />
                        </Item>
                        
                        <Item last>
                            <Input
                                style={styles.textInputStyle}
                                placeholder="Company name (for reordering)"
                                value={companyName}
                                onChangeText={value => this.props.formUpdate({prop: 'companyName', value})}
                            />
                        </Item>
                        <Item>
                            {this._renderLoader()}
                        </Item>
                    </Form>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    textInputStyle: {
        width: Dimensions.get('window').width,
        padding: 15,
        marginBottom: 10,
    },
});

const mapStateToProps = state => {
    const { token, machineNumberUnitNumberOrRego, oilFIlter1, oilFilter2, fuelFilter1, fuelFilter2, airFilterInner, airFilterOuter, hydraulicFilter1, hydraulicFilter2, transmissionFilter, steeringFilter, coolantFilter, cabinAirFilter, serviceInterval, companyName, loading } = state;
    return {
        token,
        machineNumberUnitNumberOrRego,
        oilFIlter1,
        oilFilter2,
        fuelFilter1,
        fuelFilter2,
        airFilterInner,
        airFilterOuter,
        hydraulicFilter1,
        hydraulicFilter2,
        transmissionFilter,
        steeringFilter,
        coolantFilter,
        cabinAirFilter,
        serviceInterval,
        companyName,
        loading
    };
};
  
export default connect(mapStateToProps, actions)(AddParts);