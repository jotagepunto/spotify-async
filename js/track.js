
async function renderTrack() {
  const params = new URLSearchParams(window.location.search);
  const trackId = params.get('id');

  const detalleEl = document.getElementById('track-detalle');

  try {
    const track = await getTrack(trackId);

    document.getElementById('volver-album').href = 'album.html?id=' + track.album.id;

    const duracion = Math.floor(track.duration_ms / 60000) + ':' +
      String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0');

    detalleEl.innerHTML = `
      <img src="${track.album.images[0]?.url}" width="150">
      <h1>${track.name}</h1>
      <p>Álbum: ${track.album.name}</p>
      <p>Duración: ${duracion}</p>
      <p>Popularidad: ${track.popularity}/100</p>
      ${track.preview_url ? `<audio controls src="${track.preview_url}">Vista previa</audio>` : ''}
      <h3>Artistas</h3>
      <ul>
        ${track.artists.map(a => `
          <li><a href="artist.html?id=${a.id}">${a.name} →</a></li>
        `).join('')}
      </ul>
    `;

  } catch (error) {
    detalleEl.innerHTML = '<p style="color:red">Error: ' + error.message + '</p>';
  }
}

renderTrack();