
import '../assets/styles/App.css';
import Layout from '../components/Layout/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "../features/dashboard/components/Dashboard";
import Devices from "../features/devices/components/Devices";
import Incidents from "../features/incidents/components/Incidents";

function App() {

  return (
      <Router>
      <Layout >
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/incidents" element={<Incidents />} />
      </Routes>
      </Layout>
    </Router>
  )
}

export default App;
