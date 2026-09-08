import { useState } from "react";

function NfcTest() {
  const [status, setStatus] = useState("Idle");
  const [tagId, setTagId] = useState(null);

  async function handleScan() {
    if (!("NDEFReader" in window)) {
      setStatus("Web NFC not supported on this browser/device");
      return;
    }

    try {
      const reader = new window.NDEFReader();
      await reader.scan();
      setStatus("Scanning... tap a tag");

      reader.onreading = (event) => {
        setTagId(event.serialNumber);
        setStatus("Tag detected!");
      };

      reader.onreadingerror = () => {
        setStatus("Error reading tag");
      };
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>NFC Test</h1>
      <button onClick={handleScan}>Start Scan</button>
      <p>Status: {status}</p>
      {tagId && <p>Tag ID: {tagId}</p>}
    </div>
  );
}

export default NfcTest;