import Header from "./Header";
import Footer from "./Footer";
import Caption from "./Caption";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  let cartData = useSelector((store) => store.cart.item);
  // console.log(cartData);

  return (
    <>
      <div className="container">
        <Header />
        <Caption />
        {children}
        <div className="cart_btn">
          <Link to={'/cart'}>
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
        <Footer />
      </div>
    </>
  );
};

export default Layout;
