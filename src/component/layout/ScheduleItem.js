import React from 'react'
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native'
import { Card } from 'react-native-elements'

class ScheduleItem extends React.Component {
    render() {
        const item = this.props.item
        return(
            <Card title={`${item.debut} - ${item.fin}`} containerStyle={styles.card}>
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
        elevation: 5
    },
    matiereContainer: {
        borderWidth: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0,
        borderColor: 'lightgrey'
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'lightgrey'
    },
    footerText: {
        textAlignVertical: 'center',
        margin: 10
    }
})

export default ScheduleItem