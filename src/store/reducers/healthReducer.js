import { createSlice } from '@reduxjs/toolkit';

export const defaultNewEntry = () => ({
  timestamp: '',
  pressure: '',
  heartBeat: '',
  weight: '',
  coffee: '',
  notes: '',
});

const formatDate = (date) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
};

const defaultStartDate = formatDate(new Date(Date.now() - 14 * 24 * 60 * 60 * 1000));

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
    startDate: defaultStartDate,
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
    setStartDate: (state, action) => {
      state.startDate = action.payload;
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
  setStartDate,
} = healthSlice.actions;

export default healthSlice.reducer;
