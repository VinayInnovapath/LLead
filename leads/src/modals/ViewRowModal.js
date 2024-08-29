// import React from 'react';
// import Modal from 'react-modal'; // Ensure this import is correct
// import '../welcome.css'

// const ViewRowModal = ({ isOpen, onRequestClose, rowData }) => {
//   return (
//     <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="View Row Details">
//       <h1  ><b> <i>Row Details</i></b></h1>
//       {rowData ? (
//         <div>
//           {Object.keys(rowData).map(key => (
//             <div key={key}>
//               <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {rowData[key]}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No data available</p>
//       )}
  
//       <button 
//       onClick={onRequestClose} 
//       style={{ 
//         backgroundColor: '#0077b6', 
//         border: '1px solid #ccc', 
//         borderRadius: '8px', 
//         color: '#333', 
//         padding: '12px 24px', 
//         fontSize: '14px', 
//         fontWeight: '500', 
//         cursor: 'pointer', 
//         boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
//         transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
//       }}
//       onMouseEnter={(e) => {
//         e.target.style.backgroundColor = '#0077b6';
//         e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
//       }}
//       onMouseLeave={(e) => {
//         e.target.style.backgroundColor = '#f0f0f0';
//         e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
//       }}
//     >
//       Close
//     </button>
    

     
//     </Modal>
//   );
// };

// export default ViewRowModal;



import React from 'react';
import Modal from 'react-modal'; // Ensure this import is correct

const ViewRowModal = ({ isOpen, onRequestClose, rowData }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="View Row Details"
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg flex flex-col max-h-[90vh]">
        <header className="border-b border-gray-200 pb-4 mb-4">
          <h1 className="text-2xl font-bold italic">Row Details</h1>
        </header>
        <div className="flex-1 overflow-auto mb-4">
          {rowData ? (
            <div>
              {Object.keys(rowData).map(key => (
                <div key={key} className="mb-2">
                  <strong className="font-semibold capitalize">{key}:</strong> {rowData[key]}
                </div>
              ))}
            </div>
          ) : (
            <p>No data available</p>
          )}
        </div>
        <footer className="border-t border-gray-200 pt-4">
          <button
            onClick={onRequestClose}
            // className="w-full px-4 py-2 bg-deepskyblue hover:bg-sky-600 transition-colors"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 px-4 rounded"
            ><b>Close</b></button>
        </footer>
      </div>
    </Modal>
  );
};

export default ViewRowModal;