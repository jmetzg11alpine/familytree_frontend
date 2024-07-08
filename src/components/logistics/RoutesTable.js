import { Table } from 'react-bootstrap';

const RoutesTable = ({ data }) => {
  return (
    <div className='graph-item'>
      <div className='route-table-container'>
        <div className='title'>Most Popular Routes</div>
        <div className='route-table-table-container'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Start</th>
                <th>End</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{row[0]}</td>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};
export default RoutesTable;
