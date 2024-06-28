import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as Notifications from "expo-notifications";

export const scheduleNotification = createAsyncThunk(
  "checklist/scheduleNotification",
  async (task) => {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Task Reminder",
        body: `You have a pending task: ${task.title}`,
        data: { task },
      },
      trigger: { seconds: 60 },
    });
    return { task, notificationId };
  }
);

const calculateCompletionPercentage = (tasks) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  return totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
};

export const checklistSlice = createSlice({
  name: "checklist",
  initialState: {
    tasks: [],
    completionPercentage: 0,
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      state.completionPercentage = calculateCompletionPercentage(state.tasks);
    },
    toggleTaskCompletion: (state, action) => {
      const task = state.tasks.find((task) => task.key === action.payload);
      if (task) {
        task.completed = !task.completed;
        state.completionPercentage = calculateCompletionPercentage(state.tasks);
      }
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.key !== action.payload);
      state.completionPercentage = calculateCompletionPercentage(state.tasks);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(scheduleNotification.fulfilled, (state, action) => {
      const { task, notificationId } = action.payload;
      const taskToUpdate = state.tasks.find((t) => t.key === task.key);
      if (taskToUpdate) {
        taskToUpdate.notificationId = notificationId;
      }
    });
  },
});

export const { addTask, toggleTaskCompletion, removeTask } =
  checklistSlice.actions;
export default checklistSlice.reducer;
