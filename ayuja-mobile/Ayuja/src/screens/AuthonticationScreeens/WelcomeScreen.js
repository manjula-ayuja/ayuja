import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,StatusBar } from 'react-native';
import welcome from "../assests/authscreenImages/welcome.png";
import ayujalogo from "../assests/AyujaLogo.png";
export default function WelcomeScreen({ navigation }) {
   return (
    <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <Image
        source={welcome} 
        style={styles.heroImage}
        resizeMode="cover"
      />
      <Text style={styles.welcomeText}>Welcome to</Text>
      <View style={styles.logoContainer}>
        <Image
          source={ayujalogo}
          style={styles.logo}
        />
      </View>
      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',  paddingTop: 0,
  },
  
  heroImage: {
    width: "100%",
    height: 423,
    paddingTop: 0,
    alignSelf: "flex-start",
  },
  
  welcomeText: { fontSize:22, marginTop:70, fontWeight:'bold',textAlign:"center",fontFamily:"Montserrat",color:"#006D77" },

  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  logo: {
    width: 244.04,
    height: 85,
  },
  
  brandName: { fontSize:32, fontWeight:'bold', color:'#212121' },
  getStartedButton: {
    backgroundColor: '#006D77',
    paddingVertical: 14,
    paddingHorizontal: 130,
    borderRadius: 8,
    marginTop: 18,
  },
  
  buttonText: { color:'#fff', fontSize:18, fontWeight:'500' }
});

