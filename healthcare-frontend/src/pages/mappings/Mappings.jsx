import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import GlassCard from '../../components/common/GlassCard';
import Loading from '../../components/common/Loading';
import { mappingsAPI } from '../../services/api';

export default function Mappings() {
  const [mappings, setMappings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMappings();
  }, []);

  const fetchMappings = async () => {
    try {
      const response = await mappingsAPI.getAll();
      setMappings(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch mappings');
      toast.error('Failed to load doctor-patient mappings');
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
          Doctor-Patient Mappings
        </h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
          onClick={() => {/* TODO: Open add mapping modal */}}
        >
          Create Mapping
        </motion.button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mappings.map((mapping) => (
          <GlassCard
            key={mapping.id}
            hover
            onClick={() => {/* TODO: Open mapping details */}}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Dr. {mapping.doctor.firstName} {mapping.doctor.lastName}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {mapping.doctor.specialization}
                </p>
              </div>
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                Active
              </span>
            </div>

            <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Patient
              </h4>
              <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                {mapping.patient.firstName} {mapping.patient.lastName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {mapping.patient.email}
              </p>
            </div>

            <div className="mt-4">
              <dl className="grid grid-cols-2 gap-1">
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Start Date
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-white">
                    {new Date(mapping.startDate).toLocaleDateString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Next Visit
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-white">
                    {mapping.nextVisit
                      ? new Date(mapping.nextVisit).toLocaleDateString()
                      : 'Not scheduled'}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  /* TODO: Handle edit */
                }}
              >
                Edit
              </button>
              <button
                className="text-sm text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                onClick={(e) => {
                  e.stopPropagation();
                  /* TODO: Handle delete */
                }}
              >
                Delete
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
} 