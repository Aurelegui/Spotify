import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

import Spotify from "../../util/Spotify";

import "./App.css";

export default function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState({
    playlistName: "My playlistName",
    playlistTracks: [],
  });

  const addTrack = (track) => {
    if (
      playlist.playlistTracks.find((savedTrack) => savedTrack.id === track.id)
    ) {
      return;
    }
    setPlaylist({
      ...playlist,
      playlistTracks: [...playlist.playlistTracks, track],
    });
  };

  const removeTrack = (track) => {
    const tracks = playlist.playlistTracks.filter(
      (currentTrack) => currentTrack.id !== track.id
    );

    setPlaylist({ ...playlist, playlistTracks: tracks });
  };

  const updatePlaylistName = (name) => {
    setPlaylist({ ...playlist, playlistName: name });
  };

  const search = async (term) => {
    await Spotify.search(term).then((fetchSearchResults) => {
      // updates state from Sporify.search() promise
      setSearchResults(fetchSearchResults);
    });
  };

  const savePlaylist = () => {
    const trackUris = playlist.playlistTracks.map((track) => track.uri);
    console.log(trackUris);

    Spotify.savePlaylist(playlist.playlistName, trackUris).then(() => {
      setPlaylist({ ...playlist, playlistName: "New Playlist" });
    });
  };

  return (
    <div>
      <h1>
        Ja
        <span className="highlight">mmm</span>
        ing
      </h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults
            searchResults={searchResults}
            onAdd={addTrack} />
          <Playlist
            playlistName={playlist.playlistName}
            playlistTracks={playlist.playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}
