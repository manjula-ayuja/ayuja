
import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { TextInput, Button } from "react-native-paper";
import loginimage from "./assests/Login.png";
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);



    const reset = () => {
        navigation.navigate("PasswordReset");
    };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.loginText}>Login</Text>

      {/*  Hide image when keyboard opens */}
      {!keyboardVisible && (
        <Image
          source={loginimage}
          style={styles.loginImage}
          resizeMode="contain"
        />
      )}


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
        theme={{
          colors: {
            placeholder: "#006D77",    
            text: "black",              
          },
        }}
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
        theme={{
          colors: {
            placeholder: "#006D77",
            text: "black",
          },
        }}
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
        onPress={() => console.log("Login clicked")}
      >
        Login
      </Button>

      <Button
        mode="outlined"
        style={styles.logingoogle}
        labelStyle={{ color: "#006D77", fontSize: 16, fontWeight: "bold" }}
        onPress={() => console.log("Login clicked")}
      >
        Login with Google
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
  loginText: { fontSize: 32, fontWeight: "bold", color:"#006D77",textAlign: "center", marginBottom: 20 ,marginTop:25},
  loginImage: { width: 341, height: 395, marginBottom: 20 },
  input: { width: "100%", marginVertical: 6,borderColor:"#006D77" },
  forgotPassword: { alignSelf: "flex-end", color:"#006D77", fontSize: 15, marginVertical: 8 },
  loginButton: { width: "100%", marginTop: 8, paddingVertical: 6, borderRadius: 8,backgroundColor:"#006D77",fontSize: 32 },
  logingoogle: {width: "100%",marginTop: 8,paddingVertical: 6,borderRadius: 8,borderColor: "#006D77",borderWidth: 1, },
  signupRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 22 },
  signupText: { color:"#006D77", fontWeight: "500" },
});
