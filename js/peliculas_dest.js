$(document).ready(function () {
    loadFavorites();
    loadHistorial();
    

    async function year_movies() {
        try {
            // Definición de la apiKey
            var apiKey = "4526760c";
            let url_peliculas_dest = `http://www.omdbapi.com/?s=movie&y=2025&type=movie&apikey=${apiKey}`;

            //Definición de alerts
            var alert_results = `<i class="fa-solid fa-spinner"></i> Cargando los resultados`;

            $('#year-movies-info').html(alert_results);

            const response = await fetch(url_peliculas_dest);
            if (!response.ok) {
                throw new Error('Error de conexión');
            }

            const data = await response.json();

            if (data.Response === "True") {
                $('#year-movies-info').empty();

                // Mostrar cada serie encontrada
                for (const item of data.Search) {
                    await mostrarDestacados(item);
                }
            }
            else {
                $('#year-movies-info').html(alert_movie);
            }




        }
        catch (error) {
            $('#year-movies-info').html(`<i class='fas fa-exclamation-triangle'></i> Error en la búsqueda: ${error.message}`);
        }
    }

    $('#mtitle').html("<h2>Peliculas del año</h2>");

    $('#year-movies-info').html(year_movies);


    async function mostrarDestacados(data) {
        try {
            const apiKey = "4526760c";

            const resultados = await fetch(`http://www.omdbapi.com/?i=${data.imdbID}&plot=full&apikey=${apiKey}`);
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
                    <div class="desc_title">
                        <h4>${data.Title}</h4>
                        <h5>${data.Type.charAt(0).toUpperCase() + data.Type.slice(1)} (${data.Year})</h5>
                        <h5><i class='fa fa-star' aria-hidden='true'></i>${data.imdbRating}</h5>
                    </div>
                 
                    <div class="descripcion_button">
                        <button class="descripcion_card" data-id="${data.imdbID}" onclick="addToHistorial('${data.imdbID}','${data.Title}','${data.Poster}','${data.Type}')"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
                    </div>
            </div>        
        `;

        $('#year-movies-info').append(movieCard);




        $('.descripcion_card').click(async function () {
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
                    sessionStorage.setItem('data', JSON.stringify(data));
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
                    window.location.href='results.html';  
                    $('.info').html(info);
                }

                $('.compartir').on('click', function () {
                    sessionStorage.setItem('data', JSON.stringify(data));
                    window.location.href = 'compartir_resultados.html';
                });


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

    };

    document.addToHistorial = function (imdbID, Title, Poster, Type) {
        $('#alert-favoritos').empty();
        let favorites_historial = JSON.parse(localStorage.getItem('favorites_historial')) || [];


        if (!favorites_historial.some(fav => fav.Title === Title)) {
            favorites_historial.push({ imdbID, Title, Poster, Type });
            localStorage.setItem('favorites_historial', JSON.stringify(favorites_historial));
            loadHistorial();
        }

        else {
            $('#alert-favoritos').html(alert_added);
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
                       ${fav.Title}
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
                        <h4>${fav.Title}</h4>
                        <h5>${fav.Type.charAt(0).toUpperCase() + fav.Type.slice(1)}</h5>
                        <button class="descripcion" data-id="${fav.imdbID}"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
                        <button id="eliminar" onclick="eliminar_historial('${fav.imdbID}')"><i class="fa fa-times" aria-hidden="true"></i></button>
                    </div>
                `;
                $('#historial-list').append(favoriteItem);
            });

            $('.descripcion').click(async function () {
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
                            <button class='compartir_historial'><i class='fa fa-share-alt' aria-hidden='true'></i></button>
                        `;
                        $('.info').html(info);
                    }

                    $('.compartir_historial').on('click', async function () {
                        sessionStorage.setItem('data', JSON.stringify(data));
                        window.location.href = 'compartir_resultados.html';
                    });
                }

                catch (error) {
                    $('.info').html(error);;
                }
            });

        } else {
            $('#historial-list').html("Historial vacío");
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