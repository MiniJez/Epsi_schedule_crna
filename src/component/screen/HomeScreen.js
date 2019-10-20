import React, { Fragment } from 'react'
import { View, ActivityIndicator, StyleSheet, FlatList, Text } from 'react-native'
import { getEpsiScheduleWeek } from '../../Api/epsiScheduleApi'
import ScheduleItem from '../layout/ScheduleItem'
import ScheduleItemWeek from '../layout/ScheduleItemWeek'
import Header from '../layout/Header'
import { connect } from 'react-redux'
import { getWeekNumber, getLongDate } from '../../utils/utils'

class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            schedule: [],
            isLoading: true
        }
    }

    async componentDidMount() {
        let date = this.props.dateReducer.date
        let res = await getEpsiScheduleWeek(date, this.props.user)
        this.setState({schedule: res, isLoading: false})
    }

    async componentDidUpdate(prevProps) {
        if(this.props.dateReducer.date !== prevProps.dateReducer.date && getWeekNumber(new Date(this.props.dateReducer.date)) !==  getWeekNumber(new Date(prevProps.dateReducer.date))){
            this.setState({isLoading: true})
            let res = await getEpsiScheduleWeek(this.props.dateReducer.date, this.props.user)
            this.setState({schedule: res, isLoading: false})
        }
    }

    render() {

        let display = this.props.navigation.getParam('display', undefined)
        display = display ? display : 'jour'

        return(
            <View style={styles.mainContainer}>
                {
                    display === 'jour' ?
                        <Fragment>
                            <Header navigation={this.props.navigation} date={this.props.dateReducer.date} type='jour'></Header>
                            {
                                this.state.isLoading ? 
                                    <View style={styles.activityIndicator}>
                                        <ActivityIndicator size="large"/>
                                    </View>
                                :
                                    this.state.schedule.filter(item => item.date.toLowerCase() === getLongDate(new Date(this.props.dateReducer.date)).toLowerCase()).length > 0 ?
                                        <FlatList
                                            data={this.state.schedule.filter(item => item.date.toLowerCase() === getLongDate(new Date(this.props.dateReducer.date)).toLowerCase())}
                                            renderItem={({ item }) => <ScheduleItem item={item}></ScheduleItem>}
                                            keyExtractor={item => item.id}
                                        />
                                    :
                                        <View style={styles.noLessonContainer}>
                                            <Text style={styles.noLessonText}>Aucun cours prévus 🎉😁👍👌</Text>
                                        </View>
                            }
                        </Fragment>
                    :
                        <Fragment>
                            <Header navigation={this.props.navigation} date={this.props.dateReducer.date} type='semaine'></Header>
                            {
                                this.state.isLoading ? 
                                    <View style={styles.activityIndicator}>
                                        <ActivityIndicator size="large"/>
                                    </View>
                                :
                                    this.state.schedule.length > 0 ?
                                        <ScheduleItemWeek schedule={this.state.schedule} navigation={this.props.navigation}></ScheduleItemWeek>
                                    :
                                        <View style={styles.noLessonContainer}>
                                            <Text style={styles.noLessonText}>Aucun cours prévus cette semaine 🎉😁👍👌</Text>
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

export default connect(mapStateToProps)(HomeScreen)