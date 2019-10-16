import React, { Fragment } from 'react'
import { View, StyleSheet, Image, TextInput, TouchableOpacity, Text, Alert, AsyncStorage, ActivityIndicator } from 'react-native'
import imgUrl from '../../constants/img'
import { connect } from 'react-redux'
import { saveUser } from '../../redux/action'

class WelcomeScreen extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            lastName: '',
            loading: true
        }
    }

    async componentDidMount() {
        this._isMounted = true;

        try{
            let user = null
            user = await AsyncStorage.getItem('user')
            user = JSON.parse(user)
            if (user !== null) {
                this.props.dispatch(saveUser({name: user.name, lastName: user.lastName}))
                this.props.navigation.navigate('Home')
            }
        } catch(error) {
            Alert.alert(
                error,
                '',
                [
                    {
                        text: 'OK'
                    }
                ]
            )
        }

        if(this._isMounted) {
            this.setState({loading: false})
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async _goToHome() {
        if(this.state.name.length > 0 && this.state.lastName.length > 0) {
            await AsyncStorage.setItem('user', JSON.stringify({name: this.state.name, lastName: this.state.lastName}))
            this.props.navigation.navigate('Home')
        }
        else {
            Alert.alert(
                'Vous devez rentrer votre nom et prénom',
                '',
                [
                    {
                        text: 'Ok'
                    }
                ]
            )
        }
    }

    render() {
        return(
            <View style={styles.mainContainer}>
                {
                    this.state.loading ? 
                    <View style={styles.activityIndicator}>
                        <ActivityIndicator size="large"/>
                    </View> 
                    :
                    <Fragment>
                        <Image
                            style={styles.logoImg}
                            source={imgUrl.logo}
                            resizeMode="center"
                        />
                        <View style={styles.textInputContainer}>
                            <TextInput 
                                style={styles.textInput}
                                placeholder="Prénom"
                                onChangeText={(name) => this.setState({name: name.toLowerCase()})}
                            />
                            <TextInput 
                                style={styles.textInput}
                                placeholder="Nom"
                                onChangeText={(lastName) => this.setState({lastName: lastName.toLowerCase()})}
                            />
                            <TouchableOpacity 
                                style={styles.button}
                                onPress={() => this._goToHome()}
                            >
                                <Text style={styles.buttonText}>Continuer</Text>
                            </TouchableOpacity>
                        </View>
                    </Fragment>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center'
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoImg: {
        flex: 1,
        width: 200,
    },
    textInputContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    textInput: {
        elevation: 2,
        width: '80%',
        marginBottom: 10,
        borderRadius: 15,
        paddingLeft: 10
    },
    button: {
        borderRadius: 10,
        width: '50%',
        height: 40,
        backgroundColor: '#2196F3',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    buttonText: {
        color: 'white'
    }
})

export default connect()(WelcomeScreen)