import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { addDayToDate, removeDayToDate } from '../redux/action/dateAction'
import { connect } from 'react-redux'
import { getWeekNumber } from '../utils/utils'
import { getDateSelector } from '../redux/selector/dateSelector'

class Header extends React.Component {

    handleNextWeek = () => {
        const { date } = this.props

        let newDate = new Date(date).setDate(new Date(date).getDate() + 6)
        this.props.addDayToDate(newDate)
    }

    handlePrevWeek = () => {
        const { date } = this.props

        let newDate = new Date(date).setDate(new Date(date).getDate() - 6)
        this.props.removeDayToDate(newDate)
    }

    render() {

        const { date, navigation } = this.props

        return (
            <View style={styles.weekContainer}>
                <TouchableOpacity
                    onPress={this.handlePrevWeek}
                >
                    <Icon name="keyboard-arrow-left" size={35} containerStyle={styles.icon} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.day}>Semaine {getWeekNumber(new Date(date))}</Text>
                </View>
                <TouchableOpacity
                    onPress={this.handleNextWeek}
                >
                    <Icon name="keyboard-arrow-right" size={35} containerStyle={styles.icon} />
                </TouchableOpacity>
                <Icon name="logout" type="material-community" size={30} containerStyle={styles.iconLogout} onPress={() => navigation.navigate('Welcome')}/>
            </View>
        )
    }
}

mapStateToProps = (state) => {
    return {
        state,
        date: getDateSelector(state)
    }
}

mapDispatchToProps = {
    addDayToDate,
    removeDayToDate
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

const styles = StyleSheet.create({
    weekContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    day: {
        fontSize: 25,
        paddingHorizontal: 5,
    },
    icon: {
        paddingHorizontal: 5,
        paddingTop: 5
    },
    iconLogout: {
        position: 'absolute',
        right: 10
    }
})