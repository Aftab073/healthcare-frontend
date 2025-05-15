import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import GlassCard from '../../components/common/GlassCard';
import Loading from '../../components/common/Loading';
import { doctorsAPI } from '../../services/api';

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await doctorsAPI.getAll();
      setDoctors(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch doctors');
      toast.error('Failed to load doctors');
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
          Doctors
        </h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
          onClick={() => {/* TODO: Open add doctor modal */}}
        >
          Add Doctor
        </motion.button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <GlassCard
            key={doctor.id}
            hover
            onClick={() => {/* TODO: Open doctor details */}}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Dr. {doctor.firstName} {doctor.lastName}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {doctor.specialization}
                </p>
              </div>
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                {doctor.status || 'Available'}
              </span>
            </div>
            
            <div className="mt-4">
              <dl className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    License No.
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-white">
                    {doctor.licenseNumber}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Experience
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-white">
                    {doctor.yearsOfExperience || 'N/A'} years
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Contact
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-white">
                    {doctor.email}
                  </dd>
                </div>
              </dl>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Current Patients
                </h4>
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {doctor.patientCount || 0}
                </p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
} 