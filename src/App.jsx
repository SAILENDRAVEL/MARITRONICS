import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Features from "./pages/Features";
import Working from "./pages/Working";
import Benefits from "./pages/Benefits";
import Login from "./pages/Login";
import Register from "./pages/Register";

import BoatDetails from "./pages/BoatDetails";
import AdminPage from "./pages/AdminPage";
import BoatLogin from "./pages/BoatLogin";
import AdminLogin from "./pages/AdminLogin";

/* LIVE SYSTEM */
import LiveMap from "./pages/LiveMap";
import LiveDashboard from "./pages/LiveDashboard";

/* PROJECT PAGES */
import TeamPage from "./pages/TeamPage";
import AchievementsPage from "./pages/AchievementsPage";
import WorkPage from "./pages/WorkPage";
import IssuesPage from "./pages/IssuesPage";

import "leaflet/dist/leaflet.css";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* MAIN WEBSITE */}

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/working" element={<Working />} />
        <Route path="/benefits" element={<Benefits />} />

        {/* PROJECT PAGES */}

        <Route path="/team" element={<TeamPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/issues" element={<IssuesPage />} />

        {/* AUTH */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN PANEL */}

        <Route path="/admin" element={<AdminPage />} />

        {/* BOAT LOGIN */}

        <Route path="/boat-login" element={<BoatLogin />} />

        <Route path="/admin" element={<AdminLogin />} />

<Route path="/admin-dashboard" element={<AdminPage />} />

        {/* BOAT DETAILS */}

        <Route path="/boat-details" element={<BoatDetails />} />

        {/* LIVE MONITORING */}

        <Route path="/livestatus" element={<LiveMap />} />
        <Route path="/live-dashboard" element={<LiveDashboard />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;