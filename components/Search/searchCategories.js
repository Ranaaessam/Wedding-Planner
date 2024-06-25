import React, { useState } from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { filterResultsByCategory } from "../../StateManagement/slices/SearchSlice";

const categories = ["venue", "Photographer", "caterer", "Make-up Artist"];

const SearchCategories = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("venue");

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    console.log(
      `Dispatching filterResultsByCategory with category: ${category}`
    );
    dispatch(filterResultsByCategory({ category }));
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollView}
    >
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.categoryButton,
            selectedCategory === category && styles.selectedCategoryButton,
          ]}
          onPress={() => handleCategoryPress(category)}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === category && styles.selectedCategoryText,
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    minHeight: 50,
    maxHeight: 60,
    paddingVertical: 10,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 10,
  },
  selectedCategoryButton: {
    backgroundColor: "#FF81AE",
  },
  categoryText: {
    fontSize: 14,
    color: "#000",
    fontFamily: "PoppinsLight",
  },
  selectedCategoryText: {
    color: "#FFF",
  },
});

export default SearchCategories;
