
const CLIENT_ID = '40b1c37281bb43fdbdf9e7d1e7f709aa';
const CLIENT_SECRET = 'b9a53c9ed25647baac0f7c63222101c6';

async function getAccessToken() {
  const cached = sessionStorage.getItem('spotify_token');
  const expiry = sessionStorage.getItem('spotify_token_expiry');

  if (cached && Date.now() < parseInt(expiry)) {
    return cached;
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    },
    body: 'grant_type=client_credentials'
  });

  if (!response.ok) {
    throw new Error('Error al obtener token: ' + response.status);
  }

  const data = await response.json();

  sessionStorage.setItem('spotify_token', data.access_token);
  sessionStorage.setItem('spotify_token_expiry', Date.now() + data.expires_in * 1000);

  return data.access_token;
}