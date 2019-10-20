import React from 'react'
import {  } from 'react-native'
import ScheduleItem from '../layout/ScheduleItem'

class SingleItem extends React.Component {
    render() {

        let item = this.props.navigation.getParam('item', undefined)

        return(
            <ScheduleItem item={item}></ScheduleItem>
        )
    }
}

export default SingleItem