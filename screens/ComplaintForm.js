// ComplaintForm.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';

const ComplaintForm = () => {
  const [vendorId, setVendorId] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [complaintDetails, setComplaintDetails] = useState('');
  const [complaintId, setComplaintId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!vendorId || !userName || !email || !complaintDetails) {
      setError('Please fill out all fields.');
      return;
    }

    const generatedComplaintId = Math.random().toString(36).substr(2, 9);
    setComplaintId(generatedComplaintId);
    setModalVisible(true);
    setVendorId('');
    setUserName('');
    setEmail('');
    setComplaintDetails('');
    setError('');
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setComplaintId(null);
  };

  const handleReturn = () => {
    setModalVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Leave Your Complaint Below❕</Text>
        <Text style={styles.subtitle}>➡Will reach you as soon as we can</Text>

        <View style={styles.formContainer}>
          <TextInput
            style={[styles.input, styles.shadowInput]}
            placeholder="Vendor ID"
            value={vendorId}
            onChangeText={text => setVendorId(text)}
          />
          <TextInput
            style={[styles.input, styles.shadowInput]}
            placeholder="Full Name"
            value={userName}
            onChangeText={text => setUserName(text)}
          />
          <TextInput
            style={[styles.input, styles.shadowInput]}
            placeholder="Email Address"
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
          />
          <TextInput
            style={[styles.input, styles.shadowInput, { height: 100 }]}
            placeholder="Complaint Details"
            value={complaintDetails}
            onChangeText={text => setComplaintDetails(text)}
            multiline
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Submit Complaint</Text>
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
              <Text style={styles.modalTitle}>Complaint ID❕</Text>
              <Text style={styles.complaintIdText}>ID: {complaintId}</Text>
              <Button
                title="Return"
                onPress={handleReturn}
                color="#4C134E"
              />
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F8BBD0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4C134E', 
    marginBottom: 20,
    alignItems:"center",
    

  },
  subtitle: {
    fontSize: 16,
    // fontWeight: 'bold',
    color: '#4C134E', 
    marginBottom: 20,
    justifyContent:"start",
    alignItems:"start"
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 20,
    borderColor: '#FFEDF3', 
    borderWidth: 5, 
  },
  input: {
    height: 40,
    width: '100%',
    backgroundColor: '#F5F5F5', 
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius:5
  },
  shadowInput: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#4C134E',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    borderColor: '#FFEDF3', 
    borderWidth: 5, 
    alignItems: 'center',
    elevation: 5,
    minWidth: '80%',
  },
  
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4C134E', 
  },
  complaintIdText: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight:"bold"
  },
});

export default ComplaintForm;
