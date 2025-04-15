import Homepage from "./Pages/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/Navbar";
import MenuPage from "./Pages/Menu";
import OrderPage from "./Pages/Order";
import ContactPage from "./Pages/Contact";
import CartPage from "./Pages/Cart";
import CateringPage from "./Pages/Catering";
import Locationhours from "./Pages/Locationhrs";
import Loginpage from "./Pages/Login";
import Registration from "./Pages/Registration";
import React from "react";
import Footer from "./Pages/Footer";
import Checkout from "./Pages/Checkout";
import Menua from "./Pages/Admin/Menua";
import Cateringa from "./Pages/Admin/Cateringa";
import Ordera from "./Pages/Admin/Ordera";
import Carouselimg from "./Pages/Admin/Carouselimg";
import PrivateRoute from "./PrivateRoutes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/User/home" Component={Homepage} />

          <Route element={<PrivateRoute />}>
            <Route path="/User/DiningMenu" Component={MenuPage} />
            <Route path="/User/CateringMenu" Component={CateringPage} />
            <Route path="/User/orders" Component={OrderPage} />
          </Route>

          <Route path="/User/Locationhours" Component={Locationhours} />
          <Route path="/User/contactus" Component={ContactPage} />

          <Route path="/User/login" Component={Loginpage} />
          <Route path="/User/Registration" Component={Registration} />
          <Route path="/User/cart" Component={CartPage} />
          <Route path="/Checkout" Component={Checkout} />

          <Route path="/Admin/DiningMenu" Component={Menua} />
          <Route path="/Admin/CateringMenu" Component={Cateringa} />
          <Route path="/Admin/UserOrder" Component={Ordera} />
          <Route path="/Admin/Carouselimg" Component={Carouselimg} />
          <Route path="/Admin/Login" Component={Loginpage} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
