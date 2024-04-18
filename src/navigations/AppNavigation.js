import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeNavigation from './HomeNavigation'
import LoginScreen from '../screens/Account/Login'
import OnBoarding from '../screens/OnBoardin'

const AppNavigation = ({ initialRoute }) => {
    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation