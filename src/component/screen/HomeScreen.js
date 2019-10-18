import React, { Fragment } from 'react'
import { View, ActivityIndicator, StyleSheet, FlatList, Text } from 'react-native'
import { getEpsiScheduleDay, getEpsiScheduleWeek } from '../../Api/epsiScheduleApi'
import ScheduleItem from '../layout/ScheduleItem'
import ScheduleItemWeek from '../layout/ScheduleItemWeek'
import Header from '../layout/Header'
import { connect } from 'react-redux'
import { getWeekNumber, getLongDate, getAllWeekDays } from '../../utils/utils'
import { Card } from 'react-native-elements'

class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            schedule: [],
            isLoading: true
        }
    }

    async componentDidMount() {
        let date = this.props.state.date
        let res = await getEpsiScheduleWeek(date)
        this.setState({schedule: res, isLoading: false})
    }

    async componentDidUpdate(prevProps) {
        if(this.props.state.date !== prevProps.state.date && getWeekNumber(new Date(this.props.state.date)) !==  getWeekNumber(new Date(prevProps.state.date))){
            this.setState({isLoading: true})
            let res = await getEpsiScheduleWeek(this.props.state.date)
            this.setState({schedule: res, isLoading: false})
        }
    }

    render() {

        let display = this.props.navigation.getParam('display', undefined)
        display = display ? display : 'jour'
        const allDays = getAllWeekDays(new Date(this.props.state.date))
        let allDaysWeek

        if(!this.state.isLoading) {
            this.state.schedule.forEach(item => {
                item.debut = `${item.debut.slice(0, 2)}:${item.debut.slice(3, 5)}:00`
                item.fin = `${item.fin.slice(0, 2)}:${item.fin.slice(3, 5)}:00`
            })

            allDaysWeek = [
                {
                    item: this.state.schedule.filter(item => item.date.slice(0, 3) === 'Lun' && item.debut >= '08:00:00' && item.fin <= '13:00:00')
                },
                {
                    item: this.state.schedule.filter(item => item.date.slice(0, 3) === 'Lun' && item.debut >= '13:00:00' && item.fin <= '17:00:00')
                },
                {
                    item: this.state.schedule.filter(item => item.date.slice(0, 3) === 'Mar' && item.debut >= '08:00:00' && item.fin <= '13:00:00')
                },
                {
                    item: this.state.schedule.filter(item => item.date.slice(0, 3) === 'Mar' && item.debut >= '13:00:00' && item.fin <= '17:00:00')
                },
                {
                    item: this.state.schedule.filter(item => item.date.slice(0, 3) === 'Mer' && item.debut >= '08:00:00' && item.fin <= '13:00:00')
                },
                {
                    item: this.state.schedule.filter(item => item.date.slice(0, 3) === 'Mer' && item.debut >= '13:00:00' && item.fin <= '17:00:00')
                },
                {
                    item: this.state.schedule.filter(item => item.date.slice(0, 3) === 'Jeu' && item.debut >= '08:00:00' && item.fin <= '13:00:00')
                },
                {
                    item: this.state.schedule.filter(item => item.date.slice(0, 3) === 'Jeu' && item.debut >= '13:00:00' && item.fin <= '17:00:00')
                },
                {
                    item: this.state.schedule.filter(item => item.date.slice(0, 3) === 'Ven' && item.debut >= '08:00:00' && item.fin <= '13:00:00')
                },
                {
                    item: this.state.schedule.filter(item => item.date.slice(0, 3) === 'Ven' && item.debut >= '13:00:00' && item.fin <= '17:00:00')
                }
            ]
        }

        return(
            <View style={styles.mainContainer}>
                {
                    this.state.isLoading ? 
                        <View style={styles.activityIndicator}>
                            <ActivityIndicator size="large"/>
                        </View>
                    :
                        display === 'jour' ?
                            <Fragment>
                                <Header navigation={this.props.navigation} date={this.props.state.date} type='jour'></Header>
                                {
                                    this.state.schedule.filter(item => item.date.toLowerCase() === getLongDate(new Date(this.props.state.date))).length > 0 ?
                                        <FlatList
                                            data={this.state.schedule.filter(item => item.date.toLowerCase() === getLongDate(new Date(this.props.state.date)))}
                                            renderItem={({ item }) => <ScheduleItem item={item}></ScheduleItem>}
                                            keyExtractor={item => item.id}
                                        />
                                    :
                                        <View style={styles.noLessonContainer}>
                                            <Text style={styles.noLessonText}>Aucun cours prévues 🎉😁👍👌</Text>
                                        </View>
                                }
                            </Fragment>
                        :
                            <Fragment>
                                <Header navigation={this.props.navigation} date={this.props.state.date} type='semaine'></Header>
                                {
                                    this.state.schedule.length > 0 ?
                                        <View style={styles.rowCardContainer}>
                                            <View style={styles.colCardContainer}>
                                                <Text style={styles.textDay}>{`${allDays[0].day}\n${allDays[0].date}/${allDays[0].month}`}</Text>
                                                <Card containerStyle={styles.card} title={allDaysWeek[0].item.length > 0 ? `${allDaysWeek[0].item[0].debut.slice(0,5)}\n-\n${allDaysWeek[0].item[0].fin.slice(0,5)}` : null} titleStyle={styles.titleCard}>
                                                    <View style={styles.infoContainer}>
                                                        <Text style={styles.matiere}>{allDaysWeek[0].item.length > 0 ? allDaysWeek[0].item[0].matiere : null}</Text>
                                                        <Text style={styles.salle}>{allDaysWeek[0].item.length > 0 ? allDaysWeek[0].item[0].salle : null}</Text>
                                                    </View>
                                                </Card>
                                                <Card containerStyle={styles.card} title={allDaysWeek[1].item.length > 0 ? `${allDaysWeek[1].item[0].debut.slice(0,5)}\n-\n${allDaysWeek[1].item[0].fin.slice(0,5)}` : null} titleStyle={styles.titleCard}>
                                                    <View style={styles.infoContainer}>
                                                        <Text style={styles.matiere}>{allDaysWeek[1].item.length > 0 ? allDaysWeek[1].item[0].matiere : null}</Text>
                                                        <Text style={styles.salle}>{allDaysWeek[1].item.length > 0 ? allDaysWeek[1].item[0].salle : null}</Text>
                                                    </View>
                                                </Card>
                                            </View>
                                            <View style={styles.colCardContainer}>
                                                <Text style={styles.textDay}>{`${allDays[1].day}\n${allDays[1].date}/${allDays[1].month}`}</Text>
                                                <Card containerStyle={styles.card} title={allDaysWeek[2].item.length > 0 ? `${allDaysWeek[2].item[2].debut.slice(0,5)}\n-\n${allDaysWeek[0].item[0].fin.slice(0,5)}` : null} titleStyle={styles.titleCard}>
                                                    <View style={styles.infoContainer}>
                                                        <Text style={styles.matiere}>{allDaysWeek[2].item.length > 0 ? allDaysWeek[2].item[0].matiere : null}</Text>
                                                        <Text style={styles.salle}>{allDaysWeek[2].item.length > 0 ? allDaysWeek[2].item[0].salle : null}</Text>
                                                    </View>
                                                </Card>
                                                <Card containerStyle={styles.card} title={allDaysWeek[3].item.length > 0 ? `${allDaysWeek[3].item[0].debut.slice(0,5)}\n-\n${allDaysWeek[1].item[0].fin.slice(0,5)}` : null} titleStyle={styles.titleCard}>
                                                    <View style={styles.infoContainer}>
                                                        <Text style={styles.matiere}>{allDaysWeek[3].item.length > 0 ? allDaysWeek[3].item[0].matiere : null}</Text>
                                                        <Text style={styles.salle}>{allDaysWeek[3].item.length > 0 ? allDaysWeek[3].item[0].salle : null}</Text>
                                                    </View>
                                                </Card>
                                            </View>
                                            <View style={styles.colCardContainer}>
                                                <Text style={styles.textDay}>{`${allDays[2].day}\n${allDays[2].date}/${allDays[2].month}`}</Text>
                                                <Card containerStyle={styles.card}>

                                                </Card>
                                                <Card containerStyle={styles.card}>
                                                    
                                                </Card>
                                            </View>
                                            <View style={styles.colCardContainer}>
                                                <Text style={styles.textDay}>{`${allDays[3].day}\n${allDays[3].date}/${allDays[3].month}`}</Text>
                                                <Card containerStyle={styles.card}>

                                                </Card>
                                                <Card containerStyle={styles.card}>
                                                    
                                                </Card>
                                            </View>
                                            <View style={styles.colCardContainer}>
                                                <Text style={styles.textDay}>{`${allDays[4].day}\n${allDays[4].date}/${allDays[4].month}`}</Text>
                                                <Card containerStyle={styles.card}>

                                                </Card>
                                                <Card containerStyle={styles.card}>
                                                    
                                                </Card>
                                            </View>
                                        </View>
                                    /*
                                        <FlatList
                                            data={this.state.schedule}
                                            renderItem={({ item }) => <ScheduleItemWeek item={item}></ScheduleItemWeek>}
                                            keyExtractor={item => item.id}
                                            horizontal={true}
                                        />
                                    */
                                    :
                                        <View style={styles.noLessonContainer}>
                                            <Text style={styles.noLessonText}>Aucun cours prévues cette semaine 🎉😁👍👌</Text>
                                        </View>
                                }
                            </Fragment>
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

const styles = StyleSheet.create({
    mainContainer: {
        flex:1
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
        fontSize: 25
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

export default connect(mapStateToProps)(HomeScreen)