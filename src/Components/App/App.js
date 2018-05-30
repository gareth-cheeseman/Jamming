import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: 'name1',
          artist: 'artist1',
          album: 'album1',
          id: '1',
          uri: 'u1'
        },
        {
          name: 'name2',
          artist: 'artist2',
          album: 'album2',
          id: '2',
          uri: 'u2'
        },
        {
          name: 'name3',
          artist: 'artist3',
          album: 'album3',
          id: '3',
          uri: 'u3'
        }
      ],
      playlistName: 'playlist1',
      playlistTracks: [
        {
          name: 'pname1',
          artist: 'partist1',
          album: 'palbum1',
          id: 'p1',
          uri: 'pu1'
        },
        {
          name: 'pname2',
          artist: 'partist2',
          album: 'palbum2',
          id: 'p2',
          uri: 'pu2'
        },
        {
          name: 'pname3',
          artist: 'partist3',
          album: 'palbum3',
          id: 'p3',
          uri: 'pu3'
        }
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (
      this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)
    ) {
      return;
    } else {
      const newPlaylistTracks = this.state.playlistTracks.slice();
      newPlaylistTracks.push(track);
      this.setState({ playlistTracks: newPlaylistTracks });
    }
  }

  removeTrack(track) {
    const newPlaylistTracks = this.state.playlistTracks.filter(
      plTrack => plTrack.id !== track.id
    );
    this.setState({ playlistTracks: newPlaylistTracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(searchResults =>
      this.setState({
        searchResults: searchResults
      })
    );
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
