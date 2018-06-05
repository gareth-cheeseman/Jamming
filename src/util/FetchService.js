class FetchService {
  static get(url, token) {
    const options = {
      headers: { Authorization: `Bearer ${token}` }
    };
    return fetch(url, options).then(response => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    });
  }

  static post(url, token, body) {
    const options = {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(body)
    };
    return fetch(url, options).then(response => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    });
  }
}

export default FetchService;
