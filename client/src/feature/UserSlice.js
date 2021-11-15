import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    token: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    // Reducer comes here
    fetching: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isError = false;
      state.isSuccess = true;
      state.isFetching = false;
      state.errorMessage = "";
    },
    logout: (state) => {
      state.username = "";
      state.email = "";
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },
    loginFailed: (state, action) => {
      state.isError = true;
      state.errorMessage = action.payload.errorMessage;
        state.isSuccess = false;
        state.isFetching = false;
    },
  },
  extraReducers: {
    // Extra reducer comes here
  },
});

export const userSelector = (state) => state.user;

export const {
  clearState,
  loginSuccess,
  logout,
  loginFailed,
  fetching
} = userSlice.actions;
