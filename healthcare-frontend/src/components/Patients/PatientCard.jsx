// src/components/Patients/PatientCard.jsx
import React from "react";

const PatientCard = ({ patient, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-all">
      <h3 className="text-lg font-bold text-purple-700">{patient.name}</h3>
      <p className="text-gray-600">Age: {patient.age}</p>
      <p className="text-gray-600">Gender: {patient.gender}</p>
      <p className="text-gray-600">Address: {patient.address}</p>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onEdit(patient)}
          className="text-sm px-3 py-1 bg-blue-500 text-white rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(patient.id)}
          className="text-sm px-3 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PatientCard;
