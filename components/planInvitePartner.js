import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import axios from "axios";
import API_URL from "../constants";
import storage from "../Storage/storage"; // Replace with your actual storage import

const PlanInvitePartner = ({ navigation }) => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [accountId, setAccountID] = useState("");

  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const id = await storage.load({ key: "accountId" });
        setAccountID(id);
        console.log("Account ID fetched:", id);
      } catch (error) {
        console.error("Error fetching account ID:", error);
      }
    };
    fetchUserID();
  }, []);

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleInvite = async () => {
    setEmailError("");
    setNameError("");

    if (!email.trim()) {
      setEmailError("Please enter an email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (!name.trim()) {
      setNameError("Please enter a name.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/users/invite`, {
        name: name,
        email: email,
        accountId: accountId,
      });

      Alert.alert(`This Email: ${email} added successfully to this account!`);
      setModalVisible(false);
      setEmail("");
      setName("");
    } catch (error) {
      Alert.alert("Error inviting user", error.message);
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.checklist} onPress={handlePress}>
        <View style={styles.content}>
          <View style={styles.iconText}>
            <Icon name="mail" size={28} />
            <View>
              <Text style={styles.text}>
                {t("Invite your partner to plan together")}
              </Text>
              <Text style={styles.textSecond}>{t("Invite your partner")}</Text>
            </View>
          </View>
          <View style={styles.rightIcon}>
            <Icon name="right" size={28} />
          </View>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Invite Your Partner</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#888"
              value={name}
              onChangeText={setName}
            />
            {nameError ? (
              <Text style={styles.errorText}>{nameError}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleInvite}>
                <Text style={styles.inviteText}>Send Invitation</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  checklist: {
    backgroundColor: "white",
    height: "7%",
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "grey",
    zIndex: 1,
    position: "absolute",
    top: "54.6%",
    justifyContent: "center",
    padding: 10,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 10,
    fontSize: 13,
    color: "black",
    fontWeight: "700",
  },
  textSecond: {
    marginLeft: 10,
    fontSize: 11,
    color: "grey",
    fontWeight: "500",
    textAlign: "left",
  },
  rightIcon: {
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    borderWidth: 3,
    borderColor: "pink",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FF81AE",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    textAlign: "start",
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  errorText: {
    color: "red",
  },
  inviteText: {
    color: "#FF81AE",
    fontSize: 18,
    marginTop: 10,
  },
  cancelText: {
    color: "red",
    fontSize: 18,
    marginTop: 10,
  },
});

export default PlanInvitePartner;
