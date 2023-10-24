import React from "react";
import motion from "framer-motion";
import AdminDashboard from "../panel/admin/admin-dashboard";

const DashboardContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AdminDashboard />
    </motion.div>
  );
};

export default DashboardContent;
