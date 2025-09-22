function alerts() {
  var mostrar = document.getElementById("alert");
  mostrar.className = "show";
  setTimeout(function(){ mostrar.className = mostrar.className.replace("show", ""); }, 3000);
}

function cerrar() {
  modal.style.display = "none";
}

function cancelar() {
  window.location.href = "index.html";
}

function compartir() {
  window.location.href = "compartir_resultados.html";
}

function menuBar() {
  var nav = document.querySelector("nav");
  nav.classList.toggle("active");
}

function FavoritesCounter() {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  $("#favorites-counter").text(favorites.length);
}



function addToFavorites(imdbID, Title, Poster, Type, Year, Plot) {
  $("#alert-favoritos").empty();
  var alert_check = `<i class='fa fa-heart' aria-hidden='true'></i>`;
  var alert_add = `<i class="fa-regular fa-heart" aria-hidden="true"></i>`;
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (!favorites.some((data) => data.Title === Title)) {
    favorites.push({imdbID, Title, Poster, Type, Year, Plot});
    localStorage.setItem("favorites", JSON.stringify(favorites));
    $(".favoritos").html(alert_check);
  } else {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter((data) => data.imdbID !== imdbID);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    $(".favoritos").html(alert_add);
  }

  FavoritesCounter();
}





$(document).ready(function () {
  loadFavorites();
  loadHistorial();
  buttonFavorites();

  async function year_movies() {
    $("#mtitle").html("<h2>Peliculas del año</h2>");
    try {
      // Definición de la apiKey
      var apiKey = "4526760c";
      let url_peliculas_year = `http://www.omdbapi.com/?s=movie&y=2025&type=movie&apikey=${apiKey}`;

      //Definición de alerts
      var alert_results = `<i class="fa-solid fa-spinner"></i> Cargando los resultados`;

      $("#year-movies-info").html(alert_results);

      const response = await fetch(url_peliculas_year);
      if (!response.ok) {
        throw new Error("Error de conexión");
      }

      const data = await response.json();

      if (data.Response === "True") {
        $("#year-movies-info").empty();

        // Mostrar cada serie encontrada
        for (const item of data.Search) {
          await mostrarResultados(item);
        }
      } else {
        $("#year-movies-info").html(alert_movie);
      }
    } catch (error) {
      $("#year-movies-info").html(
        `<i class='fas fa-exclamation-triangle'></i> Error en la búsqueda: ${error.message}`,
      );
    }
  }

  $("#year-movies-info").html(year_movies);

  $(".boton_busqueda").click( async function () {
    $("#mtitle").html("<h2>Resultados de búsqueda</h2>");
    try {
      const title = $("#nombre").val().trim();
      // Definición de la apiKey
      var apiKey = "4526760c";

      // Definir las url para los filtros de búsqueda

      let url_movie = `http://www.omdbapi.com/?s=${title}&type=movie&apikey=${apiKey}`;
      let url_series = `http://www.omdbapi.com/?s=${title}&type=series&apikey=${apiKey}`;

      //Definición de alerts

      var alert_movie = `<i class='fas fa-exclamation-triangle'></i> La pelicula ${title} no está disponible`;
      var alert_series = `<i class='fas fa-exclamation-triangle'></i> La serie ${title} no está disponible`;
      var alert_empty = `<i class='fas fa-exclamation-triangle'></i>Debe ingresar un título para continuar`;
      var alert_results = `<i class="fa-solid fa-spinner"></i> Cargando los resultados`;

      $("#alert").html(alert_results);
      

      // Filtros de busqueda

      if (title == "") {
        $("#alert").html(alert_empty);
        return false;
      }

      if (filtro.value == "movie") {
        const response = await fetch(url_movie);
        if (!response.ok) {
          throw new Error("Error de conexión");
        }

        const data = await response.json();

        if (data.Response === "True") {
          $("#movies-info").empty();

          // Mostrar cada pelicula encontrada
          for (const item of data.Search) {
            await mostrarResultados(item);
          }
        } else {
          $("#alert").html(alert_movie);
        }
      } else if (filtro.value == "series") {
        const response = await fetch(url_series);
        if (!response.ok) {
          throw new Error("Error de conexión");
        }
        const data = await response.json();

        if (data.Response === "True") {
          $("#movies-info").empty();

          // Mostrar cada serie encontrada
          for (const item of data.Search) {
            await mostrarResultados(item);
          }
        } else {
          $("#alert").html(alert_series);
        }
      }
    } catch (error) {
      $("#alert").html(
        `<i class='fas fa-exclamation-triangle'></i> Error en la búsqueda: ${error.message}`,
      );
      
    }
    alerts();
  });

    function buttonFavorites() {
        var alert_check = `<i class='fa fa-heart' aria-hidden='true'></i>`;
        var alert_add = `<i class="fa-regular fa-heart" aria-hidden="true"></i>`;
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        $(".favoritos").each(function () {
            const imdbID = $(this).data("id");
            if (favorites.some((data) => data.imdbID === imdbID)) {
            $(this).html(alert_check);
            } else {
            $(this).html(alert_add);
            }
        });

        FavoritesCounter();
    }

  async function mostrarResultados(data) {
    try {
      const apiKey = "4526760c";
      const resultados = await fetch(
        `http://www.omdbapi.com/?i=${data.imdbID}&apikey=${apiKey}&plot=full`,
      );
      if (resultados.ok) {
        var detalles = await resultados.json();
        if (detalles.Response === "True") {
          data = detalles;
        }
      }
    } catch (error) {
      console.error("Error al obtener detalles adicionales:", error);
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
                 
                    <div class="descripcion_buttons">
                        <button class="descripcion_button" data-id="${data.imdbID}" onclick="addToHistorial('${data.imdbID}','${data.Title}','${data.Poster}','${data.Type}','${data.Year}')"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
                    </div>
            </div>        
        `;

    $("#movies-info").append(movieCard);

    $(".descripcion_button").click(async function () {
      const id = $(this).data("id");
      try {
        const apiKey = "4526760c";
        const response = await fetch(
          `http://www.omdbapi.com/?i=${id}&apikey=${apiKey}&plot=full`,
        );
        if (!response.ok) {
          throw new Error("Error al obtener detalles");
        }
        const data = await response.json();
        if (data.Response === "True") {
          sessionStorage.setItem("data", JSON.stringify(data));
          window.location.href = "results.html";
          $("#info").html(info);
        }

        $(".compartir").click(function () {
          sessionStorage.setItem("data", JSON.stringify(data));
          window.location.href = "compartir_resultados.html";
        });
      } catch (error) {
        $(".info").html(error);
      }
    });
  }

  document.addToHistorial = function (imdbID, Title, Poster, Type, Year) {
    $("#alert-favoritos").empty();
    let favorites_historial =
      JSON.parse(localStorage.getItem("favorites_historial")) || [];

    if (!favorites_historial.some((data) => data.Title === Title)) {
      favorites_historial.push({ imdbID, Title, Poster, Type, Year });
      localStorage.setItem(
        "favorites_historial",
        JSON.stringify(favorites_historial),
      );
      loadHistorial();
    }
  };

  function FavoritesCounter() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    $("#favorites-counter").text(favorites.length);
  }



  function loadFavorites() {
    var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    $("#favorites-list").empty();

<<<<<<< HEAD
        }


         $('#movies-info').append(movieCard);
    }


    

    document.addToFavorites = function (imdbID, Title, Poster, Type) {
        $('#alert-favoritos').empty();
        var alert_added = `<i class='fa fa-heart' aria-hidden='true'></i> ${Title} ya está agregado a la lista`
        var alert_added_hist = `<i class='fa fa-heart' aria-hidden='true'></i> ${Title} ya está agregado en el historial`
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        let favorites_historial = JSON.parse(localStorage.getItem('favorites_historial')) || [];

        if (!favorites.some(fav => fav.Title === Title)) {
            favorites.push({imdbID, Title, Poster, Type});
            localStorage.setItem('favorites', JSON.stringify(favorites));
            loadFavorites();
        }

        else {
            $('#alert-favoritos').html(alert_added)
        }

        if (!favorites_historial.some(fav => fav.Title === Title)) {
            favorites_historial.push({imdbID, Title, Poster, Type});
            localStorage.setItem('favorites_historial', JSON.stringify(favorites_historial));
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
                      <button id="eliminar" onclick="eliminar('${fav.imdbID}')">&times;</button>
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
        const favorites_historial = JSON.parse(localStorage.getItem('favorites_historial')) || [];
        $('#historial-list').empty();

        if (favorites_historial.length) {
            favorites_historial.forEach(function (fav) {
                const favoriteItem = `  
                        <div class="movie-card">
                            <img src=${fav.Poster}>
                            <h2>${fav.Title}</h2>
                            <h3>${fav.Type.charAt(0).toUpperCase() + fav.Type.slice(1)}</h3>
                            <button class="compartir" onclick="Compartir()"><i class='fa fa-share-alt' aria-hidden='true'></i></button>
                            <button class="descripcion" onclick="descripcion_historial('${fav.imdbID}','${fav.Poster}','${fav.Type}')"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
                            <button id="eliminar" onclick="eliminar('${fav.imdbID}')"><i class="fa fa-times" aria-hidden="true"></i></button>
=======
    if (favorites.length) {
      favorites.forEach(function (data) {
        const imagen =
          data.Poster !== "N/A" ? data.Poster : "img/Image-not-found.png";
        var favoriteItem = `
                     <div class="movie-card">
                        <div class="boton_eliminar">
                        <button id="eliminar" onclick="eliminar('${data.imdbID}')"><i class="fa fa-times" aria-hidden="true"></i></button>
>>>>>>> v2.2
                        </div>
                        <img src=${imagen}>
                        <div class="desc_title">
                        <h4>${data.Title}</h4>
                        <h5>${data.Type.charAt(0).toUpperCase() + data.Type.slice(1)} (${data.Year})</h5>
                        </div>
                        <div class="descripcion_buttons">
                            <button class="descripcion_button" data-id="${data.imdbID}"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
                        </div>
                    </div>
                `;
        $("#favorites-list").append(favoriteItem);
      });
    } else {
      $("#favorites-list").html("No se encuentran favoritos");
    }

    FavoritesCounter();
  }

  function loadHistorial() {
    const favorites_historial =
      JSON.parse(localStorage.getItem("favorites_historial")) || [];
    $("#historial-list").empty();

    if (favorites_historial.length) {
      favorites_historial.forEach(function (data) {
        const imagen =
          data.Poster !== "N/A" ? data.Poster : "img/Image-not-found.png";
        const favoriteItem = `  
                    <div class="movie-card">
                        <div class="boton_eliminar">
                        <button id="eliminar_historial" onclick="eliminar_historial('${data.imdbID}')"><i class="fa fa-times" aria-hidden="true"></i></button>
                        </div>
                        <img src=${imagen}>
                        <div class="desc_title">
                        <h4>${data.Title}</h4>
                        <h5>${data.Type.charAt(0).toUpperCase() + data.Type.slice(1)} (${data.Year})</h5>
                        </div>
                        <div class="descripcion_buttons">
                            <button class="descripcion_button" data-id="${data.imdbID}"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
                        </div>
                    </div>
                `;

        $("#historial-list").append(favoriteItem);
      });

      $(".descripcion_button").click(async function () {
        const id = $(this).data("id");
        try {
          const apiKey = "4526760c";

          const response = await fetch(
            `http://www.omdbapi.com/?i=${id}&apikey=${apiKey}&plot=full`,
          );
          if (!response.ok) {
            throw new Error("Error al obtener los resultados");
          }
          const data = await response.json();
          const imagen =
            data.Poster !== "N/A" ? data.Poster : "img/Image-not-found.png";
          if (data.Response === "True") {
            sessionStorage.setItem("data", JSON.stringify(data));
            window.location.href = "results.html";
            $("#info").html(info);
          }

          $(".compartir_historial").click(async function () {
            sessionStorage.setItem("data", JSON.stringify(data));
            window.location.href = "compartir_resultados.html";
          });
        } catch (error) {
          $(".info").html(error);
        }
      });
    } else {
      $("#historial-list").html("El historial se encuentra vacío");
    }
  }

  document.eliminar = function (imdbID) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter((data) => data.imdbID !== imdbID);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    loadFavorites();
  };

  document.eliminar_historial = function (imdbID) {
    let favorites_historial =
      JSON.parse(localStorage.getItem("favorites_historial")) || [];
    if (favorites_historial.some((data) => data.imdbID === imdbID)) {
      favorites_historial = favorites_historial.filter(
        (data) => data.imdbID !== imdbID,
      );
      localStorage.setItem(
        "favorites_historial",
        JSON.stringify(favorites_historial),
      );
      loadHistorial();
    }
  };
});
