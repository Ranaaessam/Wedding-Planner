import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/Octicons";

const PlanIcon = ({ iconName, name, navigation }) => {
  const { t } = useTranslation();
  const handlePress = () => {
    if (name === "Budget") {
      navigation.navigate("Budget");
    } else if (name === "Checklist") {
      navigation.navigate("CheckList");
    } else if (name === "Guest") {
      navigation.navigate("Guestlist");
    } else if (name === "Advice") {
      navigation.navigate("ChatBot");
    } else if (name === "Gift") {
      Alert.alert(
        "Upcoming feature",
        "Look out for new gift suggestions coming in our next update!"
      );
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.circle}>
        <Icon name={iconName} size={25} color="#000" />
      </View>
      <Text style={styles.text}>{t(name)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 5,
    marginHorizontal: 9,
  },
  circle: {
    height: 50,
    width: 50,
    backgroundColor: "#FFDFEB",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PlanIcon;
