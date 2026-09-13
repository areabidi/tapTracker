import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddActivity from "./pages/AddActivity";
import NfcTest from "./pages/NfcTest";

const initialActivities = [
  { id: 1, name: "Walk", icon: "🚶", type: "boolean", count: 0, nfcTagId: "04:ea:e5:31:dc:2a:81" },
  { id: 2, name: "Water", icon: "💧", type: "number", count: 0, nfcTagId: null },
  { id: 3, name: "Mood", icon: "🙂", type: "mood", count: 0, nfcTagId: null },
];

function App() {
  const [activities, setActivities] = useState(initialActivities);

  function addActivity(newActivity) {
    setActivities((prev) => [
      ...prev,
      { ...newActivity, id: Date.now(), count: 0 },
    ]);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home activities={activities} setActivities={setActivities} />} />
        <Route path="/add" element={<AddActivity onAddActivity={addActivity} />} />
        <Route path="/nfc-test" element={<NfcTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;