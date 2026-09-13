import { useState } from "react";
import { Link } from "react-router-dom";
import ActivityCard from "../components/ActivityCard";
import MoodPicker from "../components/MoodPicker";
import "./Home.css";

// activities and setActivities now come from App.js as props,
// instead of being created here with their own useState.
function Home({ activities, setActivities }) {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [scanStatus, setScanStatus] = useState("");

  function handleCardClick(activity) {
    if (selectedActivity?.id === activity.id) {
      setSelectedActivity(null);
    } else {
      setSelectedActivity(activity);
    }

    incrementActivity(activity.id);
  }

  function incrementActivity(activityId) {
    setActivities((prev) =>
      prev.map((a) => (a.id === activityId ? { ...a, count: a.count + 1 } : a))
    );
  }

  function handleDecrement(activityId) {
    setActivities((prev) =>
      prev.map((a) =>
        a.id === activityId && a.count > 0 ? { ...a, count: a.count - 1 } : a
      )
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

      <button className="scan-btn" onClick={handleScan}>
        📡 Scan NFC Tag
      </button>
      {scanStatus && <p className="tap-hint">{scanStatus}</p>}

      {activities.map((activity) => (
        <div key={activity.id}>
          <ActivityCard
            icon={activity.icon}
            name={activity.name}
            count={activity.count}
            onClick={() => handleCardClick(activity)}
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