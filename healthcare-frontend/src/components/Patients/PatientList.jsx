import React, { useEffect, useState } from "react";
import { FiUser, FiCalendar, FiRefreshCw, FiPlus, FiSearch } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import axiosInstance from "../../api/axios";
import PatientCard from "./PatientCard";
import PatientModal from "./PatientModal";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Fetch patients with error handling
  const fetchPatients = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/patients/");
      setPatients(res.data);
      toast.success("Patients loaded successfully");
    } catch (err) {
      console.error("Failed to fetch patients", err);
      toast.error("Failed to load patients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Filter patients based on search term
  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toString().includes(searchTerm) ||
    patient.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle patient selection
  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header with search and actions */}
      <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-b">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center">
            <FiUser className="text-2xl text-purple-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Patient Records</h2>
            <span className="ml-3 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
              {filteredPatients.length} patients
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative flex-1 md:w-64">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients..."
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button
              onClick={fetchPatients}
              disabled={loading}
              className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
              aria-label="Refresh patient list"
            >
              <FiRefreshCw className={`text-gray-600 ${loading ? "animate-spin" : ""}`} />
            </button>
            
            <button
              onClick={() => {
                setSelectedPatient(null);
                setShowModal(true);
              }}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <FiPlus className="mr-2" />
              Add Patient
            </button>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="p-8 flex justify-center">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Empty state */}
      {!loading && filteredPatients.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          {searchTerm ? "No patients match your search" : "No patients found"}
        </div>
      )}

      {/* Patient list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        <AnimatePresence>
          {filteredPatients.map((patient) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={() => handlePatientClick(patient)}
              className="cursor-pointer"
            >
              <PatientCard patient={patient} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Patient modal */}
      <PatientModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedPatient(null);
        }}
        patient={selectedPatient}
        refreshPatients={fetchPatients}
      />
    </div>
  );
};

export default PatientList;
