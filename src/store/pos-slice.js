import { createSlice } from "@reduxjs/toolkit";

const month_names_short = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const startDate = new Date();
const day =
  startDate.getDate() <= 9 ? "0" + startDate.getDate() : startDate.getDate();
const date = `${day}-${
  month_names_short[startDate.getMonth()]
}-${startDate.getFullYear()}`;

const posSlice = createSlice({
  name: "pos",
  initialState: {
    pos: [{ lat: 23.022, lng: 72.57 }],
    date: date,
    user: "default",
  },
  reducers: {
    position(state, action) {
      state.pos = action.payload;
    },
    addData(state, action) {
      state.pos = action.payload;
    },
    changeDate(state, action) {
      state.date = action.payload;
    },
    changeUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const posActions = posSlice.actions;

export default posSlice;
