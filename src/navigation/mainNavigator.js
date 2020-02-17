import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Week from '../screens/week'
import Welcome from '../screens/welcome'

const Stack = createStackNavigator();

export default class MainNavigator extends React.Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Welcome"
                    component={Welcome}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="Week"
                    component={Week}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        )
    }
}

/*
{({ navigation, route }) => ({
                        headerLeft: null,
                        headerRight: () => (
                            <LogoutButton navigation={navigation} />
                        ),
                        headerTitle: () => (
                            <Header/>
                        )
                    })}
                    */