import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddActivity from "./pages/AddActivity";
import NfcTest from "./pages/NfcTest";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddActivity />} />
      <Route path="/nfc-test" element={<NfcTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;