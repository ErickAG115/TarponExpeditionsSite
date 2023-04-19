import React, { Fragment, useRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Login } from "./components/website/Login";
import { Register } from "./components/website/Register";
import { AboutUs } from "./components/website/AboutUs";
import { Contact } from "./components/website/Contact";
import { ClientMenu } from "./components/client/ClientMenu";
import { AdminMenu } from "./components/admin/AdminMenu";
import { RegisterEmployee } from "./components/admin/RegisterEmployee";
import { CreateTour } from "./components/admin/CreateTour";
import { ModifyTour } from "./components/admin/ModifyTour";


export function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/Register" element={<Register />} />
          <Route exact path="/ClientMenu" element={<ClientMenu />} />
          <Route exact path="/AdminMenu" element={<AdminMenu />} />
          <Route exact path="/RegisterEmployee" element={<RegisterEmployee />} />
          <Route exact path="/AboutUs" element={<AboutUs />} />
          <Route exact path="/Contact" element={<Contact />} />
          <Route exact path="/CreateTour" element={<CreateTour />} />
          <Route exact path="/ModifyTour" element={<ModifyTour />} />
        </Routes>
      </div>
    </Router>
  );
}

//export default App;
