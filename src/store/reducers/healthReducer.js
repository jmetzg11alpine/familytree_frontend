import { createSlice } from '@reduxjs/toolkit';

export const defaultNewEntry = () => ({
  timestamp: '',
  pressure: '',
  heartBeat: '',
  weight: '',
  coffee: '',
  notes: '',
});

const healthSlice = createSlice({
  name: 'healthReducer',
  initialState: {
    healthData: [],
    newEntry: defaultNewEntry(),
    submitModule: false,
    deleteModule: false,
    specificEntry: {},
    columnSelected: 'pressure',
    chartData: [],
    endDate: '2024-07-07',
    timePeriod: 'week',
  },
  reducers: {
    setHealthData: (state, action) => {
      state.healthData = action.payload;
    },
    setNewEntry: (state, action) => {
      state.newEntry = action.payload;
    },
    setSubmitModule: (state, action) => {
      state.submitModule = action.payload;
    },
    setDeleteModule: (state, action) => {
      state.deleteModule = action.payload;
    },
    setSpecificEntry: (state, action) => {
      state.specificEntry = action.payload;
    },
    setColumnSelected: (state, action) => {
      state.columnSelected = action.payload;
    },
    setChartData: (state, action) => {
      state.chartData = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setTimePeriod: (state, action) => {
      state.timePeriod = action.payload;
    },
  },
});

export const {
  setHealthData,
  setNewEntry,
  setSubmitModule,
  setDeleteModule,
  setSpecificEntry,
  setColumnSelected,
  setChartData,
  setEndDate,
  setTimePeriod,
} = healthSlice.actions;

export default healthSlice.reducer;
