import { useEffect, useState } from 'react';
import AppNavigation from './src/navigations/AppNavigation';
import SplashScreen from './src/screens/SplashScreen'

function App() {

  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isFirstTime, setIsFirstTime] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 2000);

    return () => { clearTimeout(timeout) }
  }, [])

  const initialRoute = () => {
    if (isLoggedIn) return 'Home'
    if (isFirstTime) return 'OnBoarding'

    return 'Login'
  }

  if (isLoading) return <SplashScreen />
  return <AppNavigation initialRoute={initialRoute} />
}

export default App;