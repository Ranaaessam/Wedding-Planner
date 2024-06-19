import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

// Mock list of reserved time slots
const reservedSlots = [
  { date: new Date(2024, 5, 19, 17, 0), duration: 2 }, // 07:00 PM to 09:00 PM
  // Add more reserved slots as needed
];

const ReservationScreen = () => {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(
    new Date(startTime.getTime() + 2 * 60 * 60 * 1000)
  ); // 2 hours later

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const renderStars = () => {
    const filledStars = Math.floor(3);
    const halfStar = 3 - filledStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - filledStars - halfStar;

    const stars = [];
    for (let i = 0; i < filledStars; i++) {
      stars.push(<FontAwesome key={i} name="star" size={20} color="#FF81AE" />);
    }
    if (halfStar) {
      stars.push(
        <FontAwesome key="half" name="star-half" size={20} color="#FF81AE" />
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesome
          key={`empty-${i}`}
          name="star-o"
          size={20}
          color="#FFDFEB"
        />
      );
    }
    return stars;
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);

    // If the selected date is today, ensure the start time is not in the past
    if (
      currentDate.toDateString() === new Date().toDateString() &&
      startTime < new Date()
    ) {
      setStartTime(new Date());
    }

    // Automatically update end time based on new start time
    setEndTime(new Date(startTime.getTime() + 2 * 60 * 60 * 1000));
  };

  const onStartTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || startTime;
    setShowStartTimePicker(false);

    if (!isTimeSlotAvailable(currentTime, endTime)) {
      Alert.alert(
        "Time Slot Unavailable",
        "The selected time slot is already reserved. Please choose another time."
      );
      return;
    }

    setStartTime(currentTime);

    // Automatically update end time based on new start time
    setEndTime(new Date(currentTime.getTime() + 2 * 60 * 60 * 1000));
  };

  const onEndTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || endTime;
    setShowEndTimePicker(false);

    if (!isTimeSlotAvailable(startTime, currentTime)) {
      Alert.alert(
        "Time Slot Unavailable",
        "The selected time slot is already reserved. Please choose another time."
      );
      return;
    }

    setEndTime(currentTime);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (time) => {
    return time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const isTimeSlotAvailable = (start, end) => {
    return !reservedSlots.some((slot) => {
      const slotStart = new Date(slot.date);
      const slotEnd = new Date(
        slotStart.getTime() + slot.duration * 60 * 60 * 1000
      );
      return (
        (start >= slotStart && start < slotEnd) ||
        (end > slotStart && end <= slotEnd) ||
        (start < slotStart && end > slotEnd)
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text style={styles.header}>Marriott Zamalek</Text>
          <View style={styles.ratingContainer}>{renderStars()}</View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>$45</Text>
          <Text style={styles.unit}>hour</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 30,
          alignItems: "flex-end",
        }}
      >
        <FontAwesome name="building" size={25} color="#FF81AE"></FontAwesome>
        <Text
          style={{
            marginLeft: 10,
            color: "grey",
            fontSize: 13,
            fontWeight: "600",
          }}
        >
          Saray El, Gezira St
        </Text>
      </View>
      <Image
        source={{
          uri: "https://media-cdn.tripadvisor.com/media/photo-s/1c/05/1f/13/it-s-a-new-beginning.jpg",
        }}
        style={{ height: 300, width: "100%", marginTop: 30, borderRadius: 10 }}
      ></Image>
      <TouchableOpacity
        style={styles.dateContainer}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {formatDate(date)}
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={[styles.dateContainer, { width: 140 }]}
          onPress={() => setShowStartTimePicker(true)}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {formatTime(startTime)}
          </Text>
        </TouchableOpacity>
        <FontAwesome
          name="chevron-circle-right"
          size={20}
          style={{ marginTop: 25 }}
          color="#FF81AE"
        ></FontAwesome>
        <TouchableOpacity
          style={[styles.dateContainer, { width: 140 }]}
          onPress={() => setShowEndTimePicker(true)}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {formatTime(endTime)}
          </Text>
        </TouchableOpacity>
      </View>
      <Button
        mode="contained"
        style={styles.paymentButton}
        labelStyle={{ fontSize: 16, fontWeight: "bold" }}
      >
        Next $90
      </Button>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
          minimumDate={new Date()}
        />
      )}
      {showStartTimePicker && (
        <DateTimePicker
          value={startTime}
          mode="time"
          display="default"
          onChange={onStartTimeChange}
          minimumDate={
            date.toDateString() === new Date().toDateString()
              ? new Date()
              : undefined
          }
        />
      )}
      {showEndTimePicker && (
        <DateTimePicker
          value={endTime}
          mode="time"
          display="default"
          onChange={onEndTimeChange}
          minimumDate={startTime}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
  },
  priceContainer: {
    backgroundColor: "#e0e0df",
    alignItems: "flex-end",
    padding: 10,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
  },
  unit: {
    fontSize: 12,
    marginTop: -7,
  },
  dateContainer: {
    borderWidth: 1,
    borderColor: "#e0e0df",
    marginTop: 30,
    backgroundColor: "white",
    alignSelf: "flex-start",
    padding: 10,
    width: 237,
    borderRadius: 10,
    alignItems: "center",
  },
  paymentButton: {
    backgroundColor: "#FF81AE",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    minWidth: "40%",
    fontWeight: "bold",
    marginTop: 30,
  },
});

export default ReservationScreen;
