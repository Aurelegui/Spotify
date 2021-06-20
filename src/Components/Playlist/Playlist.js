import React from "react";
import "./Playlist.css";
import TrackList from "../TrackList/TrackList";

export default function Playlist({
  onNameChange,
  playlistTracks,
  onRemove,
  onSave,
}) {
  const handleNameChange = (event) => {
    onNameChange(event.target.value);
  };

  return (
    <div className="Playlist">
      <input defaultValue="New Playlist" onChange={handleNameChange} />
      <TrackList tracks={playlistTracks} onRemove={onRemove} isRemoval />
      <button type="button" className="Playlist-save" onClick={onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
}
