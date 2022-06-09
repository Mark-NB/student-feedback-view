import { configureStore } from '@reduxjs/toolkit';
import studentFeedbackReducer from '../features/studentFeedback/studenFeedbackSlice';
import displayLogicReducer from '../features/displayLogic/displayLogicSlice';

export const store = configureStore({
  reducer: {
    studentFeedback: studentFeedbackReducer,
    displayLogic: displayLogicReducer
  },
});
