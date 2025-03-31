import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import AircraftPage from "../pages/AircraftPage";
import ClassPage from "../pages/ClassPage";
import InstructorPage from "../pages/InstructorPage";
import StudentPage from "../pages/StudentPage";
import ProfilePage from "../pages/ProfilePage";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/aircraft" element={<AircraftPage />} />
        <Route path="/class" element={<ClassPage />} />
        <Route path="/instructor" element={<InstructorPage />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
