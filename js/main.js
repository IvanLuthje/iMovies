function menuBar() {
    var nav = document.querySelector('nav');
    nav.classList.toggle('active');
}

function cerrar() {
    modal.style.display = "none";
}




$(document).ready(function () {
    loadFavorites();
    loadHistorial();

    $('.boton_busqueda').click(async function () {
        try {
            const title = $('#nombre').val().trim();
            // Definición de la apiKey
            var apiKey = "4526760c";
            let url_peliculas_dest = `http://www.omdbapi.com/?s=${title}&y=2025&type=episode&apikey=${apiKey}`;
            // Definir las url para los filtros de búsqueda
           
           
            let url_movie = `http://www.omdbapi.com/?s=${title}&type=movie&apikey=${apiKey}`;
            let url_series = `http://www.omdbapi.com/?s=${title}&type=series&apikey=${apiKey}`;
            let url_episodes = `http://www.omdbapi.com/?s=${title}&type=episode&apikey=${apiKey}`;
           
            //Definición de alerts
           
            var alert_movie = `<i class='fas fa-exclamation-triangle'></i> La pelicula ${title} no está disponible`;
            var alert_serie = `<i class='fas fa-exclamation-triangle'></i> La serie ${title} no está disponible`;
            var alert_episodes = `<i class='fas fa-exclamation-triangle'></i> El episodio ${title} no está disponible`;
           
            var alert_empty = `<i class='fas fa-exclamation-triangle'></i>  Debe ingresar un título para continuar`;
            var alert_results = `<i class="fa-solid fa-spinner"></i> Cargando los resultados`;
           
           
            
            $('#movies-info').html(alert_results);

            // Filtros de busqueda

            if (title == "") {
                $('#movies-info').html(alert_empty);
                return false;
            }

            if (filtro.value == 'movie') {
                const response = await fetch(url_movie);
                if (!response.ok) {
                    throw new Error('Error de conexión');
                }

                const data = await response.json();

                if (data.Response === "True") {
                    $('#movies-info').empty();

                    // Mostrar cada serie encontrada
                    for (const item of data.Search) {
                        await mostrarResultados(item);
                    }
                }
                else {
                    $('#movies-info').html(alert_movie);
                }
            }

            else if (filtro.value == 'series') {
                const response = await fetch(url_series);
                if (!response.ok) {
                    throw new Error('Error de conexión');
                }
                const data = await response.json();

                if (data.Response === "True") {
                    $('#movies-info').empty();

                    // Mostrar cada serie encontrada
                    for (const item of data.Search) {
                        await mostrarResultados(item);
                    }
                }
                else {
                    $('#movies-info').html(alert_serie);
                }

            }

            else if (filtro.value == 'episodes') {
                const response = await fetch(url_episodes);
                if (!response.ok) {
                    throw new Error('Error de conexión');
                }
                const data = await response.json();

                if (data.Response === "True") {
                    $('#movies-info').empty();

                    // Mostrar cada serie encontrada
                    for (const item of data.Search) {
                        await mostrarResultados(item);
                    }
                }
                else {
                    $('#movies-info').html(alert_serie);
                }

            }




        } 
    
        catch (error) {
            $('#movies-info').html(`<i class='fas fa-exclamation-triangle'></i> Error en la búsqueda: ${error.message}`);
        }
    });

    



    async function mostrarResultados(data) {
        try {
            const apiKey = "4526760c";

            const resultados = await fetch(`http://www.omdbapi.com/?i=${data.imdbID}&apikey=${apiKey}&plot=full`);
            if (resultados.ok) {
                var detalles = await resultados.json();
                if (detalles.Response === "True") {
                    data = detalles;
                }
            }
        } 
        
        catch (error) {
            console.error('Error al obtener detalles adicionales:', error);
        }

        const imagen = data.Poster !== "N/A" ? data.Poster : "img/Image-not-found.png";
        var movieCard = `
            <div class="movie-card">
               <img src="${imagen}">
                <div>
                    <h2>${data.Title} (${data.Year})</h2>
                    <h3>${data.Type.charAt(0).toUpperCase() + data.Type.slice(1)}</h3>
                    <button class="descripcion_card" data-id="${data.imdbID}"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
                </div>
            </div>
        `;

        $('#movies-info').append(movieCard);

        


        $('#movies-info').on('click', '.descripcion_card', async function () {
            const id = $(this).data('id');
            try {
                const apiKey = "4526760c";
                const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=${apiKey}&plot=full`);
                if (!response.ok) {
                    throw new Error('Error al obtener detalles');
                }
                const data = await response.json();
                if (data.Response === "True") {
                    const imagen = data.Poster !== "N/A" ? data.Poster : "img/Image-not-found.png";
                    modal.style.display = "block";
                    var info = `
                        <h2>${data.Title}</h2>
                        <img src="${imagen}">
                        <p><h3>Director:</h3>${data.Director}</p>
                        <p><h3>Actores:</h3>${data.Actors}</p>
                        <p><h3>Trama:</h3>${data.Plot}</p>
                        <p><h3>Año:</h3>${data.Year}</p>
                        <p><h3>Genero:</h3>${data.Genre}</p>
                        ${data.Rating ? `<p><h3>Rating:</h3>${data.Rating}</p>` : ''}
                        <button class='compartir' onclick="Compartir('${data.imdbID}','${data.Title}','${data.Type}')"><i class='fa fa-share-alt' aria-hidden='true'></i></button>
                        <button class="favoritos" onclick="addToFavorites('${data.imdbID}','${data.Title}','${data.Poster}','${data.Type}')"><i class='fa fa-heart' aria-hidden='true'></i></button>
                    `;
                    $('.info').html(info);
                }

                $('.compartir').on('click', function () {
                    sessionStorage.setItem('datos', JSON.stringify(data));
                    window.location.href = 'compartir.html';
                  });

              debugger;
               
            }

            catch (error) {
                $('.info').html(error);
            }
        });
    }

    


    

    document.addToFavorites = function (imdbID, Title, Poster, Type) {
        $('#alert-favoritos').empty();
        var alert_added = `<i class='fa fa-heart' aria-hidden='true'></i> ${Title} ya está agregado a la lista`;
        var alert_added_hist = `<i class='fa fa-heart' aria-hidden='true'></i> ${Title} ya está agregado en el historial`;
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        let favorites_historial = JSON.parse(localStorage.getItem('favorites_historial')) || [];

        if (!favorites.some(fav => fav.Title === Title)) {
            favorites.push({ imdbID, Title, Poster, Type });
            localStorage.setItem('favorites', JSON.stringify(favorites));
            loadFavorites();
        } 
        
        else {
            $('#alert-favoritos').html(alert_added);
        }

        if (!favorites_historial.some(fav => fav.Title === Title)) {
            favorites_historial.push({ imdbID, Title, Poster, Type });
            localStorage.setItem('favorites_historial', JSON.stringify(favorites_historial));
            loadHistorial();
        } 
        
        else {
            $('#alert-favoritos').html(alert_added_hist);
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
                        <button id="eliminar" onclick="eliminar('${fav.imdbID}')">&times;</button>
                    </li>
                `;
                $('#favorites-list').append(favoriteItem);
                $('#favorites-list-r').append(favoriteItem);
            });
        } 
        
        else {
            $('#favorites-list').html("No se encuentran favoritos");
            $('#favorites-list-r').html("No se encuentran favoritos");
        }
    }

    function loadHistorial() {
        const favorites_historial = JSON.parse(localStorage.getItem('favorites_historial')) || [];
        $('#historial-list').empty();

        if (favorites_historial.length) {
            favorites_historial.forEach(function (fav) {
                const imagen = fav.Poster !== "N/A" ? fav.Poster : "img/Image-not-found.png";
                const favoriteItem = `  
                    <div class="movie-card">
                        <img src=${imagen}>
                        <h2>${fav.Title}</h2>
                        <h3>${fav.Type.charAt(0).toUpperCase() + fav.Type.slice(1)}</h3>
                        <button class="descripcion" data-id="${fav.imdbID}"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
                        <button id="eliminar" onclick="eliminar_historial('${fav.imdbID}')"><i class="fa fa-times" aria-hidden="true"></i></button>
                    </div>
                `;
                $('#historial-list').append(favoriteItem);
            });

            $('#historial-list').on('click', '.descripcion', async function () {
                const id = $(this).data('id');
                try {
                    const apiKey = "4526760c";

                    const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=${apiKey}&plot=full`);
                    if (!response.ok) {
                        throw new Error('Error al obtener los resultados');
                    }
                    const data = await response.json();
                    const imagen = data.Poster !== "N/A" ? data.Poster : "img/Image-not-found.png";
                    if (data.Response === "True") {
                        modal.style.display = "block";
                        var info = `
                            <h2>${data.Title}</h2>
                            <img src="${imagen}">
                            <p><h3>Director:</h3>${data.Director}</p>
                            <p><h3>Actores:</h3>${data.Actors}</p>
                            <p><h3>Trama:</h3>${data.Plot}</p>
                            <p><h3>Año:</h3>${data.Year}</p>
                            <p><h3>Genero:</h3>${data.Genre}</p>
                            ${data.Rating ? `<p><h3>Rating:</h3>${data.Rating}</p>` : ''}
                            <button class='compartir_historial' onclick='Compartir()'><i class='fa fa-share-alt' aria-hidden='true'></i></button>
                        `;
                        $('.info').html(info);
                    }

                     $('.compartir_historial').on('click', function () {
                         sessionStorage.setItem('datos', JSON.stringify(data));
                        window.location.href = 'compartir.html';
                     });
                }

                catch (error) {
                    $('.info').html(error);;
                }
            });

        } else {
            $('#historial-list').html("No se encuentran favoritos");
        }
    }

  



    document.eliminar = function (imdbID) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites = favorites.filter(fav => fav.imdbID !== imdbID);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        loadFavorites();
        
    }
        

    document.eliminar_historial = function (imdbID) {
        let favorites_historial = JSON.parse(localStorage.getItem('favorites_historial')) || [];
        if (favorites_historial.some(fav => fav.imdbID === imdbID)) {
            favorites_historial = favorites_historial.filter(fav => fav.imdbID !== imdbID);
            localStorage.setItem('favorites_historial', JSON.stringify(favorites_historial));
            loadHistorial();
        }
    };




});