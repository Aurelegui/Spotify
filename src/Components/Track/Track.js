import React from "react";
import "./Track.css";

export default function Track({ track, isRemoval, onRemove, onAdd }) {
  const addTrack = () => {
    onAdd(track);
  };

  const removeTrack = () => {
    onRemove(track);
  };

  const renderAction = () => {
    if (isRemoval) {
      return (
        <button type="button" className="Track-action" onClick={removeTrack}>
          -
        </button>
      );
    }
    return (
      <button type="button" className="Track-action" onClick={addTrack}>
        +
      </button>
    );
  };

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{track.name}</h3>
        <p>{track.artist || track.album}</p>
      </div>
      {renderAction()}
    </div>
  );
}
