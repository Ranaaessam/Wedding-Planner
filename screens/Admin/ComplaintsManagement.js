import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ComplaintsManagement = () => {
  const [complaints, setComplaints] = useState([
    {
      id: "1",
      from: "John Doe",
      date: "2024-06-15",
      details: "The service was not up to the mark.",
    },
    {
      id: "2",
      from: "Jane Smith",
      date: "2024-06-16",
      details: "There was an issue with the payment process.",
    },
    {
      id: "3",
      from: "Michael Johnson",
      date: "2024-06-17",
      details: "The product quality was below expectations.",
    },
    // Add more complaints as needed
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentComplaintId, setCurrentComplaintId] = useState(null);
  const [replyText, setReplyText] = useState("");

  const replyToComplaint = (complaintId) => {
    setCurrentComplaintId(complaintId);
    setModalVisible(true);
  };

  const handleSendReply = () => {
    setComplaints((prevComplaints) =>
      prevComplaints.filter((complaint) => complaint.id !== currentComplaintId)
    );
    setReplyText("");
    setModalVisible(false);
    Alert.alert(
      "Reply Sent",
      `Reply to complaint ID: ${currentComplaintId}\nMessage: ${replyText}`
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.complaintCard}>
      <View style={styles.iconContainer}>
        <Icon name="report-problem" size={40} color="#FFA726" />
      </View>
      <View style={styles.complaintInfo}>
        <Text style={styles.complaintFrom}>From: {item.from}</Text>
        <Text style={styles.complaintDate}>Date: {item.date}</Text>
        <Text style={styles.complaintDetails}>{item.details}</Text>
      </View>
      <TouchableOpacity onPress={() => replyToComplaint(item.id)}>
        <Icon name="reply" size={30} color="#4CAF50" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Complaints</Text>
      <FlatList
        data={complaints}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Reply to Complaint</Text>
            <TextInput
              style={styles.input}
              placeholder="Type your reply here..."
              value={replyText}
              onChangeText={setReplyText}
              multiline
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.sendButton]}
                onPress={handleSendReply}>
                <Text style={styles.buttonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f7fa",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#00796b",
  },
  listContainer: {
    paddingBottom: 20,
  },
  complaintCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  iconContainer: {
    marginRight: 15,
  },
  complaintInfo: {
    flex: 1,
  },
  complaintFrom: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00796b",
    marginBottom: 5,
  },
  complaintDate: {
    fontSize: 16,
    color: "#00796b",
    marginBottom: 10,
  },
  complaintDetails: {
    fontSize: 16,
    color: "#333333",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#00796b",
  },
  input: {
    width: "100%",
    height: 100,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#FF6347",
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ComplaintsManagement;
