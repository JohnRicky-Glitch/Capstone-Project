// SIDEBAR TOGGLE

let sidebarOpen = false;
const sidebar = document.getElementById('sidebar');

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add('sidebar-responsive');
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove('sidebar-responsive');
    sidebarOpen = false;
  }
}


// SIDEBAR NAVIGATION
const sidebarLinks = document.querySelectorAll('.sidebar-list-item a');
sidebarLinks.forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    const targetId = this.getAttribute('data-target');
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.style.display = 'none');
    const targetSection = document.getElementById(targetId);
    if (targetSection) targetSection.style.display = 'block';
  });
});


// DASHBOARD
document.addEventListener('DOMContentLoaded', function () {
    const userName = 'Juan'; // This could be fetched dynamically from the backend
    document.querySelector('.welcome-section h3').textContent = `Welcome, ${userName}!`;

    const events = [
        { title: 'Community Workshop', date: 'September 25, 2024' },
        { title: 'Cleanup Drive', date: 'October 1, 2024' },
        { title: 'Charity Fun Run', date: 'October 10, 2024' }
    ];

    const eventList = document.getElementById('event-list');
    events.forEach(event => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerHTML = `
            <strong>${event.title}</strong>
            <span>${event.date}</span>
        `;
        eventList.appendChild(listItem);
    });

    const borrowedItems = [
        { name: 'Book A', borrowDate: '2024-09-01', dueDate: '2024-09-10', status: 'Returned' },
        { name: 'Book B', borrowDate: '2024-09-02', dueDate: '2024-09-11', status: 'Overdue' }
    ];

    const returnedItems = [
        { name: 'Book A', borrowDate: '2024-09-01', returnDate: '2024-09-08', status: 'Returned' }
    ];

    const overdueItems = [
        { name: 'Book B', borrowDate: '2024-09-02', dueDate: '2024-09-11', status: 'Overdue' }
    ];

    // Example appointments data
    const appointments = [
        { title: 'Medical Checkup', date: '2024-09-18' },
        { title: 'Dental Cleaning', date: '2024-09-25' }
    ];

    // Function to populate table data with item number
    function populateTable(tableId, data, columns) {
        const tableBody = document.querySelector(`#${tableId} tbody`);
        tableBody.innerHTML = ''; // Clear any existing rows

        data.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = columns.map(col => `<td>${item[col]}</td>`).join('');
            tableBody.appendChild(row);
        });
    }

    // Count and display data
    document.getElementById('borrowed-items-count').textContent = borrowedItems.length;
    document.getElementById('returned-items-count').textContent = returnedItems.length;
    document.getElementById('overdue-items-count').textContent = overdueItems.length;
    document.getElementById('appointments-count').textContent = appointments.length;

    // Populate borrowed, returned, overdue, and appointments tables with the data
    function populateTableWithNumber(tableId, data, columns) {
        const tableBody = document.querySelector(`#${tableId} tbody`);
        tableBody.innerHTML = '';

        data.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${index + 1}</td>`; // Appointment/Item Number
            row.innerHTML += columns.map(col => `<td>${item[col]}</td>`).join('');
            tableBody.appendChild(row);
        });
    }

    // Show borrowed items table
    const borrowedCard = document.getElementById('borrowed-card');
    borrowedCard.addEventListener('click', function () {
        populateTableWithNumber('borrowed-table', borrowedItems, ['name', 'borrowDate', 'dueDate', 'status']);
        document.getElementById('borrowed-table').style.display = 'block';
        document.getElementById('returned-table').style.display = 'none';
        document.getElementById('overdue-table').style.display = 'none';
        document.getElementById('appointments-table').style.display = 'none';
    });

    // Show returned items table
    const returnedCard = document.getElementById('returned-card');
    returnedCard.addEventListener('click', function () {
        populateTableWithNumber('returned-table', returnedItems, ['name', 'borrowDate', 'dueDate', 'status']);
        document.getElementById('borrowed-table').style.display = 'none';
        document.getElementById('returned-table').style.display = 'block';
        document.getElementById('overdue-table').style.display = 'none';
        document.getElementById('appointments-table').style.display = 'none';
    });

    // Show overdue items table
    const overdueCard = document.getElementById('overdue-card');
    overdueCard.addEventListener('click', function () {
        populateTableWithNumber('overdue-table', overdueItems, ['name', 'borrowDate', 'dueDate', 'status']);
        document.getElementById('borrowed-table').style.display = 'none';
        document.getElementById('returned-table').style.display = 'none';
        document.getElementById('overdue-table').style.display = 'block';
        document.getElementById('appointments-table').style.display = 'none';
    });

    // Show appointments table
    const appointmentsCard = document.getElementById('appointments-card');
    appointmentsCard.addEventListener('click', function () {
        populateTableWithNumber('appointments-table', appointments, ['title', 'date']);
        document.getElementById('borrowed-table').style.display = 'none';
        document.getElementById('returned-table').style.display = 'none';
        document.getElementById('overdue-table').style.display = 'none';
        document.getElementById('appointments-table').style.display = 'block';
    });
});




// APPOINTMENT

// APPOINTMENT
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('appointment-form');
  const timeSlotSelect = document.getElementById('time-slot'); 
  const appointmentSuccess = document.getElementById('appointment-success');  

  // Object to track appointments per date and time slot (e.g., {'2024-09-29': {'8-9AM': 3, '9-10AM': 5}})
  const appointmentsByDate = {};

  // Enable time slot selection once a date is picked
  const dateInput = document.getElementById('appointment-date');
  dateInput.addEventListener('change', function() {
      const selectedDate = dateInput.value;

      if (selectedDate) {
          timeSlotSelect.disabled = false; // Enable time slot selection
          appointmentSuccess.style.display = 'none'; // Hide success message
          
          // Reset all time slots to be enabled initially
          const options = timeSlotSelect.querySelectorAll('option');
          options.forEach(option => option.disabled = false);
          
          // Check if the selected date has fully booked slots
          if (appointmentsByDate[selectedDate]) {
              const slotsForDate = appointmentsByDate[selectedDate];

              // Disable time slots that are fully booked (5 users) for this specific date
              Object.keys(slotsForDate).forEach(slot => {
                  if (slotsForDate[slot] >= 5) {
                      const option = document.querySelector(`#time-slot option[value="${slot}"]`);
                      if (option) {
                          option.disabled = true;
                      }
                  }
              });
          }
      } else {
          timeSlotSelect.disabled = true; // Disable time slot if no date is selected
      }
  });

  // Form submission handler
  form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission

      const selectedDate = dateInput.value;
      const selectedTimeSlot = timeSlotSelect.value;

      // Check if a date and time slot are selected
      if (!selectedDate || !selectedTimeSlot) {
          alert('Please select both a date and time slot.');
          return;
      }

      // Initialize the selected date in the appointmentsByDate object if it doesn't exist
      if (!appointmentsByDate[selectedDate]) {
          appointmentsByDate[selectedDate] = {};
      }

      // Initialize the selected time slot in the date if it doesn't exist
      if (!appointmentsByDate[selectedDate][selectedTimeSlot]) {
          appointmentsByDate[selectedDate][selectedTimeSlot] = 0;
      }

      // Check if the selected time slot is already fully booked for the selected date
      if (appointmentsByDate[selectedDate][selectedTimeSlot] >= 5) {
          alert('This time slot is fully booked for the selected date. Please choose another time or date.');
          return;
      }

      // Increment the count for the selected time slot on the selected date
      appointmentsByDate[selectedDate][selectedTimeSlot]++;

      // Check if the selected slot is now fully booked for that day (limit to 5 bookings per slot)
      if (appointmentsByDate[selectedDate][selectedTimeSlot] === 5) {
          const option = document.querySelector(`#time-slot option[value="${selectedTimeSlot}"]`);
          if (option) {
              option.disabled = true;
          }
      }

      // Show success message
      appointmentSuccess.style.display = 'block';
      appointmentSuccess.textContent = 'Your appointment has been scheduled!';
      
      form.reset(); // Reset form after submission
      timeSlotSelect.disabled = true; // Disable time slot again until date is selected
  });
});


// RESERVATION

document.addEventListener('DOMContentLoaded', function () {
    let map, marker;

    // Initialize Leaflet Map centered around Quezon City
    function initMap() {
        const quezonCityBounds = [
            [14.6166, 121.0246],  // North-West corner of Quezon City
            [14.6760, 121.1500]   // South-East corner of Quezon City
        ];

        map = L.map('map').setView([14.676041, 121.043700], 13); // Quezon City coordinates

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Limit the viewable map area to Quezon City
        map.setMaxBounds(quezonCityBounds);

        // Add a marker on click
        map.on('click', function(e) {
            placeMarker(e.latlng);
        });
    }

    function placeMarker(latlng) {
        // Remove existing marker if present
        if (marker) {
            map.removeLayer(marker);
        }

        // Add a new marker
        marker = L.marker(latlng).addTo(map);

        // Update the location field with the lat and lng
        document.getElementById('location').value = latlng.lat + ', ' + latlng.lng;
    }

    // Update the map based on the location entered by the user
    document.getElementById('location').addEventListener('input', function () {
        const locationInput = document.getElementById('location').value;

        // Use the location input as search criteria
        const geocoder = L.Control.Geocoder.nominatim();

        geocoder.geocode(locationInput, function (results) {
            if (results && results.length > 0) {
                const result = results[0];
                const latlng = result.center;

                // If the latlng is inside the Quezon City bounds, update the map
                if (latlng.lat >= 14.6166 && latlng.lat <= 14.6760 && latlng.lng >= 121.0246 && latlng.lng <= 121.1500) {
                    map.setView(latlng, 15);
                    placeMarker(latlng);
                } else {
                    alert('Location must be within Quezon City.');
                }
            } else {
                alert('Location not found.');
            }
        });
    });

    // Initialize the map
    initMap();

    // Reservation Form Submission
    const reservationForm = document.getElementById('reservation-form');
    reservationForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const item = document.getElementById('item').value;
        const quantity = document.getElementById('quantity').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const location = document.getElementById('location').value;

        if (!item || !quantity || !date || !time || !location) {
            alert('Please complete all fields');
            return;
        }

        // Availability Check (this is a basic example, replace with real logic)
        if (quantity > 50) { // Example: max availability is 50 units
            document.getElementById('availability-message').textContent = "Not enough items available.";
        } else {
            alert('Reservation submitted successfully!\n' + 
                  'Item: ' + item + '\n' +
                  'Quantity: ' + quantity + '\n' +
                  'Date: ' + date + '\n' +
                  'Time: ' + time + '\n' +
                  'Location: ' + location);
            reservationForm.reset();
            if (marker) {
                map.removeLayer(marker); // Remove marker after submission
            }
        }
    });
});

  

  
  