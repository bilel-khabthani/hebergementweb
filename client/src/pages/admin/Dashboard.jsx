import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";

const Dashboard = () => {
  const { theme } = useTheme();

  return (
    <div className={`h-screen w-full overflow-y-auto transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="p-6 md:p-8 lg:p-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`p-6 rounded-2xl shadow-lg mb-8 ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          } border`}
        >
          <h1 className="text-3xl font-bold mb-4">
            <span className={theme === 'dark' ? 'text-white' : 'text-gray-800'}>Admin </span>
            <span className="text-[#ff1a1a] drop-shadow-[0_0_10px_#ff1a1a]">Dashboard</span>
          </h1>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Welcome to the admin panel. Use the sidebar to manage content.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { title: "Total Users", value: "1,248", icon: "👥", color: "text-blue-400" },
            { title: "Active Products", value: "89", icon: "🛍️", color: "text-green-400" },
            { title: "Pending Orders", value: "12", icon: "📦", color: "text-yellow-400" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className={`p-6 rounded-xl shadow-md ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {stat.title}
                  </p>
                  <p className={`text-2xl font-bold mt-2 ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
                <span className="text-3xl">{stat.icon}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={`p-6 rounded-2xl shadow-lg ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border`}
        >
          <h2 className={`text-xl font-semibold mb-4 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
          }`}>
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              { action: "New order received", time: "2 min ago", user: "John Doe" },
              { action: "Product updated", time: "15 min ago", user: "Jane Smith" },
              { action: "User registered", time: "1 hour ago", user: "Mike Johnson" }
            ].map((activity, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                } transition-colors duration-200`}
              >
                <p className={`font-medium ${
                  theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                }`}>
                  {activity.action}
                </p>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  {activity.time} • By {activity.user}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;