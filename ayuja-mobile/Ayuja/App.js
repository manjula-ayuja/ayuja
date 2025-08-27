
import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './src/screens/AuthonticationScreeens/WelcomeScreen';
import Login from './src/screens/AuthonticationScreeens/Login';
import Register from './src/screens/AuthonticationScreeens/Register'; 
import PasswordReset from './src/screens/AuthonticationScreeens/PasswordReset';
import VerificationScreen from "./src/screens/AuthonticationScreeens/Verification";

import ResidentDashboard from "./src/screens/ResidentsScreens/ResidentDashboard";
const Stack = createStackNavigator();


export default function App() {
  return (
    <PaperProvider> 
      <NavigationContainer>
        <Stack.Navigator initialRouteName="WelcomeScreen" screenOptions={{headerShown: false}}>
          {/* Authontication Screens */}
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="PasswordReset" component={PasswordReset} />
          <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
          
          {/* ResidentDashboard */}
          <Stack.Screen name="ResidentDashboard" component={ResidentDashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
