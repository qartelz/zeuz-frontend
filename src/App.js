import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import PracticePage from "./pages/PracticePage";
import BgSvg from "./assets/svg/Bgsvg";
import UserProfile from "./pages/UserProfile";
import AdminPage from "./pages/AdminPage";
import LearnPage from "./pages/LearnPage";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (  
    <div className="relative overflow-hidden bg-slate-50">
      <div className="absolute inset-0 z-0"></div>

      <div className="absolute scale-110 z-10 w-full h-full">
        <BgSvg />
      </div>

      <div className="relative z-20 font-oswald">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/practice/learn" element={<LearnPage />} />
            <Route path="/my-profile" element={<UserProfile />} />
            <Route path="/admin/token" element={<AdminPage />} />
            <Route path="/admin" element={<AdminLogin />} />

          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
