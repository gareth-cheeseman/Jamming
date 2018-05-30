const clientId = '554f083f9c764ed1825048cc595775bd';
const redirectURI = 'http://localhost:3000/';
let accessToken;
const Spotify = {
  getAccessToken() {
    if (typeof accessToken !== 'undefined' && accessToken !== null) {
      return accessToken;
    } else {
      const url = window.location.href;
      if (url.includes('access_token')) {
        accessToken = url.match('/access_token=([^&]*)/');
        const expiresIn = url.match('/expires_in=([^&]*)/');
        window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
      }else{
          window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      }
    }
  }
};

export default Spotify;
