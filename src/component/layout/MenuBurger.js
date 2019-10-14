import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements/'

class MenuBurger extends React.Component {
    render() {
        return(
            <View style={this.props.containerStyle}>
                <TouchableOpacity 
                    style={this.props.style}
                    onPress={() => this.props.navigation.toggleDrawer()}
                >
                    <Icon name="menu" size={this.props.size}/>
                </TouchableOpacity>
            </View>
        )
    }
}

export default MenuBurger