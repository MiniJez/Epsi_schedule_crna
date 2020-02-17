import React from 'react'
import { Icon } from 'react-native-elements'

export default LogoutButton = ({navigation}) => {

    return (
        <Icon
            name='logout'
            type='material-community'
            color='black'
            size={30}
            containerStyle={{padding: 10}}
            onPress={() => navigation.navigate('Welcome')}
        />
    )
}