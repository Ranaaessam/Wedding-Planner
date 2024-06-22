// src/screens/GuestListScreen.js
import React, { useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchGuests } from "../StateManagement/slices/GuestListSlice";

const GuestListScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { guests, status, error } = useSelector((state) => state.guestList);

  useEffect(() => {
    dispatch(fetchGuests());
  }, [dispatch]);

  // Function to transform flat array of guests into sections
  const transformGuestsToSections = (guests) => {
    // Create an object to hold sections
    const sections = {};

    // Iterate through guests to populate sections
    guests.forEach((guest) => {
      const firstLetter = guest.name.charAt(0).toUpperCase();
      if (!sections[firstLetter]) {
        sections[firstLetter] = {
          title: firstLetter,
          data: [],
        };
      }
      sections[firstLetter].data.push(guest);
    });

    // Convert object of sections to array and sort by title
    const sectionsArray = Object.values(sections).sort((a, b) =>
      a.title.localeCompare(b.title)
    );

    return sectionsArray;
  };

  const sections = transformGuestsToSections(guests);

  const totalGuests = guests.length;

  const sendWhatsAppMessage = () => {
    // Your WhatsApp message handling
  };

  if (status === "loading") {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (status === "failed") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.errorText}>
          {t("Error loading guests:")} {error}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <SectionList
        sections={sections}
        renderSectionHeader={({ section }) => (
          <Text style={styles.header}>{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <FontAwesome name="user-circle-o" size={30} />
            <Text style={styles.item}>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    padding: 10,
  },
  item: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
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
