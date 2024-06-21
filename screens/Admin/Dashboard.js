import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";

const AdminDashboard = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <ScrollView style={styles.container}>
      <Animated.View style={{ ...styles.header, opacity: fadeAnim }}>
        <Text style={styles.headerText}>Dashboard</Text>
        <Icon name="dashboard" size={30} color="#fff" />
      </Animated.View>

      <View style={styles.cardsContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigation.navigate("Users Management");
          }}>
          <Icon name="account-circle" size={40} color="#4CAF50" />
          <Text style={styles.cardText}>User Management</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigation.navigate("OrdersManagement");
          }}>
          <Icon name="analytics" size={40} color="#2196F3" />
          <Text style={styles.cardText}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigation.navigate("SuppliersManagement");
          }}>
          <Icon name="sell" size={40} color="#FFC107" />
          <Text style={styles.cardText}>Suppliers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigation.navigate("ComplaintsManagement");
          }}>
          <Icon name="report" size={40} color="#F44336" />
          <Text style={styles.cardText}>Complaints</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>User Growth</Text>
        <LineChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                data: [20, 45, 28, 80, 99, 43],
              },
            ],
          }}
          width={Dimensions.get("window").width - 30}
          height={220}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
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
          bezier
          fromZero
          animation
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Sales</Text>
        <BarChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                data: [30, 60, 45, 70, 85, 50],
              },
            ],
          }}
          width={Dimensions.get("window").width - 30}
          height={220}
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#43a047",
            backgroundGradientTo: "#66bb6a",
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
              population: 21500000,
              color: "rgba(131, 167, 234, 1)",
              legendFontColor: "#7F7F7F",
              legendFontSize: 14,
            },
            {
              name: "Photographers",
              population: 2800000,
              color: "#F00",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15,
            },
            {
              name: "Makeup-Artists",
              population: 527612,
              color: "rgb(0, 0, 255)",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15,
            },
            {
              name: "Cakes",
              population: 8538000,
              color: "#00FF00",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15,
            },
            {
              name: "Miscellaneous",
              population: 11920000,
              color: "rgb(255, 0, 255)",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15,
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
          absolute
          fromZero
          animation
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
    backgroundColor: "#4c134e",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 60,
  },
  headerText: {
    color: "#fff",
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
    elevation: 5,
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
