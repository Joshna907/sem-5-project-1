// Function to show details when a button is clicked
function showDetails(id) {
  // Hide all details sections
  var details = document.querySelectorAll('.details');
  details.forEach(function (detail) {
      detail.style.display = 'none';
  });

  // Show the selected section
  var selected = document.getElementById(id.toLowerCase().replace(' ', '-'));
  if (selected) {
      selected.style.display = 'block';
  }
}

// Array of geofences for each job, specifying location and radius (in meters)
const geofences = [
  { jobId: 1, latitude: 19.0760, longitude: 72.8777, radius: 10000 }, // Mumbai
  { jobId: 2, latitude: 28.7041, longitude: 77.1025, radius: 5000 }    // Delhi
];

// Request user's location and check if they are within geofenced areas
function getUserLocation() {
  setTimeout(() => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
          alert("Geolocation is not supported by this browser.");
      }
  }, 500); // Delay the request by 500 ms for better user experience
}

// Handle successful geolocation request
function showPosition(position) {
  const userLatitude = position.coords.latitude;
  const userLongitude = position.coords.longitude;

  // Check each geofence to see if the user is within the allowed radius
  checkGeofence(userLatitude, userLongitude);
}

// Handle geolocation errors
function showError(error) {
  switch (error.code) {
      case error.PERMISSION_DENIED:
          alert("User denied the request for Geolocation.");
          break;
      case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;
      case error.TIMEOUT:
          alert("The request to get user location timed out.");
          break;
      default:
          alert("An unknown error occurred.");
          break;
  }
}

// Check if the user's location is within any job's geofence
function checkGeofence(userLatitude, userLongitude) {
  geofences.forEach(geofence => {
      const distance = calculateDistance(
          userLatitude, userLongitude, geofence.latitude, geofence.longitude
      );

      // Show or hide jobs based on distance from geofence center
      if (distance <= geofence.radius) {
          displayJob(geofence.jobId); // Show jobs within the geofence
      } else {
          hideJob(geofence.jobId);    // Hide jobs outside the geofence
      }
  });
}

// Calculate distance between two coordinates using the Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

// Display job card based on ID
function displayJob(jobId) {
  const jobElement = document.getElementById(`job-${jobId}`);
  if (jobElement) {
      jobElement.style.display = 'block';
  }
}

// Hide job card based on ID
function hideJob(jobId) {
  const jobElement = document.getElementById(`job-${jobId}`);
  if (jobElement) {
      jobElement.style.display = 'none';
  }
}

// Trigger location check when the page loads
window.onload = () => {
  getUserLocation();
};

document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('click', function () {
    // Remove the 'active' class from all cards
    document.querySelectorAll('.card').forEach((c) => c.classList.remove('active'));

    // Add the 'active' class to the clicked card
    this.classList.add('active');
  });
});
