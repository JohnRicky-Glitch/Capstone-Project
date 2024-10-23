// HEADER TOGGLE
function toggleAccountDropdown() {
  const dropdown = document.getElementById('accountDropdown');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function logout() {
  // Here you can add the logout functionality
  console.log('User logged out');
  // Redirect to login page or call the logout API
  window.location.href = 'login.html'; // Example redirect
}

// Optional: Close dropdown when clicking outside
window.onclick = function(event) {
  if (!event.target.matches('.account-icon')) {
    const dropdown = document.getElementById('accountDropdown');
    if (dropdown.style.display === 'block') {
      dropdown.style.display = 'none';
    }
  }
}


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
        { title: 'Community Workshop', date: 'September 25, 2024', description: 'A workshop for the local community to enhance skills.' },
        { title: 'Cleanup Drive', date: 'October 1, 2024', description: 'Join us in cleaning up the neighborhood!' },
        { title: 'Charity Fun Run', date: 'October 10, 2024', description: 'Participate in our charity run to raise funds for a good cause.' }
    ];
    
    const eventList = document.getElementById('event-list');
    const modal = document.getElementById('eventModal');
    const modalBodyContent = document.getElementById('modal-body-content');
    const eventModalLabel = document.getElementById('eventModalLabel');
    const closeModal = document.querySelector('.close');
    
    // Populate events
    events.forEach((event) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerHTML = `
            <strong>${event.title}</strong> 
            <span>${event.date}</span>
        `;
        
        // Add click event listener to show modal with event details
        listItem.addEventListener('click', () => {
            eventModalLabel.textContent = event.title;
            modalBodyContent.innerHTML = `
                <p><strong>Date:</strong> ${event.date}</p>
                <p>${event.description}</p>
            `;
            modal.style.display = 'flex';  // Show modal
        });
    
        eventList.appendChild(listItem);
    });
    
    // Close modal when "x" is clicked
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
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

// Handle modal display and navigation
document.getElementById("next-button").onclick = function() { 
    document.getElementById("reservation").style.display = "none";
    document.getElementById("reservation-form-modal").style.display = "block";
};

// Close modals
document.querySelectorAll(".close").forEach(closeButton => {
    closeButton.onclick = function() {
        this.closest(".modal").style.display = "none";
    };
});

// Leaflet map initialization
document.addEventListener("DOMContentLoaded", function() {
    // Create the map and set default view on 19th Ave, Quezon City
    var map = L.map('map').setView([14.6214, 121.0656], 16); // Default to 19th Ave, Quezon City

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add a red outline around San Roque (adjust the polygon coordinates as needed)
    var redOutline = L.polygon([
        [14.6610, 121.0320], // Coordinates outlining San Roque
        [14.6580, 121.0380],
        [14.6550, 121.0350],
        [14.6585, 121.0305]
    ], {
        color: 'red',
        fillOpacity: 0.1
    }).addTo(map);

    // Allow users to pin location
    var marker;
    map.on('click', function(e) {
        // Remove existing marker if any
        if (marker) {
            map.removeLayer(marker);
        }

        // Add new marker at clicked location with popup showing coordinates
        marker = L.marker(e.latlng).addTo(map)
            .bindPopup("Pinned Location: " + e.latlng.lat + ", " + e.latlng.lng)
            .openPopup();
    });
});

// Ensure map covers the full container (CSS)
const mapStyles = `
  #map {
    width: 100%;  /* Ensure the map takes the full width of its container */
    height: 400px;  /* Adjust the height as necessary */
  }
`;

// Inject map styles into the head dynamically
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = mapStyles;
document.head.appendChild(styleSheet);

  
// NOTIFICATION SECTION!================

const notifications = [
    { type: 'alert', title: 'System Maintenance', body: 'Scheduled maintenance will occur on October 25, 2024.', timestamp: '2 hours ago' },
    { type: 'reminder', title: 'Document Submission', body: 'Please submit your pending documents by October 30, 2024.', timestamp: '1 day ago' },
    { type: 'alert', title: 'Password Change Required', body: 'Your password must be changed before November 1, 2024.', timestamp: '2 days ago' },
    { type: 'reminder', title: 'Meeting Reminder', body: 'Team meeting scheduled for October 27, 2024.', timestamp: '3 days ago' }
];

const notificationList = document.getElementById('notification-list');
const noNotificationsMessage = document.getElementById('no-notifications-message');
const notificationModal = document.getElementById('notificationModal');
const notificationModalTitle = document.getElementById('notificationModalTitle');
const notificationModalBody = document.getElementById('notificationModalBody');
const closeModalBtn = document.getElementById('closeModalBtn');

// Function to render notifications
function renderNotifications() {
    notificationList.innerHTML = ''; // Clear existing notifications

    if (notifications.length === 0) {
        noNotificationsMessage.style.display = 'block'; // Show no notifications message
    } else {
        noNotificationsMessage.style.display = 'none'; // Hide no notifications message

        notifications.forEach((notification) => {
            const listItem = document.createElement('li');
            listItem.classList.add(notification.type === 'alert' ? 'notification-type-alert' : 'notification-type-reminder');

            listItem.innerHTML = `
                <div>
                    <div class="notification-title">${notification.title}</div>
                    <div class="notification-body">${notification.body}</div>
                </div>
                <div class="notification-timestamp">${notification.timestamp}</div>
            `;

            // Add click event to show modal with notification details
            listItem.addEventListener('click', () => {
                notificationModalTitle.textContent = notification.title;
                notificationModalBody.innerHTML = `
                    <p><strong>Date:</strong> ${notification.timestamp}</p>
                    <p>${notification.body}</p>
                `;
                notificationModal.style.display = 'block'; // Show the modal
            });

            notificationList.appendChild(listItem);
        });
    }
}

// Close modal when close button is clicked
closeModalBtn.addEventListener('click', () => {
    notificationModal.style.display = 'none'; // Hide the modal when the button is clicked
});

// Close modal when clicking outside the modal content (optional)
window.addEventListener('click', (e) => {
    if (e.target === notificationModal) {
        notificationModal.style.display = 'none';
    }
});

// Initially render the notifications when the page loads
document.addEventListener('DOMContentLoaded', renderNotifications);