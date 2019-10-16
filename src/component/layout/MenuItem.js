import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { Icon } from 'react-native-elements'

class MenuItem extends React.Component {
    render() {
        return(
            <TouchableOpacity>
                <Icon name="keyboard-arrow-left" size={30} containerStyle={{}}/>
                <Text>TEST</Text>
            </TouchableOpacity>
        )
    }
}

export default MenuItem