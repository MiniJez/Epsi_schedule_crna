import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Card } from 'react-native-elements'

class ScheduleItem extends React.Component {
    render() {
        const item = this.props.item
        return(
            <Card title={`${item.debut} - ${item.fin}`} containerStyle={styles.card} dividerStyle={{backgroundColor: 'white'}}>
                <View style={styles.matiereContainer}>
                    <Text>{item.matiere}</Text>
                </View>
                <View style={styles.cardFooter}>
                    <Text style={styles.footerText}>{item.prof}</Text>
                    <Text style={styles.footerText}>{item.salle}</Text>
                </View>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        backgroundColor: '#00CE8D',
        borderColor: '#00E29B'
    },
    matiereContainer: {
        borderWidth: 1,
        //backgroundColor: 'lightgrey',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0,
        borderColor: '#2EE7AD',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#2EE7AD',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    footerText: {
        textAlignVertical: 'center',
        margin: 10
    }
})

export default ScheduleItem