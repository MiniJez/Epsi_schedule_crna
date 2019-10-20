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
        await this.setUser()
        if(this._isMounted) {
            this.setState({loading: false})
        }
    }

    async setUser() {
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
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async _goToHome() {
        if(this.state.name.length > 0 && this.state.lastName.length > 0) {
            await AsyncStorage.setItem('user', JSON.stringify({name: this.state.name.toLowerCase(), lastName: this.state.lastName.toLowerCase()}))
            this.setUser()
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
                        <View style={styles.imgcontainer}>
                            <Image
                                style={styles.logoImg}
                                source={imgUrl.logo}
                                resizeMode="center"
                            />
                        </View>
                        <Text style={styles.advice}>Renseigner votre nom et prénom utilisé par votre adresse email epsi</Text>
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

const mapStateToProps = (state) => {
    return state
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
    imgcontainer: {
        height: "30%"
    },
    logoImg: {
        flex: 1,
        width: 200,
    },
    advice: {
        width: '77%',
        marginBottom: 15 
    },
    textInputContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    textInput: {
        width: '80%',
        marginBottom: 10,
        borderRadius: 15,
        paddingLeft: 10,
        borderWidth: 0.5,
        borderRadius: 100
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

export default connect(mapStateToProps)(WelcomeScreen)