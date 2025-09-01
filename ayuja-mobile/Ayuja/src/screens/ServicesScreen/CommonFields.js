
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import CalenderBar from './Calenderbar';
import { useNavigation ,useRoute} from '@react-navigation/native'; 
const CommonFieldsScreen = ({serviceData}) => {
  const navigation = useNavigation(); 
  const route = useRoute();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const serviceTitle = serviceData?.serviceTitle || route.params?.serviceTitle;
  const serviceImage = serviceData?.serviceImage || route.params?.serviceImage;


  const handleContinue = () => {
    if (!name || !dob || !phone || !selectedDate) {
      alert("Please fill all required fields!");
      return;
    }
 
    navigation.navigate("SelectPaymentMethod", {
      name, 
      dob, 
      phone, 
      gender,
      selectedDate, 
      serviceTitle, 
      serviceImage,
    });
    
  };
  return (
    <ScrollView style={styles.container}>
      {/* Schedule */}
    <View style={styles.container}>
    <CalenderBar onDateChange={setSelectedDate} />
    </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Name*</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Date Of Birth*</Text>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/YYYY"
          value={dob}
          onChangeText={setDob}
        />

        <Text style={styles.label}>Phone Number*</Text>
        <TextInput
          style={styles.input}
          placeholder="+91 9876543210"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <Text style={styles.label}>Gender</Text>
        <TextInput
          style={styles.input}
          placeholder="Male - Female"
          value={gender}
          onChangeText={setGender}
        />
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Save & Continue</Text>
      </TouchableOpacity>
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

  scheduleContainer: { marginTop: 10 },
  scheduleTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12, color: '#000' },
  dateRow: { flexDirection: 'row', justifyContent: 'space-between' },
  dateBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignItems: 'center',
  },
  dateText: { fontSize: 14, fontWeight: '500', color: '#000', textAlign: 'center' },

  form: { marginTop: 20 },
  label: { fontSize: 14, fontWeight: '600', marginTop: 12, marginBottom: 6, color: '#000' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },

  button: {
    backgroundColor: '#008080',
    marginTop: 30,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default CommonFieldsScreen;



