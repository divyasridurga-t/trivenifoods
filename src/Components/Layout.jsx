import Header from "./Header";
import Footer from "./Footer";
import Caption from "./Caption";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";

const Layout = ({ children }) => {
  let cartData = useSelector((store) => store.cart.item);

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
                  className="cart_btn_image"
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
