import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import WelcomeScreen from '../screen/WelcomeScreen'
import HomeScreen from '../screen/HomeScreen'
import { createDrawerNavigator } from 'react-navigation-drawer';
import SideMenu from '../navigation/SideMenu'
import SingleItem from '../screen/SingleItem'
import { Dimensions } from 'react-native';

const HomeStack = createStackNavigator({
  Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        header: null
      }),
  },
  SingleItem
});

const WelcomeStack = createStackNavigator({
  Welcome: {
      screen: WelcomeScreen,
      navigationOptions: () => ({
        header: null
      }),
  },
});

const MainStack = createDrawerNavigator({
  HomeStack,
  },
  {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width - 120,
  }
);

const SwitchNavigator = createSwitchNavigator({WelcomeStack, MainStack})

const AppNavigator = createAppContainer(SwitchNavigator);

export default AppNavigator;