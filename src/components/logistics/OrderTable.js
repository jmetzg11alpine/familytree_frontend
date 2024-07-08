import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

const OrderTable = ({ data }) => {
  const [sortedData, setSortedData] = useState(data);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const onSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedArray = [...sortedData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setSortedData(sortedArray);
    setSortConfig({ key, direction });
  };
  return (
    <div className='order-table'>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => onSort('order_no')}>Order No</th>
            <th onClick={() => onSort('created_at_date')}>Date</th>
            <th onClick={() => onSort('split')}>Split</th>
            <th onClick={() => onSort('units')}>Units</th>
            <th onClick={() => onSort('start_location')}>Start</th>
            <th onClick={() => onSort('end_location')}>End</th>
            <th onClick={() => onSort('miles')}>Miles</th>
            <th onClick={() => onSort('sales_person')}>Sales</th>
            <th onClick={() => onSort('customer')}>Customer</th>
            <th onClick={() => onSort('payment_received')}>Payment Received</th>
            <th onClick={() => onSort('truck_cost')}>Truck Cost</th>
            <th onClick={() => onSort('driver_cost')}>Driver Cost</th>
            <th onClick={() => onSort('bus_id')}>Trans No</th>
            <th onClick={() => onSort('shipped_date')}>Shipped</th>
            <th onClick={() => onSort('arrived_date')}>Arrived</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr key={index}>
              <td>{row.order_no}</td>
              <td>{row.created_at_date}</td>
              <td>{row.split ? 'yes' : 'no'}</td>
              <td>{row.units}</td>
              <td>{row.start_location}</td>
              <td>{row.end_location}</td>
              <td>{row.miles}</td>
              <td>{row.sales_person}</td>
              <td>{row.customer}</td>
              <td>${row.payment_received}</td>
              <td>${row.truck_cost}</td>
              <td>${row.driver_cost}</td>
              <td>{row.bus_id}</td>
              <td>{row.shipped_date}</td>
              <td>{row.arrived_date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default OrderTable;
