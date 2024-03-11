import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFiltered, getIds, getItems } from "../../api/api";
import { selectInclusionsUniqueById } from "../../functions/functions";
import { REQUEST_LIMIT } from "../../constants";

export const fetchProducts = createAsyncThunk(
  "user/fetchProducts",
  async (pageNum, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    try {
      const ids = await getIds(pageNum);
      if (ids) {
        const items = await getItems(ids);
        return {
          selectedItems: selectInclusionsUniqueById(items),
          newPageNum: pageNum,
          isLastPage: ids.length < REQUEST_LIMIT ? true : false,
        };
      } else {
        return {
          selectedItems: state.products.items,
          newPageNum: state.products.pageNum,
          isLastPage: state.products.isLastPage,
        };
      }
    } catch (e) {
      dispatch(fetchProducts(pageNum));
      return rejectWithValue(e.message);
    }
  }
);

export const fetchFiltredIds = createAsyncThunk(
  "user/fetchFiltredIds",
  async (filter, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    try {
      const idsFiltered = await getFiltered(filter);
      if (idsFiltered) {
        const items = await getItems(idsFiltered);
        return selectInclusionsUniqueById(items);
      } else {
        return state.products.items;
      }
    } catch (e) {
      dispatch(fetchFiltredIds(filter));
      return rejectWithValue(e.message);
    }
  }
);

const initialState = {
  pageNum: 1,
  isLastPage: false,
  items: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = [...action.payload.selectedItems];
      state.pageNum = action.payload.newPageNum;
      state.isLastPage = action.payload.isLastPage;
      state.isLoading = false;
    });
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      console.log("Error: " + action.payload);
    });
    builder.addCase(fetchFiltredIds.fulfilled, (state, action) => {
      state.items = [...action.payload];
      state.isLoading = false;
    });
    builder.addCase(fetchFiltredIds.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFiltredIds.rejected, (state, action) => {
      console.log("Error: " + action.payload);
    });
  },
});

export default productsSlice.reducer;
export const { clearTimestamp } = productsSlice.actions;
