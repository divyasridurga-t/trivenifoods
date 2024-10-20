import { useState } from "react";
import Layout from "./Layout";
import { useParams } from "react-router-dom";
import { useCartContext } from "../hooks/useCartContext.jsx";
import x from "../Utils/detailPageItems";

const RecipeDetailPage = () => {
  let { recipe = "", id = "" } = useParams();
  let [inputValue, setInputValue] = useState("");
  let { setCartData } = useCartContext();

  let data_ = x[id];
  let price = data_.price;

  let [more, setMore] = useState(false);
  let [data, setData] = useState({
    recipe_name: recipe,
    quantity: "",
    customizations: "",
  });
  const [validation, setValidation] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setInputValue(value);

    // Check if a valid quantity is selected and hide the validation message
    if (name === "quantity" && value !== "" && value !== "Choose quantity") {
      setValidation(false); // Hide the validation message if valid quantity is selected
    }

    // If "more" is selected, show the input field for custom quantity
    if (value === "more") {
      setMore(true);
    } else {
      setMore(false); // Close the custom quantity field if it's not "more"
    }

    // Update the data state
    setData({
      ...data,
      [name]: value,
    });
  }

  function placeOrder() {
    let message = `Product : ${data.recipe_name
      .toUpperCase()
      .replaceAll("-", " ")}\nQuantity : ${
      data.quantity
    } Kg\nCustomizations : ${data.customizations}`;
    let encoded_msg = encodeURIComponent(message);
    let phoneNumber = "918985755632";
    let url = `https://wa.me/${phoneNumber}?text=${encoded_msg}`;
    window.open(url, "_blank");
  }

  function handleAddCartClick(data) {
    setCartData((prev) => {
      let latestCart = [...prev, data];
      localStorage.setItem("cart", JSON.stringify(latestCart));
      return latestCart;
    });
    if (!data.quantity || data.quantity === "Choose quantity") {
      setValidation(true);
    } else {
      setValidation(false);
    }
  }

  return (
    <>
      <Layout>
        <div className="recipe_detail_container">
          <div className="recipe_detail_bg"></div>
          <div className="detail_box">
            <div className="detail_img">
              <img className="recipe_img" src={data_.image} />
              <p className="recipe_title">{`${data_.title} / ${data_.telugu_title}`}</p>
              <p className="recipe_price">{price[inputValue]}</p>
            </div>

            <div className="form_">
              <div>
                <select onChange={handleChange} name={"quantity"} required>
                  <option>Choose quantity</option>
                  <option value={"quater"}>1/4 kg</option>
                  <option value={"half"}>1/2 kg</option>
                  <option value={"1"}>1 kg</option>
                  <option value={"2"}>2 kg</option>
                  <option value={"3"}>3 kg</option>
                  <option value={"more"}>more...</option>
                </select>
                {validation && (
                  <p className="recipe_quantity_validation">
                    please select quantity
                  </p>
                )}
                {more && (
                  <input
                    onChange={handleChange}
                    className="type_text"
                    type="number"
                    min="4"
                    step="1"
                    name="quantity"
                    placeholder="enter the quantity"
                  />
                )}
              </div>
              <div>
                <input
                  onChange={handleChange}
                  placeholder="customizations if any"
                  className="type_text"
                  type="text"
                  name="customizations"
                />
              </div>
              <div className="detail_button">
                <button
                  onClick={() => handleAddCartClick(data)}
                  className="add_to_cart"
                >
                  Add to cart
                </button>
                <button onClick={placeOrder} className="place_order">
                  Place Order
                </button>
              </div>
              <div>
                <b>Note : </b> Your order will be redirected to whatsapp as a
                message.
                <br />
                Incase you would like to cancel any of your order do a{" "}
                <b>delete for everyone</b>.
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default RecipeDetailPage;
