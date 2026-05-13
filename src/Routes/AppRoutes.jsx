import React from "react";
import { Routes, Route } from "react-router-dom";

import Adminlogin from "../Admin/Adminlogin";
import AdminDashBoard from "../Admin/AdminDashBoard";
import DietModule from "../components/DietModule";
import Appointments from "../Admin/Appoinments";
import Patients from '../pages/Patients'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/staff/login" element={<Adminlogin />} />
      <Route path="/login" element={<Adminlogin />} />
      <Route path="/admin/dashboard" element={<AdminDashBoard />} />
      <Route path="/admin/appointments" element={<Appointments />} />
      <Route path="/admin/dietmodule" element={<DietModule />} />
      <Route path="/admin/patientslist" element={<Patients />} />
    </Routes>
  );
};

export default AppRoutes;
