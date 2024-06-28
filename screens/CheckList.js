import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Modal,
  Pressable,
  ImageBackground,
  Platform,
} from "react-native";
import { CheckBox, Button, Icon } from "react-native-elements";
import LottieView from "lottie-react-native";
import * as Notifications from "expo-notifications";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  toggleTaskCompletion,
  removeTask,
  scheduleNotification,
} from "../StateManagement/slices/CheckListSlice"; // Adjust the path as needed

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Checklist = () => {
  const tasks = useSelector((state) => state.checklist.tasks);
  const dispatch = useDispatch();

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };

  const handleAddTask = async () => {
    if (taskTitle.length > 0 && taskDescription.length > 0) {
      const newTask = {
        key: Date.now().toString(),
        title: taskTitle,
        description: taskDescription,
        completed: false,
      };

      dispatch(addTask(newTask));
      dispatch(scheduleNotification(newTask));

      setTaskTitle("");
      setTaskDescription("");
      setModalVisible(false);
    }
  };

  const handleToggleTaskCompletion = (taskKey) => {
    dispatch(toggleTaskCompletion(taskKey));
  };

  const handleRemoveTask = (taskKey) => {
    dispatch(removeTask(taskKey));
  };

  return (
    <ImageBackground
      source={require("../assets/Images/bc.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}> Your Checklist </Text>

        {tasks.length === 0 ? (
          <View style={styles.placeholderContainer}>
            <LottieView
              source={require("../assets/Lotties/empty.json")}
              autoPlay
              loop={true}
              style={styles.animation}
            />
            <Text style={styles.placeholderText}>No tasks added yet.</Text>
          </View>
        ) : (
          <FlatList
            data={tasks}
            renderItem={({ item }) => (
              <View style={styles.taskItem}>
                <CheckBox
                  checkedColor="#FF81AE"
                  checked={item.completed}
                  onPress={() => handleToggleTaskCompletion(item.key)}
                  containerStyle={styles.checkbox}
                />
                <View style={styles.taskDetails}>
                  <Text
                    style={[
                      styles.taskTitle,
                      item.completed ? styles.completedTask : null,
                    ]}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={[
                      styles.taskDescription,
                      item.completed ? styles.completedTask : null,
                    ]}
                  >
                    {item.description}
                  </Text>
                </View>
                <Button
                  icon={<Icon name="delete" size={20} color="white" />}
                  buttonStyle={styles.deleteButton}
                  onPress={() => handleRemoveTask(item.key)}
                />
              </View>
            )}
            keyExtractor={(item) => item.key}
          />
        )}

        <View style={styles.addButtonContainer}>
          <Button
            icon={<Icon name="add" size={20} color="white" />}
            buttonStyle={styles.addButton}
            onPress={() => setModalVisible(true)}
            title=""
          />
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Add New Task</Text>
              <TextInput
                placeholder="Task Title"
                style={styles.input}
                value={taskTitle}
                onChangeText={setTaskTitle}
                placeholderTextColor="grey"
              />
              <TextInput
                placeholder="Task Description"
                style={styles.input}
                value={taskDescription}
                onChangeText={setTaskDescription}
                placeholderTextColor="grey"
              />
              <View style={styles.modalButtons}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonAdd]}
                  onPress={handleAddTask}
                >
                  <Text style={styles.textStyle}>Add</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>{tasks.length} Tasks</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  animation: {
    width: 200,
    height: 200,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    paddingTop: 60,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  checkbox: {
    padding: 0,
  },
  taskDetails: {
    flex: 1,
    marginLeft: 10,
  },
  taskTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  taskDescription: {
    color: "#FF81AE",
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  deleteButton: {
    backgroundColor: "red",
    borderRadius: 10,
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  addButton: {
    backgroundColor: "#FF81AE",
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 5,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 10,
    color: "#000000",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonAdd: {
    backgroundColor: "#FF69B4",
  },
  buttonClose: {
    backgroundColor: "#f44336",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    color: "#FF81AE",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 20,
    color: "grey",
    textAlign: "center",
  },
  counterContainer: {
    position: "absolute",
    bottom: 25,
    left: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    zIndex: 1,
  },
  counterText: {
    fontSize: 16,
  },
});

export default Checklist;
