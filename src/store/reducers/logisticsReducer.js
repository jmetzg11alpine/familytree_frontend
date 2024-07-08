import { createSlice } from '@reduxjs/toolkit';

const getDates = () => new Date().toISOString().split('T')[0];

const defaultFilters = () => {
  const end = getDates();
  return {
    customer: ['all'],
    sales: ['all'],
    start_location: ['all'],
    end_location: ['all'],
    time_period: ['week', 'month', '6 months', 'year', 'all'],
    end_date: end,
  };
};

const defaultSelectedFilters = () => {
  const end = getDates();
  return {
    customer: 'all',
    sales: 'all',
    start_location: 'all',
    end_location: 'all',
    time_period: 'week',
    end_date: end,
    filters_retrieved: false,
  };
};

const chartJSLinear = () => {
  return [
    {
      lable: 'example',
      data: [{ x: '2023-01-01', y: 2 }],
      borderColor: 'blue',
      gackgroundCOlor: 'red',
    },
  ];
};

const defaultData = () => ({
  unit_count: [],
  order_count: [],
  margin: [],
  rpm: chartJSLinear(),
  warehouse_capacity: chartJSLinear(),
  routes: [],
  sales_customers: { labels: [], datasets: [] },
  proportions: {},
  time: {
    delivery: [1, 2, 3, 4, 5],
    process: [-1, -2, -4, 2, 5],
    names: ['Bobo', 'Hill', 'G', 'S', 'A'],
  },
  table: [],
});

const logisticSlice = createSlice({
  name: 'logisticsReducer',
  initialState: {
    data: defaultData(),
    filters: defaultFilters(),
    selectedFilters: defaultSelectedFilters(),
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    setSelectedFilters: (state, action) => {
      state.selectedFilters = {
        ...state.selectedFilters,
        ...action.payload,
      };
    },
  },
});

export const { setData, setFilters, setSelectedFilters } = logisticSlice.actions;

export default logisticSlice.reducer;
