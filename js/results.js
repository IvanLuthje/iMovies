
$(document).ready(function () {
    buttonFavorites();
});

function compartir() {
    window.location.href = "compartir_resultados.html"
}

function FavoritesCounter() {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    $("#favorites-counter").text(favorites.length);
}




function addToFavorites (imdbID, Title, Poster, Type, Year, Plot) {
        $('#alert-favoritos').empty();
        var alert_check = `<i class='fa fa-check' aria-hidden='true'></i>`;
        var alert_add= `<i class="fa fa-plus" aria-hidden="true"></i>`;
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (!favorites.some(data => data.Title === Title)) {
            favorites.push({imdbID, Title, Poster, Type, Year, Plot});
            localStorage.setItem('favorites', JSON.stringify(favorites));
            $('.favoritos').html(alert_check);

            
        }

        else {
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            favorites = favorites.filter(data => data.imdbID !== imdbID);
            localStorage.setItem('favorites', JSON.stringify(favorites));
             $('.favoritos').html(alert_add);

        }

       FavoritesCounter(); 
    };

function buttonFavorites() {
        var alert_check = `<i class='fa fa-check' aria-hidden='true'></i>`;
        var alert_add= `<i class="fa fa-plus" aria-hidden="true"></i>`;
        let favorites = JSON.parse(localStorage.getItem('favorites')) || []
        $('.favoritos').each(function () {
        const imdbID = $(this).data("id");
        if (favorites.some(data => data.imdbID === imdbID)) {
            $(this).html(alert_check);
        } else {
            $(this).html(alert_add);
        }
    });

 FavoritesCounter(); 
}

const data = JSON.parse(sessionStorage.getItem('data'));

const imagen = data.Poster !== "N/A" ? data.Poster : "img/Image-not-found.png";
var inf = `
 <button class="cancel2" onclick="history.back();">
    <i class="fa fa-chevron-left" aria-hidden="true"></i>
  </button>

 <div class="title">
    <h2>${data.Title}</h2>
    <h3>${data.Year}</h3>
    <div class="plot">${data.Plot}</div>
</div>

<div class="inf">

  <div class="col_inf">
      <img src="${imagen}" />
      <div class="descripcion_buttons">
        <button class="compartir" onclick="compartir()">
          <i class="fa fa-share-alt" aria-hidden="true"></i>
        </button>
        <button class="favoritos" data-id="${data.imdbID}" onclick="addToFavorites('${data.imdbID}','${data.Title}','${data.Poster}','${data.Type}','${data.Year}','${data.Plot.replace(/'/g, "\\'")}')">
        </button>
      </div>
  </div>
   
  <div class="desc">

    <div class="movie-details">
      <div class="detail-item">
        <span class="detail-label">Director</span>
        <span class="detail-value">${data.Director}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Género</span>
        <span class="detail-value">${data.Genre}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Actores</span>
        <span class="detail-value">${data.Actors}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Rating (IMDb)</span>
        <span class="detail-value">
             <h5><i class="fa fa-star" aria-hidden="true"></i>${data.imdbRating}/10</h5>
        </span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Pais</span>
        <span class="detail-value">${data.Country}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Idioma</span>
        <span class="detail-value">${data.Language}</span>
      </div>
       <div class="detail-item">
        <span class="detail-label">Duración</span>
        <span class="detail-value">${data.Runtime}</span>
      </div>
    </div>
  </div>
</div>
`;

const info = document.getElementById('info');

info.innerHTML = inf;


