import './styles.css';

const Info = () => {
  const agency_budget_endpoint = '/api/v2/agency/{code}/budgetary_resources/';
  const comparition_endpoint = '/api/v2/agency/{agency_code}/budget_function/';
  return (
    <div className='budget-info-container'>
      <div>
        <h1>Budget</h1>
        <p>
          Displays the budgetary resources and oblications for agencies for the fiscal
          year of 2024. Data was pulled from{' '}
          <a
            target='_blank'
            rel='noreferrer'
            href='https://api.usaspending.gov/docs/endpoints'
          >
            https://api.usaspending.gov/docs/endpoints
          </a>{' '}
          using the endpoint: <b>{agency_budget_endpoint}</b>
        </p>
      </div>
      <div>
        <h1>Foreign Aid</h1>
        <p>
          Foreign Aid data was downloaded from . It can take up to two years for all
          spending to be reported.
          <a
            target='_blank'
            rel='noreferrer'
            href='https://www.foreignassistance.gov/data'
          >
            https://www.foreignassistance.gov/data
          </a>
        </p>
      </div>
      <div>
        <h1>Comparison</h1>
        <p>
          Government spending can be brokend down into different functions. One agency can
          spend in various different functions. 8 functions were choosen to make
          comparisons with. The data was pulled from{' '}
          <a
            target='_blank'
            rel='noreferrer'
            href='https://api.usaspending.gov/docs/endpoints'
          >
            https://api.usaspending.gov/docs/endpoints
          </a>{' '}
          using the endpoint: <b>{comparition_endpoint}</b>
        </p>
      </div>
    </div>
  );
};
export default Info;
