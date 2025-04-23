// Función para activar/desactivar el menú hamburguesa
function menuBar() {
    var nav = document.querySelector('nav');
    nav.classList.toggle('active');
}


function cerrar() {
    modal.style.display = "none";

}

function Compartir() {
    document.location.href = 'compartir.html';
};





$(document).ready(function () {
    // Cargar la lista de favoritos desde localStorage
    loadFavorites();
    loadHistorial();

    $('.boton_busqueda').click(function () {
        var title = $('#nombre').val().trim();
        var apiKey = "4526760c";

        if (title === "") {
          alert("Por favor ingresa un título.");
          return;
        }
  
        let url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(title)}`;
  
    
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
                        <button class="descripcion_card" onclick="descripcion()"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
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
  
      document.descripcion = function () {
        modal.style.display = "block";
            var info2 = `
            <h2>${data.Title}</h2>
            <img src=${imagen}>
            <p><h3>Director:</h3>${data.Director}</p>
            <p><h3>Actores:</h3>${data.Actors}</p>
            <p><h3>Trama:</h3>${data.Plot}</p>
            <p><h3>Año:</h3>${data.Year}</p>
            <p><h3>Genero:</h3>${data.Genre}</p>
            <p><h3>Rating:</h3>${data.Rating}</p>
            <button class='compartir' onclick='Compartir()'><i class='fa fa-share-alt' aria-hidden='true'></i></button>
            <button class="favoritos" onclick="addToFavorites('${data.imdbID}','${data.Title}','${data.Poster}','${data.Type}')"><i class='fa fa-heart' aria-hidden='true'></i></button>

            `
        $('.info').html(info);





}
   

    





   

    // Función para agregar Pokémon a favoritos
    document.addToFavorites = function (imdbID, Title, Poster, Type) {
        $('#alert-favoritos').empty();
        var alert_added = `<i class='fa fa-heart' aria-hidden='true'></i> ${Title} ya está agregado a la lista`
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        let favorites_historial = JSON.parse(localStorage.getItem('favorites_historial')) || [];

        // Comprobar si el Pokémon ya está en favoritos
        if (!favorites.some(fav => fav.Title === Title)) {
            favorites.push({imdbID,Title, Poster, Type});
            localStorage.setItem('favorites', JSON.stringify(favorites));
            loadFavorites();
        }

        else {
            $('#alert-favoritos').html(alert_added)
        }
        

    };



    function loadFavorites() {
        var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        $('#favorites-list').empty();
        $('#favorites-list-r').empty();


        if (favorites.length) {

            favorites.forEach(function (fav) {
                var favoriteItem = `
                  <li>
                      <span>${fav.Title}</span>
                      <button id="eliminar" onclick="eliminar(${fav.Title})">&times;</button>
                  </li>
              `;
                $('#favorites-list').append(favoriteItem);
                $('#favorites-list-r').append(favoriteItem);
            });

        }

        else {
            $('#favorites-list').html("No se encuentran favoritos")
            $('#favorites-list-r').html("No se encuentran favoritos")
        }

    }

    function loadHistorial() {
        var favorites_historial = JSON.parse(localStorage.getItem('favorites_historial')) || [];
        $('#historial-list').empty();

        

        if (favorites_historial.length) {
            favorites_historial.forEach(function (fav) {
                var favoriteItem = `  
                    <div class="movie-card">
                        <img src=${fav.Poster}>
                        <h3>${fav.Title}</h3>
                     
                        <button class="compartir" onclick="Compartir()"><i class='fa fa-share-alt' aria-hidden='true'></i></button>
                        <button class="descripcion" onclick="descripcion()"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
                        <button id="eliminar" onclick="eliminar(${fav.id})"><i class="fa fa-times" aria-hidden="true"></i></button>
                   </div>
            `;


                $('#historial-list').append(favoriteItem);
                
            });

            
        }


        else {
            $('#historial-list').html("No se encuentran favoritos")
        }


    }


    function loadHistorial() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        $('#historial-list').empty();

        if (favorites.length) {
            favorites.forEach(function (fav) {
                const favoriteItem = `  
                        <div class="movie-card">
                            <img src=${fav.Poster}>
                            <h2>${fav.Title}</h2>
                            <h3>${fav.Type.charAt(0).toUpperCase() + fav.Type.slice(1)}</h3>
                            <button class="compartir" onclick="Compartir()"><i class='fa fa-share-alt' aria-hidden='true'></i></button>
                            <button class="descripcion" onclick="descripcion(${fav.id}, '${fav.id}')"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
                            <button id="eliminar" onclick="eliminar(${fav.Title})"><i class="fa fa-times" aria-hidden="true"></i></button>
                        </div>
                `;
                $('#historial-list').append(favoriteItem);
            });
        }


        else {
            $('#historial-list').html("No se encuentran favoritos")
        }


    }




    // Función para eliminar un Pokémon de los favoritos
    document.eliminar = function (id) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        //   favorites = favorites.filter(fav => fav.id !== id);
        favorites = favorites.filter(fav => fav.imdbID !== id);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        loadFavorites();
        loadHistorial();


    };

    $('#eliminar-todos').click(function () {
        localStorage.clear();
        loadFavorites();
        loadHistorial();
    });

    $('#eliminar-todos-resp').click(function () {
        localStorage.clear();
        loadFavorites();
        loadHistorial();
      });


});
