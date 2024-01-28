import { useState } from 'react';
import { Table, Pagination } from 'react-bootstrap';

const HistoryTable = ({ size, data }) => {
  const titleHieght = size.height * 0.08;
  const containerHeight = size.height * 0.92;
  const containerStyle = {
    maxWidth: size.width,
    maxHeight: containerHeight,
    display: 'flex',
    flexDirection: 'column',
  };
  const tableStyle = {
    overflowY: 'auto',
    flex: '1 1 auto',
  };
  const rowStyle = {
    fontSize: '.85rem',
  };
  const paginationStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return `${date.toLocaleDateString('en-US', options)} ${date.toLocaleTimeString(
      'en-US',
      { hour: '2-digit', minute: '2-digit' }
    )}`;
  };
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 11;
  const pageCount = Math.ceil(data.length / rowsPerPage);
  const currentData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const maxPageButtons = 5;
  const firstPage = 1;
  const lastPage = pageCount;
  let startPage = Math.max(firstPage, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = Math.min(lastPage, startPage + maxPageButtons - 1);
  if (currentPage < maxPageButtons && lastPage >= maxPageButtons) {
    startPage = firstPage;
    endPage = maxPageButtons;
  } else if (currentPage > lastPage - Math.floor(maxPageButtons / 2)) {
    startPage = lastPage - maxPageButtons + 1;
    endPage = lastPage;
  }
  let paginationItems = [];
  for (let number = startPage; number <= endPage; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
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
        <h3>History of Changes</h3>
      </div>
      <div style={containerStyle}>
        <div style={tableStyle}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>User</th>
                <th>Action</th>
                <th>Recipient</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={index}>
                  <td style={rowStyle}>{item.username}</td>
                  <td style={rowStyle}>{item.action}</td>
                  <td style={rowStyle}>{item.recipient}</td>
                  <td style={rowStyle}>{formatDate(item.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div style={paginationStyle}>
          <Pagination>
            <Pagination.First
              onClick={() => handlePageChange(firstPage)}
              disabled={currentPage === firstPage}
            />
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === firstPage}
            />
            {paginationItems}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === lastPage}
            />
            <Pagination.Last
              onClick={() => handlePageChange(lastPage)}
              disabled={currentPage === lastPage}
            />
          </Pagination>
        </div>
      </div>
    </div>
  );
};
export default HistoryTable;
