// The coordinates of KPU Surrey Library 
const kpuSurreyLibrary = { lat: 49.13214837231419, lng: -122.87138980312949 };

// Initialize and add the map to the page
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: kpuSurreyLibrary,
    });

    // Add a marker for the KPU Surrey Library
    const libraryMarker = new google.maps.Marker({
        position: kpuSurreyLibrary,
        map: map,
        title: "KPU Surrey Library",
	// The "Destination" label represents KPU Surrey library
        label: "Destination"
    });

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: true
    });

    // Use Geolocation API to fetch the current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };

            // Calculate distance and get route
            calculateAndDisplayRoute(directionsService, directionsRenderer, userLocation, kpuSurreyLibrary);

            // Add marker for current location
            const userMarker = new google.maps.Marker({
                position: userLocation,
                map: map,
                title: "My Location",
				// The "Current" label represents the current coordinates
                label: "Current"
            });
        }, () => {
            handleLocationError(true, map.getCenter());
        }, { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 });
    } else {
        // Dispaly error if the browser doesn't support Geolocation
        handleLocationError(false, map.getCenter());
    }
}

// Handle Location Error Message 
function handleLocationError(browserHasGeolocation, pos) {
    alert(browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation.");
}

// Calculate and display the route
function calculateAndDisplayRoute(directionsService, directionsRenderer, userLocation, kpuSurreyLibrary) {
    directionsService.route(
        {
            origin: userLocation,
            destination: kpuSurreyLibrary,
            travelMode: 'DRIVING'
        },
        (response, status) => {
            if (status === 'OK') {
                directionsRenderer.setDirections(response);

                const route = response.routes[0];
				// Distance in kilometers
                const distance = route.legs[0].distance.value / 1000;
				// The result message
                document.getElementById('distance').innerText = `Distance to KPU Surrey Library: ${distance.toFixed(2)} km`;
            } else {
				// Show the error message
                window.alert('Directions request failed due to ' + status);
            }
        }
    );
}

// Load the map when the page loads
window.onload = initMap;
