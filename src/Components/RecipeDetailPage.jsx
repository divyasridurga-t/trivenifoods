import { useState } from "react";
import Layout from "./Layout";
import { useParams } from "react-router-dom";
import { useCartContext } from "../hooks/useCartContext.jsx";
import x from "../Utils/detailPageItems";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecipeDetailPage = () => {
  let unique_id = uuidv4();
  let { recipe = "", id = "" } = useParams();
  let [inputValue, setInputValue] = useState("");
  let { setCartData } = useCartContext();

  let data_ = x[id];
  let price = data_.price;
  let quantity = data_.quantity;

  let [more, setMore] = useState(false);
  let [data, setData] = useState({
    recipe_name: recipe,
    quantity: "",
    customizations: "",
    image: "",
    price: "",
    id: "",
  });
  const [validation, setValidation] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputValue(value);
    if (name === "quantity" && value !== "" && value !== "Choose quantity") {
      setValidation(false);
    }
    if (value === "more") {
      setMore(true);
    } else {
      setMore(false);
    }

    // Update the data state
    setData({
      ...data,
      [name]: value,
      image: data_.image,
      price: data_.price[value],
      id: unique_id,
    });
  }

  function placeOrder() {
    let message = `Product : ${data.recipe_name
      .toUpperCase()
      .replaceAll("-", " ")}\nQuantity : ${quantity[inputValue]} \nPrice : ${
      data.price
    } \nCustomizations : ${
      data.customizations ? data.customizations : "No customizations"
    }`;
    let encoded_msg = encodeURIComponent(message);
    let phoneNumber = "918247269134";
    let url = `https://wa.me/${phoneNumber}?text=${encoded_msg}`;
    window.open(url, "_blank");
  }

  function handleAddCartClick(data) {
    !data.quantity ||
      setCartData((prev) => {
        let latestCart = [...prev, { ...data, quantity: quantity[inputValue] }];
        localStorage.setItem("cart", JSON.stringify(latestCart));
        toast("item added to the cart", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          type: "success",
        });
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
                  {Object.entries(quantity).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
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
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default RecipeDetailPage;
