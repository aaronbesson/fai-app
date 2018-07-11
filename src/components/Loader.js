import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

const styles = StyleSheet.create({
    loader: {
        marginBottom: 10,
        height: 48
    }
});

const Loader = ({ size }) => {
    return(
        <View style={styles.loader}>
            <ActivityIndicator size={size || 'small'} color="#EE2626" />
        </View>        
        );
};

export default Loader;