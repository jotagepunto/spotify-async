
const BASE_URL = 'https://api.spotify.com/v1';

async function spotifyFetch(endpoint) {
  const token = await getAccessToken(); 

  const response = await fetch(BASE_URL + endpoint, {
    headers: { 'Authorization': 'Bearer ' + token }
  });

  if (!response.ok) {
    throw new Error('Error en la API: ' + response.status);
  }

  return response.json();
}

async function getAlbums() {
  const data = await spotifyFetch('/artists/2nszmSgqreHSdJA3zWPyrW/albums?limit=10&include_groups=album');
  return data.items;
}

async function getAlbum(albumId) {
  return spotifyFetch('/albums/' + albumId);
}

async function getAlbumTracks(albumId) {
  const data = await spotifyFetch('/albums/' + albumId + '/tracks');
  return data.items;
}

async function getTrack(trackId) {
  return spotifyFetch('/tracks/' + trackId);
}

async function getArtist(artistId) {
  return spotifyFetch('/artists/' + artistId);
}