// js/api.js

const BASE_URL = 'https://api.spotify.com/v1';

// Función auxiliar para hacer GET autenticado
async function spotifyFetch(endpoint) {
  const token = await getAccessToken(); // espera el token primero

  const response = await fetch(BASE_URL + endpoint, {
    headers: { 'Authorization': 'Bearer ' + token }
  });

  if (!response.ok) {
    throw new Error('Error en la API: ' + response.status);
  }

  return response.json();
}

// Obtener lista de álbumes de un artista conocido (ej: Taylor Swift)
async function getAlbums() {
  // ID de Taylor Swift como ejemplo, puede cambiarse
  const data = await spotifyFetch('/artists/2nszmSgqreOHnfuX9U1CDg/albums?limit=10&include_groups=album');
  return data.items;
}

// Obtener detalle de un álbum
async function getAlbum(albumId) {
  return spotifyFetch('/albums/' + albumId);
}

// Obtener canciones de un álbum
async function getAlbumTracks(albumId) {
  const data = await spotifyFetch('/albums/' + albumId + '/tracks');
  return data.items;
}

// Obtener detalle de una canción
async function getTrack(trackId) {
  return spotifyFetch('/tracks/' + trackId);
}

// Obtener detalle de un artista
async function getArtist(artistId) {
  return spotifyFetch('/artists/' + artistId);
}