import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Card } from 'react-native-elements'

class ScheduleItemWeek extends React.Component {
    render() {

        const {
            item
        } = this.props

        return(
            <Card title={`${item.debut} - ${item.fin}`} containerStyle={styles.card}>

            </Card>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        
    }
})

export default ScheduleItemWeek