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




    // Función para buscar Pokémon
    $('.boton_busqueda').click(function () {
        const title = $('#nombre').val().trim();
        var apiKey = "4526760c";
        let url = `http://www.omdbapi.com/?t=${title}&type=movie&apikey=${apiKey}&plot=full`;
        let url_series = `http://www.omdbapi.com/?t=${title}&type=series&apikey=${apiKey}`;
        var alert_film = `<i class='fas fa-exclamation-triangle'></i> La pelicula ${title} no disponible`
        var alert_serie = `<i class='fas fa-exclamation-triangle'></i> La serie ${title} no disponible`
        if (filtro.value == 'nombre') {
            $.ajax({
                url: url,
                method: 'GET',
                success: function (data) {
                    mostrarPeliculas(data);
                },
                error: function () {
                    $('#films-info').html(alert_film);
                }
            });
        }

        if (filtro.value == 'series') {
            $.ajax({
                url: url_series,
                method: 'GET',
                success: function (data) {
                    mostrarSeries(data);
                },
                error: function () {
                    $('#films-info').html(alert_serie);
                }
            });
        }



    });

    // Mostrar info sobre Pokemons e Items

    function mostrarPeliculas(data) {
        $('#movies-info').empty();

        var imagen = data.Poster;
        
        var movieCard = `
          <div class="movie-card">
             
              <div>
                  <h2>${data.Title}</h2>
                  <img src="${imagen}">
              
                  <button class="descripcion_card" onclick="descripcion()"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
          </div>
      `;

      


         document.descripcion = function () {
                    modal.style.display = "block";
                        var info = `
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


         $('#movies-info').append(movieCard);
    }


    function mostrarSeries(data) {
        $('#movies-info').empty();

        var imagen = data.Poster;
        var movieCard = `
          <div class="movie-card">
             
              <div>
                  <h2>${data.Title}</h2>
                  <img src="${imagen}">
                  <h3>${data.Type.charAt(0).toUpperCase() + data.Type.slice(1)}</h3>
                  <button class="descripcion_card" onclick="descripcion()"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
              </div>
          </div>
      `;

      


         document.descripcion = function () {
                    modal.style.display = "block";
                        var info = `
                        <h2>${data.Title}</h2>
                        <img src=${imagen}>
                        <p><h3>Director:</h3>${data.Director}</p>
                        <p><h3>Actores:</h3>${data.Actors}</p>
                        <p><h3>Trama:</h3>${data.Plot}</p>
                        <p><h3>Año:</h3>${data.Year}</p>
                        <p><h3>Genero:</h3>${data.Genre}</p>
                       
                        <button class='compartir' onclick='Compartir()'><i class='fa fa-share-alt' aria-hidden='true'></i></button>
                        <button class="favoritos" onclick="addToFavorites('${data.imdbID}','${data.Title}','${data.Poster}','${data.Type}')"><i class='fa fa-heart' aria-hidden='true'></i></button>

                        `
                    $('.info').html(info);
            




        }


         $('#movies-info').append(movieCard);
    }

    // Función para agregar Pokémon a favoritos
    document.addToFavorites = function (imdbID, Title, Poster, Type) {
        $('#alert-favoritos').empty();
        var alert_added = `<i class='fa fa-heart' aria-hidden='true'></i> ${Title} ya está agregado a la lista`
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

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
        var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        $('#historial-list').empty();

        

        if (favorites.length) {
            favorites.forEach(function (fav) {
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
