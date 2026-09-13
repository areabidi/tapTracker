import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddActivity.css";

const iconOptions = ["🚶", "💧", "📚", "🧘", "🙂", "🕌"];

function AddActivity({ onAddActivity }) {
  const [tagId, setTagId] = useState(null);
  const [scanStatus, setScanStatus] = useState("");
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(iconOptions[0]);

  const navigate = useNavigate();

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
        setTagId(event.serialNumber);
        setScanStatus("✓ Tag detected");
      };
    } catch (error) {
      setScanStatus(`Error: ${error.message}`);
    }
  }

  function handleSave() {
    const newActivity = { name, icon, nfcTagId: tagId };
    onAddActivity(newActivity);
    navigate("/");
  }

  return (
    <div className="add-activity">
      <h1>Add Routine Activity</h1>
      <p>Connect an NFC tag to something you want to track.</p>

      <button className="scan-btn" onClick={handleScan}>📡 Scan Tag</button>
      {scanStatus && <p className="tag-status">{scanStatus}</p>}

      <label>Activity name</label>
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
            className={icon === option ? "icon-option selected" : "icon-option"}
            onClick={() => setIcon(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <button className="save-btn" onClick={handleSave}>Save Activity</button>
    </div>
  );
}

export default AddActivity;