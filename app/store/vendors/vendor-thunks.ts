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
} from './vendor-slice';

export const getAllVendors = createAsyncThunk(
  'getAllVendors',
  async (_void, { dispatch }) => {
    try {
      dispatch(setState({ isLoading: true }));

      const response = await api.get('/vendors/all');

      dispatch(setVendors(response.data));
      dispatch(setState({ isLoading: false }));
    } catch (error) {}
  }
);

export const searchVendors = createAsyncThunk(
  'searchVendors',
  async (
    { search, field }: { search: string; field: keyof VendorType },
    { dispatch }
  ) => {
    try {
      const response = await api.get(`/vendors/by-query`, {
        params: { name: search, field },
      });

      dispatch(setCurrentFilter({ filter: field, value: search }));
      dispatch(setVendors(response.data));
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
  'getAllLocations',
  async (_void, { dispatch }) => {
    try {
      const response = await api.get('/vendors/hints');

      dispatch(setHints(response.data));
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
      console.log(order);
      const response = await api.post(`/vendors/sort`, {
        vendorsFilter: state.vendor.currentFilter,
        field,
        order,
      });

      dispatch(setCurrentSort({ field, order }));
      dispatch(setVendors(response.data));
    } catch (error) {}
  }
);
