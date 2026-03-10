// js/album.js

async function renderAlbum() {
  const params = new URLSearchParams(window.location.search);
  const albumId = params.get('id');

  const detalleEl = document.getElementById('album-detalle');
  const tracksEl = document.getElementById('lista-tracks');

  try {
    // Dos llamadas asíncronas en PARALELO con Promise.all
    // Aquí mostramos que podemos lanzar varias promesas simultáneamente
    const [album, tracks] = await Promise.all([
      getAlbum(albumId),
      getAlbumTracks(albumId)
    ]);

    detalleEl.innerHTML = `
      <img src="${album.images[0]?.url}" width="150">
      <h1>${album.name}</h1>
      <p>Artista: ${album.artists.map(a => a.name).join(', ')}</p>
      <p>Fecha: ${album.release_date}</p>
      <p>Total canciones: ${album.total_tracks}</p>
    `;

    tracksEl.innerHTML = tracks.map((track, i) => `
      <div class="card">
        <span>${i + 1}. ${track.name}</span>
        <a href="track.html?id=${track.id}">Ver canción →</a>
      </div>
    `).join('');

  } catch (error) {
    detalleEl.innerHTML = '<p style="color:red">Error: ' + error.message + '</p>';
  }
}

renderAlbum();