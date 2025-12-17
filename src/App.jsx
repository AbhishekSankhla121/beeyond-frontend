import LoginCards from "./components/LoginCards";
import LoginPage from "./components/LoginPage"
import RegisterPage from "./components/RegisterPage"
import AdminPage from "./components/AdminPage"
import HomePage from "./components/HomePage"
import Cart from "./components/Cart"
import {BrowserRouter,Route,Routes} from "react-router-dom"
import CustomerDashboard from "./components/CustomerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import DeliveryDashboard from "./components/DeliveryDashboard";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginCards/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/admin" element={<AdminPage/>}/>
      <Route path="/Home" element={<HomePage/>}/>
      <Route path="/Cart" element={<Cart/>}/> 
      <Route path="/customer/dashboard" element={<CustomerDashboard/>}/>
       <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
       <Route path="/delivery/dashboard" element={<DeliveryDashboard/>}/>
    </Routes>

    </BrowserRouter>
  );
}


export default App;
