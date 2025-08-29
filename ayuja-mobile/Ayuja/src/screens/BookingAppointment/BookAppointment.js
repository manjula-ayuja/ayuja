// import React, { useState } from "react";
// import {
//   View,
//   ScrollView,
//   StyleSheet,
//   Alert,
//   Text,
//   TouchableOpacity,
// } from "react-native";
// import { TextInput, Button, Checkbox } from "react-native-paper";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import DocumentPicker from "react-native-document-picker";
// import DropDownPicker from "react-native-dropdown-picker";
// import { REACT_APP_BOOK_APPOINTMENT_API ,REACT_APP_PRESCRIPTION_STORE_API } from "@env";
// const BookAppointment = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     role: "",
//     service: "",
//     time: new Date(),
//     prescriptions: [],
//     terms: false,
//   });

//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showRoleDropdown, setShowRoleDropdown] = useState(false);
//   const [showServiceDropdown, setShowServiceDropdown] = useState(false);

//   const roles = [
//     { label: "Resident", value: "resident" },
//     { label: "Others", value: "other" },
//   ];

//   const services = [
//     { label: "Elderly and Childcare", value: "Elderly and Childcare" },
//     { label: "Nursing & Physiotherapy Services", value: "Nursing & Physiotherapy Services" },
//     { label: "Medicine & Diagnostic Delivery", value: "Medicine & Diagnostic Delivery" },
//     { label: "Emergency Care Support", value: "Emergency Care Support" },
//     { label: "Doctor Visit, Pickup & Drop", value: "Doctor Visit, Pickup & Drop" },
//     { label: "Social Wellness Activities", value: "Social Wellness Activities" },
//   ];


//   const handlePrescriptionUpload = async () => {
//     try {
//       const result = await DocumentPicker.getDocumentAsync({
//         type: ["image/*", "application/pdf"],
//         multiple: true,
//       });
//       if (!result.canceled) {
//         setFormData((prev) => ({
//           ...prev,
//           prescriptions: [...prev.prescriptions, ...result.assets],
//         }));
//       }
//     } catch (err) {
//       console.error("File selection error:", err);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!formData.role || !formData.service || !formData.time) {
//       Alert.alert("Error", "Role, Service and Time are mandatory fields.");
//       return;
//     }

//     try {
//       // 1️⃣ Book appointment
//       const res = await fetch(`${REACT_APP_BOOK_APPOINTMENT_API}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: formData.fullName,
//           email: formData.email,
//           phone: formData.phone,
//           role: formData.role,
//           service_type: formData.service,
//           date: formData.time,
//           notes: "Uploaded via mobile app",
//         }),
//       });

//       const bookingData = await res.json();

//       if (!res.ok) {
//         Alert.alert("Error", bookingData.error || "Failed to book appointment");
//         return;
//       }

//       const bookingId = bookingData.booking_id;
//       console.log("✅ Booking created:", bookingId);

//       // 2️⃣ Upload prescriptions
//       if (formData.prescriptions.length > 0) {
//         for (const file of formData.prescriptions) {
//           const formDataObj = new FormData();
//           formDataObj.append("file", {
//             uri: file.uri,
//             name: file.name || "file",
//             type: file.mimeType || "application/octet-stream",
//           });

//           const uploadRes = await fetch(`${REACT_APP_PRESCRIPTION_STORE_API}/${bookingId}`, {
//             method: "POST",
//             body: formDataObj,
//           });

//           const uploadData = await uploadRes.json();

//           if (uploadRes.ok) {
//             console.log("📄 Prescription uploaded:", uploadData.file_path);
//           } else {
//             console.error("❌ Upload failed:", uploadData.error);
//           }
//         }
//       }

//       Alert.alert("Success", "Appointment booked successfully!");

//       // 3️⃣ Reset the form
//       setFormData({
//         fullName: "",
//         email: "",
//         phone: "",
//         role: "",
//         service: "",
//         time: new Date(),
//         prescriptions: [],
//         terms: false,
//       });
//     } catch (err) {
//       console.error("Booking error:", err);
//       Alert.alert("Error", "Something went wrong while booking.");
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//     <Text style={styles.title}>Book Appointment</Text>

//     {/* Full Name */}
//     <TextInput
//       label="Full Name"
//       value={formData.fullName}
//       onChangeText={(text) => setFormData({ ...formData, fullName: text })}
//       style={styles.input}
//     />

//     {/* Email */}
//     <TextInput
//       label="Email Address"
//       value={formData.email}
//       onChangeText={(text) => setFormData({ ...formData, email: text })}
//       style={styles.input}
//       keyboardType="email-address"
//     />

//     {/* Phone */}
//     <TextInput
//       label="Phone"
//       value={formData.phone}
//       onChangeText={(text) => setFormData({ ...formData, phone: text })}
//       style={styles.input}
//       keyboardType="phone-pad"
//     />

//     {/* Role Dropdown */}
//     <DropDownPicker
//       label={"Select Role"}
//       mode={"outlined"}
//       visible={showRoleDropdown}
//       showDropDown={() => setShowRoleDropdown(true)}
//       onDismiss={() => setShowRoleDropdown(false)}
//       value={formData.role}
//       setValue={(value) => setFormData({ ...formData, role: value })}
//       list={roles}
//     />

//     {/* Service Dropdown */}
//     <DropDownPicker
//       label={"Select Service"}
//       mode={"outlined"}
//       visible={showServiceDropdown}
//       showDropDown={() => setShowServiceDropdown(true)}
//       onDismiss={() => setShowServiceDropdown(false)}
//       value={formData.service}
//       setValue={(value) => setFormData({ ...formData, service: value })}
//       list={services}
//     />

//     {/* Date/Time */}
//     <TouchableOpacity
//       onPress={() => setShowDatePicker(true)}
//       style={styles.dateBtn}
//     >
//       <Text style={{ color: "#333" }}>
//         {formData.time.toLocaleString()}
//       </Text>
//     </TouchableOpacity>
//     {showDatePicker && (
//       <DateTimePicker
//         value={formData.time}
//         mode="datetime"
//         minimumDate={new Date()} // prevent past dates
//         onChange={(event, selectedDate) => {
//           setShowDatePicker(false);
//           if (selectedDate) {
//             setFormData({ ...formData, time: selectedDate });
//           }
//         }}
//       />
//     )}

//     {/* Prescription Upload */}
//     <Button
//       mode="outlined"
//       onPress={handlePrescriptionUpload}
//       style={styles.uploadBtn}
//     >
//       Upload Prescriptions
//     </Button>
//     {formData.prescriptions.length > 0 && (
//       <Text style={{ marginBottom: 10 }}>
//         {formData.prescriptions.length} file(s) selected
//       </Text>
//     )}

//     {/* Terms */}
//     <View style={styles.checkboxContainer}>
//       <Checkbox
//         status={formData.terms ? "checked" : "unchecked"}
//         onPress={() =>
//           setFormData({ ...formData, terms: !formData.terms })
//         }
//       />
//       <Text style={styles.checkboxLabel}>
//         I accept all terms and conditions
//       </Text>
//     </View>

//     {/* Submit */}
//     <Button
//       mode="contained"
//       onPress={handleSubmit}
//       style={styles.submitBtn}
//     >
//       Book Now
//     </Button>
//   </ScrollView>
// );
// };

// const styles = StyleSheet.create({
// container: {
//   flexGrow: 1,
//   padding: 20,
//   backgroundColor: "#075372",
// },
// title: {
//   fontSize: 22,
//   fontWeight: "bold",
//   color: "#fff",
//   marginBottom: 20,
//   textAlign: "center",
// },
// input: {
//   marginBottom: 15,
//   backgroundColor: "#fff",
// },
// dateBtn: {
//   backgroundColor: "#fff",
//   padding: 15,
//   borderRadius: 8,
//   marginBottom: 15,
// },
// uploadBtn: {
//   marginBottom: 10,
// },
// checkboxContainer: {
//   flexDirection: "row",
//   alignItems: "center",
//   marginBottom: 15,
// },
// checkboxLabel: {
//   color: "#fff",
// },
// submitBtn: {
//   backgroundColor: "#66f2a7",
//   paddingVertical: 10,
//   borderRadius: 8,
// },
// });

// export default BookAppointment;



import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import { TextInput, Button, Checkbox } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import DocumentPicker from "react-native-document-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { REACT_APP_BOOK_APPOINTMENT_API, REACT_APP_PRESCRIPTION_STORE_API } from "@env";

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    service: "",
    time: new Date(),
    prescriptions: [],
    terms: false,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);

  const roles = [
    { label: "Resident", value: "resident" },
    { label: "Others", value: "other" },
  ];

  const services = [
    { label: "Elderly and Childcare", value: "Elderly and Childcare" },
    { label: "Nursing & Physiotherapy Services", value: "Nursing & Physiotherapy Services" },
    { label: "Medicine & Diagnostic Delivery", value: "Medicine & Diagnostic Delivery" },
    { label: "Emergency Care Support", value: "Emergency Care Support" },
    { label: "Doctor Visit, Pickup & Drop", value: "Doctor Visit, Pickup & Drop" },
    { label: "Social Wellness Activities", value: "Social Wellness Activities" },
  ];

  // ✅ Corrected for React Native CLI
  const handlePrescriptionUpload = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });

      setFormData((prev) => ({
        ...prev,
        prescriptions: [...prev.prescriptions, ...results],
      }));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled the picker");
      } else {
        console.error("File selection error:", err);
      }
    }
  };

  const handleSubmit = async () => {
    if (!formData.role || !formData.service || !formData.time) {
      Alert.alert("Error", "Role, Service and Time are mandatory fields.");
      return;
    }

    try {
      // 1️⃣ Book appointment
      const res = await fetch(`${REACT_APP_BOOK_APPOINTMENT_API}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          service_type: formData.service,
          date: formData.time,
          notes: "Uploaded via mobile app",
        }),
      });

      const bookingData = await res.json();

      if (!res.ok) {
        Alert.alert("Error", bookingData.error || "Failed to book appointment");
        return;
      }

      const bookingId = bookingData.booking_id;
      console.log("✅ Booking created:", bookingId);

      // 2️⃣ Upload prescriptions
      if (formData.prescriptions.length > 0) {
        for (const file of formData.prescriptions) {
          const formDataObj = new FormData();
          formDataObj.append("file", {
            uri: file.uri,
            name: file.name,
            type: file.type,
          });

          const uploadRes = await fetch(`${REACT_APP_PRESCRIPTION_STORE_API}/${bookingId}`, {
            method: "POST",
            body: formDataObj,
          });

          const uploadData = await uploadRes.json();

          if (uploadRes.ok) {
            console.log("📄 Prescription uploaded:", uploadData.file_path);
          } else {
            console.error("❌ Upload failed:", uploadData.error);
          }
        }
      }

      Alert.alert("Success", "Appointment booked successfully!");

      // 3️⃣ Reset the form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        role: "",
        service: "",
        time: new Date(),
        prescriptions: [],
        terms: false,
      });
    } catch (err) {
      console.error("Booking error:", err);
      Alert.alert("Error", "Something went wrong while booking.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Book Appointment</Text>

      {/* Full Name */}
      <TextInput
        label="Full Name"
        value={formData.fullName}
        onChangeText={(text) => setFormData({ ...formData, fullName: text })}
        style={styles.input}
      />

      {/* Email */}
      <TextInput
        label="Email Address"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        style={styles.input}
        keyboardType="email-address"
      />

      {/* Phone */}
      <TextInput
        label="Phone"
        value={formData.phone}
        onChangeText={(text) => setFormData({ ...formData, phone: text })}
        style={styles.input}
        keyboardType="phone-pad"
      />

      {/* Role Dropdown */}
      <DropDownPicker
        label="Select Role"
        mode="outlined"
        visible={showRoleDropdown}
        showDropDown={() => setShowRoleDropdown(true)}
        onDismiss={() => setShowRoleDropdown(false)}
        value={formData.role}
        setValue={(value) => setFormData({ ...formData, role: value })}
        list={roles}
      />

      {/* Service Dropdown */}
      <DropDownPicker
        label="Select Service"
        mode="outlined"
        visible={showServiceDropdown}
        showDropDown={() => setShowServiceDropdown(true)}
        onDismiss={() => setShowServiceDropdown(false)}
        value={formData.service}
        setValue={(value) => setFormData({ ...formData, service: value })}
        list={services}
      />

      {/* Date/Time */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateBtn}>
        <Text style={{ color: "#333" }}>{formData.time.toLocaleString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={formData.time}
          mode="datetime"
          minimumDate={new Date()}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setFormData({ ...formData, time: selectedDate });
          }}
        />
      )}

      {/* Prescription Upload */}
      <Button mode="outlined" onPress={handlePrescriptionUpload} style={styles.uploadBtn}>
        Upload Prescriptions
      </Button>
      {formData.prescriptions.length > 0 && (
        <Text style={{ marginBottom: 10 }}>{formData.prescriptions.length} file(s) selected</Text>
      )}

      {/* Terms */}
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={formData.terms ? "checked" : "unchecked"}
          onPress={() => setFormData({ ...formData, terms: !formData.terms })}
        />
        <Text style={styles.checkboxLabel}>I accept all terms and conditions</Text>
      </View>

      {/* Submit */}
      <Button mode="contained" onPress={handleSubmit} style={styles.submitBtn}>
        Book Now
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#075372" },
  title: { fontSize: 22, fontWeight: "bold", color: "#fff", marginBottom: 20, textAlign: "center" },
  input: { marginBottom: 15, backgroundColor: "#fff" },
  dateBtn: { backgroundColor: "#fff", padding: 15, borderRadius: 8, marginBottom: 15 },
  uploadBtn: { marginBottom: 10 },
  checkboxContainer: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  checkboxLabel: { color: "#fff" },
  submitBtn: { backgroundColor: "#66f2a7", paddingVertical: 10, borderRadius: 8 },
});

export default BookAppointment;
