
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons"; 
import womenImage from "./assests/women.png";
import Ambulance from "./assests/Ambulance.png";
import Doctor from "./assests/Doctor.png";
import Pharmacy from "./assests/Pharmacy.png";
import verification from "./assests/verification.png";
import verification1 from "./assests/verification1.png"

const articles = [
  {
    id: '1',
    title: 'The 25 Healthiest Fruits You Can Eat, According to a Nutritionist',
    date: 'Jun 10, 2023',
    readTime: '5min read',
    image: verification 
  },
  {
    id: '2',
    title: 'The Impact of COVID-19 on Healthcare Systems',
    date: 'Jul 10, 2023',
    readTime: '5min read',
    image: verification1, 
  },
  {
    id: '3',
    title: 'The Impact of COVID-19 on Healthcare Systems',
    date: 'Jul 10, 2023',
    readTime: '5min read',
    image: verification1,
  },
];



  const VerificationScreen = () => {
    const [activeTab, setActiveTab] = useState("home");
    return (
  <SafeAreaView style={styles.container}>
    {/* Header Section */}
    <View style={styles.header}>
      <Image source={womenImage} style={styles.avatar} />
      <Text style={styles.welcomeText}>Welcome!</Text>
      <Text style={styles.userText}>User</Text>
    </View>

    {/* Content with white background */}
    <View style={styles.contentArea}>
    <View style={styles.searchBox}>
      <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
      <TextInput
        placeholder="Search doctor, drugs, articles..."
        style={styles.searchInput}
        placeholderTextColor="#888"
      />
    </View>

      {/* Quick Actions */}
 
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionItem}>
          <View style={styles.actionIcon}>
            <Image source={Doctor} style={styles.iconImage} />
          </View>
          <Text style={styles.actionText}>Top Doctors</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem}>
          <View style={styles.actionIcon}>
            <Image source={Pharmacy} style={styles.iconImage} />
          </View>
          <Text style={styles.actionText}>Pharmacy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem}>
          <View style={styles.actionIcon}>
            <Image source={Ambulance} style={styles.iconImage} />
          </View>
          <Text style={styles.actionText}>Ambulance</Text>
        </TouchableOpacity>
      </View>

      {/* Articles Section */}
      <View style={styles.articlesHeader}>
        <Text style={styles.sectionTitle}>Health article</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={articles}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.articleCard}>
            <Image source={item.image} style={styles.articleImage} />
            <View style={styles.articleContent}>
              <Text style={styles.articleTitle}>{item.title}</Text>
              <Text style={styles.articleMeta}>
                {item.date} · {item.readTime}
              </Text>
            </View>

            <TouchableOpacity>
              <Icon name="bookmark-outline"  size={20} color="#407CE2" style={styles.bookmarkIcon} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {/* Home */}
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab("home")}>
          <Icon
            name={activeTab === "home" ? "home" : "home-outlined"}
            size={28}
            color={activeTab === "home" ? "#407CE2" : "gray"}
          />
          <Text style={[styles.navLabel,activeTab === "home" && { color: "#407CE2" },]}> Home</Text>

        </TouchableOpacity>

        {/* Reports */}
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab("reports")}>
          <Icon
            name={activeTab === "reports" ? "bar-chart" : "bar-chart-outlined"}
            size={28}
            color={activeTab === "reports" ? "#407CE2" : "gray"}
          />
          <Text style={[styles.navLabel,activeTab === "reports" && { color: "#407CE2" },]}> Reports</Text>
        </TouchableOpacity>

        {/* Notification */}
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab("notifications")}>
          <Icon
            name={activeTab === "notifications" ? "notifications" : "notifications-none"}
            size={28}
            color={activeTab === "notifications" ? "#407CE2" : "gray"}
          />
          <Text style={[styles.navLabel,activeTab === "notifications" && { color: "#407CE2" },]}> Notification</Text>

        </TouchableOpacity>

        {/* Profile */}
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab("profile")}>
          <Icon
            name={activeTab === "profile" ? "person" : "person-outline"}
            size={28}
            color={activeTab === "profile" ? "#407CE2" : "gray"}
          />
          <Text style={[styles.navLabel,activeTab === "profile" && { color: "#407CE2" },]}>Profile</Text>

        </TouchableOpacity>
      </View>

  </SafeAreaView>
);
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F0FB',
  },
  header: {
    flex: 0.55,
    flexDirection: "column",
    backgroundColor: "#F2FFF5",
    padding: 16,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    marginBottom: 10, 
    marginLeft:20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginLeft:20,
  },
  
  userText: {
    fontSize: 16,
    color: "black",
    marginLeft:20,
  },
  
  headerTextContainer: {
    flexDirection: 'column',
  },
  contentArea: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -20, 
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 10,
    padding: 6,
    marginVertical: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  actionItem: {
    alignItems: 'center',
  },

  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 6,
    backgroundColor: "#407CE2",
    justifyContent: "center",
    alignItems: "center",
  },
  
  iconImage: {
    width: 38,  
    height: 38,
    resizeMode: "contain",
  },
  
  actionText: {
    fontSize: 16,
    color: 'blacl',
  },
  articlesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 14,
    color: '#1A7FC1',
  },
  articleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    elevation: 1,
  },
  articleImage: {
    width: 54,
    height: 54,
    borderRadius: 12,
  },
  articleContent: {
    flex: 1,
    marginLeft: 16,
  },
  articleTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  articleMeta: {
    fontSize: 12,
    color: '#868686',
  },
  bookmarkIcon: {
    width: 22,
    height: 22,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#EEE',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 12,
    color: '#1A7FC1',
  },
});

export default VerificationScreen;
