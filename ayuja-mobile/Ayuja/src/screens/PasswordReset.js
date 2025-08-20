

import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import loginimage from "./assests/Login.png";
import Feather from "react-native-vector-icons/Feather";

export default function PasswordReset({ navigation }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [passwordSecure, setPasswordSecure] = useState(true);
  const [confirmPasswordSecure, setConfirmPasswordSecure] = useState(true);
  
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

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1); 
    } else {
      navigation.goBack(); 
    }
  };

  const handleSendOtp = () => {
    if (!email) {
      alert("Please enter an email");
      return;
    }
    alert(`OTP sent to ${email}`);
    setStep(2);
  };

  const handleVerifyOtp = () => {
    if (otp === "123456") {
      setStep(3);
    } else {
      alert("Invalid OTP");
    }
  };

  const handleResetPassword = () => {
    if (!password || !confirmPassword) {
      alert("Please fill both password fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // TODO: Call API to reset password
    alert("Password has been reset successfully");
    setStep(1);
    setEmail("");
    setOtp("");
    setPassword("");
    setConfirmPassword("");
  };

  // Custom heading text per step
  const getHeading = () => {
    switch (step) {
      case 1:
        return "Reset";
      case 2:
        return "Verification";
      case 3:
        return "Enter New Password";
      default:
        return "Password Reset";
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
    <TouchableOpacity onPress={goBack} style={styles.backButton}>
      <Feather name="arrow-left" size={40} color="#006D77" />
    </TouchableOpacity>

      <Text style={styles.loginText}>{getHeading()}</Text>

      {!keyboardVisible && step === 1 && (
        <Image
          source={loginimage}
          style={styles.loginImage}
          resizeMode="contain"
        />
      )}

      {step === 1 && (
        <>
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
            theme={{ colors: { placeholder: "#006D77", text: "black" } }}
          />
          <Button
            mode="contained"
            style={styles.loginButton}
            labelStyle={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}
            onPress={handleSendOtp}
          >
            Send code
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          <Text style={{ marginBottom: 8,fontSize: 16, fontWeight: "bold"}}>
            Enter the code
          </Text>
          <Text style={{ marginBottom: 8}}>
            We sent a verification code to your email 
          </Text>
          <Text style={{ marginBottom: 8}}>
            Please enter it below
          </Text>
          <TextInput
            label="code"
            mode="outlined"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
            maxLength={6}
            style={styles.input}
            outlineColor="#006D77"
            activeOutlineColor="#006D77"
            theme={{ colors: { placeholder: "#006D77", text: "black" } }}
          />
          <Button
            mode="contained"
            style={styles.loginButton}
            labelStyle={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}
            onPress={handleVerifyOtp}
          >
            Verify 
          </Button>
          <Button
            mode="text"
            onPress={handleSendOtp}
            labelStyle={{ color: "#006D77", fontSize: 14, fontWeight: "bold" }}
            style={{ marginTop: 12 }}
          >
            Resend Code
          </Button>
        </>
      )}

      {step === 3 && (
        <>

        <TextInput
          label="New Password"
          mode="outlined"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={passwordSecure}
          style={styles.input}
          outlineColor="#006D77"
          activeOutlineColor="#006D77"
          theme={{ colors: { placeholder: "#006D77", text: "black" } }}
          right={
            <TextInput.Icon
              icon={passwordSecure ? "eye-off" : "eye"}
              onPress={() => setPasswordSecure(!passwordSecure)}
            />
          }
        />

        <TextInput
          label="Confirm Password"
          mode="outlined"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={confirmPasswordSecure}
          style={styles.input}
          outlineColor="#006D77"
          activeOutlineColor="#006D77"
          theme={{ colors: { placeholder: "#006D77", text: "black" } }}
          right={
            <TextInput.Icon
              icon={confirmPasswordSecure ? "eye-off" : "eye"}
              onPress={() => setConfirmPasswordSecure(!confirmPasswordSecure)}
            />
          }
        />

          <Button
            mode="contained"
            style={styles.loginButton}
            labelStyle={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}
            onPress={handleResetPassword}
          >
            Reset Password
          </Button>
        </>
      )}
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
    marginTop: 80,
  },
  loginImage: { width: 341, height: 395, marginBottom: 20 },
  input: { width: "100%", marginVertical: 6, borderColor: "#006D77" },
  loginButton: {
    width: "100%",
    marginTop: 8,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#006D77",
    fontSize: 32,
  },
  backButton: {
    position: "absolute",
    top: 90,
    left: 20,
    padding: 10,
    zIndex: 1,
  },
  backButtonText: {
    color: "#006D77",
    fontWeight: "bold",
    fontSize: 30,
  },
});
