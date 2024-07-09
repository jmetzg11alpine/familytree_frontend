export const getData = async (setAgencies, setXLabels, setLineData) => {
  const response = await fetch(`${process.env.REACT_APP_URL}agency_comparison`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  console.log(data.line_data);
  setAgencies(data.agencies);
  setXLabels(data.x_labels);
  setLineData(data.line_data);
};

export const colors = [
  'rgba(0, 128, 128, 1)',
  'rgba(255, 99, 71, 1)',
  'rgba(124, 252, 0, 1)',
  'rgba(70, 130, 180, 1)',
  'rgba(0, 191, 255, 1)',
  'rgba(155, 69, 0, 1)',
  'rgba(138, 43, 226, 1)',
  'rgba(60, 179, 113, 1)',
];
