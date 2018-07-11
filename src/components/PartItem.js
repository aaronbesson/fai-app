import React from 'react';
import { ListItem } from 'native-base';
import { Text, View, TouchableWithoutFeedback, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import * as actions from '../lib/actions';

const PartItem = (props) => {

    GetTimeElapsed = (datetime) => {
        const since = Date.parse(datetime),
              elapsed = (new Date().getTime() - since) / 1000;
      
        if (elapsed >= 0) {
            const diff = {};
        
            diff.days    = Math.floor(elapsed / 86400);
            diff.hours   = Math.floor(elapsed / 3600 % 24);
            diff.minutes = Math.floor(elapsed / 60 % 60);
            diff.seconds = Math.floor(elapsed % 60);

            // let wholeTimeElapsed = `${diff.days} days, ${diff.hours} hours, ${diff.minutes} minutes, ${diff.seconds} seconds ago.`;
            let message = `${diff.days} days ago`;
            message = message.replace(/(?:0. )+/, '');
            return message;
        }
        else {
            console.log('Elapsed time lesser than 0, i.e. specified datetime is still in the future.');
        }
    };  

    return (
        <ListItem style={{borderBottomWidth:0}}>
            <TouchableWithoutFeedback onPress={() => props.selectPart(props.parts)}>
                <View style={styles.item}>
                    <Text style={styles.itemTitle}>{props.parts.title.rendered.toUpperCase()}</Text>
                    <Text style={styles.itemCreatedAt}>{this.GetTimeElapsed(props.parts.date)}</Text>
                </View>
            </TouchableWithoutFeedback>
        </ListItem>
    );
};

const styles = new StyleSheet.create(
    {
        item: {
            paddingTop: 5,
            paddingBottom: 5
        },
        itemTitle: {
            fontSize: 16,
            marginBottom: 10
        },
        itemCreatedAt: {
            fontSize: 14,
            opacity: 0.55
        }
    }
)

export default connect(null, actions)(PartItem);