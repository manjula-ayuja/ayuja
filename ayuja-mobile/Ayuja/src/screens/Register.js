
import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { TextInput, Button } from "react-native-paper";
import loginimage from "./assests/Login.png";
export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
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
      <Text style={styles.registerText}>Sign Up</Text>

      {/*  Hide image when keyboard opens */}
      {!keyboardVisible && (
        <Image
          source={loginimage}
          style={styles.registerImage}
          resizeMode="contain"
        />
      )}
      <TextInput
        label="Name"
        mode="outlined"
        value={name}
        onChangeText={setName}
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
        style={styles.registerButton}
        labelStyle={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}
        onPress={() => console.log("Signup clicked")}
      >
        Sign Up
      </Button>

      {/* <Button
        mode="outlined"
        style={styles.registergoogle}
        labelStyle={{ color: "#006D77", fontSize: 16, fontWeight: "bold" }}
        onPress={() => console.log("Signup clicked")}
      >
        Signup with Google
      </Button> */}

      <View style={styles.signupRow}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("register")}>
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
  registerText: { fontSize: 32, fontWeight: "bold", color:"#006D77",textAlign: "center", marginBottom: 20 ,marginTop:25},
  registerImage: { width: 341, height: 395, marginBottom: 15 },
  input: { width: "100%", marginVertical: 6,borderColor:"#006D77" },
  forgotPassword: { alignSelf: "flex-end", color:"#006D77", fontSize: 15, marginVertical: 8 },
  registerButton: { width: "100%", marginTop: 8, paddingVertical: 6, borderRadius: 8,backgroundColor:"#006D77",fontSize: 32 },
  registergoogle: {width: "100%",marginTop: 8,paddingVertical: 6,borderRadius: 8,borderColor: "#006D77",borderWidth: 1, },
  signupRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 22 },
  signupText: { color:"#006D77", fontWeight: "500" },
});
