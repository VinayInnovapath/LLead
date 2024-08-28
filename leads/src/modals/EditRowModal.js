import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'; // Or use any modal library you prefer
import './EditRowModal.css'; // Ensure this path is correct

const EditRowModal = ({ isOpen, onRequestClose, rowData, onSave }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (rowData) {
      setFormData(rowData); // Populate the form with existing data
    }
  }, [rowData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Pass updated data to parent component
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Row"
    >
      <h2>Edit Row</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key} className="form-group">
            <label htmlFor={key}>{key}</label>
            <input
              id={key}
              name={key}
              type="text"
              value={formData[key]}
              onChange={handleInputChange}
            />
          </div>
        ))}
        <button type="submit">Save</button>
        <button type="button" onClick={onRequestClose}>Cancel</button>
      </form>
    </Modal>
  );
};

export default EditRowModal;
