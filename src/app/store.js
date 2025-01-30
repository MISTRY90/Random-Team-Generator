import { configureStore } from "@reduxjs/toolkit";
import teamReducer from '../features/teamSlice'

const store = configureStore({
  reducer: {
    team: teamReducer,
  },
});

export default store;
