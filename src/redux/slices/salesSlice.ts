import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Sales } from "@/types/sales";

interface SalesState {
  dataSales: Sales[];
  loading: boolean;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number | "all";
}

const initialState: SalesState = {
  dataSales: [],
  loading: false,
  totalItems: 0,
  totalPages: 1,
  currentPage: 1,
  itemsPerPage: 5,
};

// Thunk for fetch data sales
export const fetchSales = createAsyncThunk(
  "sales/fetchSales",
  async ({ page, limit }: { page: number; limit: number | "all" }) => {
    const url =
      limit === "all"
        ? `${import.meta.env.VITE_API_URL}/api/sales`
        : `${
            import.meta.env.VITE_API_URL
          }/api/sales?page=${page}&limit=${limit}`;
    const response = await axios.get(url);
    return response.data.data;
  }
);

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSales.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.dataSales = action.payload.data;
        state.totalItems = action.payload.totalItems;
        state.totalPages =
          action.payload.totalItems && state.itemsPerPage !== "all"
            ? Math.ceil(action.payload.totalItems / state.itemsPerPage)
            : 1;
        state.loading = false;
      })
      .addCase(fetchSales.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setCurrentPage, setItemsPerPage, setLoading } =
  salesSlice.actions;
export default salesSlice.reducer;
