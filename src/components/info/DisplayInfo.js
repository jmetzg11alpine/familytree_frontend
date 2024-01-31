import { useSelector } from 'react-redux';

const DisplayInfo = ({ size, dataUrl }) => {
  const country = useSelector((state) => state.profileReducer.country);

  const titleHieght = size.height * 0.05;
  const containerHeight = size.height * 0.95;

  const containerStyle = {
    maxWidth: size.width,
    maxHeight: containerHeight,
    overflow: 'auto',
    // padding: '5px',
    boxSizing: 'border-box',
  };

  const titleStyle = {
    fontWeight: 'bold',
    fontSize: '1.1rem',
  };

  const listStyle = {
    listStyleType: 'disc',
    paddingLeft: '10px',
    fontSize: country === 'US' ? '.95' : '.92rem',
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
        <h3 className='mb-0'>
          {country === 'US' ? 'Notes to User' : 'Заметки пользователю'}
        </h3>
      </div>
      <div style={containerStyle}>
        <div style={titleStyle}>{country === 'US' ? 'Instructions' : 'Инструкции'}</div>
        <ul className='mb-1' style={listStyle}>
          <li>
            {country === 'US'
              ? '- Only user with credentials can make changes and they must login'
              : '- Только пользователь с учетными данными может вносить изменения, и он должен войти в систему'}
          </li>
          <li>
            {country === 'US'
              ? '- To add a new person double/tap click in a blank space'
              : '- Чтобы добавить нового человека, дважды/нажмите в пустое пространство'}
          </li>
          <li>
            {country === 'US'
              ? '- Parents can be added if there are within and eight squares horizontally and four squares above'
              : '- Родители могут быть добавлены, если они находятся в пределах восьми квадратов по горизонтали и четырех квадратов выше'}
          </li>
          <li>
            {country === 'US'
              ? '- Siblings can be added if they are within eight squares horizontally and two squares below or above'
              : '- Братья и сестры могут быть добавлены, если они находятся в пределах восьми квадратов по горизонтали и двух квадратов ниже или выше'}
          </li>
          <li>
            {country === 'US'
              ? '- Children can be add if they are within eight squares horizontally and four squares below'
              : '- Дети могут быть добавлены, если они находятся в пределах восьми квадратов по горизонтали и четырех квадратов ниже'}
          </li>
          <li>
            {country === 'US'
              ? '- Spouses can be added if they are within four squares horizontally and two squares above or below'
              : '- Супруги могут быть добавлены, если они находятся в пределах четырех квадратов по горизонтали и двух квадратов выше или ниже'}
          </li>
          <li>
            {country === 'US'
              ? '- Dots on the map will grow if there are more instances of coordinates with the exact same location'
              : '- Точки на карте увеличатся, если будет больше координат с точно таким же местоположением'}
          </li>
        </ul>
        <div style={titleStyle}>{country === 'US' ? 'Advice' : 'Советы'}</div>
        <ul className='mb-1' style={listStyle}>
          <li>
            {country === 'US'
              ? '- Place family members before filling in information as it can be tricky to fit everyone and you may need to delete people'
              : '- Разместите членов семьи перед заполнением информации, так как может быть сложно уместить всех, и вам, возможно, придется удалять людей'}
          </li>
        </ul>
        <div style={titleStyle}>{country === 'US' ? 'Data' : 'Данные'}</div>
        <ul className='mb-1' style={listStyle}>
          <li>
            {country === 'US'
              ? '- All data is public'
              : '- Все данные являются общедоступными'}
          </li>
          <li>
            {country === 'US'
              ? '- Data is backed up monthly and can be seen'
              : '- Данные резервируются ежемесячно и могут быть просмотрены'}{' '}
            <a href={dataUrl} target='_blank' rel='noopener noreferrer'>
              {country === 'US' ? 'here' : 'здесь'}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DisplayInfo;
