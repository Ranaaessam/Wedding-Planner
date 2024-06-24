import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import PlanCoverImage from "../components/planCoverImage";
import PlanChecklist from "../components/planChecklist";
import PlanInvitePartner from "../components/planInvitePartner";
import PlanCard from "../components/planCard";
import PlanCards from "../components/planCards";
import { useTranslation } from "react-i18next";

const PlanScreen = ({navigation}) => {
  const {t} = useTranslation()
  return (
    <View style={styles.container}>
      <PlanCoverImage
        image={
          "https://img.freepik.com/premium-vector/avatar-wedding-couple_24911-14448.jpg"
        }
        name={t("Mr & Mrs")}
      />
      <PlanChecklist navigation={navigation} />
      <PlanInvitePartner navigation={navigation} />
      <PlanCards navigation={navigation}></PlanCards>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default PlanScreen;
