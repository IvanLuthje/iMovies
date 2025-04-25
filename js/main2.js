function menuBar() {
    var nav = document.querySelector('nav');
    nav.classList.toggle('active');
}

function cerrar() {
    modal.style.display = "none";

}

function descripcion (desc) {
    modal.style.display = "block";
        var inf = `
        <h2>${desc.Title}</h2>
        <img src=${desc.Poster}>
        <p><h3>Director:</h3>${desc.Director}</p>
        <p><h3>Actores:</h3>${desc.Actors}</p>
        <p><h3>Trama:</h3>${desc.Plot}</p>
        <p><h3>Año:</h3>${desc.Year}</p>
        <p><h3>Genero:</h3>${desc.Genre}</p>
        <p><h3>Rating:</h3>${desc.Rating}</p>
        <button class='compartir' onclick='Compartir()'><i class='fa fa-share-alt' aria-hidden='true'></i></button>
        <button class="favoritos" onclick="addToFavorites('${desc.Title}','${desc.Poster}','${desc.Type}')"><i class='fa fa-heart' aria-hidden='true'></i></button>

        `
    $('.info').html(inf);
    debugger;
}


$(document).ready(function () {



const apiKey = "4526760c"; // Reemplaza esto con tu clave de API de OMDb

$('#busqueda').click(function () {
  const title = $('#nombre').val().trim();
  let url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(title)}`;

  if (title === "") {
    alert("Por favor ingresa un título.");
    return;
  }


  $.ajax({
    url: url,
    method: 'GET',
    success: function (info) {
      $('#movies-info').empty();

      if (info.Response === "True") {
        info.Search.forEach(function (data) {
          const poster = data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/120x180";
          $('#movies-info').append(`
            <div class="movie-card">
              <img src="${poster}" alt="${data.Title}">
              <div>
                <h2>${data.Title} (${data.Year})</h2>
                <p><strong>Tipo:</strong> ${data.Actors}</p>
                <p><strong>Tipo:</strong> ${data.Type}</p>
                <button class="descripcion_card" onclick="descripcion('${data.Title}','${data.Year}','${data.Type}')"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
              </div>
              <div style="clear: both;"></div>
            </div>
          `);
        });
        
      } else {
        $('#movies-info').html(`<p>No se encontraron resultados para "${title}".</p>`);
      }
    },
    error: function () {
      $('#movies-info').html('<p>Ocurrió un error al consultar la API.</p>');
    }

    


  });
});

});