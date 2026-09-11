import { useState } from "react";
import { Link } from "react-router-dom";
import ActivityCard from "../components/ActivityCard";
import MoodPicker from "../components/MoodPicker";
import "./Home.css";

const initialActivities = [
  { id: 1, name: "Walk", icon: "🚶", type: "boolean", count: 0, nfcTagId: "04:ea:e5:31:dc:2a:81" },
  { id: 2, name: "Water", icon: "💧", type: "number", count: 0, nfcTagId: null },
  { id: 3, name: "Mood", icon: "🙂", type: "mood", count: 0, nfcTagId: null },
];

function Home() {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activities, setActivities] = useState(initialActivities);
  const [scanStatus, setScanStatus] = useState("");

  function incrementActivity(activityId) {
    setActivities((prev) =>
      prev.map((a) => (a.id === activityId ? { ...a, count: a.count + 1 } : a))
    );
  }

  function handleDecrement(activityId) {
    setActivities((prev) =>
      prev.map((a) => (a.id === activityId && a.count > 0 ? { ...a, count: a.count - 1 } : a))
    );
  }

  async function handleScan() {
    if (!("NDEFReader" in window)) {
      setScanStatus("Web NFC not supported");
      return;
    }

    try {
      const reader = new window.NDEFReader();
      await reader.scan();
      setScanStatus("Scanning... tap a tag");

      reader.onreading = (event) => {
        const scannedId = event.serialNumber;
        const match = activities.find((a) => a.nfcTagId === scannedId);

        if (match) {
          incrementActivity(match.id);
          setScanStatus(`Tracked: ${match.name}`);
        } else {
          setScanStatus(`Unknown tag: ${scannedId}`);
        }
      };
    } catch (error) {
      setScanStatus(`Error: ${error.message}`);
    }
  }

  return (
    <div className="home">
      <h1>Good afternoon 👋</h1>
      <h2>Your routines</h2>

      {scanStatus && <p className="tap-hint">{scanStatus}</p>}

      {activities.map((activity) => (
        <div key={activity.id}>
          <ActivityCard
            icon={activity.icon}
            name={activity.name}
            count={activity.count}
            onClick={() => setSelectedActivity(activity)}
            onDecrement={() => handleDecrement(activity.id)}
          />
          {selectedActivity?.id === activity.id && activity.type === "mood" && (
            <MoodPicker />
          )}
        </div>
      ))}

      <Link to="/add" className="add-link">+ Add Activity</Link>
    </div>
  );
}

export default Home;