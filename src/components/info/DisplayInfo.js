const DisplayInfo = ({ size, dataUrl }) => {
  const titleHieght = size.height * 0.08;
  const containerHeight = size.height * 0.92;
  const containerStyle = {
    maxWidth: size.width,
    maxHeight: containerHeight,
    overflow: 'auto',
    padding: '10px',
    boxSizing: 'border-box',
  };

  const titleStyle = {
    fontWeight: 'bold',
    fontSize: '1.1rem',
  };

  const listStyle = {
    listStyleType: 'disc',
    paddingLeft: '20px',
    fontSize: '.95rem',
  };

  return (
    <div>
      <div
        style={{
          height: titleHieght + 'px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h3>Notes to User</h3>
      </div>
      <div style={containerStyle}>
        <div style={titleStyle}>Instructions</div>
        <ul className='mb-1' style={listStyle}>
          <li>Only user with credentials can make changes and they must login</li>
          <li>To add a new person double/tap click in a blank space</li>
          <li>
            Parents can be added if there are within and eight squares horizontally and
            four squares above
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
            Dots on the map will grow if there are more instances of coordinates with the
            exact same location
          </li>
        </ul>
        <div style={titleStyle}>Advice</div>
        <ul className='mb-1' style={listStyle}>
          <li>Place family member before filling in information</li>
        </ul>
        <div style={titleStyle}>Data</div>
        <ul className='mb-1' style={listStyle}>
          <li>All data is public</li>
          <li>
            Data is backed up monthly and can be seen{' '}
            <a href={dataUrl} target='_blank' rel='noopener noreferrer'>
              here
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DisplayInfo;
