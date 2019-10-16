import React from 'react'
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import MenuItem from '../layout/MenuItem'
import { Icon } from 'react-native-elements'

class SideMenu extends React.Component {
    render() {
        const data = [
            {
                id: 0
            },
            {
                id: 1
            }
        ]
        return(
            <View style={styles.mainContainer}>
                <View style={styles.menuTitleContainer}>
                    <Icon name="home" size={30} color='white' containerStyle={styles.icon}/>
                    <Text style={styles.menuText}>MENU</Text>
                </View>
                <FlatList 
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <MenuItem/> }
                />
                <TouchableOpacity>
                    <Text>DECONNEXION</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    menuTitleContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: 150,
        backgroundColor: '#5292C1',
        paddingLeft: 10,
        paddingBottom: 10
    },
    menuText: {
        color: 'white',
        fontSize: 20
    },
    icon: {
        marginRight: 10,
    },
    emptyView: {
        height: 40,
        backgroundColor: 'blue'
    }
})

export default SideMenu