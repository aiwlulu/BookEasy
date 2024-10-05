import React from "react";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Announcement from "./components/Announcement";
import Feature from "./components/Feature/Feature";
import Footer from "./components/Footer";

const page = () => {
  return (
    <>
      <NavBar />
      <Header />
      <Announcement type={"Upper half"} />
      <Feature />
      <Announcement type={"Lower half"} />
      <Footer />
    </>
  );
};

export default page;
