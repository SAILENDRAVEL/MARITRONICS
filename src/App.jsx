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

/* LIVE SYSTEM */
import LiveMap from "./pages/LiveMap";
import LiveDashboard from "./pages/LiveDashboard";

/* NEW PAGES */
import TeamPage from "./pages/TeamPage";
import AchievementsPage from "./pages/AchievementsPage";
import WorkPage from "./pages/WorkPage";
import "leaflet/dist/leaflet.css";
import IssuesPage from "./pages/IssuesPage";

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

{/* NEW PAGES */}

<Route path="/team" element={<TeamPage />} />
<Route path="/achievements" element={<AchievementsPage />} />
{/* NEW PAGE */}
<Route path="/work" element={<WorkPage />} />

{/* AUTH */}

<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />

{/* ADMIN */}

<Route path="/admin" element={<AdminPage />} />

{/* BOAT LOGIN */}

<Route path="/boat-login" element={<BoatLogin />} />

{/* BOAT DETAILS */}

<Route path="/boat-details" element={<BoatDetails />} />

{/* LIVE STATUS */}

<Route path="/livestatus" element={<LiveMap />} />
<Route path="/live-dashboard" element={<LiveDashboard />} />
<Route path="/issues" element={<IssuesPage />} />

</Routes>

</BrowserRouter>

);

}

export default App;