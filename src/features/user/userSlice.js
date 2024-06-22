import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUserInfo, fetchLoggedInUserOrders ,updateUser } from "./userAPI";
const initialState = {
 userInfo:null,
  status: "idle",
  // userOrders:[] , 
 
};
//FETCH LOGGEDIN USER INFO 
export const fetchLoggedInUserInfoAsync = createAsyncThunk(
  "user/fetchLoggedInUserInfo",
  async () => {
    //userId
    const response = await fetchLoggedInUserInfo();
    //userId
    return response.data;
  }
);

//FETCH LOGGEDIN USER INFO 
export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  "user/fetchLoggedInUserOrders",
  async () => {
    const response = await fetchLoggedInUserOrders();
    //userId
    return response.data;
  }
);

//ASYNCTHUNK FOR THE USER UPDATE 
export const updateUserAsync = createAsyncThunk(
  "auth/updateUser",
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserInfoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";

        state.userInfo.orders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      });
          
  },
});

// Action creators are generated for each case reducer function
export const { increment } = userSlice.actions;
export const selectUserOrders = (state)=>state.user.userInfo.orders

export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserInfoStatus=(state)=>state.user.status

export default userSlice.reducer;
