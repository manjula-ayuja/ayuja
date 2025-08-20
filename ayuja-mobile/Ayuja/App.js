
import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import Login from './src/screens/Login';
import Register from './src/screens/Register'; 
import PasswordReset from './src/screens/PasswordReset';
import VerificationScreen from "./src/screens/Verification";


const Stack = createStackNavigator();


export default function App() {
  return (
    <PaperProvider> 
      <NavigationContainer>
        <Stack.Navigator initialRouteName="VerificationScreen" screenOptions={{headerShown: false}}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="PasswordReset" component={PasswordReset} />
          <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
          

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
