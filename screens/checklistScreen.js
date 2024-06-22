// App.js
import React, { useState } from "react";
import { SafeAreaView, View, FlatList, Text, StyleSheet } from "react-native";
import { Checkbox, FAB } from "react-native-paper";
import ProgressBar from "../components/progressBar";
import { useTranslation } from "react-i18next";

const CheckListScreen = () => {
  const { t } = useTranslation();

  const [tasks, setTasks] = useState([
    { id: "1", text: "Venue", completed: false },
    { id: "2", text: "Photographer", completed: true },
  ]);

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const clearCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>{t("Complete your wedding plan")}</Text>
      <Text style={styles.subText}>
        {t(
          "Once you complete all the tasks, you'll be ready for your wedding day."
        )}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
          width: "86%",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", paddingRight: 10 }}>
          20%
        </Text>

        <ProgressBar height={10} progress={20}></ProgressBar>
      </View>
      <View
        style={{
          backgroundColor: "grey",
          marginBottom: 10,
          width: "100%",
          height: 1,
        }}
      ></View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text
              style={[
                styles.taskText,
                item.completed && styles.completedTaskText,
              ]}
            >
              {t(item.text)}
            </Text>

            <Checkbox
              status={item.completed ? "checked" : "unchecked"}
              onPress={() => toggleTaskCompletion(item.id)}
              disabled={true}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subText: {
    color: "grey",
    marginBottom: 20,
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  taskText: {
    flex: 1,
    marginRight: 10,
    textAlign: "left",
  },
  completedTaskText: {
    textDecorationLine: "line-through",
    color: "grey",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  checkbox: {
    borderRadius: 50, // Make it circular
  },
});

export default CheckListScreen;
