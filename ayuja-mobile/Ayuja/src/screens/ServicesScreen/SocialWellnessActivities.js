
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; 
import ForSeniors from "../assests/servicescreenImages/ForSeniors.png";
import CommonFieldsScreen from './CommonFields';
const SocialWellnessActivities = () => {
  const navigation = useNavigation();  

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}> 
          <Icon name="chevron-back" size={26} color="#000" />
        </TouchableOpacity>
        <View style={styles.profile}>
          <Image
            source={ForSeniors} 
            style={styles.image}
          />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.title}>SOCIAL WELLNESS ACTIVITIES</Text>
            <Text style={styles.subtitle}>
              Ayuja Will Choose Right People For The Timing Of Your Selection
            </Text>
          </View>
        </View>
      </View>

 <CommonFieldsScreen/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { marginBottom: 20 },
  profile: { flexDirection: 'row', alignItems: 'center', marginTop: 50 },
  image: { width: 60, height: 60, borderRadius: 12 },
  title: { fontSize: 16, fontWeight: '700', color: '#000' },
  subtitle: { fontSize: 12, color: '#666', marginTop: 4, width: 220 },
});

export default SocialWellnessActivities;



