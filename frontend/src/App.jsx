// TP Ndou 37853058
// TD Maela 40104648
// TB Thoka 38126400
// B Singama 41724690
// DP Maseko 29382378
// JA Mokoena 41719638
// A Makwakwa 35987782
// KM Radingwana 42638046
//import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Nav from "./components/Navbar/Nav";
import SearchResults from "./pages/Search/SearchResults";
import Help from "./pages/Help/Help";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import Login from "./components/Login/Login";
import Verify from "./pages/Verify/Verify";
import TrackOrders from "./pages/TrackOrders/TrackOrders";

const App = () => {

  const [showLogin,setShowLogin] = useState(false);

  return (
    <>
    {showLogin?<Login setShowLogin={setShowLogin}/>:<></>}
    <div className="app">
      <Nav setShowLogin={setShowLogin}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/verify" element={<Verify/>} />
        <Route path="/trackorders" element={<TrackOrders/>}/>
        <Route path="/search" element={<SearchResults/>} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App;
