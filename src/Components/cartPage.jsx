import Layout from "./Layout";
import { useCartContext } from "../hooks/useCartContext";
import { useEffect, useState } from "react";

const CartPage = () => {
  let { cartData, setCartData } = useCartContext();
  let [price, setPrice] = useState(0);

  useEffect(() => {
    let totalPrice = cartData.reduce((acc, item) => {
      let itemPrice = +item.price.replace("₹", "");
      return acc + itemPrice;
    }, 0);

    setPrice(totalPrice);
  }, [cartData]);

  function placeOrderClick() {
    let data = cartData.map((item) => {
      let name = item.recipe_name.toUpperCase().replace("-", " ");
      let quantity =
        item.quantity == "half"
          ? "1/2"
          : item.quantity == "quater"
          ? "1/4"
          : item.quantity;
      return `Product : ${name}\nQuantity : ${quantity} Kg \nPrice: ${
        item.price
      } \nCustomizations : ${
        item.customizations ? item.customizations : "No customizations"
      } \n`;
    });

    data = data.join("\n\n");

    let sdata = `${data}\n 𝐓𝐎𝐓𝐀𝐋 𝐏𝐑𝐈𝐂𝐄 : ₹${price}`;

    let wData = sdata;
    let encoded_msg = encodeURIComponent(wData);
    let phoneNumber = "918985755632";
    let url = `https://wa.me/${phoneNumber}?text=${encoded_msg}`;
    window.open(url, "_blank");
    setCartData([]);
  }

  function handleRemoveItem(name) {
    let filteredData = cartData.filter((key) => {
      if (key.id != name) {
        return key;
      }
    });
    setCartData(filteredData);
  }

  function clearCartClick() {
    setCartData([]);
  }

  return (
    <>
      <Layout>
        <div className="cart_page">
          {cartData.length ? (
            cartData.map((item, index) => {
              let quantity =
                item.quantity == "half"
                  ? "1/2"
                  : item.quantity == "quater"
                  ? "1/4"
                  : item.quantity;
              return (
                <>
                  <div className="cart_card">
                    <div className="cart_cart_img">
                      <img width={150} height={120} src={item.image} />
                    </div>
                    <div className="cart_image_desc">
                      <h2>
                        {item.recipe_name.toUpperCase().replace("-", " ")}
                      </h2>
                      <h2>
                        {quantity} Kg - {item.price}
                      </h2>
                      <h2>{item.customizations}</h2>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
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
              <div className="empty_cart_image">
                <img
                  width={300}
                  height={350}
                  src="https://i.ibb.co/dpLX3C9/stock-vector-illustration-of-woman-toy-1040374858-removebg-preview-1-1.png"
                />
              </div>
              <div>
                <h1>Your cart is empty !!</h1>
              </div>
            </div>
          )}
          {cartData.length ? (
            <>
              <h3 style={{ textAlign: "center" }}>Total price : ₹{price}</h3>
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
              <div className="note">
                <b>Note : </b> Your order will be redirected to whatsapp as a
                message. Incase you would like to cancel any of your order do a{" "}
                <b>delete for everyone</b>.
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </Layout>
    </>
  );
};

export default CartPage;
