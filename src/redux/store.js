import { configureStore } from '@reduxjs/toolkit';
import feedbackReducer from './feedbackSlice';
import interviewReducer from './interviewSlice';
export const store = configureStore({
  reducer: {
    feedback: feedbackReducer,
    interview: interviewReducer,
  },
});

export default store;
