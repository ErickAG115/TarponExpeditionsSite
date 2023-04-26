import React, { Fragment, useRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { MainPage } from "./components/website/MainPage";
import { Login } from "./components/website/Login";
import { Register } from "./components/website/Register";
import { AboutUs } from "./components/website/AboutUs";
import { Contact } from "./components/website/Contact";
import { ClientMenu } from "./components/client/ClientMenu";
import { AdminMenu } from "./components/admin/AdminMenu";
import { RegisterEmployee } from "./components/admin/RegisterEmployee";
import { Tours } from "./components/client/Tours";
import { ReservationDate } from "./components/client/ReservationDate";
import { ReservationCompanions } from "./components/client/ReservationCompanions";
import { ReservationPayment } from "./components/client/ReservationPayment";
import { Card } from "./components/client/card";
import { Checkout } from "./components/client/checkout";
import { Paypal } from "./components/client/paypal";
import { CreateTour } from "./components/admin/CreateTour";
import { ModifyTour } from "./components/admin/ModifyTour";


export function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Register" element={<Register />} />
          <Route exact path="/ClientMenu" element={<ClientMenu />} />
          <Route exact path="/AdminMenu" element={<AdminMenu />} />
          <Route exact path="/RegisterEmployee" element={<RegisterEmployee />} />
          <Route exact path="/Tours" element={<Tours />} />
          <Route exact path="/AboutUs" element={<AboutUs />} />
          <Route exact path="/Contact" element={<Contact />} />
          <Route exact path="/card" element={<Card />} />
          <Route exact path="/paypal" element={<Paypal />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/CreateTour" element={<CreateTour />} />
          <Route exact path="/ModifyTour" element={<ModifyTour />} />
          <Route exact path="/ReservationDate" element={<ReservationDate />} />
          <Route exact path="/ReservationCompanions" element={<ReservationCompanions />} />
          <Route exact path="/ReservationPayment" element={<ReservationPayment />} />
        </Routes>
      </div>
    </Router>
  );
}

//export default App;
