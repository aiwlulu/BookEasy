import React, { Suspense } from "react";
import NavBar from "../components/NavBar";
import HotelList from "../components/HotelList";
import Footer from "../components/Footer";

const page = () => {
  return (
    <>
      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>
        <HotelList />
      </Suspense>
      <Footer />
    </>
  );
};

export default page;
