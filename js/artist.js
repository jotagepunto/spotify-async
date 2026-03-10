// js/artist.js

async function renderArtist() {
  const params = new URLSearchParams(window.location.search);
  const artistId = params.get('id');

  const detalleEl = document.getElementById('artist-detalle');

  try {
    const artist = await getArtist(artistId);

    detalleEl.innerHTML = `
      <img src="${artist.images[0]?.url}" width="150">
      <h1>${artist.name}</h1>
      <p>Seguidores: ${artist.followers.total.toLocaleString()}</p>
      <p>Popularidad: ${artist.popularity}/100</p>
      <p>Géneros: ${artist.genres.join(', ') || 'No especificado'}</p>
    `;

  } catch (error) {
    detalleEl.innerHTML = '<p style="color:red">Error: ' + error.message + '</p>';
  }
}

renderArtist();