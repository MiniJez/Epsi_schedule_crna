import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import MenuBurger from '../layout/MenuBurger'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { addOneDayToDate, removeOneDayToDate } from '../../redux/action'
import { connect } from 'react-redux'
import { getLongDate, getWeekNumber } from '../../utils/utils'

class Header extends React.Component {
    constructor(props){
        super(props)
    }

    handleNextDay = () => {
        this.props.dispatch(addOneDayToDate(this.props.dateReducer.date))
    }

    handleNextWeek = () => {
        date = new Date(this.props.dateReducer.date).setDate(new Date(this.props.dateReducer.date).getDate()+6)
        this.props.dispatch(addOneDayToDate(date))
    }

    handlePrevDay = () => {
        this.props.dispatch(removeOneDayToDate(this.props.dateReducer.date))
    }

    handlePrevWeek = () => {
        date = new Date(this.props.dateReducer.date).setDate(new Date(this.props.dateReducer.date).getDate()-6)
        this.props.dispatch(removeOneDayToDate(date))
    }

    render() {

        const {
            type,
            date,
            navigation
        } = this.props

        return(
            <View style={styles.mainContainer}>
                <MenuBurger navigation={navigation} style={styles.menuBurger} containerStyle={styles.menuBurgerContainerStyle} size={40}></MenuBurger>
                {
                    type === 'jour' ?
                        <View style={styles.headerTitle}>
                            <TouchableOpacity
                            onPress={this.handlePrevDay}
                            >
                                <Icon name="keyboard-arrow-left" size={30} containerStyle={styles.icon}/>
                            </TouchableOpacity>
                            <View style={styles.dayContainer}>
                                <Text style={styles.day}>{getLongDate(new Date(date))}</Text>
                            </View>
                            <TouchableOpacity
                            onPress={this.handleNextDay}
                            >
                            <Icon name="keyboard-arrow-right" size={30} containerStyle={styles.icon}/>
                            </TouchableOpacity>
                        </View>
                    :
                        <View style={styles.headerTitle}>
                            <TouchableOpacity
                            onPress={this.handlePrevWeek}
                            >
                                <Icon name="keyboard-arrow-left" size={30} containerStyle={styles.icon}/>
                            </TouchableOpacity>
                            <View style={styles.dayContainer}>
                                <Text style={styles.day}>Semaine {getWeekNumber(new Date(date))}</Text>
                            </View>
                            <TouchableOpacity
                            onPress={this.handleNextWeek}
                            >
                            <Icon name="keyboard-arrow-right" size={30} containerStyle={styles.icon}/>
                            </TouchableOpacity>
                        </View>
                }
            </View>
        )
    }
}

mapStateToProps = (state) => {
    return state
}

const styles = StyleSheet.create({
    mainContainer: {
        height: 75,
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
        flexDirection: 'row'
    },
    menuBurgerContainerStyle: {
        height: '100%',
        justifyContent: 'flex-end',
    },
    menuBurger: {
        alignSelf: 'flex-start',
        margin: 5,
    },
    headerTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '75%',
        paddingBottom: 10
    },
    dayContainer: {
        height: '100%',
        justifyContent: 'flex-end'
    },
    day: {
        fontSize: 20,
        paddingBottom: 3,
        paddingHorizontal: 5
    },
    icon: {
        justifyContent: 'flex-end',
    }
})

export default connect(mapStateToProps)(Header)