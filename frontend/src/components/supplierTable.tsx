import React, { useState } from 'react';
import { Supplier } from '../types/auditor';



interface Props {
  data: Supplier[];
}






const SupplierTable: React.FC<Props> = ({ data }) => {
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(parseInt(event.target.value, 10));
  };

  return (
    <div className='supplierTable'>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Supplier</th>
            <th>Country</th>
            <th>Date request</th>
            <th>Status</th>
            <th>Verifier</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData().map((item) => (
            <tr key={item.ID}>
              <td className='id'>{item.ID}</td>
              <td className='supplier'>{item.Supplier}</td>
              <td className='country'>{item.Country}</td>
              <td className='date'>{item.Date_request}</td>
              <td className='status'>{item.Status}</td>
              <td className='verifier'>{item.Verifier}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div>
        <select value={pageSize} onChange={handlePageSizeChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        <span>
          Page {currentPage} of {Math.ceil(data.length / pageSize)}
        </span>
        <select value={currentPage} onChange={handlePageChange}>
          {Array.from({ length: Math.ceil(data.length / pageSize) }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

    
      
    </div>
  );
};


export default SupplierTable;


