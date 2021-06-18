import React, {useState} from 'react';
import './SearchBar.css';

export default function SearchBar(props) {

    const [term, setTermState] = useState('');

    const search = () => {
        props.onSearch(setTermState);
    }
    
    const handleTermChange = (e) => {
        setTermState({ term: e.target.value });
    }
    
    return (
        <div className="SearchBar">
            <input placeholder="Enter A Song, Album, or Artist" onChange={handleTermChange}/>
            <button className="SearchButton" onClick={search}>SEARCH</button>
        </div>
    );
}
