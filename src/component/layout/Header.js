import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import MenuBurger from '../layout/MenuBurger'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { addOneDayToDate, removeOneDayToDate } from '../../redux/action'
import { connect } from 'react-redux'
import { getLongDate } from '../../utils/utils'

class Header extends React.Component {
    constructor(props){
        super(props)
    }

    handleNextDay = () => {
        this.props.dispatch(addOneDayToDate(this.props.state.date))
    }

    handlePrevDay = () => {
        this.props.dispatch(removeOneDayToDate(this.props.state.date))
    }

    render() {
        return(
            <View style={styles.mainContainer}>
                <MenuBurger navigation={this.props.navigation} style={styles.menuBurger} containerStyle={styles.menuBurgerContainerStyle} size={40}></MenuBurger>
                <View style={styles.headerTitle}>
                    <TouchableOpacity
                    onPress={this.handlePrevDay}
                    >
                        <Icon name="keyboard-arrow-left" size={30} containerStyle={styles.icon}/>
                    </TouchableOpacity>
                    <View style={styles.dayContainer}>
                        <Text style={styles.day}>{getLongDate(new Date(this.props.state.date))}</Text>
                    </View>
                    <TouchableOpacity
                    onPress={this.handleNextDay}
                    >
                      <Icon name="keyboard-arrow-right" size={30} containerStyle={styles.icon}/>
                    </TouchableOpacity>
                </View>
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