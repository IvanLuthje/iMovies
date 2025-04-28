function menuBar() {
    var nav = document.querySelector('nav');
    nav.classList.toggle('active');
}

function cerrar() {
    modal.style.display = "none";

}

function descripcion (data) {
    console.log(JSON.parse(data));
    var imagen = data.Poster;
    modal.style.display = "block";
        var inf = `
        <h2>${data.Title}</h2>
        <img src=${imagen}>
        <p><h3>Director:</h3>${data.Director}</p>
        <p><h3>Actores:</h3>${data.Actors}</p>
        <p><h3>Trama:</h3>${data.Plot}</p>
        <p><h3>Año:</h3>${data.Year}</p>
        <p><h3>Genero:</h3>${data.Genre}</p>
        <p><h3>Rating:</h3>${data.Rating}</p>
        <button class='compartir' onclick='Compartir()'><i class='fa fa-share-alt' aria-hidden='true'></i></button>
        <button class="favoritos" onclick="addToFavorites('${data.Title}','${data.Poster}','${data.Type}')"><i class='fa fa-heart' aria-hidden='true'></i></button>
        `
        debugger;

    $('.info').html(inf);
    ;
}


$(document).ready(function () {



const apiKey = "4526760c"; // Reemplaza esto con tu clave de API de OMDb

$('#busqueda').click(function () {
  const title = $('#nombre').val().trim();
  var alert = `<i class='fas fa-exclamation-triangle'></i>${title} no está disponible`

  if (title === "") {
    alert("Por favor ingresa un título.");
    return;
  } 

  $('#movies-info').html('<p>Cargando...</p>');


  $.ajax({
      url: 'https://www.omdbapi.com/',
      method: 'GET',
      dataType: 'json',
      data: {
        apikey: apiKey,
        s: title
      },
    success: function (data) {
      $('#movies-info').empty();
     
      if (data.Response === "True") {
        data.Search.forEach(function (data) {
          const poster = data.Poster !== "N/A" ? data.Poster : "img/Image-not-found.png";
          $('#movies-info').append(`
            <div class="movie-card">
              <img src="${poster}" alt="${data.Title}">
              <div>
                <h2>${data.Title} (${data.Year})</h2>
                <p><strong>Actores:</strong> ${data.Actors}</p>
                <p><strong>Tipo:</strong> ${data.Type}</p>
                <button class="descripcion_card" onclick="descripcion(JSON.stringify('${data.Title}'))"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
              </div>
            </div>
          `);
        });
        
      } 

      else {
        $('#movies-info').html(alert);
      }
    },
    error: function () {
      $('#movies-info').html('<p>Ocurrió un error al consultar la API.</p>');
    }
    

    


  });
});

});