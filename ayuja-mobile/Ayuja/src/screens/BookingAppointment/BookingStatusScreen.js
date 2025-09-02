


import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

const BookingStatusScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // Get values from previous screen
  const {
    status = "success",
    serviceTitle,
    serviceImage,
    selectedDate,
  } = route.params || {};

  const isSuccess = status === "success";
  console.log("BookingStatusScreen Params:", {
    status,
    serviceTitle,
    serviceImage,
    selectedDate,
  });

  return (
    <View style={styles.container}>

      {/* Card Section */}
      <View style={styles.card}>
        {serviceImage && (
          <Image source={serviceImage} style={styles.image} resizeMode="contain" />
        )}

        <Text style={styles.subHeading}>{serviceTitle}</Text>

        {isSuccess ? (
          <>
            <Text style={styles.title}>Appointment Booked</Text>
            <Text style={styles.message}>
              Please Check The App Carefully To Keep Your Health Better.
            </Text>
            <Text style={styles.bookingText}>Booking Scheduled</Text>
            <Text style={styles.timeText}>{selectedDate}</Text>
          </>
        ) : (
          <>
            <Text style={styles.titleFailed}>Booking Failed !!!</Text>
            <Text style={styles.message}>
              Something Went Wrong, Please Turn Back And Check Your Booking Again!
            </Text>
          </>
        )}
      </View>

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ServiceSelectionDashboard")}
      >
        <Text style={styles.buttonText}>
          {isSuccess ? "Back to Home 🏠" : "Back"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookingStatusScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#c9dde3",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    width: "100%",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginBottom: 15,
  },
  subHeading: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2e5d63",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#17494d",
    marginBottom: 5,
  },
  titleFailed: {
    fontSize: 20,
    fontWeight: "700",
    color: "red",
    marginBottom: 5,
  },
  message: {
    fontSize: 13,
    color: "#4a6c70",
    textAlign: "center",
    marginBottom: 15,
  },
  bookingText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#17494d",
  },
  timeText: {
    fontSize: 15,
    color: "#17494d",
    marginTop: 5,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#006d67",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

