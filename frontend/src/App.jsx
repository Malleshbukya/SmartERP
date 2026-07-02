import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Company from "./pages/Company";
import Ledger from "./pages/Ledger";
import Stock from "./pages/Stock";
import Purchase from "./pages/Purchase";
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Masters */}
        <Route path="/company" element={<Company />} />
        <Route path="/ledger" element={<Ledger />} />
        <Route path="/stock" element={<Stock />} />

        {/* Transactions */}
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/sales" element={<Sales />} />

        {/* Reports */}
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;