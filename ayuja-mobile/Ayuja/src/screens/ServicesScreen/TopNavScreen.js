
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  Pressable,SafeAreaView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const TopNavScreen = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuOption = (option) => {
    setMenuVisible(false);

    if (option === "BookedServices") {
      navigation.navigate("BookedServices");
    } else if (option === "ProfileScreen") {
      navigation.navigate("ProfileScreen");
    } else if (option === "RaiseComplaint") {
      navigation.navigate("RaiseComplaint");
    } else if (option === "Logout") {
      navigation.navigate("Login");
    }
  };

return (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      {/* Left Icon */}
      <TouchableOpacity onPress={() => navigation?.navigate("ChatScreen")}>
        <Ionicons name="chatbubble-ellipses-outline" size={24} color="#555" />
      </TouchableOpacity>

      {/* Middle Icons */}
      <View style={styles.middleIcons}>
        <MaterialCommunityIcons name="bell-outline" size={24} color="#555" onPress={() => navigation?.navigate("Notifications")} />
        <Ionicons name="lock-closed-outline" size={24} color="#555" />
        <MaterialCommunityIcons name="alert-octagon-outline" size={26} color="#555" onPress={() => navigation?.navigate("Alerts")} />
        <FontAwesome name="home" size={24} color="#555" onPress={() => navigation?.navigate("Home")} />
      </View>

      {/* Right Icon */}
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Ionicons name="menu" size={28} color="#555" />
      </TouchableOpacity>

      {/* Dropdown Menu */}
      <Modal transparent animationType="fade" visible={menuVisible} onRequestClose={() => setMenuVisible(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.dropdown}>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuOption("ProfileScreen")}>
              <Text style={styles.menuText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuOption("BookedServices")}>
              <Text style={styles.menuText}>Booked Services</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuOption("RaiseComplaint")}>
              <Text style={styles.menuText}>Raise Complaint</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuOption("Logout")}>
              <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  </SafeAreaView>
);
};

export default TopNavScreen;

const styles = StyleSheet.create({
safeArea: {
  backgroundColor: "red",
},
container: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 15,
  paddingVertical: 10,
  backgroundColor: "#fff",
  elevation: 3,
},
middleIcons: {
  flexDirection: "row",
  gap: 20,
},
modalOverlay: {
  flex: 1,
  justifyContent: "flex-start",
  alignItems: "flex-end",
  backgroundColor: "rgba(0,0,0,0.2)",
},
dropdown: {
  backgroundColor: "#fff",
  width: 180,
  borderRadius: 8,
  marginTop: 50,
  marginRight: 10,
  paddingVertical: 10,
  elevation: 5,
},
menuItem: {
  paddingVertical: 12,
  paddingHorizontal: 15,
},
menuText: {
  fontSize: 16,
  color: "#333",
},
});