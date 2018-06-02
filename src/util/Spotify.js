const clientId = '554f083f9c764ed1825048cc595775bd';
const redirectURI = 'http://greatest-playlist.surge.sh/';
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

  async search(searchTerm) {
    if (!searchTerm) return [];

    const token = this.getAccessToken();

    if (!token) {
      window.alert(
        'Authorizing your link to Spotify, please enter your search again'
      );
      return []; //to prevent error on fetch with undefined token
    }

    try {
      const response = await fetch(
        `${baseURL}/search?type=track&q=${searchTerm}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.ok) {
        const jsonResponse = await response.json();
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
      }
    } catch (error) {
      console.log(error);
    }
  },

  async savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs || trackURIs.length === 0) return;

    const token = this.getAccessToken();
    const headers = { Authorization: `Bearer ${token}` };
    let userID = '';
    let playlistID = '';

    try {
      const response = await fetch(`${baseURL}/me`, { headers: headers });
      if (response.ok) {
        const jsonResponse = await response.json();
        userID = jsonResponse.id;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await fetch(`${baseURL}/users/${userID}/playlists`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          name: playlistName
        })
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        playlistID = jsonResponse.id;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      const response = fetch(
        `${baseURL}/users/${userID}/playlists/${playlistID}/tracks`,
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            uris: trackURIs
          })
        }
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        playlistID = jsonResponse.snapshot_id;
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export default Spotify;
