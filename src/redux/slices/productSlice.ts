import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PRODUCT } from '@/types/brand';

interface ProductState {
  dataInventory: PRODUCT[];
  loading: boolean;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number | 'all';
}

const initialState: ProductState = {
  dataInventory: [],
  loading: false,
  totalItems: 0,
  totalPages: 1,
  currentPage: 1,
  itemsPerPage: 5,
};

// Thunk for fetch data product
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page, limit }: { page: number, limit: number | 'all' }) => {
    const url = limit === 'all'
      ? 'http://localhost:3000/api/products'
      : `http://localhost:3000/api/products?page=${page}&limit=${limit}`;

    const response = await axios.get(url);
    return response.data.data;
  }
)

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.dataInventory = action.payload.data;
        state.totalItems = action.payload.totalItems;
        state.totalPages = action.payload.totalItems && state.itemsPerPage !== 'all'
          ? Math.ceil(action.payload.totalItems / state.itemsPerPage)
          : 1;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { setCurrentPage, setItemsPerPage, setLoading } = productSlice.actions;
export default productSlice.reducer;