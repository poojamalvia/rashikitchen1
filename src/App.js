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
import Ordera from "./Pages/Admin/Ordera";
import Cateringa from "./Pages/Admin/Cateringa";
import Carouselimg from "./Pages/Admin/Carouselimg";

function App() {
  const [checkuser, setCheckuser] = React.useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar checkuser={checkuser} />
        <Routes>
          <Route path="/home" Component={Homepage} />
          <Route path="/menu" Component={MenuPage} />
          <Route path="/orders" Component={OrderPage} />
          <Route path="/contactus" Component={ContactPage} />
          <Route path="/catering" Component={CateringPage} />
          <Route path="/cart" Component={CartPage} />
          <Route path="/Locationhours" Component={Locationhours} />
          <Route path="/login" Component={Loginpage} />
          <Route path="/Registration" Component={Registration} />
          <Route path="/Checkout" Component={Checkout} />
          <Route path="/Admin/Menua" Component={Menua} />
          <Route path="/Admin/Cateringa" Component={Menua} />
          <Route path="/Admin/Ordera" Component={Ordera} />
          <Route path="/Admin/Carouselimg" Component={Carouselimg} />
          <Route path="/Admin/Login" Component={Loginpage} />

          
        </Routes>
        {checkuser ? <Footer /> : ""}
      </BrowserRouter>
      {/* <Menua/>  */}
      {/* <Ordera/>  */}
      {/* <Cateringa />  */}
    </div>
  );
}

export default App;
