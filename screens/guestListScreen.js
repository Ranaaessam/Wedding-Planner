import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableOpacity,
} from "react-native";
import { Linking } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const GuestListScreen = () => {
  const GUESTS = [
    {
      id: "0",
      title: "M",
      data: [
        {
          id: "0",
          text: "Mazen Ayman",
        },
        {
          id: "1",
          text: "Mahmoud Hamdy",
        },
      ],
    },
    {
      id: "1",
      title: "S",
      data: [
        {
          id: "0",
          text: "Salah Zaher",
        },
        {
          id: "1",
          text: "Shima Atef",
        },
      ],
    },
    {
      id: "2",
      title: "K",
      data: [
        {
          id: "0",
          text: "Khalid ElSayed",
        },
      ],
    },
    {
      id: "3",
      title: "R",
      data: [
        {
          id: "0",
          text: "Rana Essam",
        },
      ],
    },
  ];

  const sortedGuests = GUESTS.map((section) => {
    return {
      ...section,
      data: section.data.sort((a, b) => a.text.localeCompare(b.text)),
    };
  }).sort((a, b) => a.title.localeCompare(b.title));

  const totalGuests = sortedGuests.reduce(
    (sum, section) => sum + section.data.length,
    0
  );

  const WEDDING_ID = "123456";
  const GROOM_NAME = "Mr";
  const PRIDE_NAME = "Mrs";
  const YEAR = 2024;
  const MONTH = 7;
  const DAY = 10;
  const LOCATION = "Cairo";

  const sendWhatsAppMessage = () => {
    const formUrl = `https://docs.google.com/forms/d/e/1FAIpQLSf1hZmd0HHoQtKmXMkmWeETvebTsvQD6CTGWkFZNGsPN18gNA/viewform?usp=pp_url&entry.872775485=${WEDDING_ID}&entry.925082651=${GROOM_NAME}&entry.586009467=${PRIDE_NAME}&entry.256452489_year=${YEAR}&entry.256452489_month=${MONTH}&entry.256452489_day=${DAY}&entry.702515115=${LOCATION}`;
    const message = `Please fill out this form to join the guest list: ${formUrl}`;
    const url = `whatsapp://send?text=${encodeURIComponent(message)}`;

    Linking.openURL(url).catch(() =>
      alert("Make sure WhatsApp is installed on your device")
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <SectionList
        sections={sortedGuests}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
        renderItem={({ item: { text } }) => (
          <View
            style={[
              styles.container,
              { flexDirection: "row", alignItems: "center", marginBottom: 5 },
            ]}
          >
            <FontAwesome name="user-circle-o" size={30} />
            <Text style={styles.item}>{text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.addButton} onPress={sendWhatsAppMessage}>
        <FontAwesome name="share-alt" size={32} color="white" />
        <View style={styles.guestsNumContainer}>
          <Text style={styles.totalGuests}>{totalGuests}</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
    marginTop: 30,
  },
  totalGuests: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  header: {
    fontSize: 28,
    backgroundColor: "#FF81AE",
    color: "#FFF",
    fontWeight: "bold",
    paddingLeft: 10,
  },
  container: {
    padding: 10,
  },
  item: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FF81AE",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  guestsNumContainer: {
    position: "absolute",
    right: -2,
    bottom: -2,
    zIndex: 1,
    borderWidth: 1,
    borderColor: "#FFDFEB",
    justifyContent: "center",
    height: 20,
    width: 20,
    backgroundColor: "#FF81AE",
    borderRadius: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default GuestListScreen;
