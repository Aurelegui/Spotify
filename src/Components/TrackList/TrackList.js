import React from "react";
import "./TrackList.css";
import Track from "../Track/Track";

export default function TrackList({ tracks, onAdd, isRemoval, onRemove }) {
  console.log(tracks);
  const trackList = tracks.map((track) => {
    return (
      <Track
        track={track}
        key={track.id}
        onAdd={onAdd}
        onRemove={onRemove}
        isRemoval={isRemoval}
      />
    );
  });

  return <div className="TrackList">{trackList}</div>;
}
