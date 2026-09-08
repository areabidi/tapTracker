import { useState } from "react";
import { Link } from "react-router-dom";
import ActivityCard from "../components/ActivityCard";
import MoodPicker from "../components/MoodPicker";
import "./Home.css";

const initialActivities = [
  { id: 1, name: "Walk", icon: "🚶", type: "boolean", count: 0 },
  { id: 2, name: "Water", icon: "💧", type: "number", count: 0 },
  { id: 3, name: "Mood", icon: "🙂", type: "mood", count: 0 },
];

function Home() {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activities, setActivities] = useState(initialActivities);

  function handleCardClick(activity) {
    if (selectedActivity?.id === activity.id) {
      setSelectedActivity(null);
    } else {
      setSelectedActivity(activity);
    }

    setActivities((prevActivities) =>
      prevActivities.map((a) =>
        a.id === activity.id ? { ...a, count: a.count + 1 } : a
      )
    );
  }

  function handleDecrement(activityId) {
  setActivities((prevActivities) =>
    prevActivities.map((a) =>
      a.id === activityId && a.count > 0 ? { ...a, count: a.count - 1 } : a
    )
  );
}

  return (
    <div className="home">
      <h1>Good afternoon 👋</h1>
      <h2>Your routines</h2>

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