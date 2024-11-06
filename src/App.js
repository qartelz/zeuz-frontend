// src/App.js
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import PracticePage from "./pages/PracticePage";
import BgSvg from "./assets/svg/Bgsvg";

function App() {
  


  return (
    <div className="relative overflow-hidden bg-slate-50">
      {/* Keep the slate background */}
      <div className="absolute inset-0 z-0"> {/* Cover the whole area with the slate background */}
        {/* The background color is set here */}
      </div>

      <div className="absolute scale-110 z-10 w-full h-full"> {/* Position the SVG on top */}
        <BgSvg />
      </div>

      <div className="relative z-20"> {/* Main content with a higher z-index */}
        <BrowserRouter>
          <Routes >
            <Route path="/" element={<DashboardPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/practice" element={<PracticePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
