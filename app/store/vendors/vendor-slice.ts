import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../createAppSlice';

export type VendorType = {
  _id: string;
  detailUrl: string;
  logoUrl: string;
  name: string;
  shortDescription: string;
  primaryTask: string;
  applicableTasks: string[];
  fullDescription: string;
  pros: string[];
  cons: string[];
  pricing: string;
  visitWebsiteUrl: string;
  Q1: string | null;
  A1: string | null;
  Q2: string | null;
  A2: string | null;
  Q3: string | null;
  A3: string | null;
  Q4: string | null;
  A4: string | null;
  Q5: string | null;
  A5: string | null;
  Q6: string | null;
  A6: string | null;
  Q7: string | null;
  A7: string | null;
  Q8: string | null;
  A8: string | null;
  Q9: string | null;
  A9: string | null;
  Q10: string | null;
  A10: string | null;
  Q11: string | null;
  A11: string | null;
  Q12: string | null;
  A12: string | null;
  Q13: string | null;
  A13: string | null;
  Q14: string | null;
  A14: string | null;
  Q15: string | null;
  A15: string | null;
  Q16: string | null;
  A16: string | null;
  Q17: string | null;
  A17: string | null;
  Q18: string | null;
  A18: string | null;
  Q19: string | null;
  A19: string | null;
  Q20: string | null;
  A20: string | null;
  Q21: string | null;
  A21: string | null;
  Q22: string | null;
  A22: string | null;
  Q23: string | null;
  A23: string | null;
  Q24: string | null;
  A24: string | null;
  Q25: string | null;
  A25: string | null;
  Q26: string | null;
  A26: string | null;
  Q27: string | null;
  A27: string | null;
  Q28: string | null;
  A28: string | null;
  Q29: string | null;
  A29: string | null;
  Q30: string | null;
  A30: string | null;
};

export interface VendorState {
  vendors: VendorType[];
  vendorsAmount: number;
  hints: {
    primaryTasks: string[];
    applicableTasks: string[];
  };
  currentFilter: {
    filter: keyof VendorType | null;
    value: string | string[] | null;
  };
  currentSort: { field: keyof VendorType | null; order: 'asc' | 'desc' } | null;
  currentPage: number;
  state: {
    isLoading: boolean;
  };
}

const initialState: VendorState = {
  vendorsAmount: 0,
  currentPage: 1,
  vendors: [
    {
      _id: '0',
      detailUrl: 'http://example.com',
      logoUrl: 'http://example.com/logo.png',
      name: 'Test Vendor',
      shortDescription: 'A test vendor description',
      primaryTask: 'Test task',
      applicableTasks: ['Test task'],
      fullDescription: 'A full description of the test vendor.',
      pros: ['Test pro'],
      cons: ['Test con'],
      pricing: 'Free',
      visitWebsiteUrl: 'http://example.com',
      Q1: 'What is your name?',
      A1: 'Test Vendor',
      Q2: null,
      A2: null,
      Q3: null,
      A3: null,
      Q4: null,
      A4: null,
      Q5: null,
      A5: null,
      Q6: null,
      A6: null,
      Q7: null,
      A7: null,
      Q8: null,
      A8: null,
      Q9: null,
      A9: null,
      Q10: null,
      A10: null,
      Q11: null,
      A11: null,
      Q12: null,
      A12: null,
      Q13: null,
      A13: null,
      Q14: null,
      A14: null,
      Q15: null,
      A15: null,
      Q16: null,
      A16: null,
      Q17: null,
      A17: null,
      Q18: null,
      A18: null,
      Q19: null,
      A19: null,
      Q20: null,
      A20: null,
      Q21: null,
      A21: null,
      Q22: null,
      A22: null,
      Q23: null,
      A23: null,
      Q24: null,
      A24: null,
      Q25: null,
      A25: null,
      Q26: null,
      A26: null,
      Q27: null,
      A27: null,
      Q28: null,
      A28: null,
      Q29: null,
      A29: null,
      Q30: null,
      A30: null,
    },
  ],
  currentSort: null,
  currentFilter: {
    filter: null,
    value: null,
  },
  hints: {
    primaryTasks: ['Test task'],
    applicableTasks: ['Test task'],
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
    setAmount: (state, action: PayloadAction<number>) => {
      state.vendorsAmount = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  setVendors,
  setState,
  setHints,
  setCurrentFilter,
  setCurrentSort,
  setAmount,
  setCurrentPage,
} = vendorSlice.actions;

export default vendorSlice.reducer;
