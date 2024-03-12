import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../Service/User_Auth_Api';

const initialState = {
  email: "",
  name: "",
  access_token: null,
  refresh_token: null,
};

export const userSlice = createSlice({
  name: 'user_info',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    unsetUserInfo: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
    });
  },
});

export const { setUserInfo, unsetUserInfo } = userSlice.actions;

export default userSlice.reducer;
