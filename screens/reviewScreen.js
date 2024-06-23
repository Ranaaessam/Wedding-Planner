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
} from "react-native";
import { Provider as PaperProvider, Button, Card } from "react-native-paper";
import { useDispatch } from "react-redux";
import { addReview } from "../StateManagement/slices/ReviewSlice";
import storage from "../Storage/storage";

const ReviewApp = () => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();

  const submitReview = () => {
    //get token from storage
    const userToken = storage.load({ key: "userToken" });
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
    }
  };

  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <Text
            style={[styles.star, { color: i <= rating ? "#FFD700" : "#ccc" }]}
          >
            ★
          </Text>
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
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
            </Card.Content>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%", // Adjust width as needed
    padding: 10,
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
    backgroundColor: "#00b5ec",
    padding: 10,
  },
});

export default ReviewApp;
