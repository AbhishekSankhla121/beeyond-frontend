import LoginCards from "./componets/LoginCards";
import LoginPage from "./componets/LoginPage"
import RegisterPage from "./componets/RegisterPage"
import AdminPage from "./componets/AdminPage"
import HomePage from "./componets/HomePage"
import Cart from "./componets/Cart"
import {BrowserRouter,Route,Routes} from "react-router-dom"
function App() {
  return (
    // <div className="App">
    //   {/* <LoginCards /> */}
    // </div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginCards/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/admin" element={<AdminPage/>}/>
      <Route path="/Home" element={<HomePage/>}/>
      <Route path="/Cart" element={<Cart/>}/>
    </Routes>

    </BrowserRouter>
  );
}


export default App;
