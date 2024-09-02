import { api } from '@/app/api/axios-config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setVendors,
  setState,
  setHints,
  VendorType,
  setCurrentFilter,
  VendorState,
  setCurrentSort,
  setAmount,
  setCurrentPage,
} from './vendor-slice';

export const getVendorsByPage = createAsyncThunk(
  'getVendorsByPage',
  async (
    {
      page,
      filter = null,
    }: {
      page: number;
      filter?: { filter: keyof VendorType; value: string | string[] } | null;
    },
    { dispatch, getState }
  ) => {
    try {
      const state = getState() as { vendor: VendorState };

      dispatch(setState({ isLoading: true }));

      const response = await api.post(`/vendors/by-page`, {
        page,
        vendorsPerPage: 20,
        vendorsFilter: !filter ? state.vendor.currentFilter : filter,
      });

      if (filter) {
        dispatch(setCurrentFilter(filter));
      }

      dispatch(setVendors(response.data));
      dispatch(setCurrentPage(page));
      dispatch(setState({ isLoading: false }));
    } catch (error) {
      console.log('error fetching vendors', error);
    }
  }
);

export const getVendorsAmount = createAsyncThunk(
  'getVendorsAmount',
  async (
    filter: { filter: keyof VendorType; value: string | string[] } | null,
    { dispatch, getState }
  ) => {
    try {
      const state = getState() as { vendor: VendorState };
      const response = await api.get('/vendors/amount', {
        params: {
          filter: filter ? filter.filter : state.vendor.currentFilter.filter,
          value: filter ? filter.value : state.vendor.currentFilter.value,
        },
      });

      dispatch(setAmount(response.data));
    } catch (error) {}
  }
);

export const searchVendorsByMultipleOptions = createAsyncThunk(
  'searchVendorsByMultipleOptions',
  async (
    { options, field }: { options: string[]; field: keyof VendorType },
    { dispatch }
  ) => {
    try {
      const response = await api.get(`/vendors/by-multiple`, {
        params: { options, field },
      });

      dispatch(setCurrentFilter({ filter: field, value: options }));
      dispatch(setVendors(response.data));
    } catch (error) {}
  }
);

export const getAllHints = createAsyncThunk(
  'getAllHints',
  async (_void, { dispatch }) => {
    try {
      dispatch(setState({ isLoading: true }));
      const response = await api.get('/vendors/hints');

      dispatch(setHints(response.data));
      dispatch(setState({ isLoading: false }));
    } catch (error) {}
  }
);

export const sortVendorsByFIlter = createAsyncThunk(
  'sortVendorsByFIlter',
  async (
    { field }: { field: keyof VendorType; order?: 'asc' | 'desc' },
    { dispatch, getState }
  ) => {
    try {
      const state = getState() as { vendor: VendorState };

      let order: 'asc' | 'desc' = 'asc';

      if (state.vendor.currentSort?.field === field)
        order = state.vendor.currentSort.order === 'asc' ? 'desc' : 'asc';
      const response = await api.post(`/vendors/sort`, {
        vendorsFilter: state.vendor.currentFilter,
        field,
        order,
        page: state.vendor.currentPage,
        vendorsPerPage: 20,
      });

      dispatch(setCurrentSort({ field, order }));
      dispatch(setVendors(response.data));
    } catch (error) {}
  }
);
