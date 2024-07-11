import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../createAppSlice';

export type VendorType = {
  _id: string;
  name: string;
  location: string;
  description: string;
  websiteUrl: string;
  useCase: string[];
  industry: string[];
  category: string[];
  foundedDate: string;
};

export interface VendorState {
  vendors: VendorType[];
  hints: {
    locations: string[];
    useCases: string[];
    industries: string[];
    categories: string[];
  };
  currentFilter: {
    filter: keyof VendorType | null;
    value: string | string[] | null;
  };
  currentSort: { field: keyof VendorType | null; order: 'asc' | 'desc' } | null;
  state: {
    isLoading: boolean;
  };
}

const initialState: VendorState = {
  vendors: [
    {
      _id: '0',
      name: 'test',
      location: 'test',
      description: 'test',
      websiteUrl: 'www.google.com',
      useCase: ['test'],
      industry: ['test'],
      category: ['test'],
      foundedDate: new Date('2024').toISOString(),
    },
  ],
  currentSort: null,
  currentFilter: {
    filter: null,
    value: null,
  },
  hints: {
    locations: [''],
    useCases: [''],
    industries: [''],
    categories: [''],
  },
  state: {
    isLoading: false,
  },
};

export const vendorSlice = createAppSlice({
  name: 'vendor',
  initialState,
  reducers: {
    setVendors: (state, action: PayloadAction<VendorType[]>) => {
      state.vendors = action.payload;
    },
    setState: (state, action: PayloadAction<VendorState['state']>) => {
      state.state = action.payload;
    },
    setHints: (state, action: PayloadAction<VendorState['hints']>) => {
      state.hints = action.payload;
    },
    setCurrentFilter: (
      state,
      action: PayloadAction<VendorState['currentFilter']>
    ) => {
      state.currentFilter = action.payload;
    },
    setCurrentSort: (
      state,
      action: PayloadAction<VendorState['currentSort']>
    ) => {
      state.currentSort = action.payload;
    },
  },
});

export const {
  setVendors,
  setState,
  setHints,
  setCurrentFilter,
  setCurrentSort,
} = vendorSlice.actions;

export default vendorSlice.reducer;
