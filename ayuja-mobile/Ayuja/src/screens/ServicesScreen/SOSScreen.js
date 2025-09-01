


import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  Image,
} from "react-native";
import sosImage from "../assests/servicescreenImages/SOS.png";
import TopNavScreen from "./TopNavScreen";
const SOSScreen = () => {
  const handleCall = () => {
    Linking.openURL("tel:+919876543210");
  };

  return (
    <>
    <TopNavScreen/>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.header}>SOS</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <Image source={sosImage} style={styles.avatar} />

            <View style={styles.textContainer}>
              <Text style={styles.text}>Call Support</Text>
              <TouchableOpacity onPress={handleCall}>
                <Text style={styles.phone}>+91 9876543210</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    elevation: 5, // Shadow (Android)
    shadowColor: "#000", // Shadow (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    backgroundColor: "#006D77",
  },

  textContainer: {
    flex: 1,
  },

  text: {
    fontSize: 16,
    marginBottom: 5,
  },

  phone: {
    color: "#0056A0",
    fontWeight: "bold",
  },
});

export default SOSScreen;
