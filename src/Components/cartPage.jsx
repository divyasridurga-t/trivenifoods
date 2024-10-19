import Layout from "./Layout";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, clearCart } from "../redux/cartSlice";

const CartPage = () => {
  let dispatch = useDispatch();
  let cartData = useSelector((store) => store.cart.item);

  function placeOrderClick() {
    let listMsg = `Product : ###\n Quantity : ### \n Customizations : ####`;
    let data = cartData.map((item) => {
      return `Product : ${item.recipe_name}\n Quantity : ${item.quantity} \n Customizations : ${item.customizations}`;
    });

    let wData = data.join("\n\n\n");
    let encoded_msg = encodeURIComponent(wData);
    let phoneNumber = "918985755632";
    let url = `https://wa.me/${phoneNumber}?text=${encoded_msg}`;
    window.open(url, "_blank");
  }

  function handleRemoveItem(item) {
    dispatch(removeItem(item));
  }

  function clearCartClick() {
    dispatch(clearCart());
  }

  return (
    <>
      <Layout>
        <div className="cart_page">
          {cartData.length ? (
            cartData.map((item, index) => {
              return (
                <>
                  <div className="cart_card">
                    <div className="cart_cart_img">
                      <img
                        width={150}
                        height={120}
                        src="https://www.myspicykitchen.net/wp-content/uploads/2019/10/Sunnundalu.jpg"
                      />
                    </div>
                    <div>
                      <h2>
                        {item.recipe_name.toUpperCase().replace("-", " ")}
                      </h2>
                      <h2>{item.quantity}</h2>
                      <h2>{item.customizations}</h2>
                      <button
                        onClick={() => handleRemoveItem(item.recipe_name)}
                        className="delete_btn"
                      >
                        Remove item
                      </button>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <div className="empty_cart">
              <img
                width={300}
                height={350}
                src="https://i.ibb.co/dpLX3C9/stock-vector-illustration-of-woman-toy-1040374858-removebg-preview-1-1.png"
              />
              <div>
                <h1>Your cart is empty !!</h1>
              </div>
            </div>
          )}
          {cartData.length ? (
            <div className="cart_place_order_btn">
              <div>
                <button onClick={placeOrderClick} className="place_order_btn">
                  Place Order
                </button>
                <button onClick={clearCartClick} className="clear_cart_btn">
                  Clear cart
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </Layout>
    </>
  );
};

export default CartPage;
