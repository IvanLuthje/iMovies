function cerrar() {
  modal.style.display = "none";
}

function Compartir() {
  document.location.href = 'compartir.html';
  ("#comentario").html(info);

};


function verMas() {
  // var url = "https://pokeapi.co/api/v2/pokemon/";
  let i=13
  while (i <= 30) {
    $.ajax({
      url: "https://pokeapi.co/api/v2/pokemon/" + i,
      method: 'GET',
      success: function (data) {
        mostrarPeliculas(data);
      },
      error: function () {
        $('#error_pokemon').html("Error al obtener los datos del Pokémon");
      }
    });
    i++;
  }
  vermas.style.display = "none";

}


function verMasCartas() {
  // var url = "https://pokeapi.co/api/v2/pokemon/";
  let i=13
  while (i <= 30) {
    $.ajax({
      url: "https://api.pokemontcg.io/v2/cards?pageSize=" + i,
      method: 'GET',
      success: function (response) {
        $('#cards-info').empty();
  
        // Iterar sobre las cartas recibidas y agregar al DOM
        response.data.forEach(function (card) {
          var cardElement = `
                    <div class="card">
                        <img src="${card.images.small}" alt="${card.name}">
                        <h3>${card.name}</h3>
                        <p>Tipo: ${card.types ? card.types.join(', ') : 'Desconocido'}</p>
                        <p>Rareza: ${card.rarity || 'Desconocida'}</p>
                    </div>
                `;
          $('#cards-info').append(cardElement);
        
        });
      },
      error: function () {
        $('#cards-info').html('Error al cargar las cartas. Intenta nuevamente.');
      }
    });
    i++;
  }
  vermascartas.style.display = "none";

}





function menuBar() {
  var nav = document.querySelector('nav');
  nav.classList.toggle('active');     
}


$(document).ready(function () {
  loadHistorial();
  var boton_mas = "<button class='vermas' onclick='verMas()' type='button' aria-label='Buscar'><i class='fa-solid fa-ellipsis'></i></button>";

  for (let i = 1; i <= 12; i++) {
    $.ajax({
      url: "https://pokeapi.co/api/v2/pokemon/" + i,
      method: 'GET',
      success: function (data) {
        mostrarPeliculas(data);
        // ("main").html("<button class='vermas' onclick='verMas()' type='button' aria-label='Buscar'><i class='fa-solid fa-ellipsis'></i></button>")
        $('#vermas').html(boton_mas);


      },
      error: function () {
        $('#error_pokemon').html("Error al obtener los datos del Pokémon");
      }


    });
  }
});






function mostrarPeliculas(data) {
  

  var image = data.sprites.front_default;
  var experiencia = data.base_experience
  var id = data.id
  var peso = data.weight / 10
  var altura = data.height / 10
  

  var movieCard = `
          <div class="movie-card">
              <img src="${image}" alt="${data.name}">
              <div>
                <h3>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h3>
                <button class="compartir" onclick="Compartir(${data.id}, '${data.name}')"><i class='fa fa-share-alt' aria-hidden='true'></i></button>
                <button class="descripcion" onclick="descripcion(${data.id}, '${data.name}', '${data.sprites.front_default}')"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
                <button class="favoritos" onclick="addToFavorites(${data.id}, '${data.name}', '${image}')"><i class='fa fa-heart' aria-hidden='true'></i></button>
              </div>
          </div>
      `;

      document.descripcion = function () {

        $.ajax({
            url: 'https://pokeapi.co/api/v2/pokemon-species/' + data.name,
            type: "GET",
            dataType: "json",

            success: function (data) {
                var desc = data.flavor_text_entries[1].flavor_text;
                var imagen = image;
                modal.style.display = "block";
                var info = `
                <p><strong>#</strong>${id}</p>
                <h3>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h3>
                <img src=${imagen}>
                <p><strong>Descripción:</strong>${desc}</p>
                <p><strong>Altura:</strong>${altura.toFixed(2)}m</p>
                <p><strong>Experiencia:</strong>${experiencia}</p>
                <p><strong>Peso:</strong>${peso}kg</p>
                <button class='compartir' onclick='Compartir(${data.id}, '${data.name}')'><i class='fa fa-share-alt' aria-hidden='true'></i></button>
                <button class="favoritos" onclick="addToFavorites(${data.id}, '${data.name}', '${image}')"><i class='fa fa-heart' aria-hidden='true'></i></button>

                `
       

                $('.info').html(info);
            },
          });
       
  }


  $('#movies-info').append(movieCard);
}


// Función para agregar Pokémon a favoritos
document.addToFavorites = function (id, name, sprite) {
  var alert_added = `<i class='fa fa-heart' aria-hidden='true'></i> Pokemon ${name} ya está agregado a la lista`
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Comprobar si el Pokémon ya está en favoritos
  if (!favorites.some(fav => fav.id === id)) {
    favorites.push({ id, name, sprite });
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavorites();
    loadHistorial();
  }

  else {
    $('#alert-favoritos').html(alert_added)
  }


};



// Función para cargar la lista de favoritos desde localStorage
function loadFavorites() {
  var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  $('#favorites-list').empty();

  favorites.forEach(function (fav) {
    var favoriteItem = `
              <li>
                  <span>${fav.name.charAt(0).toUpperCase() + fav.name.slice(1)}</span>
                  <button id="eliminar" onclick="eliminar(${fav.id})">&times;</button>
              </li>
          `;
    $('#favorites-list').append(favoriteItem);
  });
}

function loadHistorial() {
  var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  $('#historial-list').empty();
 
  if (favorites.length) {
    favorites.forEach(function (fav) {
      var favoriteItem = `  
                  <div class="movie-card">
                      <img src=${fav.sprite}>
                      <h3>${fav.name.charAt(0).toUpperCase() + fav.name.slice(1)}</h3>
                      <button class="compartir" onclick="Compartir()"><i class='fa fa-share-alt' aria-hidden='true'></i></button>
                      <button class="descripcion" onclick="descripcion(${fav.id}, '${fav.name}')"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
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

function loadCards() {
    i=12
    var boton_mas = "<button class='vermas' onclick='verMasCartas()' type='button' aria-label='Buscar'><i class='fa-solid fa-ellipsis'></i></button>";
    $.ajax({
      url: "https://api.pokemontcg.io/v2/cards?pageSize=" + i,  // URL de la API de cartas Pokémon
      method: 'GET',
      success: function (response) {
        $('#cards-info').empty();
  
        // Iterar sobre las cartas recibidas y agregar al DOM
        response.data.forEach(function (card) {
          var cardElement = `
                    <div class="card">
                        <img src="${card.images.small}" alt="${card.name}">
                        <h3>${card.name}</h3>
                        <p>Tipo: ${card.types ? card.types.join(', ') : 'Desconocido'}</p>
                        <p>Rareza: ${card.rarity || 'Desconocida'}</p>
                    </div>
                `;
          $('#cards-info').append(cardElement);
          $('#vermascartas').html(boton_mas);

        });
      },
      error: function () {
        $('#cards-info').html('Error al cargar las cartas. Intenta nuevamente.');
      }
    });
 
}



loadCards();







// Función para eliminar un Pokémon de los favoritos
document.eliminar = function (id) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites = favorites.filter(fav => fav.id !== id);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  loadHistorial();

};


// Función para eliminar todos los Pokémon de los favoritos, se limpia localstorage

$('#eliminar-todos').click(function () {
  localStorage.clear();
  loadFavorites();
  loadHistorial();
});


