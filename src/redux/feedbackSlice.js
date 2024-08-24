import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  feedbackData: [],
  loading: false,
  error: null,
};

// Async thunk to fetch feedback data
export const fetchFeedbackData = createAsyncThunk(
  'feedback/fetchFeedbackData',
  async (mockId) => {
    const response = await axios.get(`http://localhost:4000/api/userAnswer/${mockId}`);
    return response.data.data;
  }
);

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbackData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedbackData.fulfilled, (state, action) => {
        state.feedbackData = action.payload;
        state.loading = false;
      })
      .addCase(fetchFeedbackData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default feedbackSlice.reducer;
