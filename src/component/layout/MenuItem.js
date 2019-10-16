import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View, Alert } from 'react-native'
import { Icon } from 'react-native-elements'

class MenuItem extends React.Component {

    handleItemNav = (title) => {
        let param

        switch(title) {
            case 'Jour':
                param = { display: 'jour' }
                break

            case 'Semaine':
                param = { display: 'semaine' }
                break

            default:
                console.log('Title invalide')
        }

        this.props.navigation.closeDrawer()
        this.props.navigation.navigate('Home', param)
    }
    
    render() {

        const {
            title,
            type,
            name,
        } = this.props

        return(
            <TouchableOpacity
            style={styles.container}
            onPress={() => this.handleItemNav(title)}
            >
                <Icon name={name} type={type} size={30} containerStyle={styles.icon}/>
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderBottomWidth: 0.5
    },
    icon: {
        marginLeft: 10,
        marginRight: 10
    },
    text: {
    }
})

export default MenuItem