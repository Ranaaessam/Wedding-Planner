import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  Easing,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";
import { useDispatch, useSelector } from "react-redux";
import { getStatistics } from "../../StateManagement/slices/AdminSlice";

const AdminDashboard = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(
    new Animated.Value(-Dimensions.get("window").width)
  ).current;
  const dispatch = useDispatch();
  const statistics = useSelector((state) => state.admin.statistics);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
      easing: Easing.out(Easing.exp),
    }).start();

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
      easing: Easing.out(Easing.exp),
    }).start();

    dispatch(getStatistics());
  }, [fadeAnim, slideAnim, dispatch]);

  return (
    <ScrollView style={styles.container}>
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <Text style={styles.headerText}>Dashboard</Text>
        <Icon name="dashboard" size={30} color="black" />
      </Animated.View>

      <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
        <View style={styles.cardsContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate("Users Management");
            }}
            activeOpacity={0.7}>
            <Icon name="account-circle" size={40} color="#4c134e" />
            <Text style={styles.cardText}>User Management</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate("OrdersManagement");
            }}
            activeOpacity={0.7}>
            <Icon name="analytics" size={40} color="#b846a6" />
            <Text style={styles.cardText}>Reservations</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate("SuppliersManagement");
            }}
            activeOpacity={0.7}>
            <Icon name="sell" size={40} color="#FF81ae" />
            <Text style={styles.cardText}>Suppliers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate("ComplaintsManagement");
            }}
            activeOpacity={0.7}>
            <Icon name="report" size={40} color="#FF81ae" />
            <Text style={styles.cardText}>Complaints</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>User Growth</Text>
        <LineChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                data: [20, 45, 28, 80, 99, statistics?.usersCount || 10],
              },
            ],
          }}
          width={Dimensions.get("window").width - 30}
          height={220}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#b846a6",
            backgroundGradientTo: "#4c134e",
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          bezier
          fromZero
          animation
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Suppliers</Text>
        <BarChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                data: [30, 60, 45, 70, 85, statistics?.suppliersCount || 10],
              },
            ],
          }}
          width={Dimensions.get("window").width - 30}
          height={220}
          chartConfig={{
            backgroundColor: "#ff81ae",
            backgroundGradientTo: "#ff81ae",
            backgroundGradientFrom: "#4c134e",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          fromZero
          animation
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Expense Distribution</Text>
        <PieChart
          data={[
            {
              name: "Venues",
              population: statistics?.venuesCount || 10,
              color: "#4c134e",
              legendFontColor: "#7F7F7F",
              legendFontSize: 13,
            },
            {
              name: "Photographers",
              population: statistics?.photographersCount || 10,
              color: "#b846a6",
              legendFontColor: "#7F7F7F",
              legendFontSize: 13,
            },
            {
              name: "Makeup Artists",
              population: statistics?.makeupArtistsCount || 10,
              color: "#ff81ee",
              legendFontColor: "#7F7F7F",
              legendFontSize: 13,
            },
            {
              name: "Florists",
              population: statistics?.floristsCount || 10,
              color: "#ffdfeb",
              legendFontColor: "#7F7F7F",
              legendFontSize: 13,
            },
            {
              name: "Miscellaneous",
              population: 10,
              color: "#ffedf3",
              legendFontColor: "#7F7F7F",
              legendFontSize: 13,
            },
          ]}
          width={Dimensions.get("window").width - 100}
          height={220}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute={true}
          fromZero={true}
          animation={true}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#ffdfeb",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 60,
  },
  headerText: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    width: "43%",
    margin: 10,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  chartContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
});

export default AdminDashboard;
