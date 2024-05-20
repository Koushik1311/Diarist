import { Item } from "@/types/items-types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  value: Item[];
};

const initialState: InitialState = {
  value: [],
};

export const items = createSlice({
  name: "items",
  initialState,
  reducers: {
    updateItems: (state, action: PayloadAction<Item[]>) => {
      state.value = action.payload;
    },
  },
});

export const { updateItems } = items.actions;
export default items.reducer;
