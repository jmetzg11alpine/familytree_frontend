import '../../styles/budgetheader.css';

const BudgetHeader = ({ index, setIndex }) => {
  const images = [
    { id: 0, bgColor: 'red' },
    { id: 1, bgColor: 'blue' },
    { id: 2, bgColor: 'green' },
    { id: 3, bgColor: 'yellow' },
  ];
  return (
    <div className='a'>
      {images.map((img) => (
        <div
          key={img.id}
          onClick={() => setIndex(img.id)}
          className='budget-header-image'
          style={{
            backgroundColor: img.bgColor,
            border: index === img.id ? '3px solid black' : 'none',
          }}
        ></div>
      ))}
    </div>
  );
};
export default BudgetHeader;
