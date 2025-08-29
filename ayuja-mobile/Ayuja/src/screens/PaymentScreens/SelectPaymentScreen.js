// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList,
// } from "react-native";
// // import Icon from "react-native-vector-icons/MaterialIcons";
// import Icon from 'react-native-vector-icons/Ionicons';
// import FontAwesome from "react-native-vector-icons/FontAwesome";
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import { useNavigation } from '@react-navigation/native'; 
// const paymentOptions = [
//   { id: "1", label: "Ayuj Wallet", type: "wallet", icon: "account-balance-wallet" },
//   { id: "2", label: "**** **** **** 1234", type: "visa", icon: "cc-visa" },
//   { id: "3", label: "**** **** **** 1234", type: "mastercard", icon: "cc-mastercard" },
//   { id: "4", label: "UPI", type: "upi", icon: "mobile-alt" },
//   { id: "5", label: "Pay At Clinic", type: "offline", icon: "clinic-medical" }, 
// ];

// const PaymentMethodSelectionScreen = () => {
//       const navigation = useNavigation(); 
//   const [selected, setSelected] = useState("1");

//   const renderOption = ({ item }) => {
//     const isSelected = selected === item.id;

//     return (

           
//       <TouchableOpacity
//         style={[styles.optionBox, isSelected && styles.selectedBox]}
//         onPress={() => setSelected(item.id)}
//         activeOpacity={0.8}
//       >
//         <View style={styles.optionLeft}>
//           {/* Icons for payment type */}
//           {item.type === "wallet" && (
//             <Icon name={item.icon} size={22} color="#008080" />
//           )}
//           {item.type === "visa" && (
//             <FontAwesome name={item.icon} size={28} color="#1A1F71" />
//           )}
//           {item.type === "mastercard" && (
//             <FontAwesome name={item.icon} size={28} color="#EB001B" />
//           )}
//           {item.type === "upi" && (
//             <FontAwesome5 name={item.icon} size={22} color="#008080" />
//           )}
//           {item.type === "offline" && (
//             <Icon name={item.icon} size={22} color="#008080" />
//           )}

//           <Text style={styles.optionText}>{item.label}</Text>
//         </View>

//         {/* Radio button */}
//         <View
//           style={[
//             styles.radioOuter,
//             isSelected && styles.radioOuterSelected,
//           ]}
//         >
//           {isSelected && <View style={styles.radioInner} />}
//         </View>
//       </TouchableOpacity>
      
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         {/* <Icon name="arrow-back" size={22} color="#000" /> */}
//         <TouchableOpacity onPress={() => navigation.goBack()}> 
//                   <Icon name="chevron-back" size={26} color="#000" />
//                 </TouchableOpacity>
//         <Text style={styles.headerText}>PAYMENT METHOD</Text>
//       </View>

//       <Text style={styles.subText}>Choose Your Payment Method</Text>

//       {/* Payment Options */}
//       <FlatList
//         data={paymentOptions}
//         keyExtractor={(item) => item.id}
//         renderItem={renderOption}
//         contentContainerStyle={{ marginTop: 20 }}
//       />

//       {/* Button */}
//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Save & Continue</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default PaymentMethodSelectionScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 6,
//   },
//   headerText: {
//     fontSize: 18,
//     fontWeight: "700",
//     marginLeft: 12,
//     color: "#004d4d",
//   },
//   subText: {
//     fontSize: 14,
//     color: "#555",
//     marginBottom: 10,
//   },
//   optionBox: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     padding: 16,
//     marginBottom: 12,
//   },
//   selectedBox: {
//     borderColor: "#008080",
//     backgroundColor: "#E6F7F7",
//   },
//   optionLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//   },
//   optionText: {
//     fontSize: 15,
//     fontWeight: "500",
//     marginLeft: 10,
//     color: "#000",
//   },
//   radioOuter: {
//     height: 20,
//     width: 20,
//     borderRadius: 12,
//     borderWidth: 2,
//     borderColor: "#aaa",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   radioOuterSelected: {
//     borderColor: "#008080",
//   },
//   radioInner: {
//     height: 10,
//     width: 10,
//     borderRadius: 6,
//     backgroundColor: "#008080",
//   },
//   button: {
//     backgroundColor: "#008080",
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 30,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });



import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useNavigation } from '@react-navigation/native'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const paymentOptions = [
  { id: "1", label: "Ayuja Wallet", type: "wallet", icon: "account-balance-wallet" },
  { id: "2", label: "**** **** **** 1234", type: "visa", icon: "cc-visa" },
  { id: "3", label: "**** **** **** 1234", type: "mastercard", icon: "cc-mastercard" },
  { id: "4", label: "UPI", type: "upi", icon: "mobile-alt" },
  { id: "5", label: "Pay At Clinic", type: "offline", icon: "clinic-medical" }, 
];

const PaymentMethodSelectionScreen = () => {
  const navigation = useNavigation(); 
  const [selected, setSelected] = useState("1");

  const renderOption = ({ item }) => {
    const isSelected = selected === item.id;

    return (
      <TouchableOpacity
        style={[styles.optionBox, isSelected && styles.selectedBox]}
        onPress={() => setSelected(item.id)}
        activeOpacity={0.8}
      >
        <View style={styles.optionLeft}>
          {/* Icons for payment type */}
          {item.type === "wallet" && (
            <MaterialIcons name={item.icon} size={22} color="#008080" />
          )}
          {item.type === "visa" && (
            <FontAwesome name={item.icon} size={28} color="#1A1F71" />
          )}
          {item.type === "mastercard" && (
            <FontAwesome name={item.icon} size={28} color="#EB001B" />
          )}
          {item.type === "upi" && (
            <FontAwesome5 name={item.icon} size={22} color="#008080" />
          )}
          {item.type === "offline" && (
            <MaterialCommunityIcons name={item.icon} size={22} color="#008080" />
          )}

          <Text style={styles.optionText}>{item.label}</Text>
        </View>

        {/* Radio button */}
        <View
          style={[
            styles.radioOuter,
            isSelected && styles.radioOuterSelected,
          ]}
        >
          {isSelected && <View style={styles.radioInner} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}> 
          <Ionicons name="chevron-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>PAYMENT METHOD</Text> 
      </View>
      
      <Text style={styles.subText}>Choose Your Payment Method</Text>

      {/* Payment Options */}
      <FlatList
        data={paymentOptions}
        keyExtractor={(item) => item.id}
        renderItem={renderOption}
        contentContainerStyle={{ marginTop: 20 }}
      />

      {/* Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save & Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentMethodSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 20,marginTop:100,
    color: "#004d4d",
  },
  subText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  optionBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  selectedBox: {
    borderColor: "#008080",
    backgroundColor: "#E6F7F7",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  optionText: {
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 10,
    color: "#000",
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#aaa",
    justifyContent: "center",
    alignItems: "center",
  },
  radioOuterSelected: {
    borderColor: "#008080",
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 6,
    backgroundColor: "#008080",
  },
  button: {
    backgroundColor: "#008080",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
