import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ProgressBar from "../components/progressBar";
import Icon from "react-native-vector-icons/AntDesign";
import { CheckBox } from "react-native-elements";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const PlanChecklist = ({ navigation }) => {
  const planCompletion = useSelector(
    (state) => state.checklist.completionPercentage
  );
  const { t } = useTranslation();
  return (
    <TouchableOpacity
      style={styles.checklist}
      onPress={() => navigation.navigate("CheckList")}
    >
      <View style={styles.content}>
        <View style={styles.iconText}>
          <Icon name="checkcircleo" size={28} />
          <Text style={styles.text}>{t("Checklist")}</Text>
        </View>
        <View style={styles.progressContainer}>
          <ProgressBar progress={planCompletion} />
          <Text style={styles.progressText}>
            {planCompletion ? `${planCompletion}%` : "0%"} {t("Completed")}
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <CheckBox
          checkedColor="#FF81AE"
          checked={planCompletion === 100}
          onPress={() => {}}
          containerStyle={styles.checkBox}
        />
        <Text style={styles.checkText}>
          {t("Start spreading your wedding news")}
        </Text>
        <Icon name="right" size={24} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checklist: {
    backgroundColor: "white",
    height: "11%",
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "grey",
    zIndex: 1,
    position: "absolute",
    top: "40.3%",
    justifyContent: "center",
    padding: 10,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 10,
    fontSize: 18,
    color: "black",
    fontWeight: "700",
  },
  progressContainer: {
    alignItems: "center",
  },
  progressText: {
    textAlign: "right",
  },
  checkBox: {
    padding: 0,
    margin: 0,
    marginLeft: 4.5,
  },
  checkText: {
    fontSize: 13,
    color: "black",
    fontWeight: "600",
    flex: 1,
    marginLeft: 0,
    textAlign: "left",
  },
});

export default PlanChecklist;
