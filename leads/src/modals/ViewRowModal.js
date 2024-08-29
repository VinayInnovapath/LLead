import React from 'react';
import Modal from 'react-modal'; // Ensure this import is correct
import '../welcome.css'

const ViewRowModal = ({ isOpen, onRequestClose, rowData }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="View Row Details">
      <h1  ><b> <i>Row Details</i></b></h1>
      {rowData ? (
        <div>
          {Object.keys(rowData).map(key => (
            <div key={key}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {rowData[key]}
            </div>
          ))}
        </div>
      ) : (
        <p>No data available</p>
      )}
      <button onClick={onRequestClose} style={{ backgroundColor: 'deepskyblue',}}> Close </button>
  

     
    </Modal>
  );
};

export default ViewRowModal;
