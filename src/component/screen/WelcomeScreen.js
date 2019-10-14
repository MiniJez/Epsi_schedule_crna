import React from 'react'
import { View, StyleSheet, Image, TextInput, TouchableOpacity, Text, Alert } from 'react-native'
import imgUrl from '../../constants/img'

class WelcomeScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }

        this.name = ''
        this.lastName = ''
    }

    _goToHome() {
        console.log(this.name, this.lastName)
        this.props.navigation.navigate('Home')
        /*
        if(this.name.length > 0 && this.lastName.length > 0){
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
        */
    }

    render() {
        return(
            <View style={styles.mainContainer}>
                <Image
                    style={styles.logoImg}
                    source={imgUrl.logo}
                    resizeMode="center"
                />
                <View style={styles.textInputContainer}>
                    <TextInput 
                        style={styles.textInput}
                        placeholder="Prénom"
                        onChangeText={(name) => {this.name = name}}
                    />
                    <TextInput 
                        style={styles.textInput}
                        placeholder="Nom"
                        onChangeText={(lastName) => {this.lastName = lastName}}
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

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
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

export default WelcomeScreen