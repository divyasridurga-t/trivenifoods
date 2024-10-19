import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/trivenifoods" element={<h2>HomePage</h2>} />
          <Route path="/trivenifoods/id" element={<h2>Hellooo</h2>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
