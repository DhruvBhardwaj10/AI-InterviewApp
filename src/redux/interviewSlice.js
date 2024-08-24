import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the API URL
const API_URL = 'http://localhost:4000/api/interviews';

// Thunk for creating an interview
export const createInterviewThunk = createAsyncThunk(
  'interviews/createInterview',
  async (interviewData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/create`, interviewData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

// Thunk for fetching interviews by mockId
export const getInterviewsByMockIdThunk = createAsyncThunk(
  'interviews/getInterviewsByMockId',
  async (mockId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/getByMockId/${mockId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

export const getInterviewsByUserIdThunk = createAsyncThunk(
  'interviews/getInterviewsByUserId',
  async (createdBy, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/getByUserId/${createdBy}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

const initialState = {
  interviews: [],
  status: 'idle',
  error: null,
};

const interviewSlice = createSlice({
  name: 'interviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createInterviewThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createInterviewThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.interviews.push(action.payload);
      })
      .addCase(createInterviewThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getInterviewsByMockIdThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getInterviewsByMockIdThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.interviews = action.payload;
      })
      .addCase(getInterviewsByMockIdThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getInterviewsByUserIdThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getInterviewsByUserIdThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.interviews = action.payload;
      })
      .addCase(getInterviewsByUserIdThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default interviewSlice.reducer;
