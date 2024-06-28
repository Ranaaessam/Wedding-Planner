import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { useTranslation } from "react-i18next";

const Dots = ({ selected }) => {
  let backgroundColor;
  backgroundColor = selected ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.3)";
  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const Skip = ({ navigation, ...props }) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity style={{ marginHorizontal: 20 }} {...props}>
      <Text style={{ fontSize: 20 }}>{t("Skip")}</Text>
    </TouchableOpacity>
  );
};

const Next = ({ navigation, ...props }) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity style={{ marginHorizontal: 18 }} {...props}>
      <Text style={{ fontSize: 18 }}>{t("Next")}</Text>
    </TouchableOpacity>
  );
};

const Done = ({ navigation, ...props }) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity style={{ marginHorizontal: 20 }} {...props}>
      <Text style={{ fontSize: 18 }}>{t("Done")}</Text>
    </TouchableOpacity>
  );
};

const OnboardingScreen = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.replace("Login")}
      pages={[
        {
          backgroundColor: "#FF81AE",
          image: (
            <Image
              source={require("../assets/Images/1.jpg")}
              style={{ width: 250, height: 250, borderRadius: 300 }}
            />
          ),
          title: t("Simplify your wedding journey with expert guidance"),
          subtitle: t(
            "Ready to plan the wedding of your dreams? Our app offers everything you need to make your big day magical and stress-free!"
          ),
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
        {
          backgroundColor: "#FAC6D8",
          image: (
            <Image
              source={require("../assets/Images/cakee.png")}
              style={{ width: 200, height: 250 }}
            />
          ),
          title: t("Turn your wedding vision into an unforgettable reality"),
          subtitle: t(
            "Unlock the full potential of your wedding planning. Enjoy a journey filled with inspiration, organization, and joy."
          ),
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
        {
          backgroundColor: "#e9bcbe",
          image: (
            <Image
              source={require("../assets/Images/ring.png")}
              style={{ width: 250, height: 250, borderRadius: 200 }}
            />
          ),
          title: t("Experience the joy of effortless wedding planning."),
          subtitle: t(
            "Your perfect wedding is just a tap away. Discover a world of inspiration, organization, and expert advice."
          ),
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
});
