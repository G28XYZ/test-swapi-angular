import { swapiAddress } from './constants';

class Api {
  _address: string;
  _headers: HeadersInit;
  constructor(address: string) {
    this._address = address;
    this._headers = {
      'Content-type': 'application/json',
    };
  }
  _handleResponse(response: Response) {
    return response.ok ? response.json() : Promise.reject(response.status);
  }

  getAllPlanets() {
    return fetch(`${this._address}/planets/`).then(this._handleResponse);
  }
}

const api = new Api(swapiAddress);

export default api;
