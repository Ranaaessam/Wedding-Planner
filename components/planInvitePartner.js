import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const PlanInvitePartner = ({ navigation }) => {
  const { t } = useTranslation();
  const handlePress = () => {
    Alert.alert("Invite your partner");
  };

  return (
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
});

export default PlanInvitePartner;
