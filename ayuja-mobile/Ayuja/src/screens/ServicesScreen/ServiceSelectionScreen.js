
import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from "react-native";


import DiagnosticSample from "../assests/servicescreenImages/DiagnosticSampleCollection.png";
import DoctorVisit from "../assests/servicescreenImages/DoctorVisit.png";
import ElderlyCare from "../assests/servicescreenImages/ElderlyCare.png";
import EmergencyCareSupport from "../assests/servicescreenImages/EmergencyCareSupport.png";
import ForSeniors from "../assests/servicescreenImages/ForSeniors.png";
import PhysiotherapyatHome from "../assests/servicescreenImages/PhysiotherapyatHome.png";


const services = [
  {
    id: "1",
    title: "ELDERLY AND CHILDCARE",
    time: "DEC 12, 9:00 AM",
    image: ElderlyCare,
  },
  {
    id: "2",
    title: "NURSING & PHYSIOTHERAPY SERVICES",
    time: "DEC 12, 9:30 AM",
    image: PhysiotherapyatHome,
  },
  {
    id: "3",
    title: "MEDICINE & DIAGNOSTIC DELIVERY",
    time: "DEC 12, 9:00 AM",
    image: DiagnosticSample,
  },
  {
    id: "4",
    title: "EMERGENCY CARE SUPPORT",
    time: "DEC 12, 9:00 AM",
    image: EmergencyCareSupport,
  },
  {
    id: "5",
    title: "DOCTOR VISIT, PICKUP & DROP",
    time: "DEC 12, 9:00 AM",
    image:DoctorVisit,
  },
  {
    id: "6",
    title: "SOCIAL WELLNESS ACTIVITIES",
    time: "DEC 12, 9:00 AM",
    image: ForSeniors,
  },
];

const ServiceSelectionScreen = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardText}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>NEXT AVAILABLE TIME</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Please Select Services</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

export default ServiceSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "600",
    color: "#22577A",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  cardText: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#22577A",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 12,
    color: "#888",
  },
  time: {
    fontSize: 13,
    fontWeight: "500",
    color: "#000",
    marginTop: 4,
  },
  cardImage: {
    width: 80,
    height: 80,
  },
});
