import {
  setData,
  setFilters,
  setSelectedFilters,
} from '../../store/reducers/logisticsReducer';

const url = process.env.REACT_APP_URL;

export const getData = async (dispatch, selectedFilters) => {
  const response = await fetch(`${url}logistics_get_data`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(selectedFilters),
  });
  const resp = await response.json();
  dispatch(setData(resp.data));
  if (!selectedFilters.filters_retrieved) {
    dispatch(
      setFilters({
        customer: resp.filters.customers,
        sales: resp.filters.sales,
        start_location: resp.filters.start,
        end_location: resp.filters.end,
      })
    );
    dispatch(setSelectedFilters({ filters_retrieved: true }));
  }
};

export const grapherHelper = (title) => {
  switch (title) {
    case 'orders':
      return 'Order Count';
    case 'units':
      return 'Unit Count';
    case 'margin':
      return 'Gross Margin';
    case 'rpm':
      return { title: 'Rate Per Mile', ylabel: 'RPM' };
    case 'warehouse':
      return { title: 'Warehouse Occupation', ylabel: 'Occupation' };
    default:
      return 'make the case for this value';
  }
};
