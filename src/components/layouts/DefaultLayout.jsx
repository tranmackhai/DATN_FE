import React from "react";
import Topbar from "../common/Topbar";
import Footer from "../common/Footer";

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Topbar />
      {children}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
