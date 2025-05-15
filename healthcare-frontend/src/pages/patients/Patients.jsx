import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import GlassCard from '../../components/common/GlassCard';
import Loading from '../../components/common/Loading';
import { patientsAPI } from '../../services/api';

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await patientsAPI.getAll();
      setPatients(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch patients');
      toast.error('Failed to load patients');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading fullScreen />;
  }

  if (error) {
    return (
      <div className="p-4">
        <GlassCard className="text-center text-red-600">
          {error}
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Patients
        </h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
          onClick={() => {/* TODO: Open add patient modal */}}
        >
          Add Patient
        </motion.button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {patients.map((patient) => (
          <GlassCard
            key={patient.id}
            hover
            onClick={() => {/* TODO: Open patient details */}}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {patient.firstName} {patient.lastName}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {patient.email}
                </p>
              </div>
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                Active
              </span>
            </div>
            
            <div className="mt-4">
              <dl className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Age
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-white">
                    {patient.age || 'N/A'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Gender
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-white">
                    {patient.gender || 'N/A'}
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Last Visit
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-white">
                    {patient.lastVisit
                      ? new Date(patient.lastVisit).toLocaleDateString()
                      : 'Never'}
                  </dd>
                </div>
              </dl>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
} 