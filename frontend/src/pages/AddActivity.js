import { useState } from "react";
import "./AddActivity.css";

// Fixed set of icons the user can pick from.
// Kept outside the component so it isn't recreated on every render.
const iconOptions = ["🚶", "💧", "📚", "🧘", "🙂", "🕌"];

function AddActivity() {
  // Separate state per field — each one changes independently
  // (typing a name doesn't affect the icon, etc.)
  const [tagId, setTagId] = useState(null);       // real NFC serial number once scanned
  const [scanStatus, setScanStatus] = useState(""); // feedback text shown to the user
  const [name, setName] = useState("");             // controlled text input value
  const [icon, setIcon] = useState(iconOptions[0]); // defaults to the first icon
  const [type, setType] = useState("boolean");       // defaults to the simplest tracking type
  const [savedActivity, setSavedActivity] = useState(null);

  async function handleScan() {
    // Feature detection: not every browser/device supports Web NFC.
    // Checking this first avoids a crash on unsupported devices.
    if (!("NDEFReader" in window)) {
      setScanStatus("Web NFC not supported");
      return;
    }

    try {
      const reader = new window.NDEFReader();
      await reader.scan(); // triggers the browser's NFC permission prompt

      setScanStatus("Scanning... tap a tag");

      // This fires every time a tag is tapped while scanning is active.
      // We treat every scan as a fresh tag — no "already used" checking here,
      // that logic belongs later, when we actually save the activity.
      reader.onreading = (event) => {
        setTagId(event.serialNumber);
        setScanStatus("✓ Tag detected");
      };
    } catch (error) {
      // Covers things like the user denying the permission prompt.
      setScanStatus(`Error: ${error.message}`);
    }
  }

  function handleSave() {
    // Placeholder for now — later this will send the new activity
    // up to App.js so it can be added to the shared activities list.
  const newActivity = { name, icon, type, tagId };
  setSavedActivity(newActivity);
  console.log(newActivity); // still useful to keep, doesn't hurt
}
  return (
    <div className="add-activity">
      <h1>Add Routine Activity</h1>
      <p>Connect an NFC tag to something you want to track.</p>

      <button className="scan-btn" onClick={handleScan}>📡 Scan Tag</button>
      {scanStatus && <p className="tag-status">{scanStatus}</p>}

      <label>Activity name</label>
      {/* Controlled input: React state is the source of truth for the text,
          not the browser's own input handling. */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Walk"
      />

      <label>Choose an icon</label>
      <div className="icon-picker">
        {iconOptions.map((option) => (
          <button
            key={option}
            // Conditional class: highlight whichever icon is currently selected
            className={icon === option ? "icon-option selected" : "icon-option"}
            onClick={() => setIcon(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <label>How should this be tracked?</label>
      <div className="type-picker">
        {["boolean", "number", "mood", "multiple choice"].map((option) => (
          <label key={option} className="type-option">
            {/* checked={type === option} makes this a controlled radio group —
                only one can be true at a time, driven by our own state */}
            <input
              type="radio"
              name="type"
              value={option}
              checked={type === option}
              onChange={(e) => setType(e.target.value)}
            />
            {option}
          </label>

        ))}
      </div>
       
      <button className="save-btn" onClick={handleSave}>Save Activity</button>
     {savedActivity && (
  <div className="saved-preview">
    <h3>Saved (preview only):</h3>
    <p>Name: {savedActivity.name}</p>
    <p>Icon: {savedActivity.icon}</p>
    <p>Type: {savedActivity.type}</p>
    <p>Tag ID: {savedActivity.tagId}</p>
  </div>
)}
    </div>
  );
}

export default AddActivity;