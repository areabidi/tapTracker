import { useState } from "react";
import "./AddActivity.css";

function AddActivity() {
  const [tagDetected, setTagDetected] = useState(false);

  function handleScan() {
    setTagDetected(true);
  }

  return (
    <div className="add-activity">
      <h1>Add Routine Activity</h1>
      <p>Connect an NFC tag to something you want to track.</p>

      <button className="scan-btn" onClick={handleScan}>
        📡 Scan Tag
      </button>

      {tagDetected && <p className="tag-status">✓ Tag detected</p>}
    </div>
  );
}

export default AddActivity;
