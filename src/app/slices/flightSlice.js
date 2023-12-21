import { createSlice } from "@reduxjs/toolkit";
import { getFlights } from "../flightActions/flightActions";

const initialState = {
  isLoading: false,
  isError: false,
  flight: [],
  path: [],
};

export const flightSlice = createSlice({
  name: "flightSlice",
  initialState,
  reducers: {
    setPath: (state, action) => {
      state.path = action.payload.map((i) => [i.lat, i.lng]);
    },
    clearPath: (state) => {
      state.path = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFlights.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFlights.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.flight = payload;
      })
      .addCase(getFlights.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});
export const { setPath, clearPath } = flightSlice.actions;
