
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import girlImage from "../assests/servicescreenImages/girl.png";
import boyImage from "../assests/servicescreenImages/man.png";
import TopNavScreen from "./TopNavScreen";
const MyServicesScreen = () => {
     const navigation = useNavigation(); 
  const [selectedId, setSelectedId] = useState(null);

  const data = [
    { id: 1, name: "indu", detail: "15-8764", date: "Tomorrow 08:30 am", image: girlImage },
    { id: 2, name: "sai", detail: "23-1196", date: "05/01/2024 08:30 am", image: boyImage },
  ];

  const handleLogout = async () => {
    try {
      // Clear auth/session data
      await AsyncStorage.removeItem("authToken");

      // Reset navigation stack → send to Login screen
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginScreen" }],
      });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
    <TopNavScreen/>

    <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.innerContainer}>
      <Text style={styles.header}>MENU</Text>

      {data.map((item) => (
        <View key={item.id} style={styles.card}>
          {/* Card Info */}
          <TouchableOpacity onPress={() => setSelectedId(selectedId === item.id ? null : item.id)} style={styles.cardContent}>
            <Image source={item.image} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.detail}>{item.detail}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </TouchableOpacity>

          {/* Show buttons only if card is selected */}
          {selectedId === item.id && (
            <View style={styles.rescheduleButtons}>
              <TouchableOpacity style={styles.smallButton}>
                <Text style={styles.smallButtonText}>Reschedule</Text>
              </TouchableOpacity>

              <TouchableOpacity
                    style={styles.smallButton}
                    onPress={() => navigation.navigate("RaiseComplaint")} 
                  >
                    <Text style={styles.smallButtonText}>Complaint</Text>
                  </TouchableOpacity>
              <TouchableOpacity style={styles.smallButton} >
                <Text style={styles.smallButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}

      {/* Other buttons */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ComplaintHistory")}>
        <Text style={styles.buttonText}>Complaint History</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sign-out</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
container: {
    flex: 1,                       
    justifyContent: "center",      
    alignItems: "center",       
  },
  
  innerContainer: {
    width: "90%",               
    height: "80%",               
    padding: 20,                
    borderRadius: 30,
    backgroundColor: "#BDCDD7",        
    elevation: 5,                   // Shadow (Android)
    shadowColor: "#000",            // Shadow (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign:"center"
  },
  card: {
 
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,                   // Android shadow
  },

  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  detail: {
    color: "#555",
  },
  date: {
    color: "#888",
  },
  rescheduleButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  smallButton: {
    borderColor: "#006D77",
    borderWidth: 1,    
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  smallButtonText: {
    color: "#006D77",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#006D77",
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MyServicesScreen;
