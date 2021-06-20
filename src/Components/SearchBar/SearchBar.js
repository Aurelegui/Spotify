import React, { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ onSearch }) {
  const [termState, setTermState] = useState("");

  const search = () => {
    onSearch(termState);
  };

  return (
    <div className="SearchBar">
      <input
        placeholder="Enter A Song, Album, or Artist"
        onChange={(e) => setTermState(e.target.value)}
      />
      <button type="button" className="SearchButton" onClick={search}>
        SEARCH
      </button>
    </div>
  );
}
