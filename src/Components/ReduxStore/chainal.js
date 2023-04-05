import { createSlice } from "@reduxjs/toolkit";

const chainalSlice = createSlice({
  name: "chainal",
  initialState: { chainal: [] },
  reducers: {
    addChaninal(state, action) {
      let chainal = action.payload;
      state.chainal.push(chainal);
    },
  },
});

export const chainalActions = chainalSlice.actions;

export default chainalSlice.reducer;
