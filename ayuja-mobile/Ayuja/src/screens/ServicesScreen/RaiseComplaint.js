import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; 
import TopNavScreen from "./TopNavScreen";
const RaiseComplaintScreen = () => {
    const navigation = useNavigation(); 
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [complaint, setComplaint] = useState('');

  const handleSubmit = () => {
    console.log("Name:", name);
    console.log("Phone:", phone);
    console.log("Complaint:", complaint);
    // You can add API call here
  };

  return (
    <>
    <TopNavScreen/>
   
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}> 
            <Icon name="chevron-back" size={26} color="#000" />
        </TouchableOpacity>
      <Text style={styles.header}>RAISE COMPLAINT</Text>

      {/* Name Field */}
      <Text style={styles.label}>Name*</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Name"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />

      {/* Phone Field */}
      <Text style={styles.label}>Phone Number*</Text>
      <TextInput
        style={styles.input}
        placeholder="+91 9876543210"
        placeholderTextColor="#aaa"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      {/* Complaint Field */}
      <Text style={styles.label}>Write Your Complaint Here</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Hi I am [Your Name], I'm having a..."
        placeholderTextColor="#aaa"
        value={complaint}
        onChangeText={setComplaint}
        multiline
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
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
        backgroundColor: "#fff",
        elevation: 5, // Shadow (Android)
        shadowColor: "#000", // Shadow (iOS)
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#004d61',
  },
  label: {
    fontSize: 14,
    marginTop: 15,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    fontSize: 16,
    color: '#000',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#00796b',
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RaiseComplaintScreen;
