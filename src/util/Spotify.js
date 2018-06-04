import FetchService from './FetchService';

const clientId = '554f083f9c764ed1825048cc595775bd';
const redirectURI = 'http://localhost:3000/';
const baseURL = 'https://api.spotify.com/v1';
let accessToken;
const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const url = window.location.href;
    if (url.includes('access_token')) {
      accessToken = url.match(/access_token=([^&]*)/)[1];
      const expiresIn = url.match(/expires_in=([^&]*)/)[1];
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },

  search(searchTerm) {
    if (!searchTerm) return [];

    const token = this.getAccessToken();

    if (!token) {
      window.alert(
        'Authorizing your link to Spotify, please enter your search again'
      );
      return []; //to prevent error on fetch with undefined token
    }

    return FetchService.fetchService(
      `${baseURL}/search?type=track&q=${searchTerm}`,
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(jsonResponse => {
      if (jsonResponse.tracks.items.length > 0) {
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      } else {
        return [];
      }
    });
  },

  savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs || trackURIs.length === 0) return;

    const token = this.getAccessToken();
    const headers = { Authorization: `Bearer ${token}` };
    let userID = '';
    let playlistID = '';

    return FetchService.fetchService(`${baseURL}/me`, {
      headers: headers
    })
      .then(jsonResponse => {
        userID = jsonResponse.id;
      })
      .then(
        FetchService.fetchService(`${baseURL}/users/${userID}/playlists`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            name: playlistName
          })
        })
      )
      .then(jsonResponse => {
        playlistID = jsonResponse.id;
      })
      .then(
        FetchService.fetchService(
          `${baseURL}/users/${userID}/playlists/${playlistID}/tracks`,
          {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
              uris: trackURIs
            })
          }
        )
      )
      .then(jsonResponse => {
        playlistID = jsonResponse.snapshot_id;
      });
  }
};

export default Spotify;
