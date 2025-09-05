
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, StyleSheet, Modal } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Avatar, Button, Snackbar, IconButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REACT_APP_GET_USER_DETAILS_API, REACT_APP_UPDATE_USER_PROFILE_API, REACT_APP_CHANGE_PASSWORD_API } from "@env";

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    emergency_contacts: [{ name: "", phone: "" }],
    family_members: [{ name: "", relation: "" }],
    documents: [{ type: "", number: "" }],
  });

  const [snackbar, setSnackbar] = useState({ visible: false, message: "", type: "success" });
  const [passwordData, setPasswordData] = useState({ new_password: "", confirm_password: "" });
  const [showPassword, setShowPassword] = useState({ new: false, confirm: false });
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  const getUserDetailsAPI = REACT_APP_GET_USER_DETAILS_API;
  const updateProfileAPI = REACT_APP_UPDATE_USER_PROFILE_API;
  const changePasswordAPI = REACT_APP_CHANGE_PASSWORD_API;

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;

        const res = await fetch(getUserDetailsAPI, {
          method: "GET",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          const emergency_contacts = data.user.emergency_contacts?.map(c =>
            typeof c === "string" ? { name: c.split(":")[0], phone: c.split(":")[1] } : c
          ) || [{ name: "", phone: "" }];

          const family_members = data.user.family_members?.map(m =>
            typeof m === "string" ? { name: m.split(":")[0], relation: m.split(":")[1] } : m
          ) || [{ name: "", relation: "" }];

          setUser(data.user);
          setFormData({
            name: data.user.name || "",
            email: data.user.email || "",
            phone: data.user.phone || "",
            address: data.user.address || "",
            emergency_contacts,
            family_members,
            documents: data.user.documents || [{ type: "", number: "" }],
          });
        } else {
          setSnackbar({ visible: true, message: data.error, type: "error" });
        }
      } catch (err) {
        setSnackbar({ visible: true, message: "Failed to fetch user data!", type: "error" });
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (key, value) => setFormData({ ...formData, [key]: value });
  const handleEmergencyChange = (index, field, value) => { const updated = [...formData.emergency_contacts]; updated[index][field] = value; setFormData({ ...formData, emergency_contacts: updated }); };
  const handleFamilyChange = (index, field, value) => { const updated = [...formData.family_members]; updated[index][field] = value; setFormData({ ...formData, family_members: updated }); };
  const handleDocumentChange = (index, field, value) => { const updated = [...formData.documents]; updated[index][field] = value; setFormData({ ...formData, documents: updated }); };
  const validateDocument = (type, number) => { if (type === "Aadhar") return /^\d{12}$/.test(number); if (type === "PAN") return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(number); return true; };

  const handleSaveProfile = async () => {
    for (const doc of formData.documents) {
      if (!validateDocument(doc.type, doc.number)) {
        setSnackbar({ visible: true, message: `${doc.type} number is invalid!`, type: "error" });
        return;
      }
    }
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await fetch(updateProfileAPI, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        setEditMode(false);
        setSnackbar({ visible: true, message: "Profile updated successfully!", type: "success" });
      } else {
        setSnackbar({ visible: true, message: data.error, type: "error" });
      }
    } catch (err) {
      setSnackbar({ visible: true, message: "Something went wrong!", type: "error" });
    }
  };

  // ✅ Change Password
  const handleChangePassword = async () => {
    if (passwordData.new_password !== passwordData.confirm_password) {
      setSnackbar({ visible: true, message: "Passwords do not match!", type: "error" });
      return;
    }
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await fetch(changePasswordAPI, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(passwordData),
      });
      const data = await res.json();
      if (res.ok) {
        setSnackbar({ visible: true, message: "Password updated successfully!", type: "success" });
        setPasswordModalVisible(false);
        setPasswordData({ new_password: "", confirm_password: "" });
      } else {
        setSnackbar({ visible: true, message: data.error, type: "error" });
      }
    } catch (err) {
      setSnackbar({ visible: true, message: "Something went wrong!", type: "error" });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.avatarContainer}>
          <Avatar.Text size={80} label={formData.name?.charAt(0)?.toUpperCase() || "U"} />
        </View>
        <View style={styles.editButton}>
          <IconButton icon="pencil" size={24} onPress={() => setEditMode(!editMode)} />
        </View>

        {/* Edit Mode */}
        {editMode ? (
          <View>
            <TextInput style={styles.input} placeholder="Name" value={formData.name} onChangeText={(v) => handleChange("name", v)} />
            <TextInput style={styles.input} placeholder="Email" value={formData.email} onChangeText={(v) => handleChange("email", v)} keyboardType="email-address" />
            <TextInput style={styles.input} placeholder="Phone" value={formData.phone} onChangeText={(v) => handleChange("phone", v)} keyboardType="phone-pad" />
            <TextInput style={styles.input} placeholder="Address" value={formData.address} onChangeText={(v) => handleChange("address", v)} />

            <Text style={styles.sectionTitle}>Emergency Contacts</Text>
            {formData.emergency_contacts.map((c, idx) => (
              <View key={idx} style={styles.row}>
                <TextInput style={styles.input} placeholder="Name" value={c.name} onChangeText={(v) => handleEmergencyChange(idx, "name", v)} />
                <TextInput style={styles.input} placeholder="Phone" value={c.phone} onChangeText={(v) => handleEmergencyChange(idx, "phone", v)} />
              </View>
            ))}
            <Button mode="outlined" onPress={() => setFormData({ ...formData, emergency_contacts: [...formData.emergency_contacts, { name: "", phone: "" }] })}>
              + Add Contact
            </Button>

            <Text style={styles.sectionTitle}>Family Members</Text>
            {formData.family_members.map((m, idx) => (
              <View key={idx} style={styles.row}>
                <TextInput style={styles.input} placeholder="Name" value={m.name} onChangeText={(v) => handleFamilyChange(idx, "name", v)} />
                <TextInput style={styles.input} placeholder="Relation" value={m.relation} onChangeText={(v) => handleFamilyChange(idx, "relation", v)} />
              </View>
            ))}
            <Button mode="outlined" onPress={() => setFormData({ ...formData, family_members: [...formData.family_members, { name: "", relation: "" }] })}>
              + Add Member
            </Button>

            <Text style={styles.sectionTitle}>Documents</Text>
            {formData.documents.map((d, idx) => (
              <View key={idx} style={styles.row}>
                <TextInput style={styles.input} placeholder="Type (Aadhar/PAN)" value={d.type} onChangeText={(v) => handleDocumentChange(idx, "type", v)} />
                <TextInput style={styles.input} placeholder="Number" value={d.number} onChangeText={(v) => handleDocumentChange(idx, "number", v)} />
              </View>
            ))}
            <Button mode="outlined" onPress={() => setFormData({ ...formData, documents: [...formData.documents, { type: "", number: "" }] })}>
              + Add Document
            </Button>

            <Button mode="contained" onPress={handleSaveProfile} style={styles.saveButton}>
              Save Changes
            </Button>
          </View>
        ) : (
          <View>
            <Text style={styles.label}>Name: {user?.name}</Text>
            <Text style={styles.label}>Email: {user?.email}</Text>
            <Text style={styles.label}>Phone: {user?.phone}</Text>
            <Text style={styles.label}>Address: {user?.address}</Text>

            <Text style={styles.sectionTitle}>Emergency Contacts</Text>
            {formData.emergency_contacts.map((c, idx) => (
              <Text key={idx}>• {c.name} ({c.phone})</Text>
            ))}

            <Text style={styles.sectionTitle}>Family Members</Text>
            {formData.family_members.map((m, idx) => (
              <Text key={idx}>• {m.name} - {m.relation}</Text>
            ))}

            <Text style={styles.sectionTitle}>Documents</Text>
            {formData.documents.map((d, idx) => (
              <Text key={idx}>• {d.type}: {d.number}</Text>
            ))}

            <Button mode="text" onPress={() => setPasswordModalVisible(true)}>
              Change Password
            </Button>
          </View>
        )}

{/* ✅ Password Modal */}
<Modal visible={passwordModalVisible} animationType="slide" transparent>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Change Password</Text>

      {/* New Password Field */}
      <Text style={styles.inputLabel}>New Password</Text>
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.modalInput}
          placeholder="Enter new password"
          value={passwordData.new_password}
          secureTextEntry={!showPassword.new}
          onChangeText={(v) => setPasswordData({ ...passwordData, new_password: v })}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
        >
          <Ionicons
            name={showPassword.new ? "eye-off" : "eye"}
            size={22}
            color="#555"
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password Field */}
      <Text style={styles.inputLabel}>Confirm Password</Text>
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.modalInput}
          placeholder="Confirm new password"
          value={passwordData.confirm_password}
          secureTextEntry={!showPassword.confirm}
          onChangeText={(v) => setPasswordData({ ...passwordData, confirm_password: v })}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
        >
          <Ionicons
            name={showPassword.confirm ? "eye-off" : "eye"}
            size={22}
            color="#555"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.modalButtons}>
        <Button mode="text" onPress={() => setPasswordModalVisible(false)}>
          Cancel
        </Button>
        <Button
          mode="contained"
          onPress={handleChangePassword}
          style={{ backgroundColor: "#006D77" }}
        >
          Update
        </Button>
      </View>
    </View>
  </View>
</Modal>


        {/* Snackbar */}
        <Snackbar
          visible={snackbar.visible}
          onDismiss={() => setSnackbar({ ...snackbar, visible: false })}
          duration={3000}
        >
          {snackbar.message}
        </Snackbar>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#F2FFF5" },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 16 },
  title: { fontSize: 32, color: "#006D77", textAlign: "center", marginBottom: 16 },
  avatarContainer: { alignItems: "center", marginVertical: 16 },
  editButton: { position: "absolute", top: 16, right: 16 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 20, marginVertical: 4, flex: 1 },
  row: { flexDirection: "row", gap: 8, marginBottom: 8 },
  sectionTitle: { marginTop: 16, fontSize: 18, fontWeight: "bold", color: "#006D77" },
  label: { marginVertical: 4, fontSize: 16 },
  saveButton: { marginTop: 16, backgroundColor: "#006D77" },
  modalOverlay: {flex: 1,justifyContent: "center",alignItems: "center",backgroundColor: "rgba(0,0,0,0.4)",},
  modalContent: {width: "85%",backgroundColor: "#fff",borderRadius: 12,padding: 20,elevation: 5,},
  modalTitle: {fontSize: 20,fontWeight: "bold",color: "#006D77",marginBottom: 20,textAlign: "center",},
  inputLabel: {fontSize: 14,color: "#006D77",marginBottom: 4,marginTop: 10,fontWeight: "bold",},
  passwordInputContainer: {position: "relative",width: "100%",
  },
  modalInput: {width: "100%",height: 50,borderWidth: 1,borderColor: "#ccc",borderRadius: 8,paddingHorizontal: 12,fontSize: 16,paddingRight: 40,},
  eyeIcon: {position: "absolute",right: 10,top: 14,},
  modalButtons: {flexDirection: "row",justifyContent: "space-between",marginTop: 20,},
});

export default ProfileScreen;
