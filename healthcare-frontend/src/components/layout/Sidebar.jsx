import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RiDashboardLine, RiUserHeartLine, RiStethoscopeLine, RiMapPinLine } from 'react-icons/ri';
import { IoClose } from 'react-icons/io5';

const menuItems = [
  { path: '/', icon: RiDashboardLine, label: 'Dashboard' },
  { path: '/patients', icon: RiUserHeartLine, label: 'Patients' },
  { path: '/doctors', icon: RiStethoscopeLine, label: 'Doctors' },
  { path: '/mappings', icon: RiMapPinLine, label: 'Mappings' },
];

export default function Sidebar({ onClose }) {
  return (
    <div className="flex h-full flex-col bg-white dark:bg-gray-800 shadow-xl">
      <div className="flex items-center justify-between p-4">
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-bold text-gray-800 dark:text-white"
        >
          Healthcare App
        </motion.h1>
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <IoClose className="h-6 w-6" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`
              }
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center"
        >
          <div className="flex-shrink-0">
            <img
              className="h-8 w-8 rounded-full"
              src="https://ui-avatars.com/api/?name=User"
              alt="User"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Dr. John Doe
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Admin
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 