import Header from "./Header";
import Footer from "./Footer";
import Caption from "./Caption";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCartContext } from "../hooks/useCartContext";

const Layout = ({ children }) => {
  let { cartData } = useCartContext();
  return (
    <>
      <div className="container">
        <Header />
        <Caption />
        {children}
        {window.location.href.includes("cart") ? (
          ""
        ) : (
          <div className="cart_btn">
            <Link to={"/cart"}>
              <div className="number_badge">{cartData.length}</div>
              <div>
                <img
                  width={50}
                  height={50}
                  src="https://i.ibb.co/tJmsBPW/shopping-cart.png"
                />
              </div>
            </Link>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default Layout;
