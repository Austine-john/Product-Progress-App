// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import Navbar from "./Components/Navbar";
import Dashboard from "./Pages/Dashboard";
import ProductList from "./Pages/ProductList";
import ProductDetails from "./Pages/ProductDetails";
import NewRequest from "./Pages/NewRequest";
import Reports from "./Pages/Reports";

export default function App() {
  return (
    <DataProvider>
      <Router>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/new-request" element={<NewRequest />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
}
