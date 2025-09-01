
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

import ServiceSelectionScreen from './src/screens/ServicesScreen/ServiceSelectionScreen';
import ElderlyChildCareScreen from './src/screens/ServicesScreen/ElderlyChildCare';
import NursingPysiotherapy from "./src/screens/ServicesScreen/NursingPysiotherapy";
import MedicineDiagnosticDelivery from "./src/screens/ServicesScreen/MedicineDiagnosticDelivery";
import EmergencyCareSupport from "./src/screens/ServicesScreen/EmergencyCareSupport";
import DoctorVisitPickUpDrop from "./src/screens/ServicesScreen/DoctorVisitPickUpDrop";
import SocialWellnessActivities from "./src/screens/ServicesScreen/SocialWellnessActivities";
import MyServicesScreen from "./src/screens/ServicesScreen/MyServicesScreen";
import RaiseComplaintScreen from "./src/screens/ServicesScreen/RaiseComplaint";
import SOSScreen from "./src/screens/ServicesScreen/SOSScreen";
import ComplaintHistoryScreen from "./src/screens/ServicesScreen/ComplaintHistoryScreen";
import NotificationsScreen from "./src/screens/ServicesScreen/NotificationsScreen";

import PaymentMethodSelectionScreen from "./src/screens/PaymentScreens/SelectPaymentScreen";
import BookingStatusScreen from "./src/screens/BookingAppointment/BookingStatusScreen";
import BookAppointment from "./src/screens/BookingAppointment/BookAppointment";
const Stack = createStackNavigator();


export default function App() {
  return (
    <PaperProvider> 
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ServiceSelectionDashboard" screenOptions={{headerShown: false}}>
          {/* Authontication Screens */}
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="PasswordReset" component={PasswordReset} />
          <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
          
          {/* ResidentDashboard */}
          <Stack.Screen name="ResidentDashboard" component={ResidentDashboard} />
          
           {/* servicescreens */}
          <Stack.Screen name="ServiceSelectionDashboard" component={ServiceSelectionScreen} />
          <Stack.Screen name="ElderChildCare" component={ElderlyChildCareScreen} />
          <Stack.Screen name="NursingPysiotherapy" component={NursingPysiotherapy} />
          <Stack.Screen name="MedicineDiagnosticDelivery" component={MedicineDiagnosticDelivery} />
          <Stack.Screen name="EmergencyCareSupport" component={EmergencyCareSupport} />
          <Stack.Screen name="DoctorVisitPickUpDrop" component={DoctorVisitPickUpDrop} />
          <Stack.Screen name="SocialWellnessActivities" component={SocialWellnessActivities} />
          <Stack.Screen name="BookedServices" component={MyServicesScreen} />
          <Stack.Screen name="RaiseComplaint" component={RaiseComplaintScreen} />
          <Stack.Screen name="SOS" component={SOSScreen} />
          <Stack.Screen name="ComplaintHistory" component={ComplaintHistoryScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          
          
          {/* Payment Method screens */}
          <Stack.Screen name="SelectPaymentMethod" component={PaymentMethodSelectionScreen} />
          <Stack.Screen name="BookAppointment" component={BookAppointment} />
          <Stack.Screen name="BookingStatus" component={BookingStatusScreen} />
          

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
