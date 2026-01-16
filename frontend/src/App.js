import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CityCheck from "./pages/CityCheck";
import Services from "./pages/Services";
import CreateOrder from "./pages/CreateOrder";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/city" element={<CityCheck />} />
        <Route path="/services" element={<Services />} />
        <Route path="/order" element={<CreateOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
