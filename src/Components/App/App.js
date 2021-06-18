// import logo from './logo.svg';
import React, {useState} from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';

import './App.css';

export default function App() {
  const [searchResults, setSearchResults] = useState([""]);
  const [playlistName, setPlaylistName] = useState("My Play List Name");
  const [playlistTracks, setPlaylistTracks] = useState([""]);
  
    // Old React 14
    // this.state = {
    //   searchResults: [],
    //   playlistName: 'My Play List Name',
    //   playlistTracks: []
    // }
    // this.addTrack = this.addTrack.bind(this);
    // this.removeTrack = this.removeTrack.bind(this);
    // this.updatePlaylistName = this.updatePlaylistName.bind(this);
    // this.savePlaylist = this.savePlaylist.bind(this);
    // this.search = this.search.bind(this);

  const addTrack = (track) => {
    let tracks = playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    setPlaylistTracks({ playlistTracks: tracks });
  }

  const removeTrack = (track) => {
    let tracks = playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

    setPlaylistTracks({ playlistTracks: tracks });
  }

  const updatePlaylistName = (name) => {
    setPlaylistName({ playlistName: name });
  }

  const search = (term) => {
    Spotify.search(term).then(searchResults => {
      // updates state from Sporify.search() promise
      setSearchResults({ searchResults: searchResults });
    })
  }

  const savePlaylist = () => {
    // eslint-disable-next-line no-unused-vars
    const trackUris = playlistTracks.map(track => track.uri);

    Spotify.savePlaylist(setPlaylistName, trackUris).then(() => {
      setPlaylistName({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults
            searchResults={setSearchResults}
            onAdd={addTrack} />
          <Playlist
            playlistName={setPlaylistName}
            playlistTracks={setPlaylistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist} />
        </div>
      </div>
    </div>
  );
}