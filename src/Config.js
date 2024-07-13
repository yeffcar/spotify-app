// config.js
export const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
export const SPOTIFY_CLIENT_ID = 'aa7d4420effd4f25b39c659124fa2c00';
export const SPOTIFY_REDIRECT_URI = 'http://localhost:3000/';
export const RESPONSE_TYPE = 'token';
export const SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-read-recently-played',
  'user-read-playback-state',
  'user-read-currently-playing',
  'user-modify-playback-state'
].join(' ');
