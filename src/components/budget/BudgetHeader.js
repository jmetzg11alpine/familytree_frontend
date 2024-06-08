import './budgetheader.css';

const BudgetHeader = ({ index, setIndex }) => {
  const images = [
    { id: 0, bgColor: 'rgba(56, 182, 255, 0.6)', title: 'Budget' },
    { id: 1, bgColor: 'rgba(100, 149, 237, 0.6)', title: 'Foreign Aid' },
    { id: 2, bgColor: 'rgba(152, 251, 152, 0.6)', title: 'Comparison' },
    { id: 3, bgColor: 'rgba(240, 128, 128, 0.6)', title: 'Info' },
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
        >{img.title}</div>
      ))}
    </div>
  );
};
export default BudgetHeader;
