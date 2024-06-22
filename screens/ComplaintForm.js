import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { submitComplaint } from "../StateManagement/slices/SettingsSlice";

const ComplaintForm = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [vendorId, setVendorId] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [complaintDetails, setComplaintDetails] = useState("");
  const [complaintId, setComplaintId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    if (!vendorId || !userName || !email || !complaintDetails) {
      setError(t("Please fill out all fields."));
      return;
    }

    if (!validateEmail(email)) {
      setError(t("Please enter a valid email address."));
      return;
    }

    const complaint = {
      vendorId,
      userName,
      email,
      complaintDetails,
    };

    try {
      const resultAction = await dispatch(submitComplaint(complaint));
      if (submitComplaint.fulfilled.match(resultAction)) {
        const generatedComplaintId = resultAction.payload.id;
        setComplaintId(generatedComplaintId);
        setModalVisible(true);
        setVendorId("");
        setUserName("");
        setEmail("");
        setComplaintDetails("");
        setError("");
      } else {
        setError(t("Failed to submit complaint. Please try again."));
      }
    } catch (err) {
      setError(t("Failed to submit complaint. Please try again."));
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setComplaintId(null);
  };

  const handleReturn = () => {
    navigation.navigate("Home");
    setModalVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageTitle}>{t("Complaint Form")}</Text>
        <Text style={styles.subtitle}>
          {t("We'll reach out to you as soon as possible")}
        </Text>

        <View style={styles.formContainer}>
          <TextInput
            style={[styles.input, styles.shadowInput]}
            placeholder={t("Full Name")}
            value={userName}
            onChangeText={(text) => setUserName(text)}
            placeholderTextColor="#333"
          />
          <TextInput
            style={[styles.input, styles.shadowInput]}
            placeholder={t("Email Address")}
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            placeholderTextColor="#333"
          />
          <TextInput
            style={[styles.input, styles.shadowInput]}
            placeholder={t("Vendor ID")}
            value={vendorId}
            onChangeText={(text) => setVendorId(text)}
            placeholderTextColor="#333"
          />
          <TextInput
            style={[styles.input, styles.shadowInput, { height: 100 }]}
            placeholder={t("Complaint Details")}
            value={complaintDetails}
            onChangeText={(text) => setComplaintDetails(text)}
            multiline
            placeholderTextColor="#333"
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>{t("Submit Complaint")}</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{t("Complaint ID")}</Text>
              <Text style={styles.complaintIdText}>
                {t("ID")}: {complaintId}
              </Text>
              <Button
                title={t("Return to homepage")}
                onPress={handleReturn}
                color="#4C134E"
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#FFDFEB",
    padding: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4C134E",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#4C134E",
    marginBottom: 20,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#FF81AE",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "100%",
    backgroundColor: "#F5F5F5",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
    color: "#333",
  },
  shadowInput: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#4C134E",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
    minWidth: "80%",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4C134E",
  },
  complaintIdText: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
  },
});

export default ComplaintForm;
