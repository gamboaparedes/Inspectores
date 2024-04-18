import React from 'react'
import { View, Text } from 'react-native'

// This view is to check if a user exists, probably from storage
// preferences, user defaults, etc.
// This view can match the native (iOS Launch | Android Splash) look.

const SplashScreen = () => {
    return <View
        style={{ backgroundColor: 'tomato', flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
        <Text>Logo Here</Text>
    </View>
}

export default SplashScreen