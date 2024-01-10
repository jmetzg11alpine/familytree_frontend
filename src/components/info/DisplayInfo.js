const DisplayInfo = ({ size }) => {
  const containerStyle = {
    maxWidth: size.width,
    maxHeight: size.height,
    overflow: 'auto',
    padding: '10px',
    boxSizing: 'border-box',
  };

  const titleStyle = {
    fontWeight: 'bold',
    marginBottom: '10px',
    fontSize: '1.2em',
  };

  const listStyle = {
    listStyleType: 'disc',
    paddingLeft: '20px',
  };

  return (
    <div style={containerStyle}>
      <div style={titleStyle}>See My Family</div>
      <ul style={listStyle}>
        <li>Only user with credentials can make changes and they must login</li>
        <li>To add a new person double click in a blank space</li>
        <li>To open the photo features double click on the profile photo</li>
        <li>
          Parents can be added if there are within and eight squares horizontally and four
          squares above
        </li>
        <li>
          Silblings can be added if they are within eight squares horizontally and two
          squars below or above
        </li>
        <li>
          Children can be add if they are within eight squares horizontally and four
          squares below
        </li>
        <li>
          Spouses can be added if they are within four squares horizontally and two
          squares above or below
        </li>
        <li>
          Dots on the map will grow if there are instances of coordinates with the exact
          same location
        </li>
        <li>all data is public</li>
        <li>data is backed up weekly here</li>
        <li>
          Server and data are hosted in house on a Raspberry pi, which may affect
          performance
        </li>
      </ul>
    </div>
  );
};

export default DisplayInfo;
