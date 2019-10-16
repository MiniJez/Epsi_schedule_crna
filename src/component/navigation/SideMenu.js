import React from 'react'
import { Text, View, FlatList, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native'
import MenuItem from '../layout/MenuItem'
import { Icon } from 'react-native-elements'

class SideMenu extends React.Component {

    handleDeco = async () => {
        await AsyncStorage.removeItem('user')
        this.props.navigation.navigate('Welcome')
    }

    render() {

        const data = [
            {
                id: 0,
                name: 'calendar-today',
                type: 'material-community',
                title: 'Jour'
            },
            {
                id: 1,
                name: 'calendar-week',
                type: 'material-community',
                title: 'Semaine'
            }
        ]

        return(
            <View style={styles.mainContainer}>
                <View style={styles.menuTitleContainer}>
                    <Icon name="home" size={30} color='white' containerStyle={styles.icon}/>
                    <Text style={styles.menuText}>MENU</Text>
                </View>
                <View>
                    <FlatList
                        data={data}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => <MenuItem navigation={this.props.navigation} name={item.name} type={item.type} title={item.title} /> }
                    />
                </View>
                <TouchableOpacity
                style={styles.deco}
                onPress={() => this.handleDeco()}
                >
                    <Text style={styles.decoTxt}>DECONNEXION</Text>
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
        paddingBottom: 30
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
    },
    deco: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'red',
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    decoTxt: {
        color: 'white',
        fontSize: 20
    }
})

export default SideMenu