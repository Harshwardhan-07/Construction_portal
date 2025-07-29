import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OnSiteForm from './components/OnSiteForm';
import DepartmentSelection from './components/DepartmentSelection';
import OnSiteViewEdit from './components/OnSiteViewEdit';
import WarehouseViewEdit from './components/WarehouseViewEdit';
import QualityCheckViewEdit from './components/QualityCheckViewEdit';
import LogisticsViewEdit from './components/LogisticsViewEdit';
import FinanceViewEdit from './components/FinanceViewEdit';

function App() {
  return (
    <Router>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="min-h-screen bg-gray-100 py-8">
        <Routes>
          <Route path="/" element={<OnSiteForm />} />
          <Route path="/delivery/:qrCodeId" element={<DepartmentSelection />} />
          <Route path="/delivery/:qrCodeId/onsite" element={<OnSiteViewEdit />} />
          <Route path="/delivery/:qrCodeId/warehouse" element={<WarehouseViewEdit />} />
          <Route path="/delivery/:qrCodeId/quality" element={<QualityCheckViewEdit />} />
          <Route path="/delivery/:qrCodeId/logistics" element={<LogisticsViewEdit />} />
          <Route path="/delivery/:qrCodeId/finance" element={<FinanceViewEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;