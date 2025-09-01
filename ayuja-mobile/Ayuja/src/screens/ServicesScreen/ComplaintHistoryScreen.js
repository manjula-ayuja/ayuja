


import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity } from "react-native";
import boyImage from "../assests/servicescreenImages/man.png";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; 
import TopNavScreen from "./TopNavScreen";

const ComplaintHistoryScreen = () => {
  const navigation = useNavigation(); 
  const [activeTab, setActiveTab] = useState("Unresolved"); // default tab

  const unresolvedData = [
    { id: "1", name: "Narayana", ticket: "5879643210", desc: "Hi I am Narayana, I am Hyderg A" },
    { id: "2", name: "Shiva", ticket: "5897643210", desc: "Hi I am Shiva, From Hyderabad." },
  ];

  const resolvedData = [
    { id: "1", status: "Your issue has been resolved" },
    { id: "2", status: "Your issue has been resolved" },
  ];

  const renderUnresolvedItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={boyImage} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{item.name}  {item.ticket}</Text>
        <Text style={styles.desc}>{item.desc}</Text>
      </View>
    </View>
  );

  const renderResolvedItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={boyImage} style={styles.avatar} />
      <Text style={styles.status}>{item.status}</Text>
    </View>
  );

  return (
    <>
      <TopNavScreen />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.innerContainer}>
             <TouchableOpacity onPress={() => navigation.goBack()}> 
                    <Icon name="chevron-back" size={26} color="#000" />
                  </TouchableOpacity>
          <Text style={styles.header}>COMPLAINT HISTORY</Text>

          {/* Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => setActiveTab("Resolved")}>
              <Text style={activeTab === "Resolved" ? styles.activeTab : styles.inactiveTab}>
                Resolved
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setActiveTab("Unresolved")}>
              <Text style={activeTab === "Unresolved" ? styles.activeTab : styles.inactiveTab}>
                Unresolved
              </Text>
            </TouchableOpacity>
          </View>

          {/* FlatList based on active tab */}
          <FlatList
            data={activeTab === "Resolved" ? resolvedData : unresolvedData}
            keyExtractor={(item) => item.id}
            renderItem={activeTab === "Resolved" ? renderResolvedItem : renderUnresolvedItem}
          />
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
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },

  activeTab: {
    marginHorizontal: 20,
    fontWeight: "bold",
    color: "#0056A0",
    fontSize: 16,
  },

  inactiveTab: {
    marginHorizontal: 20,
    color: "gray",
    fontSize: 16,
  },

  item: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "center",
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

  name: {
    fontWeight: "bold",
  },

  desc: {
    color: "gray",
  },

  status: {
    fontWeight: "500",
    color: "green",
  },
});

export default ComplaintHistoryScreen;
