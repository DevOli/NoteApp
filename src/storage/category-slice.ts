import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';

import {getAllCategories} from 'services';
import {RootState} from './store';
import Category from 'models/category';

export type CategoryState = {
  value: Category[];
};

const initialState: CategoryState = {
  value: [],
};

export const getCategories = createAsyncThunk(
  'categories/getAllCategories',
  getAllCategories,
);

export const CategoriesSlide = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.value.push(action.payload);
    },
    addCategories: (state, action: PayloadAction<Category[]>) => {
      state.value = action.payload;
    },
    clearCategories: state => {
      state.value = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.value = [...state.value, ...action.payload];
    });
    builder.addCase(getCategories.rejected, error => {
      console.error(error);
    });
  },
});

export default CategoriesSlide.reducer;

export const {addCategory, addCategories} = CategoriesSlide.actions;
export const selectAllCategories = (state: RootState) => state.categories.value;
