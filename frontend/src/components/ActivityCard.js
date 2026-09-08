import "./ActivityCard.css";

function ActivityCard({ icon, name, count, onClick, onDecrement }) {
  return (
    <div className="activity-card" onClick={onClick}>
      <span className="activity-icon">{icon}</span>
      <div className="activity-text">
        <span className="activity-name">{name}</span>
        <p className="tap-hint">Tap to track</p>
      </div>

      <div className="count-controls">
        <button
          className="decrement-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDecrement();
          }}
        > -
        </button>
        <span className="activity-count">{count}</span>
      </div>
    </div>
  );
}

export default ActivityCard;