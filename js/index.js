async function renderAlbums() {
  const contenedor = document.getElementById('lista-albums');

  try {
    const albums = await getAlbums();

    contenedor.innerHTML = albums.map(album => `
      <div class="album-card">

        <div class="album-img">
          <img src="${album.images[0]?.url}" alt="${album.name}">
        </div>

        <div class="album-info">
          <h3>${album.name}</h3>
          <p class="year">${album.release_date.slice(0,4)}</p>

          <a class="album-btn" href="album.html?id=${album.id}">
            Ver álbum
          </a>
        </div>

      </div>
    `).join('');

  } catch (error) {
    contenedor.innerHTML = `
      <p class="error">Error: ${error.message}</p>
    `;
  }
}

renderAlbums();