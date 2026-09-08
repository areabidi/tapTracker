import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddActivity from "./pages/AddActivity";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddActivity />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;