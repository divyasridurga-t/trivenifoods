import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import { Provider } from "react-redux";
import shopStore from "./redux/shopStore";
import RecipeDetailPage from "./Components/RecipeDetailPage";
import CartPage from "./Components/cartPage";

function App() {
  return (
    <>
      <Provider store={shopStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:recipe/:id" element={<RecipeDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
