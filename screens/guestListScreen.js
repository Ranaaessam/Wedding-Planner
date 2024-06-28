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
import { Linking } from "react-native";
import { fetchGuests } from "../StateManagement/slices/GuestListSlice";
import storage from "../Storage/storage";
import { useTheme ,themes} from "../ThemeContext"



const GuestListScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
const { theme, toggleTheme } = useTheme();

  const { guests, status, error } = useSelector((state) => state.guestList);
  const userDetails = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(fetchGuests());
  }, [dispatch]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = await storage.load({ key: "userId" });
      dispatch(getUserProfile(userId));
    };
    fetchUserProfile();
  }, [dispatch]);

  // Function to transform flat array of guests into sections
  const transformGuestsToSections = (guests) => {
    // Create an object to hold sections
    const sections = {};

    // Iterate through guests to populate sections
    guests.forEach((guest) => {
      const firstLetter = guest.enteredName.charAt(0).toUpperCase();
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
    const formUrl = `https://docs.google.com/forms/d/e/1FAIpQLSf1hZmd0HHoQtKmXMkmWeETvebTsvQD6CTGWkFZNGsPN18gNA/viewform?usp=pp_url&entry.872775485=${userDetails._id}`;
    const message = `Please fill out this form to join the guest list: ${formUrl}`;
    const url = `whatsapp://send?text=${encodeURIComponent(message)}`;

    Linking.openURL(url).catch(() =>
      alert("Make sure WhatsApp is installed on your device")
    );
  };

  if (status === "loading") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#FF81AE" />
        </View>
      </SafeAreaView>
    );
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
    <SafeAreaView       style={[styles.safeArea, { backgroundColor: theme.background}]}
>
      <SectionList
        sections={sections}
        renderSectionHeader={({ section }) => (
          <Text style={styles.header}>{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <FontAwesome name="user-circle-o" size={30} style={{color:theme.text}} />
            <View style={styles.guestInfo}>
      <Text style={[styles.item, { color: theme.text}]} >{item.enteredName}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.timeStamp}
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
  guestInfo: {
    marginLeft: 10,
  },
  item: {
    fontSize: 18,
    fontWeight: "bold",
  },
  details: {
    fontSize: 14,
    color: "#888",
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GuestListScreen;
