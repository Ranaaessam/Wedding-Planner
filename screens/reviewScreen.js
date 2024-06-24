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
import { addReview } from "../StateManagement/slices/ReviewSlice";
import storage from "../Storage/storage";

const ReviewScreen = ({ visible, onClose }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();

  const submitReview = async () => {
    // get token from storage
    const userToken = await storage.load({ key: "userToken" });
    console.log(userToken);
    if (comment.length > 0 && rating > 0) {
      const reviewBody = {
        review: comment,
        rate: rating,
        //lsa mt3mlt4----------------------------
        to: "",
        //------------------------------------
        from: userToken,
      };
      dispatch(addReview(reviewBody));
      Alert.alert(
        "Review Submitted",
        `Rating: ${rating} stars\nComment: ${comment}`
      );
      setComment("");
      setRating(0);
      onClose();
    }
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
            ]}
          >
            ★
          </Text>
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <SafeAreaView style={styles.container}>
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
                onPress={submitReview}
              >
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
