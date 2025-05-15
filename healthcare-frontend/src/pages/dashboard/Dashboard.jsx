import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { useAuth } from '../../contexts/AuthContext';
import GlassCard from '../../components/common/GlassCard';
import Loading from '../../components/common/Loading';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    appointmentsToday: 0,
  });

  const [chartData, setChartData] = useState({
    appointments: {
      labels: [],
      datasets: [],
    },
    patientDistribution: {
      labels: [],
      datasets: [],
    },
  });

  useEffect(() => {
    // Simulated data - replace with actual API calls
    const fetchData = async () => {
      try {
        // Fetch statistics
        setStats({
          totalPatients: 150,
          totalDoctors: 25,
          totalAppointments: 450,
          appointmentsToday: 12,
        });

        // Fetch chart data
        setChartData({
          appointments: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
              {
                label: 'Appointments',
                data: [12, 19, 15, 25, 22, 30, 28],
                borderColor: 'rgb(14, 165, 233)',
                backgroundColor: 'rgba(14, 165, 233, 0.5)',
                tension: 0.4,
              },
            ],
          },
          patientDistribution: {
            labels: ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics'],
            datasets: [
              {
                data: [30, 25, 20, 25],
                backgroundColor: [
                  'rgba(14, 165, 233, 0.7)',
                  'rgba(139, 92, 246, 0.7)',
                  'rgba(34, 197, 94, 0.7)',
                  'rgba(249, 115, 22, 0.7)',
                ],
                borderWidth: 1,
              },
            ],
          },
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <GlassCard>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Total Patients
          </h3>
          <p className="mt-2 text-3xl font-bold text-primary-600">
            {stats.totalPatients}
          </p>
        </GlassCard>

        <GlassCard>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Total Doctors
          </h3>
          <p className="mt-2 text-3xl font-bold text-secondary-600">
            {stats.totalDoctors}
          </p>
        </GlassCard>

        <GlassCard>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Total Appointments
          </h3>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {stats.totalAppointments}
          </p>
        </GlassCard>

        <GlassCard>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Today's Appointments
          </h3>
          <p className="mt-2 text-3xl font-bold text-orange-600">
            {stats.appointmentsToday}
          </p>
        </GlassCard>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard className="h-[400px]">
            <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
              Appointments This Week
            </h3>
            <Line
              data={chartData.appointments}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(156, 163, 175, 0.1)',
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard className="h-[400px]">
            <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
              Patient Distribution by Department
            </h3>
            <div className="flex h-full items-center justify-center">
              <div className="h-[300px] w-[300px]">
                <Doughnut
                  data={chartData.patientDistribution}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                    },
                  }}
                />
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <GlassCard>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Recent Activity
            </h3>
            <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400">
              View all
            </button>
          </div>
          <div className="mt-4 space-y-4">
            {/* Add activity items here */}
            <p className="text-gray-600 dark:text-gray-400">
              No recent activity to display.
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}