import React from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";

const BudgetHistoryCard = ({
  image,
  type,
  name,
  price,
  navigation,
  onDelete,
}) => {
  const { t } = useTranslation();

  const renderRightActions = () => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          Alert.alert(
            t("Refund"),
            t("Are you sure you want to refund this item?"),
            [
              {
                text: t("Cancel"),
                style: "cancel",
              },
              {
                text: t("Refund"),
                onPress: onDelete,
                style: "destructive",
              },
            ]
          );
        }}
      >
        <Text style={styles.deleteButtonText}>{t("Refund")}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SupplierDetails");
        }}
      >
        <View style={styles.cardContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.type}>{t(type)}</Text>
            <Text style={styles.name}>{name}</Text>
          </View>
          <Text style={styles.price}>${price}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: "#e0e0df",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    height: 90,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  type: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "left",
  },
  name: {
    color: "grey",
    fontSize: 12,
  },
  price: {
    fontWeight: "bold",
    fontSize: 15,
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    borderRadius: 10,
    marginVertical: 20,
    height: 90,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default BudgetHistoryCard;
