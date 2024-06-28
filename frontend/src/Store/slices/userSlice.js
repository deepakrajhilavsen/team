import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../api/axiosInstance";
import {
  FAILED,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  SUCCEEDED,
} from "../../utils/constants/userConstants";

export const initialState = {
  username: "",
  name: "",
  mobile_no: "",
  linkedIn: "",
  qualifications: {
    qualification: "",
    specification: "",
  },
  jobRole: "",
  skills: [],
  experience: {
    experience: "",
    jobHistory: [
      {
        role: "",
        company: "",
        startDate: "",
        endDate: null,
        current: false,
      },
    ],
  },
  preferredLocations: "",
  profilePhoto: "",
  resume: null,
  error: null,
};

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async ({ username, password, role }) => {
    try {
      console.log("in api call");
      const response = await instance.post("/auth/login", {
        username: username,
        password: password,
      });
      console.log("completed");
      if (response?.status === LOGIN_SUCCESS.status) {
        return response.data?.user;
      }
    } catch (error) {
      throw error.response.data?.message;
    }
  }
);

export const userSignup = createAsyncThunk(
  "user/userSignup",
  async ({ email, password, role }) => {
    try {
      console.log("in signup api call");
      const response = await instance.post("/auth/signup", {
        email: email,
        password: password,
        role: role,
      });
      console.log("signup completed");
      if (response?.status === REGISTER_SUCCESS.status) {
        return response.data?.user;
      }
    } catch (error) {
      throw error.response.data?.message;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    removeUserInfo(state, action) {
      state = initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.id = action.payload._id;
        state.status = SUCCEEDED;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.username = null;
        state.id = null;
        state.status = FAILED;
        state.error = action.error.message;
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.id = action.payload._id;
        state.status = SUCCEEDED;
        state.error = null;
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.username = null;
        state.id = null;
        state.status = FAILED;
        state.error = action.error.message;
      });
  },
});

export const { removeUserInfo } = userSlice.actions;

export const getUserState = (state) => state.user;

export const userReducer = userSlice.reducer;
