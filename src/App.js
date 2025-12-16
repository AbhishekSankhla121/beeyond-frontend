import LoginCards from "./components/LoginCards";
import LoginPage from "./components/LoginPage"
import RegisterPage from "./components/RegisterPage"
import AdminPage from "./components/AdminPage"
import HomePage from "./components/HomePage"
import Cart from "./components/Cart"
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
