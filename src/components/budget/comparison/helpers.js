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
  'rgba(135, 206, 250, 1)', // LightSkyBlue
  'rgba(255, 192, 203, 1)', // Pink
  'rgba(221, 160, 221, 1)', // Plum
  'rgba(255, 182, 193, 1)', // LightPink
  'rgba(255, 127, 80, 1)',
  'rgba(173, 216, 230, 1)', // LightBlue
  'rgba(250, 128, 114, 1)',
  'rgba(255, 160, 122, 1)', // LightSalmon
];
