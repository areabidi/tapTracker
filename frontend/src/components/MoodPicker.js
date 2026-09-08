import { useState } from "react";
import "./MoodPicker.css";

const moods = [
  { value: 1, emoji: "😄", label: "Great" },
  { value: 2, emoji: "😊", label: "Good" },
  { value: 3, emoji: "🙂", label: "Okay" },
  { value: 4, emoji: "😐", label: "Neutral" },
  { value: 5, emoji: "😕", label: "Low" },
  { value: 6, emoji: "😞", label: "Bad" },
  { value: 7, emoji: "😢", label: "Very Bad" },
];

function MoodPicker() {
  const [selectedMood, setSelectedMood] = useState(null);

  return (
    <div className="mood-picker">
      {moods.map((mood) => (
        <button
          key={mood.value}
          className={selectedMood === mood.value ? "mood-option selected" : "mood-option"}
          onClick={() => setSelectedMood(mood.value)}
        >
          <span className="mood-emoji">{mood.emoji}</span>
          <span className="mood-label">{mood.label}</span>
        </button>
      ))}
    </div>
  );
}

export default MoodPicker;