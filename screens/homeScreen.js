import React from "react";
import { ScrollView, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Venues from "../components/venues";
import Suppliers from "../components/suppliers";
import Header from "../components/header";
import PlanList from "../components/planList";
import { useTranslation } from "react-i18next";

const HomeScreen = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <ScrollView>
      <SafeAreaView>
        <Header
          imageUri={
            "https://i.pinimg.com/564x/aa/10/8b/aa108b7ea07eab894954153872bf4863.jpg"
          }
          name={t("Mr & Mrs")}
          navigation={navigation}
        />
        <View style={styles.container}>
          <Text style={styles.header}>{t('Explore Venues near you')}</Text>
            {/* Venues******************** */}

          <Venues navigation={navigation} />
          <View style={{ paddingTop: 20 }}>
            <Text style={styles.header}>{t('Suppliers')}</Text>

            {/* Suppliers******************** */}
            <Suppliers navigation={navigation} />
          </View>
          <View style={{ paddingTop: 20 }}>
            <Text style={styles.header}>{t('Plan')}</Text>

            {/* Planlist******************** */}

            <PlanList />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  header: {
    padding: 5,
    fontWeight: "600",
    fontSize: 18,
  },
});

export default HomeScreen;
