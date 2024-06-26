import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Calendar } from "react-native-calendars";
import Icon from "react-native-vector-icons/FontAwesome";

const AvailabilityCalendar = ({ availability, onTimeSelect }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [times, setTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);

  const onDayPress = (day) => {
    const selectedDate = new Date(day.dateString);
    const today = new Date();

    if (selectedDate < today) {
      setSelectedDay(null);
      setTimes([]);
      return; // Exit function if selected day is before today
    }

    setSelectedDay(day.dateString);
    setSelectedTime(null); // Reset the selected time when a new day is selected

    if (
      availability[day.dateString] &&
      availability[day.dateString].customStyles.container.backgroundColor ===
        "red"
    ) {
      // If the selected day is marked as occupied
      setTimes([]);
    } else {
      // Example times
      setTimes(["09:00 PM - 10:00 PM", "10:00 PM - 11:00 PM"]);
    }
  };

  const onTimePress = (time) => {
    setSelectedTime(time);
    if (onTimeSelect) {
      onTimeSelect(selectedDay, time);
    }
  };

  const renderTimeItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.4}
      style={styles.timeItem}
      onPress={() => onTimePress(item)}>
      <Text style={styles.timeText}>{item}</Text>
      {selectedTime === item && (
        <Icon name="check" size={20} color="#FF81AE" style={styles.checkIcon} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={availability}
        markingType={"custom"}
        disablePreviousDays={true}
        theme={{
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#2d4150",
          selectedDayBackgroundColor: "#2ecc71",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#FF81AE",
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9e1e8",
          dotColor: "#2ecc71",
          selectedDotColor: "#ffffff",
          arrowColor: "#2d4150",
          monthTextColor: "#FF81AE",
          indicatorColor: "#3498db",
          textDayFontFamily: "Roboto",
          textMonthFontFamily: "Roboto",
          textDayHeaderFontFamily: "Roboto",
          textDayFontWeight: "400",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "400",
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
        calendarStyle={styles.calendarStyle}
        dayContainerStyle={styles.dayContainerStyle}
      />
      {selectedDay && (
        <View style={styles.timesContainer}>
          <Text style={styles.selectedDayText}>
            Available times on {selectedDay}:
          </Text>
          {times.length > 0 ? (
            <FlatList
              data={times}
              renderItem={renderTimeItem}
              keyExtractor={(item) => item}
            />
          ) : (
            <Text style={styles.noTimesText}>Fully Booked!</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  timesContainer: {
    marginTop: 20,
  },
  selectedDayText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FF81AE",
  },
  timeItem: {
    padding: 15,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 15,
    marginTop: 3,
  },
  timeText: {
    fontSize: 16,
    color: "#2d4150",
  },
  checkIcon: {
    marginLeft: 10,
  },
  noTimesText: {
    fontSize: 16,
    color: "#e74c3c",
    textAlign: "center",
    marginTop: 10,
  },
  calendarStyle: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
  },
  dayContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default AvailabilityCalendar;
