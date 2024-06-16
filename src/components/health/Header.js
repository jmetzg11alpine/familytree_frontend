import Chart from './Chart';
import FormSection from './FormSection';
import Title from './Title';

const Header = () => {
  return (
    <div className='health-header-container'>
      <div className='health-title-container'>
        <Title />
      </div>
      <div className='health-chart-container'>
        <Chart />
      </div>
      <div className='health-tool-bar-container'>
        <FormSection />
      </div>
    </div>
  );
};
export default Header;
