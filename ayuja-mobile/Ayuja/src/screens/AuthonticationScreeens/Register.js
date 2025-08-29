
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import loginimage from "../assests/authscreenImages/Login.png";
import { REACT_APP_REGISTER_URL } from "@env";  
import DropDownPicker from "react-native-dropdown-picker";
export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

  const roles = [
    { label: "Resident", value: "resident" },
    { label: "Admin", value: "admin" },
    { label: "Super Admin", value: "superadmin" },
    { label: "Staff", value: "staff" },
    { label: "Others", value: "other" },
  ];

  // ✅ Hide logo when keyboard opens
  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // ✅ Handle Signup
  const handleRegister = async () => {
    if (!name || !email || !phone || !password || !confirmPassword || !role) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      console.log("Sending signup request to:", REACT_APP_REGISTER_URL);

      const response = await axios.post(REACT_APP_REGISTER_URL, {
        name,
        email,
        phone,
        password,
        role,
      });

      console.log("Signup response:", response.data);

      if (response.data.success) {
        // Save token
        await AsyncStorage.setItem("token", response.data.token);

        Alert.alert("Success", "Registration successful!");

        // ✅ Role-based navigation
        const userRole = response.data.user.role;
        if (userRole === "resident") {
          navigation.navigate("ResidentDashboard");
        } else if (userRole === "admin") {
          navigation.navigate("AdminDashboard");
        } else if (userRole === "superadmin") {
          navigation.navigate("SuperAdminDashboard");
        } else {
          navigation.navigate("Home");
        }
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.registerText}>Sign Up</Text>

      {/* Hide image when keyboard opens */}
      {!keyboardVisible && (
        <Image source={loginimage} style={styles.registerImage} resizeMode="contain" />
      )}

      {/* Name */}
      <TextInput
        label="Name"
        mode="outlined"
        value={name}
        onChangeText={setName}
        style={styles.input}
        outlineColor="#006D77"
        activeOutlineColor="#006D77"
      />

      {/* Email */}
      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        outlineColor="#006D77"
        activeOutlineColor="#006D77"
      />

      {/* Phone */}
      <TextInput
        label="Phone"
        mode="outlined"
        value={phone}
        onChangeText={(val) => setPhone(val.replace(/\D/g, "").slice(0, 10))}
        keyboardType="phone-pad"
        style={styles.input}
        outlineColor="#006D77"
        activeOutlineColor="#006D77"
      />

      {/* Password */}
      <TextInput
        label="Password"
        mode="outlined"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        outlineColor="#006D77"
        activeOutlineColor="#006D77"
        right={
          <TextInput.Icon
            icon={secureTextEntry ? "eye-off" : "eye"}
            onPress={() => setSecureTextEntry(!secureTextEntry)}
          />
        }
      />

      {/* Confirm Password */}
      <TextInput
        label="Confirm Password"
        mode="outlined"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={secureConfirmPassword}
        style={styles.input}
        outlineColor="#006D77"
        activeOutlineColor="#006D77"
        right={
          <TextInput.Icon
            icon={secureConfirmPassword ? "eye-off" : "eye"}
            onPress={() => setSecureConfirmPassword(!secureConfirmPassword)}
          />
        }
      />


      {/* Role */}
    
        <DropDownPicker
          style={styles.input}
          outlineColor="#006D77"
          activeOutlineColor="#006D77"
          open={showDropDown}            
          value={role}                   
          items={roles}               
          setOpen={setShowDropDown}  
          setValue={setRole}  
          setItems={() => {}}           
        />



      {/* Signup Button */}
      <Button
        mode="contained"
        style={styles.registerButton}
        labelStyle={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}
        loading={loading}
        onPress={handleRegister}
      >
        Sign Up
      </Button>

      {/* Google Signup (dummy for now) */}
      <Button
        mode="outlined"
        style={styles.registergoogle}
        labelStyle={{ color: "#006D77", fontSize: 16, fontWeight: "bold" }}
        onPress={() => console.log("Signup with Google")}
      >
        Signup with Google
      </Button>

      <View style={styles.signupRow}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signupText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  registerText: { fontSize: 32, fontWeight: "bold", color:"#006D77", textAlign: "center", marginBottom: 20, marginTop:25 },
  registerImage: { width: 341, height: 395, marginBottom: 15 },
  input: { width: "100%", marginVertical: 6, borderColor:"#006D77" },
  registerButton: { width: "100%", marginTop: 8, paddingVertical: 6, borderRadius: 8, backgroundColor:"#006D77", fontSize: 32 },
  registergoogle: { width: "100%", marginTop: 8, paddingVertical: 6, borderRadius: 8, borderColor: "#006D77", borderWidth: 1 },
  signupRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 22 },
  signupText: { color:"#006D77", fontWeight: "500" },
});
