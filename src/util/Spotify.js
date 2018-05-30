const clientId = '554f083f9c764ed1825048cc595775bd';
const redirectURI = 'http://localhost:3000/';
let accessToken;
const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const url = window.location.href;
    if (url.includes('access_token')) {
      accessToken = url.match('/access_token=([^&]*)/');
      const expiresIn = url.match('/expires_in=([^&]*)/');
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },

  search(searchTerm) {
    return fetch(
      `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      { headers: { Authorization: `Bearer ${this.getAccessToken()}` } }
    )
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.tracks.items.length() > 0) {
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
  }
};

export default Spotify;
