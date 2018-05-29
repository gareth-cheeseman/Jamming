import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        { name: 'name1', artist: 'artist1', album: 'album1', id: '1' },
        { name: 'name2', artist: 'artist2', album: 'album2', id: '2' },
        { name: 'name3', artist: 'artist3', album: 'album3', id: '3' }
      ],
      playlistName : 'playlist1',
      playlistTracks: [
        { name: 'pname1', artist: 'partist1', album: 'palbum1', id: 'p1' },
        { name: 'pname2', artist: 'partist2', album: 'palbum2', id: 'p2' },
        { name: 'pname3', artist: 'partist3', album: 'palbum3', id: 'p3' }
      ]
    };
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span class="highlight">mmm</span>ing
        </h1>
        <div className="App">
          {/*Add a SearchBar component*/}
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
