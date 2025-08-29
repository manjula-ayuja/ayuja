
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
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import loginimage from "../assests/authscreenImages/Login.png";
import { REACT_APP_LOGIN_API } from "@env";


export default function Login({ navigation }) {
  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const reset = () => {
    navigation.navigate("PasswordReset");
  };

  // ✅ Handle Login API call
  const handleLogin = async () => {
    if (!identifier || !password) {
      alert("Please enter email/phone and password");
      return;
    }

    setLoading(true);
    try {
      console.log("Sending login request to:", REACT_APP_LOGIN_API);

      const res = await axios.post(`${REACT_APP_LOGIN_API}`, {
        identifier, // ✅ backend expects this
        password,
      });

      console.log("Login response:", res.data);

      // Save token securely
      await AsyncStorage.setItem("token", res.data.token);

      // ✅ Role-based navigation
      const userRole = res.data.user.role;
      console.log("User role:", userRole);

      if (userRole === "resident") {
        navigation.navigate("ResidentDashboard");
      } else if (userRole === "admin") {
        navigation.navigate("AdminDashboard");
      } else if (userRole === "superadmin") {
        navigation.navigate("SuperAdminDashboard");
      } else {
        navigation.navigate("WelcomeScreen");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.loginText}>Login</Text>

      {/* Hide image when keyboard opens */}
      {!keyboardVisible && (
        <Image source={loginimage} style={styles.loginImage} resizeMode="contain" />
      )}

      <TextInput
        label="Email or Phone"
        mode="outlined"
        value={identifier}
        onChangeText={setIdentifier}
        keyboardType="default" // ✅ allow both email & phone
        autoCapitalize="none"
        style={styles.input}
        outlineColor="#006D77"
        activeOutlineColor="#006D77"
        theme={{ colors: { placeholder: "#006D77", text: "black" } }}
      />

      <TextInput
        label="Password"
        mode="outlined"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        outlineColor="#006D77"
        activeOutlineColor="#006D77"
        theme={{ colors: { placeholder: "#006D77", text: "black" } }}
        right={
          <TextInput.Icon
            icon={secureTextEntry ? "eye-off" : "eye"}
            onPress={() => setSecureTextEntry(!secureTextEntry)}
          />
        }
      />

      <TouchableOpacity onPress={reset}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <Button
        mode="contained"
        style={styles.loginButton}
        labelStyle={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}
        loading={loading}
        onPress={handleLogin}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>Login</Text> 
      </Button>


      <Button
        mode="outlined"
        style={styles.logingoogle}
        labelStyle={{ color: "#006D77", fontSize: 16, fontWeight: "bold" }}
        onPress={() => console.log("Google login clicked")}
      >
       <Text style={{ color: "#006D77", fontSize: 16, fontWeight: "bold" }}>
    Login with Google
  </Text>
      </Button>

      <View style={styles.signupRow}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.signupText}>Sign Up</Text>
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
  loginText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#006D77",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 25,
  },
  loginImage: { width: 341, height: 395, marginBottom: 20 },
  input: { width: "100%", marginVertical: 6, borderColor: "#006D77" },
  forgotPassword: {
    alignSelf: "flex-end",
    color: "#006D77",
    fontSize: 15,
    marginVertical: 8,
  },
  loginButton: {
    width: "100%",
    marginTop: 8,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#006D77",
    fontSize: 32,
  },
  logingoogle: {
    width: "100%",
    marginTop: 8,
    paddingVertical: 6,
    borderRadius: 8,
    borderColor: "#006D77",
    borderWidth: 1,
  },
  signupRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
  },
  signupText: { color: "#006D77", fontWeight: "500" },
});
