class FetchService {
  static fetchService(url, headers) {
    return fetch(url, headers).then(response => {
      if (response.status !== '200') {
        throw response;
      }
      return response.json();
    });
  }
}

export default FetchService;
