import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import JoinScreen from './screens/JoinScreen';
import FriendListScreen from './screens/FriendListScreen';

// Sets home screen i guess, not sure why it needs to be done this way
const AppStack = createStackNavigator({ Home : FriendListScreen });

export default createAppContainer(
    createSwitchNavigator({
        // screen options using onclick navigate for example
        App: AppStack,
        Join: JoinScreen
    }, {
        // initial screen
        initialRouteName: "Join"
    })
)