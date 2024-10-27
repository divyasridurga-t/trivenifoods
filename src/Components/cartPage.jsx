import Layout from "./Layout";
import { useCartContext } from "../hooks/useCartContext";

const CartPage = () => {
  let { cartData, setCartData } = useCartContext();

  function placeOrderClick() {
    let data = cartData.map((item) => {
      let name = item.recipe_name.toUpperCase().replace("-", " ");
      let quantity =
        item.quantity == "half"
          ? "1/2"
          : item.quantity == "quater"
          ? "1/4"
          : item.quantity;
      return `Product : ${name}\n Quantity : ${quantity} Kg \n Price: ${item.price} \n Customizations : ${item.customizations}`;
    });

    let wData = data.join("\n\n\n");
    let encoded_msg = encodeURIComponent(wData);
    let phoneNumber = "918985755632";
    let url = `https://wa.me/${phoneNumber}?text=${encoded_msg}`;
    window.open(url, "_blank");
    setCartData([]);
  }

  function handleRemoveItem(name) {
    let filteredData = cartData.filter((key) => {
      if (key.recipe_name != name) {
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
                      <h2>{quantity} Kg - {item.price}</h2>
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
