
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList,
//   Modal,
//   ScrollView,
// } from "react-native";
// import Icon from "react-native-vector-icons/MaterialIcons";

// const months = [
//   "January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"
// ];

// const years = Array.from({ length: 30 }, (_, i) => 2020 + i); 

// const CalenderBar = () => {
//   const today = new Date();
//   const [selectedDate, setSelectedDate] = useState(today.getDate());
//   const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
//   const [selectedYear, setSelectedYear] = useState(today.getFullYear());
//   const [days, setDays] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [showYearSelector, setShowYearSelector] = useState(true);

//   // Generate days dynamically
//   useEffect(() => {
//     const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

//     let tempDays = [];
//     for (let i = 1; i <= daysInMonth; i++) {
//       const dayName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][
//         new Date(selectedYear, selectedMonth, i).getDay()
//       ];
//       tempDays.push({ day: dayName, date: i });
//     }
//     setDays(tempDays);

//     // adjust selected date if it’s bigger than new month’s last date
//     if (selectedDate > daysInMonth) setSelectedDate(daysInMonth);
//   }, [selectedMonth, selectedYear]);

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.title}>Schedule</Text>
//         <TouchableOpacity
//           style={styles.monthDropdown}
//           onPress={() => {
//             setShowYearSelector(true);
//             setModalVisible(true);
//           }}
//         >
//           <Text style={styles.monthText}>
//             {months[selectedMonth]} {selectedYear}
//           </Text>
//           <Icon name="arrow-drop-down" size={22} color="#000" />
//         </TouchableOpacity>
//       </View>

//       {/* Days Row */}
//       <FlatList
//         data={days}
//         horizontal
//         keyExtractor={(item) => item.date.toString()}
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item }) => {
//           const isSelected = selectedDate === item.date;
//           return (
//             <TouchableOpacity
//               style={[styles.dateBox, isSelected && styles.selectedDateBox]}
//               onPress={() => setSelectedDate(item.date)}
//             >
//               <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
//                 {item.day}
//               </Text>
//               <Text style={[styles.dateText, isSelected && styles.selectedDayText]}>
//                 {item.date}
//               </Text>
//             </TouchableOpacity>
//           );
//         }}
//       />

//       {/* Modal */}
//       <Modal visible={modalVisible} transparent animationType="slide">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             {showYearSelector ? (
//               <>
//                 <Text style={styles.modalTitle}>Select Year</Text>
//                 <ScrollView style={{ maxHeight: 250 }}>
//                   {years.map((y) => (
//                     <TouchableOpacity
//                       key={y}
//                       style={styles.option}
//                       onPress={() => {
//                         setSelectedYear(y);
//                         setShowYearSelector(false); // now show months
//                       }}
//                     >
//                       <Text style={styles.optionText}>{y}</Text>
//                     </TouchableOpacity>
//                   ))}
//                 </ScrollView>
//               </>
//             ) : (
//               <>
//                 <Text style={styles.modalTitle}>Select Month</Text>
//                 <ScrollView style={{ maxHeight: 250 }}>
//                   {months.map((m, idx) => (
//                     <TouchableOpacity
//                       key={m}
//                       style={styles.option}
//                       onPress={() => {
//                         setSelectedMonth(idx);
//                         setModalVisible(false);
//                       }}
//                     >
//                       <Text style={styles.optionText}>{m}</Text>
//                     </TouchableOpacity>
//                   ))}
//                 </ScrollView>
//               </>
//             )}

//             {/* Cancel */}
//             <TouchableOpacity
//               style={styles.closeBtn}
//               onPress={() => setModalVisible(false)}
//             >
//               <Text style={styles.closeBtnText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { marginTop: 10, marginBottom: 20 },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 12,
//     paddingHorizontal: 4,
//   },
//   title: { fontSize: 16, fontWeight: "600", color: "#000" },
//   monthDropdown: { flexDirection: "row", alignItems: "center" },
//   monthText: { fontSize: 14, color: "#000" },

//   dateBox: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 18,
//     alignItems: "center",
//     marginRight: 10,
//   },
//   selectedDateBox: {
//     backgroundColor: "#008080",
//     borderColor: "#008080",
//   },
//   dayText: { fontSize: 12, color: "#555", fontWeight: "600" },
//   dateText: { fontSize: 14, color: "#000", fontWeight: "600" },
//   selectedDayText: { color: "#fff" },

//   modalOverlay: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   modalContent: {
//     backgroundColor: "#fff",
//     width: "85%",
//     padding: 20,
//     borderRadius: 12,
//     alignItems: "center",
//   },
//   modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 15 },
//   option: {
//     paddingVertical: 10,
//     borderBottomWidth: 0.5,
//     borderColor: "#ddd",
//     width: "100%",
//     alignItems: "center",
//   },
//   optionText: { fontSize: 16, fontWeight: "500" },
//   closeBtn: {
//     marginTop: 15,
//     backgroundColor: "#008080",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//   },
//   closeBtnText: { color: "#fff", fontWeight: "600" },
// });

// export default CalenderBar




import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const years = Array.from({ length: 30 }, (_, i) => 2020 + i);

const CalenderBar = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [days, setDays] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [showYearSelector, setShowYearSelector] = useState(true);

  // Generate days dynamically (only today & future dates)
  useEffect(() => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const tempDays = [];
    const todayDate = today.getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      const dayName = ["SUN","MON","TUE","WED","THU","FRI","SAT"][
        new Date(selectedYear, selectedMonth, i).getDay()
      ];

      if (
        selectedYear > today.getFullYear() ||
        (selectedYear === today.getFullYear() &&
          (selectedMonth > today.getMonth() ||
            (selectedMonth === today.getMonth() && i >= todayDate)))
      ) {
        tempDays.push({ day: dayName, date: i });
      }
    }

    setDays(tempDays);

    // adjust selected date if invalid
    if (selectedDate && !tempDays.find(d => d.date === selectedDate)) {
      setSelectedDate(tempDays.length ? tempDays[0].date : null);
    }
  }, [selectedMonth, selectedYear]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Schedule</Text>
        <TouchableOpacity
          style={styles.monthDropdown}
          onPress={() => {
            setShowYearSelector(true);
            setModalVisible(true);
          }}
        >
          <Text style={styles.monthText}>
            {months[selectedMonth]} {selectedYear}
          </Text>
          <Icon name="arrow-drop-down" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Days Row */}
      <FlatList
        data={days}
        horizontal
        keyExtractor={(item) => item.date.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const isSelected = selectedDate === item.date;
          return (
            <TouchableOpacity
              style={[styles.dateBox, isSelected && styles.selectedDateBox]}
              onPress={() => setSelectedDate(item.date)}
            >
              <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
                {item.day}
              </Text>
              <Text style={[styles.dateText, isSelected && styles.selectedDayText]}>
                {item.date}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {showYearSelector ? (
              <>
                <Text style={styles.modalTitle}>Select Year</Text>
                <ScrollView style={{ maxHeight: 250 }}>
                  {years
                    .filter((y) => y >= today.getFullYear())
                    .map((y) => (
                      <TouchableOpacity
                        key={y}
                        style={styles.option}
                        onPress={() => {
                          setSelectedYear(y);
                          setShowYearSelector(false); // now show months
                        }}
                      >
                        <Text style={styles.optionText}>{y}</Text>
                      </TouchableOpacity>
                    ))}
                </ScrollView>
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>Select Month</Text>
                <ScrollView style={{ maxHeight: 250 }}>
                  {months.map((m, idx) => {
                    if (
                      selectedYear > today.getFullYear() ||
                      (selectedYear === today.getFullYear() &&
                        idx >= today.getMonth())
                    ) {
                      return (
                        <TouchableOpacity
                          key={m}
                          style={styles.option}
                          onPress={() => {
                            setSelectedMonth(idx);
                            setModalVisible(false);
                          }}
                        >
                          <Text style={styles.optionText}>{m}</Text>
                        </TouchableOpacity>
                      );
                    }
                    return null;
                  })}
                </ScrollView>
              </>
            )}

            {/* Cancel */}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 10, marginBottom: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  title: { fontSize: 16, fontWeight: "600", color: "#000" },
  monthDropdown: { flexDirection: "row", alignItems: "center" },
  monthText: { fontSize: 14, color: "#000" },

  dateBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignItems: "center",
    marginRight: 10,
  },
  selectedDateBox: {
    backgroundColor: "#008080",
    borderColor: "#008080",
  },
  dayText: { fontSize: 12, color: "#555", fontWeight: "600" },
  dateText: { fontSize: 14, color: "#000", fontWeight: "600" },
  selectedDayText: { color: "#fff" },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "85%",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 15 },
  option: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
    width: "100%",
    alignItems: "center",
  },
  optionText: { fontSize: 16, fontWeight: "500" },
  closeBtn: {
    marginTop: 15,
    backgroundColor: "#008080",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeBtnText: { color: "#fff", fontWeight: "600" },
});

export default CalenderBar;
