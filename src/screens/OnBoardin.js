import { useNavigation } from "@react-navigation/native"
import { View, Text, Button } from "react-native"

const OnBoarding = () => {
    const navigation = useNavigation()
    return <View>
        <Text>Welcome</Text>
        <Button
            onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })}
            title='Go Home'
        />
    </View>
}

export default OnBoarding