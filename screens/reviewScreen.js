import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
} from "react-native";
import { Button, Card } from "react-native-paper";
import { useDispatch } from "react-redux";
import {
  addReview,
  getSupplierReview,
} from "../StateManagement/slices/ReviewSlice";
import storage from "../Storage/storage";
import { useTheme ,themes} from "../ThemeContext";

const ReviewScreen = ({ visible, onClose, supplierId }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();

  const submitReview = async () => {
    const r = await dispatch(
      addReview({ review: comment, rate: rating, to: supplierId })
    );
    dispatch(getSupplierReview({ supplierId }));
    setComment("");
    setRating(0);
    onClose();
  };
  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <Text
            style={[
              styles.star,
              { color: i <= rating ? "#FF81AE" : "#e0e0df" },
            ]}>
            ★
          </Text>
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} >
      {/* <SafeAreaView style={styles.container}> */}
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
    

        <View style={styles.modalContent}>
          <Card style={styles.card}>
            <Card.Title title="Rate Wedding Planner" />
            <Card.Content>
              <TextInput
                style={styles.textInput}
                placeholder="Your Review"
                multiline
                numberOfLines={4}
                onChangeText={(text) => setComment(text)}
                value={comment}
              />
              <View style={styles.starsContainer}>{renderStars()}</View>
              <Button
                mode="contained"
                style={styles.submitButton}
                onPress={submitReview}>
                Submit Review
              </Button>
              <Button mode="text" onPress={onClose}>
                Cancel
              </Button>
            </Card.Content>
          </Card>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundColor: themes.cart,

  },
  modalContent: {
    backgroundColor: "transparent",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  card: {
    width: "100%",
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  star: {
    fontSize: 30,
    marginHorizontal: 5,
  },
  textInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    textAlignVertical: "top",
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#FF81AE",
    padding: 10,
  },
});

export default ReviewScreen;
