var map = L.map('map').setView([-34.922791, -57.956177], 13);
// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add a marker at the center
L.marker([-34.922791, -57.956177]).addTo(map)
    .bindPopup('Aqui estamos nosotros!!')
    .openPopup();
