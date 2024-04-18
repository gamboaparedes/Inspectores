import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Page from '../screens/Page'

const HomeNavigation = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            initialRouteName='Page1'
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen name='Page1' component={Page} />
            <Tab.Screen name='Page2' component={Page} />
            <Tab.Screen name='Page3' component={Page} />
        </Tab.Navigator>
    )
}

export default HomeNavigation