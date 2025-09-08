function cancelar() {
    window.location.href = "index.html"
}

function compartir() {
    window.location.href = "compartir_resultados.html"
}




const data = JSON.parse(sessionStorage.getItem('data'));

const imagen = data.Poster !== "N/A" ? data.Poster : "img/Image-not-found.png";
var inf = `<button class="cancel2" onclick="cancelar()">
<i class="fa fa-chevron-left" aria-hidden="true"></i>
</button>
<div class="inf">
  <div class="title">
    <img src="${imagen}" />
    <div class="botones">
      <button class="compartir" onclick="compartir()">
        <i class="fa fa-share-alt" aria-hidden="true"></i>
      </button>
      <button class="favoritos" onclick="addToFavorites('${data.imdbID}','${data.Title}','${data.Poster}','${data.Type}','${data.Year}','${data.Plot.replace(/'/g, "\\'")}')">
        <i class="fa fa-plus" aria-hidden="true"></i>
      </button>
    </div>
  </div>
  <div class="desc">
    <h2>${data.Title}</h2>
    <h3>${data.Year}</h3>
    <div class="plot">${data.Plot}</div>
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
    </div>
  </div>
</div>
`;

const info = document.getElementById('info');

info.innerHTML = inf;