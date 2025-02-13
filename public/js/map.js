// mapboxgl.accessToken = mapToken;
// const map = new mapboxgl.Map({
//     container: 'map',
//     style: 'https://api.maptiler.com/maps/streets/style.json?key=WHlQikMwFrZxFfBr5ntc',
//     center: listing.geometry.coordinates, // Ensure this is [lng, lat]
//     zoom: 9
// });

// console.log("Coordinates:", listing.geometry.coordinates);

// // Create a custom marker element
// const markerElement = document.createElement('div');
// markerElement.style.width = "40px";  // Change marker width
// markerElement.style.height = "60px"; // Change marker height
// markerElement.style.backgroundColor = "red"; // Change marker color
// markerElement.style.borderRadius = "50%"; // Make it circular
// markerElement.style.border = "2px solid white"; // Optional border
// markerElement.style.boxShadow = "0 0 5px rgba(0,0,0,0.5)"; // Optional shadow

// const marker = new mapboxgl.Marker({ element: markerElement })
//     .setLngLat(listing.geometry.coordinates)
//     .setPopup(
//         new mapboxgl.Popup({ offset: 25 }).setHTML(
//             `<h4>${listing.title}</h4><p>Exact Location will be provided after booking</p>`
//         )
//     )
//     .addTo(map);


mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/streets/style.json?key=WHlQikMwFrZxFfBr5ntc',
    center: listing.geometry.coordinates, // Ensure this is [lng, lat]
    zoom: 9
});

console.log("Coordinates:", listing.geometry.coordinates);

// Create a custom marker element
const markerElement = document.createElement('div');
markerElement.style.width = "0px";  // Adjust width to resemble Google Maps pin
markerElement.style.height = "3px"; // Adjust height
markerElement.style.position = "relative"; // Ensure proper positioning

// Create an inner div for the circular head of the pin
const markerHead = document.createElement('div');
markerHead.style.width = "100%";
markerHead.style.height = "100%";
markerHead.style.backgroundColor = "red"; // Change to desired color
markerHead.style.borderRadius = "50%"; // Makes it circular
markerHead.style.border = "3px solid white"; // White border for clarity
markerHead.style.boxShadow = "0 0 5px rgba(0,0,0,0.5)"; // Optional shadow

// Create a tail for the Google Maps-like pointer
const markerTail = document.createElement('div');
markerTail.style.position = "absolute";
markerTail.style.bottom = "-15px"; // Position tail correctly
markerTail.style.left = "50%";
markerTail.style.transform = "translateX(-50%)"; // Center it
markerTail.style.width = "0";
markerTail.style.height = "0";
markerTail.style.borderLeft = "10px solid transparent";
markerTail.style.borderRight = "10px solid transparent";
markerTail.style.borderTop = "15px solid red"; // Same color as the pin head

// Append elements
markerElement.appendChild(markerHead);
markerElement.appendChild(markerTail);

const marker = new mapboxgl.Marker({ element: markerElement, anchor: "bottom" }) // Anchor it at the bottom
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h4>${listing.title}</h4><p>Exact Location will be provided after booking</p>`
        )
    )
    .addTo(map);
