
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
// import './welcome.css';
// import AddRowModal from './modals/AddRowModal'; // Ensure this path is correct
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';

// const Welcome = () => {
//   const [allData, setAllData] = useState([]); // Store all data
//   const [filteredData, setFilteredData] = useState([]); // Store filtered data
//   const [rowData, setRowData] = useState([]);
//   const [columnDefs, setColumnDefs] = useState([]);
//   const [paginationPageSize, setPaginationPageSize] = useState(100);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalRows, setTotalRows] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isSearchVisible, setIsSearchVisible] = useState(false); // State to toggle search field
//   const [searchValue, setSearchValue] = useState(''); // State to manage search input

//   useEffect(() => {
//     fetchData();

//     // Add event listener for Escape key
//     const handleKeyDown = (event) => {
//       if (event.key === 'Escape') {
//         resetSearch();
//       }
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:8001/api/leads', {
//         params: {
//           page: 1,
//           pageSize: 10000 // Adjust this value based on your needs and API limits
//         }
//       });
//       const { data, totalRows } = response.data;
//       setAllData(data); // Store all data
//       setFilteredData(data); // Initialize filteredData
//       setTotalRows(totalRows);
//       setCurrentPage(1); // Reset to the first page
//       updateRowData(data.slice(0, paginationPageSize)); // Set initial data for the first page
//       setupColumns(data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const setupColumns = (data) => {
//     if (data.length > 0) {
//       const keys = Object.keys(data[0]);
//       const columns = keys.map(key => ({
//         headerName: key.charAt(0).toUpperCase() + key.slice(1),
//         field: key
//       }));
//       setColumnDefs(columns);
//     }
//   };

//   const updateRowData = (data) => {
//     setRowData(data);
//   };

//   const handleAddRow = () => {
//     setIsModalOpen(true);
//   };

//   const handleSaveRow = (newRow) => {
//     // Implement logic to save the new row to the database or state
//     console.log('New Row Data:', newRow);
//   };

//   const handleExportToExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(rowData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Leads');
//     XLSX.writeFile(wb, 'leads.xlsx');
//   };

//   const handleExportToPDF = () => {
//     const doc = new jsPDF();
//     doc.text('Leads Data', 10, 10);
//     rowData.forEach((row, index) => {
//       doc.text(Object.values(row).join(', '), 10, 20 + index * 10);
//     });
//     doc.save('leads.pdf');
//   };

//   const handlePageChange = (event) => {
//     const newPage = Number(event.target.value);
//     setCurrentPage(newPage);

//     // Update rowData based on the new page and filteredData
//     const startIndex = (newPage - 1) * paginationPageSize;
//     updateRowData(filteredData.slice(startIndex, startIndex + paginationPageSize));
//   };

//   const handleSearchToggle = () => {
//     setIsSearchVisible(!isSearchVisible);
//   };

//   const handleSearchInputChange = (event) => {
//     setSearchValue(event.target.value);
//   };

//   const handleSearch = () => {
//     if (!searchValue.trim()) {
//       resetSearch();
//       return;
//     }

//     // Filter allData based on the search value
//     const filtered = allData.filter(row => {
//       return Object.values(row).some(value =>
//         value && value.toString().toLowerCase().includes(searchValue.toLowerCase())
//       );
//     });

//     // Update filteredData
//     setFilteredData(filtered);

//     // Update rowData and pagination based on filtered data
//     setTotalRows(filtered.length);
//     const startIndex = (currentPage - 1) * paginationPageSize;
//     updateRowData(filtered.slice(startIndex, startIndex + paginationPageSize));
//   };

//   const resetSearch = () => {
//     setSearchValue('');
//     fetchData(); // Refetch data and reset the table
//   };

//   const handleReloadGrid = () => {
//     fetchData(); // Refetch data and update the grid
//   };

//   const totalPages = Math.ceil(totalRows / paginationPageSize);
//   const pageOptions = Array.from({ length: totalPages }, (_, i) => i + 1);

//   const gridOptions = {
//     rowSelection: 'single', // allows single row selection
//     onRowClicked: event => {
//       event.node.setSelected(true); // select the clicked row
//     },
//     getRowStyle: params => {
//       if (params.node.isSelected()) {
//         return { backgroundColor: 'lightyellow' };
//       }
//       return null;
//     },
//     // other grid options
//   };

//   return (
//     <div className="custom-grid-container">
//       <div className="header-box">
//         <h1 className="header-title">Lead Management</h1>
//         <div className="header-controls">
//           <select
//             className="page-dropdown"
//             value={currentPage}
//             onChange={handlePageChange}
//           >
//             {pageOptions.map(page => (
//               <option key={page} value={page}>
//                 {page}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <div className="ag-theme-alpine">
//         <AgGridReact
//           gridOptions={gridOptions}
//           rowData={rowData}
//           columnDefs={columnDefs}
//           pagination={true}
//           paginationPageSize={paginationPageSize}
//         />
//       </div>
//       {isSearchVisible && (
//         <div className="search-container">
//           <input
//             type="text"
//             className="search-input"
//             placeholder="Enter name to search"
//             value={searchValue}
//             onChange={handleSearchInputChange}
//           />
//           <button onClick={handleSearch}>Search</button>
//         </div>
//       )}
//       <div className="action-buttons">
//         <button className="action-button" title="Add New Row" onClick={handleAddRow}>+</button>
//         <button className="action-button" title="Edit Selected Row">✏️</button>
//         <button className="action-button" title="View Selected Row">📄</button>
//         <button className="action-button" title="Find Records" onClick={handleSearchToggle}>🔍</button>
//         <button className="action-button" title="Reload Grid" onClick={handleReloadGrid}>🔄</button>
//         <button className="action-button" title="Export to Excel" onClick={handleExportToExcel}>📊</button>
//         <button className="action-button" title="Export to PDF" onClick={handleExportToPDF}>📄</button>
//       </div>
//       <AddRowModal
//         isOpen={isModalOpen}
//         onRequestClose={() => setIsModalOpen(false)}
//         onSave={handleSaveRow}
//       />
//     </div>
//   );
// };

// export default Welcome;






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './welcome.css';
import AddRowModal from './modals/AddRowModal'; // Ensure this path is correct

import ViewRowModal from './modals/ViewRowModal'; // Ensure this path is correct
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';


const Welcome = () => {
  const [message, setMessage] = useState(null); // State for displaying messages
  const [allData, setAllData] = useState([]); // Store all data
  const [filteredData, setFilteredData] = useState([]); // Store filtered data
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [paginationPageSize, setPaginationPageSize] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false); // State for view row modal
  const [selectedRow, setSelectedRow] = useState(null); // State for selected row
  const [isSearchVisible, setIsSearchVisible] = useState(false); // State to toggle search field
  const [searchValue, setSearchValue] = useState(''); // State to manage search input

  const gridRef = React.createRef();

  useEffect(() => {
    fetchData();

    // Add event listener for Escape key
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        resetSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8001/api/leads', {
        params: {
          page: 1,
          pageSize: 10000 // Adjust this value based on your needs and API limits
        }
      });
      const { data, totalRows } = response.data;
      setAllData(data); // Store all data
      setFilteredData(data); // Initialize filteredData
      setTotalRows(totalRows);
      setCurrentPage(1); // Reset to the first page
      updateRowData(data.slice(0, paginationPageSize)); // Set initial data for the first page
      setupColumns(data);
      setMessage({ text: 'Data loaded successfully!', type: 'success' });
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage({ text: 'Error loading data. Please try again.', type: 'error' });    
    }
  };

  const setupColumns = (data) => {
    if (data.length > 0) {
      const keys = Object.keys(data[0]);
      const columns = keys.map(key => ({
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        field: key
      }));
      setColumnDefs(columns);
    }
  };

  const updateRowData = (data) => {
    setRowData(data);
  };

  const handleAddRow = () => {
    setIsModalOpen(true);
  };

  // const handleSaveRow = (newRow) => {
  //   // Implement logic to save the new row to the database or state
  //   console.log('New Row Data:', newRow);
  // };

  const handleSaveRow = async (newRow) => {
    try {
      await axios.post('http://localhost:8001/api/leads', newRow);
      fetchData(); // Refetch data after saving
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error('Error saving row data:', error);
    }
  };
  

  const handleExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(rowData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Leads');
    XLSX.writeFile(wb, 'leads.xlsx');
  };

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Leads Data', 10, 10);
    rowData.forEach((row, index) => {
      doc.text(Object.values(row).join(', '), 10, 20 + index * 10);
    });
    doc.save('leads.pdf');
  };

  const handlePageChange = (event) => {
    const newPage = Number(event.target.value);
    setCurrentPage(newPage);

    // Update rowData based on the new page and filteredData
    const startIndex = (newPage - 1) * paginationPageSize;
    updateRowData(filteredData.slice(startIndex, startIndex + paginationPageSize));
  };

  const handleSearchToggle = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    if (!searchValue.trim()) {
      resetSearch();
      return;
    }

    // Filter allData based on the search value
    const filtered = allData.filter(row => {
      return Object.values(row).some(value =>
        value && value.toString().toLowerCase().includes(searchValue.toLowerCase())
      );
    });

    // Update filteredData
    setFilteredData(filtered);

    // Update rowData and pagination based on filtered data
    setTotalRows(filtered.length);
    const startIndex = (currentPage - 1) * paginationPageSize;
    updateRowData(filtered.slice(startIndex, startIndex + paginationPageSize));
  };

  const resetSearch = () => {
    setSearchValue('');
    fetchData(); // Refetch data and reset the table
  };

  const handleReloadGrid = () => {
    fetchData(); // Refetch data and update the grid
  };

  const handleViewRow = () => {
    if (gridRef.current) {
      const selectedRows = gridRef.current.api.getSelectedRows();
      if (selectedRows.length > 0) {
        const selectedRowData = selectedRows[0];
        setSelectedRow(selectedRowData);
        setIsViewModalOpen(true);
      } else {
        alert('Please select a row to view.');
      }
    }
  };

  const totalPages = Math.ceil(totalRows / paginationPageSize);
  const pageOptions = Array.from({ length: totalPages }, (_, i) => i + 1);

  const gridOptions = {
    rowSelection: 'single', // allows single row selection
    onRowClicked: event => {
      event.node.setSelected(true); // select the clicked row
    },
    getRowStyle: params => {
      if (params.node.isSelected()) {
        return { backgroundColor: 'lightyellow' };
      }
      return null;
    },
    // other grid options
  };

  return (
    <div className="custom-grid-container">
      <div className="header-box">
        <h1 className="header-title">Lead Management</h1>
        <div className="header-controls">
          <select
            className="page-dropdown"
            value={currentPage}
            onChange={handlePageChange}
          >
            {pageOptions.map(page => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          gridOptions={gridOptions}
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={paginationPageSize}
        />
      </div>
      {isSearchVisible && (
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Enter name to search"
            value={searchValue}
            onChange={handleSearchInputChange}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      )}
      <div className="action-buttons">
        <button className="action-button" title="Add New Row" onClick={handleAddRow}>+</button>
        <button className="action-button" title="Edit Selected Row">✏️</button>
        <button className="action-button" title="View Selected Row" onClick={handleViewRow}>📄</button>
        <button className="action-button" title="Find Records" onClick={handleSearchToggle}>🔍</button>
        <button className="action-button" title="Reload Grid" onClick={handleReloadGrid}>🔄</button>
        <button className="action-button" title="Export to Excel" onClick={handleExportToExcel}>📊</button>
        <button className="action-button" title="Export to PDF" onClick={handleExportToPDF}>📄</button>
      </div>
      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      <AddRowModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSave={handleSaveRow}
      />
      <ViewRowModal
        isOpen={isViewModalOpen}
        onRequestClose={() => setIsViewModalOpen(false)}
        rowData={selectedRow}
      />
    </div>
  );
};

export default Welcome;







// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
// import './welcome.css';
// import AddRowModal from './modals/AddRowModal'; // Ensure this path is correct
// import EditRowModal from './modals/EditRowModal'; // Import the new EditRowModal
// import ViewRowModal from './modals/ViewRowModal'; // Ensure this path is correct
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';

// const Welcome = () => {
//   const [allData, setAllData] = useState([]); // Store all data
//   const [filteredData, setFilteredData] = useState([]); // Store filtered data
//   const [rowData, setRowData] = useState([]);
//   const [columnDefs, setColumnDefs] = useState([]);
//   const [paginationPageSize, setPaginationPageSize] = useState(100);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalRows, setTotalRows] = useState(0);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit row modal
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false); // State for view row modal
//   const [selectedRow, setSelectedRow] = useState(null); // State for selected row
//   const [isSearchVisible, setIsSearchVisible] = useState(false); // State to toggle search field
//   const [searchValue, setSearchValue] = useState(''); // State to manage search input
//   const [message, setMessage] = useState(null); // State for displaying messages

//   const gridRef = useRef();

//   useEffect(() => {
//     fetchData();

//     // Add event listener for Escape key
//     const handleKeyDown = (event) => {
//       if (event.key === 'Escape') {
//         resetSearch();
//       }
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:8001/api/leads', {
//         params: {
//           page: currentPage,
//           pageSize: paginationPageSize,
//         },
//       });
//       const { data, totalRows } = response.data;
//       setAllData(data); // Store all data
//       setFilteredData(data); // Initialize filteredData
//       setTotalRows(totalRows);
//       updateRowData(data);
//       setupColumns(data);
//       setMessage({ text: 'Data loaded successfully!', type: 'success' });
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setMessage({ text: 'Error loading data. Please try again.', type: 'error' });
//     }
//   };

//   const setupColumns = (data) => {
//     if (data.length > 0) {
//       const keys = Object.keys(data[0]);
//       const columns = keys.map((key) => ({
//         headerName: key.charAt(0).toUpperCase() + key.slice(1),
//         field: key,
//       }));
//       setColumnDefs(columns);
//     }
//   };

//   const updateRowData = (data) => {
//     setRowData(data);
//   };

//   const handleAddRow = () => {
//     setIsAddModalOpen(true);
//   };

//   const handleSaveRow = async (newRow) => {
//     try {
//       await axios.post('http://localhost:8001/api/leads', newRow);
//       fetchData(); // Refetch data after saving
//       setIsAddModalOpen(false); // Close the modal
//       setMessage({ text: 'Row added successfully!', type: 'success' });
//     } catch (error) {
//       console.error('Error saving row data:', error);
//       setMessage({ text: 'Error adding row. Please try again.', type: 'error' });
//     }
//   };

//   const handleEditRow = () => {
//     if (gridRef.current) {
//       const selectedRows = gridRef.current.api.getSelectedRows();
//       if (selectedRows.length > 0) {
//         const selectedRowData = selectedRows[0];
//         setSelectedRow(selectedRowData);
//         setIsEditModalOpen(true);
//       } else {
//         alert('Please select a row to edit.');
//       }
//     }
//   };

//   const handleUpdateRow = async (updatedRow) => {
//     try {
//       await axios.put(`http://localhost:8001/api/leads/${updatedRow.id}`, updatedRow);
//       fetchData(); // Refetch data after updating
//       setIsEditModalOpen(false); // Close the modal
//       setMessage({ text: 'Row updated successfully!', type: 'success' });
//     } catch (error) {
//       console.error('Error updating row data:', error);
//       setMessage({ text: 'Error updating row. Please try again.', type: 'error' });
//     }
//   };

//   const handleExportToExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(rowData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Leads');
//     XLSX.writeFile(wb, 'leads.xlsx');
//   };

//   const handleExportToPDF = () => {
//     const doc = new jsPDF();
//     doc.text('Leads Data', 10, 10);
//     rowData.forEach((row, index) => {
//       doc.text(Object.values(row).join(', '), 10, 20 + index * 10);
//     });
//     doc.save('leads.pdf');
//   };

//   const handlePageChange = (event) => {
//     const newPage = Number(event.target.value);
//     setCurrentPage(newPage);

//     // Update rowData based on the new page and filteredData
//     const startIndex = (newPage - 1) * paginationPageSize;
//     updateRowData(filteredData.slice(startIndex, startIndex + paginationPageSize));
//   };

//   const handleSearchToggle = () => {
//     setIsSearchVisible(!isSearchVisible);
//   };

//   const handleSearchInputChange = (event) => {
//     setSearchValue(event.target.value);
//   };

//   const handleSearch = () => {
//     if (!searchValue.trim()) {
//       resetSearch();
//       return;
//     }

//     // Filter allData based on the search value
//     const filtered = allData.filter((row) => {
//       return Object.values(row).some((value) =>
//         value && value.toString().toLowerCase().includes(searchValue.toLowerCase())
//       );
//     });

//     // Update filteredData
//     setFilteredData(filtered);

//     // Update rowData and pagination based on filtered data
//     setTotalRows(filtered.length);
//     const startIndex = (currentPage - 1) * paginationPageSize;
//     updateRowData(filtered.slice(startIndex, startIndex + paginationPageSize));
//   };

//   const resetSearch = () => {
//     setSearchValue('');
//     fetchData(); // Refetch data and reset the table
//   };

//   const handleReloadGrid = () => {
//     fetchData(); // Refetch data and update the grid
//   };

//   const handleViewRow = () => {
//     if (gridRef.current) {
//       const selectedRows = gridRef.current.api.getSelectedRows();
//       if (selectedRows.length > 0) {
//         const selectedRowData = selectedRows[0];
//         setSelectedRow(selectedRowData);
//         setIsViewModalOpen(true);
//       } else {
//         alert('Please select a row to view.');
//       }
//     }
//   };

//   const totalPages = Math.ceil(totalRows / paginationPageSize);
//   const pageOptions = Array.from({ length: totalPages }, (_, i) => i + 1);

//   const gridOptions = {
//     rowSelection: 'single', // allows single row selection
//     onRowClicked: (event) => {
//       event.node.setSelected(true); // select the clicked row
//     },
//     getRowStyle: (params) => {
//       if (params.node.isSelected()) {
//         return { backgroundColor: 'lightyellow' };
//       }
//       return null;
//     },
//     // other grid options
//   };

//   return (
//     <div className="custom-grid-container">
//       <div className="header-box">
//         <h1 className="header-title">Lead Management</h1>
//         <div className="header-controls">
//           <select
//             className="page-dropdown"
//             value={currentPage}
//             onChange={handlePageChange}
//           >
//             {pageOptions.map((page) => (
//               <option key={page} value={page}>
//                 {page}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <div className="ag-theme-alpine">
//         <AgGridReact
//           ref={gridRef}
//           gridOptions={gridOptions}
//           rowData={rowData}
//           columnDefs={columnDefs}
//           pagination={true}
//           paginationPageSize={paginationPageSize}
//         />
//       </div>
//       {isSearchVisible && (
//         <div className="search-container">
//           <input
//             type="text"
//             className="search-input"
//             placeholder="Enter name to search"
//             value={searchValue}
//             onChange={handleSearchInputChange}
//           />
//           <button onClick={handleSearch}>Search</button>
//         </div>
//       )}
//       <div className="action-buttons">
//         <button className="action-button" title="Add New Row" onClick={handleAddRow}>+</button>
//         <button className="action-button" title="Edit Selected Row" onClick={handleEditRow}>✏️</button>
//         <button className="action-button" title="View Selected Row" onClick={handleViewRow}>📄</button>
//         <button className="action-button" title="Find Records" onClick={handleSearchToggle}>🔍</button>
//         <button className="action-button" title="Reload Grid" onClick={handleReloadGrid}>🔄</button>
//         <button className="action-button" title="Export to Excel" onClick={handleExportToExcel}>📊</button>
//         <button className="action-button" title="Export to PDF" onClick={handleExportToPDF}>📄</button>
//       </div>
//       {message && (
//         <div className={`message ${message.type}`}>
//           {message.text}
//         </div>
//       )}
//       <AddRowModal
//         isOpen={isAddModalOpen}
//         onRequestClose={() => setIsAddModalOpen(false)}
//         onSave={handleSaveRow}
//       />
//       <EditRowModal
//         isOpen={isEditModalOpen}
//         onRequestClose={() => setIsEditModalOpen(false)}
//         rowData={selectedRow}
//         onSave={handleUpdateRow}
//       />
//       <ViewRowModal
//         isOpen={isViewModalOpen}
//         onRequestClose={() => setIsViewModalOpen(false)}
//         rowData={selectedRow}
//       />
//     </div>
//   );
// };

// export default Welcome;
