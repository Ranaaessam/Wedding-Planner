import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import PlanCoverImage from "../components/planCoverImage";
import PlanChecklist from "../components/planChecklist";
import PlanInvitePartner from "../components/planInvitePartner";
import PlanCard from "../components/planCard";
import PlanCards from "../components/planCards";
import { useTheme ,themes} from "../ThemeContext";

import { useTranslation } from "react-i18next";


const PlanScreen = ({navigation}) => {
  const {t} = useTranslation()
  const { theme, toggleTheme } = useTheme();

  return (
    // <View style={styles.container}>
       <View style={[styles.container, { backgroundColor: theme.background }]}>
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
    // backgroundColor: "white",
    backgroundColor: themes.cart,

  },
});

export default PlanScreen;
