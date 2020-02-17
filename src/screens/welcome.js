import React, { Fragment } from 'react'
import { View, StyleSheet, Image, TextInput, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native'
import imgUrl from '../constants/img'
import { connect } from 'react-redux'
import { setUser } from '../redux/action/userAction'
import AsyncStorage from '@react-native-community/async-storage';

class Welcome extends React.Component {

    name = ''
    lastName = ''

    async componentDidMount() {
        await this.setUserLocal()
    }

    async setUserLocal() {

        const { navigation, setUser } = this.props

        try {
            let user = null
            user = await AsyncStorage.getItem('user')
            user = JSON.parse(user)
            if (user !== null) {
                setUser(user)
                navigation.navigate('Week')
            }
        } catch (error) {
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

    async _goToHome() {
        if (this.name.length > 0 && this.lastName.length > 0) {
            await AsyncStorage.setItem('user', JSON.stringify({ name: this.name.toLowerCase(), lastName: this.lastName.toLowerCase() }))
            this.setUserLocal()
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
        return (
            <View style={styles.mainContainer}>
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
                        onChangeText={(text) => this.name = text}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Nom"
                        onChangeText={(text) => this.lastName = text}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this._goToHome()}
                    >
                        <Text style={styles.buttonText}>Continuer</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state
    }
}

const mapDispatchToProps = {
    setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)

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