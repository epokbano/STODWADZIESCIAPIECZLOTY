import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./Header";
import Characters from "./Characters";
import Home from "./Home";
import DatingSim from "./DatingSim";


const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> 
      </main>
    </>
  );
};






const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/datingsim" element ={<DatingSim/>} />
       
        
      </Route>
    </Routes>
  );
};

export default App;