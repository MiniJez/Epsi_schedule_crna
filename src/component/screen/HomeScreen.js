import React, { Fragment } from 'react'
import { View, ActivityIndicator, StyleSheet, FlatList, Text } from 'react-native'
import { getEpsiScheduleDay, getEpsiScheduleWeek } from '../../Api/epsiScheduleApi'
import ScheduleItem from '../layout/ScheduleItem'
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
        return(
            <View style={styles.mainContainer}>
                {
                    this.state.isLoading ? 
                    <View style={styles.activityIndicator}>
                        <ActivityIndicator size="large"/>
                    </View> 
                    :
                    <Fragment>
                        <Header navigation={this.props.navigation} date={this.props.state.date}></Header>
                        { this.state.schedule.length > 0 ?
                        <FlatList
                            data={this.state.schedule.filter(item => item.date.toLowerCase() === getLongDate(new Date(this.props.state.date)))}
                            renderItem={({ item }) =>   <ScheduleItem item={item}></ScheduleItem>}
                            keyExtractor={item => item.id}
                        />
                        : 
                        <Text>Aucun cours prévues</Text>
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
    }
})

export default connect(mapStateToProps)(HomeScreen)