import React from "react";
import { useTranslation } from "react-i18next";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Icon } from "react-native-elements";
import { useTheme } from "../ThemeContext"; // Adjust the import path as needed

const ContactUs = () => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme(); // Use the custom theme

  const handleInstagramPress = () => {
    Linking.openURL("https://www.instagram.com/yourcompany/");
  };

  const handleFacebookPress = () => {
    Linking.openURL("https://www.facebook.com/yourcompany/");
  };

  const handleTwitterPress = () => {
    Linking.openURL("https://www.twitter.com/yourcompany/");
  };

  const handleGmail = () => {
    Linking.openURL("https://mail.google.com/");
  };

  const handleLocation = () => {
    Linking.openURL("https://www.google.com/maps/");
  };

  const handlePhoneCall = () => {
    Linking.openURL("tel:+1234567890");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        {t("Contact Us")}
      </Text>
      <Text style={[styles.introText, { color: theme.text }]}>
        {t(
          "If you have any questions or require assistance, feel free to reach out to us. We're here to help!"
        )}
      </Text>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {t("Contact Information")}
        </Text>

        <View style={styles.row}>
          <Icon name="phone" type="font-awesome" color="#ff81ae" />
          <TouchableOpacity onPress={handlePhoneCall}>
            <Text style={[styles.contactText, { color: "black" }]}>
              +1-800-123-4567
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <Icon name="envelope" type="font-awesome" color="#ff81ae" />
          <TouchableOpacity onPress={handleGmail}>
            <Text style={[styles.contactText, { color: "black" }]}>
              support@yourcompany.com
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <Icon name="map-marker" type="font-awesome" color="#ff81ae" />
          <TouchableOpacity onPress={handleLocation}>
            <Text style={[styles.contactText, { color: "black" }]}>
              123 Main St, City, Country
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.separator}></View>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        {t("Follow Us On Social Media")}
      </Text>

      <View style={styles.socialMediaContainer}>
        <TouchableOpacity
          style={styles.socialMediaIcon}
          onPress={handleInstagramPress}>
          <Icon
            name="instagram"
            type="font-awesome"
            color="#E1306C"
            size={40}
          />
          <Text style={[styles.socialMediaText, { color: theme.text }]}>
            Instagram
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialMediaIcon}
          onPress={handleFacebookPress}>
          <Icon
            name="facebook-square"
            type="font-awesome"
            color="#3b5998"
            size={40}
          />
          <Text style={[styles.socialMediaText, { color: theme.text }]}>
            Facebook
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialMediaIcon}
          onPress={handleTwitterPress}>
          <Icon
            name="twitter-square"
            type="font-awesome"
            color="#1DA1F2"
            size={40}
          />
          <Text style={[styles.socialMediaText, { color: theme.text }]}>
            Twitter
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    marginTop: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#4C134E",
    textAlign: "center",
    marginBottom: 10,
  },
  introText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  contactText: {
    marginLeft: 18,
    fontSize: 18,
  },
  socialMediaContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    alignItems: "center",
  },
  socialMediaText: {
    marginTop: 5,
    color: "#555",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 20,
  },
});

export default ContactUs;
