import { useState } from 'react';
import { motion } from 'framer-motion';
import { RiMenu4Line, RiSunLine, RiMoonLine, RiBellLine } from 'react-icons/ri';
import { useTheme } from '../../contexts/ThemeContext';

export default function Header({ onMenuClick }) {
  const { darkMode, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:gap-x-6 sm:px-6">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 dark:text-gray-200"
        onClick={onMenuClick}
      >
        <span className="sr-only">Open sidebar</span>
        <RiMenu4Line className="h-6 w-6" />
      </button>

      <div className="flex flex-1 gap-x-4 self-stretch justify-end">
        <div className="flex items-center gap-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="rounded-full p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            {darkMode ? (
              <RiSunLine className="h-6 w-6" />
            ) : (
              <RiMoonLine className="h-6 w-6" />
            )}
          </motion.button>

          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="rounded-full p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <RiBellLine className="h-6 w-6" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                3
              </span>
            </motion.button>

            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-80 rounded-lg bg-white py-2 shadow-lg dark:bg-gray-800"
              >
                <div className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  Notifications
                </div>
                {/* Add notification items here */}
              </motion.div>
            )}
          </div>

          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />

          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <button
              type="button"
              className="-m-1.5 flex items-center p-1.5"
            >
              <span className="sr-only">Your profile</span>
              <img
                className="h-8 w-8 rounded-full bg-gray-50"
                src="https://ui-avatars.com/api/?name=User"
                alt=""
              />
              <span className="hidden lg:flex lg:items-center">
                <span className="ml-4 text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  Dr. John Doe
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 