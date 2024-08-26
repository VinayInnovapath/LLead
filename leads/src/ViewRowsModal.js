import React from 'react';
import './modals/viewRowModal.css'; // Adjust the path if needed

const ViewRowModal = ({ isOpen, onRequestClose, rowData }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Row Details</h2>
          <button className="modal-close-button" onClick={onRequestClose}>✖️</button>
        </div>
        <div className="modal-body">
          {rowData && Object.keys(rowData).map(key => (
            <div key={key} className="modal-field">
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <p>{rowData[key]}</p>
            </div>
          ))}
        </div>
        <div className="modal-actions">
          <button className="cancel-button" onClick={onRequestClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ViewRowModal;
