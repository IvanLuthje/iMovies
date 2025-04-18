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
        var id_nombre = $("#nombre").val().trim().toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
        var apiKey = "4526760c";
        let url = `http://www.omdbapi.com/?t=${id_nombre}&type=movie&apikey=${apiKey}`;
        var alert_pokemon = `<i class='fas fa-exclamation-triangle'></i> El nombre ${id_nombre} no disponible`
        var alert_item = `<i class='fas fa-exclamation-triangle'></i> Item ${id_nombre} no disponible`
        if (filtro.value == 'nombre') {
            $.ajax({
                url: url,
                method: 'GET',
                success: function (data) {
                    mostrarPeliculas(data);
                },
                error: function () {
                    $('#films-info').html(alert_pokemon);
                }
            });
        }

        if (filtro.value == '') {
            $.ajax({
                url: "http://www.omdbapi.com/?t=${id_nombre}&type=serie&apikey=${apiKey}",
                method: 'GET',
                success: function (data) {
                    mostrarSeries(data);
                },
                error: function () {
                    $('#films-info').html(alert_item);
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
                  <button class="compartir" onclick="Compartir()"><i class='fa fa-share-alt' aria-hidden='true'></i></button>
                  <button class="descripcion" onclick="descripcion()"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
                  <button class="favoritos" onclick="addToFavorites('${data.Title}')"><i class='fa fa-heart' aria-hidden='true'></i></button>
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
                        <button class="favoritos" onclick="addToFavorites('${data.Title}')"><i class='fa fa-heart' aria-hidden='true'></i></button>

                        `
                    $('.info').html(info);
            




        }


         $('#movies-info').append(movieCard);
    }

 
    function mostrarItem(data) {
        $('#films-info').empty();
        var image = data.sprites.default;
        var id = data.id

        var movieCard = `
        <div class="movie-card">
            <p><strong>#${id}</strong></p>
            <img src="${image}" alt="${data.names[5].name}">
            <div>
                <h3>${data.names[5].name.charAt(0).toUpperCase() + data.names[5].name.slice(1)}</h3>
                <button class="compartir" onclick="Compartir()"><i class='fa fa-share-alt' aria-hidden='true'></i></button>
                <button class="descripcion" onclick="descripcion(${data.id}, '${data.name}')"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
                <button class="favoritos" onclick="addToFavorites('${data.Title}')"><i class='fa fa-heart' aria-hidden='true'></i></button>
            </div>
        </div>
    `;

        document.descripcion = function () {

            $.ajax({
                url: 'https://pokeapi.co/api/v2/item/' + data.id,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    var imagen = image;
                    var costo = data.cost
                    var tipo = data.category.name
                    var desc = data.flavor_text_entries[13].text
                    var modal = document.getElementById("modal");
                    modal.style.display = "block";
                    var info = `
                            <p><strong>#</strong>${data.id}</p>
                            <h3>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h3>
                            <div class='item'><img src=${imagen}></div>
                            <p>Costo: ${costo} </p>
                            <p>Tipo:  ${tipo} </p>
                            <p>Descripción: ${desc} </p>`

                    $('.info').html(info);
                },

            });



        }


        $('#films-info').html(movieCard);



    }

    // Función para agregar Pokémon a favoritos
    document.addToFavorites = function (Title) {
        var alert_added = `<i class='fa fa-heart' aria-hidden='true'></i> ${Title} ya está agregado a la lista`
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Comprobar si el Pokémon ya está en favoritos
        if (!favorites.some(fav => fav.Title === Title)) {
            favorites.push({ Title });
            localStorage.setItem('favorites', JSON.stringify(favorites));
            loadFavorites();
        }

        else {
            $('#alert-favoritos-pokedex').html(alert_added)
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
                        <button class="descripcion" onclick="descripcion('${fav.Title}')"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
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
                            <img src=${fav.imagen}>
                            <h3>${fav.Title}</h3>
                            <button class="compartir" onclick="Compartir()"><i class='fa fa-share-alt' aria-hidden='true'></i></button>
                            <button class="descripcion" onclick="descripcion(${fav.id}, '${fav.id}')"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
                            <button id="eliminar" onclick="eliminar(${fav.id_nombre})"><i class="fa fa-times" aria-hidden="true"></i></button>
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
    document.eliminar = function (Title) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        //   favorites = favorites.filter(fav => fav.id !== id);
        favorites = favorites.filter(fav => fav.Title !== Title);
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
