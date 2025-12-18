import LoginCards from "./components/LoginCards";
import LoginPage from "./components/LoginPage"
import RegisterPage from "./components/RegisterPage"
import {BrowserRouter,Route,Routes} from "react-router-dom"
import AdminDashboard from "./components/AdminDashboard";
import DeliveryDashboard from "./components/DeliveryDashboard";
import RoleRoute from "./components/RoleRoute";
import Unauthorized from "./components/Unauthorized";
import Navbar from "./components/Navbar";
import DeliveryOrders from "./components/DeliveryOrders";
import Profile from "./components/Profile";
import CustomerOrder from "./components/CustomerDashboard";
import AdminDeliveryPartners from "./components/AdminDeliverypartners";
import AdminCreateProduct from "./components/AdminCreateProduct";
import CustomerProductList from "./components/ProductList";
import AdminOrder from "./components/AdminOrder";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<LoginCards/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/customer/order" element={<RoleRoute allowedRoles={["CUSTOMER"]}>
                <CustomerOrder/>
              </RoleRoute>}/>
       <Route path="/admin/dashboard" element={ <RoleRoute allowedRoles={["ADMIN"]}>
                <AdminDashboard />
              </RoleRoute>}/>
       <Route path="/delivery/dashboard" element={ <RoleRoute allowedRoles={["DELIVERY"]}>
                <DeliveryDashboard />
              </RoleRoute>}/>
        <Route path="/delivery/orders" element={ <RoleRoute allowedRoles={["DELIVERY"]}>
                <DeliveryOrders />
              </RoleRoute>}/>
        <Route path="/admin/partners" element={ <RoleRoute allowedRoles={["ADMIN"]}>
                <AdminDeliveryPartners />
              </RoleRoute>}/>
        <Route path="/admin/create/product" element={ <RoleRoute allowedRoles={["ADMIN"]}>
                <AdminCreateProduct />
              </RoleRoute>}/>

        <Route path="/admin/orders" element={<RoleRoute allowedRoles={['ADMIN']}> <AdminOrder/>  </RoleRoute>}/>
        <Route path="/unauthorized" element={<Unauthorized/>}/>
         <Route path="/profile" element={<Profile/>}/>
         <Route path="/customer/dashboard" element={<RoleRoute allowedRoles={["CUSTOMER"]}><CustomerProductList/></RoleRoute>}/>
    </Routes>

    </BrowserRouter>
  );
}


export default App;
