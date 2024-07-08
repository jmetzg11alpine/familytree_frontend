import { createSlice } from '@reduxjs/toolkit';

const getDates = () => {
  const today = new Date().toISOString().split('T')[0];
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const formattedSixMonthsAgo = sixMonthsAgo.toISOString().split('T')[0];
  return { end: today, start: formattedSixMonthsAgo };
};

const defaultFilters = () => {
  const { end, start } = getDates();
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
  const { end, start } = getDates();
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

const chartJSPie = () => {
  return {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };
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
