// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import './welcome.css'; // Ensure this path is correct

// Modal.setAppElement('#root');

// const AddRowModal = ({ isOpen, onRequestClose, onSave }) => {
//   const [formData, setFormData] = useState({
//     leadid: '',
//     name: '',
//     startdate: '',
//     phone: '',
//     email: '',
//     priority: '',
//     workstatus: '',
//     source: '',
//     workexperience: '',
//     sourcename: '',
//     course: '',
//     intent: '',
//     attendedclass: '',
//     siteaccess: '',
//     assignedto: '',
//     status: '',
//     secondaryemail: '',
//     secondaryphone: '',
//     address: '',
//     spousename: '',
//     spouseemail: '',
//     spousephone: '',
//     spouseoccupationinfo: '',
//     city: '',
//     state: '',
//     country: '',
//     zip: '',
//     faq: '',
//     callsmade: '',
//     closedate: '',
//     notes: '',
//     lastmoddatetime: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//     onRequestClose();
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onRequestClose}
//       className="modal-content"
//       overlayClassName="modal-overlay"
//     >
//       <div className="modal-header">
//         <h2 className="modal-title">Add New Lead</h2>
//         <button className="modal-close-button" onClick={onRequestClose}>&times;</button>
//       </div>
//       <form onSubmit={handleSubmit} className="modal-body">
//         {Object.keys(formData).map((key) => (
//           <div key={key} className="modal-field">
//             <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
//             <input
//               type="text"
//               id={key}
//               name={key}
//               value={formData[key]}
//               onChange={handleChange}
//             />
//           </div>
//         ))}
//         <div className="modal-actions">
//           <button type="button" className="cancel-button" onClick={onRequestClose}>Cancel</button>
//           <button type="submit" className="save-button">Save</button>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default AddRowModal;









import React, { useState } from 'react';
import Modal from 'react-modal';
import '../welcome.css'; // Ensure this path is correct

Modal.setAppElement('#root');

const AddRowModal = ({ isOpen, onRequestClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    startdate: '',
    phone: '',
    email: '',
    priority: '',
    workstatus: '',
    source: '',
    workexperience: '',
    sourcename: '',
    course: '',
    intent: '',
    attendedclass: '',
    siteaccess: '',
    assignedto: '',
    status: '',
    secondaryemail: '',
    secondaryphone: '',
    address: '',
    spousename: '',
    spouseemail: '',
    spousephone: '',
    spouseoccupationinfo: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    faq: '',
    callsmade: '',
    closedate: '',
    notes: '',
   });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <h2 className="modal-title">Add New Lead</h2>
        <button className="modal-close-button" onClick={onRequestClose}>&times;</button>
      </div>
      <form onSubmit={handleSubmit} className="modal-body">
        {Object.keys(formData).map((key) => (
          <div key={key} className="modal-field">
            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</label>
            <input
              type="text"
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
            />
          </div>
        ))}
        <div className="modal-actions">
          <button type="button" className="cancel-button" onClick={onRequestClose}>Cancel</button>
          <button type="submit" className="save-button">Save</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddRowModal;
