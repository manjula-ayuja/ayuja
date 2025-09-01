import React from "react";
import { View, Text, ScrollView, TouchableOpacity,StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; 
import TopNavScreen from "./TopNavScreen";
const NotificationsScreen = () => {
    const navigation = useNavigation(); 
  return (
    <>
      <TopNavScreen />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.innerContainer}>
             <TouchableOpacity onPress={() => navigation.goBack()}> 
                    <Icon name="chevron-back" size={26} color="#000" />
                  </TouchableOpacity>
      <Text style={styles.header}>Notifications</Text>

      <View style={styles.card}>
        <Text style={styles.text}>
          Your Appointment On 11:30 AM, 05 Jan 2025 has been completed
        </Text>
        <Text style={styles.time}>3m Ago</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.text}>
          Your Appointment On 04:30 PM, 03 Jan 2025 has been completed
        </Text>
        <Text style={styles.time}>1d Ago</Text>
      </View>
    </View>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  card: { backgroundColor: "#d0e4ec", padding: 16, borderRadius: 10, marginBottom: 12 },
  text: { fontSize: 14 },
  time: { color: "gray", fontSize: 12, marginTop: 8 },
});

export default NotificationsScreen;
