// js/index.js

async function renderAlbums() {
  const contenedor = document.getElementById('lista-albums');

  try {
    const albums = await getAlbums(); // llamada asíncrona

    contenedor.innerHTML = albums.map(album => `
      <div class="card">
        <img src="${album.images[0]?.url}" width="100" alt="${album.name}">
        <div>
          <strong>${album.name}</strong> (${album.release_date.slice(0,4)})
          <br>
          <a href="album.html?id=${album.id}">Ver álbum →</a>
        </div>
      </div>
    `).join('');

  } catch (error) {
    contenedor.innerHTML = '<p style="color:red">Error: ' + error.message + '</p>';
  }
}

// Punto de entrada
renderAlbums();