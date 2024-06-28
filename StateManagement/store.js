import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/AdminSlice";
import cartReducer from "./slices/CartSlice";
import searchReducer from "./slices/SearchSlice";
import settingsReducer from "./slices/SettingsSlice";
import budgetReducer from "./slices/BudgetSlice";
import guestListReducer from "./slices/GuestListSlice";
import signUpReducer from "./slices/SignUpSlice";
import userProfileReducer from "./slices/ProfileSlice";
import favouritesReducer from "./slices/FavouritesSlice";
import homeReducer from "./slices/HomeSlice";
import checklistReducer from "./slices/CheckListSlice";
import reviewReducer from "./slices/ReviewSlice";
import OTPReducer from "./slices/OTPSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    cart: cartReducer,
    search: searchReducer,
    settings: settingsReducer,
    budget: budgetReducer,
    guestList: guestListReducer,
    signUp: signUpReducer,
    user: userProfileReducer,
    favourites: favouritesReducer,
    home: homeReducer,
    checklist: checklistReducer,
    review: reviewReducer,
    otp: OTPReducer,
  },
});

export default store;
