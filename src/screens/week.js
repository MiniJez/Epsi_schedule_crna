import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Animated, Easing } from 'react-native'
import { connect } from 'react-redux'
import { getWeekNumber } from '../utils/utils'
import ScheduleItemWeek from '../component/scheduleItemWeek'
import Header from '../component/header'
import { getDateSelector } from '../redux/selector/dateSelector'
import { getUserSelector } from '../redux/selector/userSelector'
import { createLoadingSelector } from '../redux/selector/loadingSelector'
import { getScheduleSelector } from '../redux/selector/scheduleSelector'
import { getSchedule, setScheduleFromStorage } from '../redux/action/scheduleAction'
import AsyncStorage from '@react-native-community/async-storage'

class Week extends React.Component {

    state = {
        schedule: [],
        isLoading: true
    }

    animatedValue = new Animated.Value(0)

    async componentDidMount() {
        await this.getScheduleForWeek()
        this.handleAnimation()
    }

    async componentDidUpdate(prevProps) {
        const { date, loadingSchedule } = this.props

        if (date !== prevProps.state.date.date && getWeekNumber(new Date(date)) !== getWeekNumber(new Date(prevProps.state.date.date))) {
            this.setState({ isLoading: true })
            await this.getScheduleForWeek()
        }

        if (!loadingSchedule && prevProps.loadingSchedule && loadingSchedule !== prevProps.loadingSchedule) {
            this.setState({ isLoading: false })
        }
    }

    getScheduleForWeek = async () => {
        const { date, user, setScheduleFromStorage, getSchedule } = this.props

        getSchedule(date, user)

        let schedule = await AsyncStorage.getItem('schedule')
        schedule = JSON.parse(schedule)
        if (schedule[getWeekNumber(new Date(date))] !== undefined) {
            setScheduleFromStorage(schedule, date)
            this.setState({ isLoading: false })
        }
    }

    handleAnimation = () => {
        Animated.timing(this.animatedValue, {
            toValue: 1,
            duration: 900,
            //easing: Easing.linear
        }).start(() => {
            this.animatedValue.setValue(0)
            this.handleAnimation()
        });
    }

    render() {

        const { schedule, navigation, loadingSchedule } = this.props
        const { isLoading } = this.state

        let left = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-200, 500]
        });

        return (
            <View style={styles.mainContainer}>
                <Header navigation={navigation} />
                <View style={{ width: '100%', height: 5 }}>
                    {loadingSchedule && !isLoading && <Animated.View style={{ position: 'absolute', left: left, backgroundColor: '#61829F', height: 5, width: 200, borderRadius: 25 }} />}
                </View>
                {
                    this.state.isLoading ?
                        <View style={styles.activityIndicator}>
                            <ActivityIndicator size="large" />
                        </View>
                        :
                        schedule.length > 0 ?
                            <ScheduleItemWeek schedule={schedule} navigation={navigation}></ScheduleItemWeek>
                            :
                            <View style={styles.noLessonContainer}>
                                <Text style={styles.noLessonText}>Aucun cours prévus cette semaine 🎉😁👍👌</Text>
                            </View>
                }
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        state,
        date: getDateSelector(state),
        user: getUserSelector(state),
        loadingSchedule: createLoadingSelector(['GET_SCHEDULE'])(state),
        schedule: getScheduleSelector(state)
    };
};

const mapDispatchToProps = {
    getSchedule,
    setScheduleFromStorage
};

export default connect(mapStateToProps, mapDispatchToProps)(Week);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        borderWidth: 1
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noLessonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noLessonText: {
        fontSize: 25,
        textAlign: 'center'
    },
    rowCardContainer: {
        flexDirection: 'row',
        flex: 1
    },
    colCardContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    card: {
        height: '40%',
        width: '90%',
        marginBottom: 5,
        padding: 0
    },
    titleCard: {
        fontSize: 15
    },
    textDay: {
        textAlign: 'center'
    },
    matiere: {
        fontSize: 10,
        marginTop: 20
    },
    salle: {
        fontSize: 15
    },
    infoContainer: {
        width: '95%',
        height: '63%',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center'
    }
})