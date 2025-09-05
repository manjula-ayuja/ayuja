
import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";


import DiagnosticSample from "../assests/servicescreenImages/DiagnosticSampleCollection.png";
import DoctorVisit from "../assests/servicescreenImages/DoctorVisit.png";
import ElderlyCare from "../assests/servicescreenImages/ElderlyCare.png";
import EmergencyCareSupport from "../assests/servicescreenImages/EmergencyCareSupport.png";
import ForSeniors from "../assests/servicescreenImages/ForSeniors.png";
import PhysiotherapyatHome from "../assests/servicescreenImages/PhysiotherapyatHome.png";
import TopNavScreen from "./TopNavScreen";

const services = [
  {
    id: "1",
    title: "ELDERLY AND CHILDCARE",
    image: ElderlyCare,
    screen: "ElderChildCare",
  },
  {
    id: "2",
    title: "NURSING & PHYSIOTHERAPY SERVICES",
    image: PhysiotherapyatHome,
    screen: "NursingPysiotherapy",
  },
  {
    id: "3",
    title: "MEDICINE & DIAGNOSTIC DELIVERY",
    image: DiagnosticSample,
    screen: "MedicineDiagnosticDelivery",
  },
  {
    id: "4",
    title: "EMERGENCY CARE SUPPORT",
    image: EmergencyCareSupport,
    screen: "EmergencyCareSupport",
  },
  {
    id: "5",
    title: "DOCTOR VISIT, PICKUP & DROP",
    image:DoctorVisit,
    screen: "DoctorVisitPickUpDrop",
  },
  {
    id: "6",
    title: "SOCIAL WELLNESS ACTIVITIES",
    image: ForSeniors,
    screen: "SocialWellnessActivities",
  },
];

const ServiceSelectionScreen = () => {
  const navigation = useNavigation();
  const renderItem = ({ item }) => (
  
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate(item.screen)} 
    >
      <View style={styles.cardText}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
    </TouchableOpacity>
  );
  
  return (
    <>
   
   
    <SafeAreaView style={styles.container}>
    
      <Text style={styles.header}>Please Select Services</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <TopNavScreen/>
    </SafeAreaView>
    </>
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
    marginTop:30,textAlign:"center"
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

  cardImage: {
    width: 80,
    height: 80,
  },
});
