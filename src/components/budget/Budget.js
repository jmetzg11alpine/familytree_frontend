import { useState } from 'react';
import BudgetHeader from './BudgetHeader';
import Agency from './agency/Agency';
import ForeignAid from './foreignaid/ForeignAid';
import Comparison from './comparison/Comparison';
import Info from './Info';

const Budget = () => {
  const [index, setIndex] = useState(1);
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <BudgetHeader index={index} setIndex={setIndex} />
      {index === 0 ? (
        <Agency />
      ) : index === 1 ? (
        <ForeignAid />
      ) : index === 2 ? (
        <Comparison />
      ) : (
        <Info />
      )}
    </div>
  );
};
export default Budget;
