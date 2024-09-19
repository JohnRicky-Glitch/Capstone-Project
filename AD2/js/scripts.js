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


// ---------- CHARTS ----------

// BAR CHART
const barChartOptions = {
  series: [
    {
      data: [11, 6, 10, 2, 20],
      name: 'Products',
    },
  ],
  chart: {
    type: 'bar',
    background: 'transparent',
    height: 350,
    toolbar: {
      show: false,
    },
  },
  colors: ['#2962ff', '#d50000', '#2e7d32', '#ff6d00', '#583cb3'],
  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 4,
      horizontal: false,
      columnWidth: '40%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    opacity: 1,
  },
  grid: {
    borderColor: '#55596e',
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  legend: {
    labels: {
      colors: '#f5f7ff',
    },
    show: true,
    position: 'top',
  },
  stroke: {
    colors: ['transparent'],
    show: true,
    width: 2,
  },
  tooltip: {
    shared: true,
    intersect: false,
    theme: 'dark',
  },
  xaxis: {
    categories: ['WoodChair', 'Long Table', 'Table', 'Tent', 'Plastic Chair'],
    title: {
      style: {
        color: '#f5f7ff',
      },
    },
    axisBorder: {
      show: true,
      color: '#55596e',
    },
    axisTicks: {
      show: true,
      color: '#55596e',
    },
    labels: {
      style: {
        colors: '#f5f7ff',
      },
    },
  },
  yaxis: {
    title: {
      text: 'Count',
      style: {
        color: '#f5f7ff',
      },
    },
    axisBorder: {
      color: '#55596e',
      show: true,
    },
    axisTicks: {
      color: '#55596e',
      show: true,
    },
    labels: {
      style: {
        colors: '#f5f7ff',
      },
    },
  },
};

const barChart = new ApexCharts(
  document.querySelector('#bar-chart'),
  barChartOptions
);
barChart.render();

// AREA CHART
const areaChartOptions = {
  series: [
    {
      name: 'Borrowed Item',
      data: [31, 40, 28, 51, 42, 109, 100],
    },
  ],
  chart: {
    type: 'area',
    background: 'transparent',
    height: 350,
    stacked: false,
    toolbar: {
      show: false,
    },
  },
  colors: ['#00ab57', '#d50000'],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  dataLabels: {
    enabled: false,
  },
  fill: {
    gradient: {
      opacityFrom: 0.4,
      opacityTo: 0.1,
      shadeIntensity: 1,
      stops: [0, 100],
      type: 'vertical',
    },
    type: 'gradient',
  },
  grid: {
    borderColor: '#55596e',
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  legend: {
    labels: {
      colors: '#f5f7ff',
    },
    show: true,
    position: 'top',
  },
  markers: {
    size: 6,
    strokeColors: '#1b2635',
    strokeWidth: 3,
  },
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    axisBorder: {
      color: '#55596e',
      show: true,
    },
    axisTicks: {
      color: '#55596e',
      show: true,
    },
    labels: {
      offsetY: 5,
      style: {
        colors: '#f5f7ff',
      },
    },
  },
  yaxis: [
    {
      title: {
        text: 'Borrowed Items',
        style: {
          color: '#f5f7ff',
        },
      },
      labels: {
        style: {
          colors: ['#f5f7ff'],
        },
      },
    },
    // {
    //   opposite: true,
    //   title: {
    //     text: 'Sales Orders',
    //     style: {
    //       color: '#f5f7ff',
    //     },
    //   },
    //   labels: {
    //     style: {
    //       colors: ['#f5f7ff'],
    //     },
    //   },
    // },
  ],
  tooltip: {
    shared: true,
    intersect: false,
    theme: 'dark',
  },
};

const areaChart = new ApexCharts(
  document.querySelector('#area-chart'),
  areaChartOptions
);
areaChart.render();


// =======================RESERVATION MAIN CONTENT
// Filter table based on input
function filterTable(tableId) {
  const input = document.getElementById(`${tableId.split('-')[0]}-search`).value.toUpperCase();
  const table = document.getElementById(tableId);
  const rows = table.getElementsByTagName('tr');
  for (let i = 1; i < rows.length; i++) {
    let match = false;
    const columns = rows[i].getElementsByTagName('td');
    for (let j = 0; j < columns.length - 1; j++) {
      if (columns[j].innerText.toUpperCase().includes(input)) {
        match = true;
      }
    }
    rows[i].style.display = match ? '' : 'none';
  }
}

// Sort table columns
function sortTable(colIndex, tableId) {
  const table = document.getElementById(tableId);
  let switching = true, direction = 'asc', switchcount = 0;
  while (switching) {
    switching = false;
    const rows = table.rows;
    for (let i = 1; i < rows.length - 1; i++) {
      let shouldSwitch = false;
      const x = rows[i].getElementsByTagName('td')[colIndex];
      const y = rows[i + 1].getElementsByTagName('td')[colIndex];
      if (direction === 'asc' && x.innerText.toLowerCase() > y.innerText.toLowerCase()) {
        shouldSwitch = true;
        break;
      } else if (direction === 'desc' && x.innerText.toLowerCase() < y.innerText.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else if (switchcount === 0 && direction === 'asc') {
      direction = 'desc';
      switching = true;
    }
  }
}

// Confirm action before approving/denying
function confirmAction(button, status) {
  const confirmation = confirm(`Are you sure you want to ${status} this request?`);
  if (confirmation) {
    updateStatus(button, status);
  }
}

// Update status dynamically
function updateStatus(button, status) {
  const row = button.parentNode.parentNode;
  const statusSpan = row.getElementsByTagName('span')[0];
  statusSpan.className = `status-btn ${status}`;
  statusSpan.innerText = status.charAt(0).toUpperCase() + status.slice(1);
}


// Define months
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Select calendar elements
const monthPicker = document.getElementById('month-picker');
const yearPicker = document.getElementById('year-picker');
const daysContainer = document.getElementById('calendar-days');

// Initialize current month and year
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Function to generate days dynamically
function generateDays(month, year) {
  daysContainer.innerHTML = ''; // Clear previous days
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get total days in month
  const firstDayIndex = new Date(year, month, 1).getDay(); // Get the starting day of the week

  // Fill in blank days for days before the 1st
  for (let i = 0; i < firstDayIndex; i++) {
    const emptyDiv = document.createElement('div');
    daysContainer.appendChild(emptyDiv);
  }

  // Generate days with reservation info (if any)
  for (let i = 1; i <= daysInMonth; i++) {
    const dayDiv = document.createElement('div');
    dayDiv.innerText = i;

    // Example: Add some fake reservation info as data-reservation attribute
    dayDiv.setAttribute('data-reservation', `Reservation info for ${i}`);

    // Highlight the current date
    const today = new Date();
    if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      dayDiv.classList.add('current-date'); // Add custom styling for current date
    }

    // Add click event to filter table by date
    dayDiv.addEventListener('click', function() {
      filterTableByDate(i, month + 1, year); // Call the function to filter table (you'll define this)
    });

    daysContainer.appendChild(dayDiv);
  }
}

// Function to filter reservation table by date (you can define more complex logic here)
function filterTableByDate(day, month, year) {
  const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  const table = document.getElementById('reservation-table'); // Your table's ID
  const rows = table.getElementsByTagName('tr');
  
  for (let i = 1; i < rows.length; i++) {
    const reservationDate = rows[i].getAttribute('data-date'); // Assuming each row has a data-date attribute
    rows[i].style.display = reservationDate === formattedDate ? '' : 'none';
  }
}

// Event listeners for month and year changes
monthPicker.onclick = () => {
  currentMonth = (currentMonth + 1) % 12;
  monthPicker.innerText = months[currentMonth];
  generateDays(currentMonth, currentYear);
};

document.getElementById('next-year').onclick = () => {
  currentYear += 1;
  yearPicker.querySelector('#year').innerText = currentYear;
  generateDays(currentMonth, currentYear);
};

document.getElementById('prev-year').onclick = () => {
  currentYear -= 1;
  yearPicker.querySelector('#year').innerText = currentYear;
  generateDays(currentMonth, currentYear);
};

// Generate initial calendar
generateDays(currentMonth, currentYear);

// ======================= END CALENDAR LOGIC =======================

// =======================INVENTORY MAIN CONTENT 

// Function to open the item modal and populate it with item details 
function openModal(itemName, imageSrc, totalQty, reservedQty, outQty, status) { 
  document.getElementById('modalItemName').textContent = itemName;
  document.getElementById('modalImage').src = imageSrc;
  document.getElementById('modalTotalQuantity').textContent = totalQty;
  document.getElementById('modalReservedQuantity').textContent = reservedQty;
  document.getElementById('modalOutQuantity').textContent = outQty;
  document.getElementById('modalStatus').textContent = status;

  // Update status class
  const statusSpan = document.getElementById('modalStatus');
  statusSpan.className = 'status'; // Reset classes
  if (status.toLowerCase() === 'available') {
    statusSpan.classList.add('available');
  } else if (status.toLowerCase() === 'low stock') {
    statusSpan.classList.add('low-stock');
  } else if (status.toLowerCase() === 'out of stock') {
    statusSpan.classList.add('out-of-stock');
  }

  // Show the modal
  document.getElementById('itemModal').style.display = 'block';
}

// Function to close the item modal
function closeModal() {
  document.getElementById('itemModal').style.display = 'none';
}

// Function to open the map modal with the borrower's location
function openMapModal(lat, lng) {
  document.getElementById('mapModal').style.display = 'block';

  // Initialize the map only once
  if (!window.mapInitialized) {
    window.mapInitialized = true;
    window.map = L.map('map').setView([lat, lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(window.map);
    L.marker([lat, lng]).addTo(window.map)
      .bindPopup('Item Location')
      .openPopup();
  } else {
    window.map.setView([lat, lng], 13);
    L.marker([lat, lng]).addTo(window.map)
      .bindPopup('Item Location')
      .openPopup();
  }
}

// Function to close the map modal
function closeMapModal() {
  document.getElementById('mapModal').style.display = 'none';
}

// Function to view borrowed item details
function viewBorrowDetails(itemName, borrowerName, returnDate, location) {
  alert(`Item: ${itemName}\nBorrower: ${borrowerName}\nReturn Date: ${returnDate}\nLocation: ${location}`);
}

// Function to open Add New Item Modal
function openAddItemModal() {
  document.getElementById('addItemModal').style.display = 'block';
}

// Function to close Add New Item Modal
function closeAddItemModal() {
  document.getElementById('addItemModal').style.display = 'none';
}

// Function to add a new item to the inventory
document.getElementById('addItemForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const itemName = document.getElementById('newItemName').value.trim();
  const itemImage = document.getElementById('newItemImage').value.trim();
  const itemQuantity = parseInt(document.getElementById('newItemQuantity').value.trim(), 10);

  if (itemName === '' || itemImage === '' || isNaN(itemQuantity)) {
    alert('Please fill in all fields correctly.');
    return;
  }

  // Determine status based on quantity
  let status = 'Available';
  if (itemQuantity === 0) {
    status = 'Out of Stock';
  } else if (itemQuantity < 5) { // Threshold for low stock
    status = 'Low Stock';
  }

  // Create a new table row
  const table = document.getElementById('inventory-table').getElementsByTagName('tbody')[0];
  const newRow = table.insertRow();

  // Item Image
  const cellImage = newRow.insertCell(0);
  const img = document.createElement('img');
  img.src = itemImage;
  img.alt = itemName;
  img.className = 'item-image';
  cellImage.appendChild(img);

  // Item Name
  const cellName = newRow.insertCell(1);
  cellName.textContent = itemName;

  // Quantity
  const cellQty = newRow.insertCell(2);
  cellQty.textContent = itemQuantity;

  // Status
  const cellStatus = newRow.insertCell(3);
  const statusSpan = document.createElement('span');
  statusSpan.classList.add('status');
  if (status === 'Available') {
    statusSpan.classList.add('available');
  } else if (status === 'Low Stock') {
    statusSpan.classList.add('low-stock');
  } else if (status === 'Out of Stock') {
    statusSpan.classList.add('out-of-stock');
  }
  statusSpan.textContent = status;
  cellStatus.appendChild(statusSpan);

  // Actions
  const cellActions = newRow.insertCell(4);
  const viewButton = document.createElement('button');
  viewButton.classList.add('action-btn');
  viewButton.textContent = 'View';
  viewButton.onclick = function() {
    openModal(itemName, itemImage, itemQuantity, 0, 0, status);
  };
  cellActions.appendChild(viewButton);

  // Reset and close the form
  document.getElementById('addItemForm').reset();
  closeAddItemModal();
});

// Function to search through borrowed items
function searchBorrowedItems() {
  const input = document.getElementById('borrowedSearch');
  const filter = input.value.toLowerCase();
  const table = document.getElementById('borrowed-table');
  const tr = table.getElementsByTagName('tr');

  for (let i = 1; i < tr.length; i++) { // Start from 1 to skip header
    const tdItem = tr[i].getElementsByTagName('td')[1];
    const tdBorrower = tr[i].getElementsByTagName('td')[2];
    if (tdItem || tdBorrower) {
      const itemText = tdItem.textContent || tdItem.innerText;
      const borrowerText = tdBorrower.textContent || tdBorrower.innerText;
      if (itemText.toLowerCase().indexOf(filter) > -1 || borrowerText.toLowerCase().indexOf(filter) > -1) {
        tr[i].style.display = '';
      } else {
        tr[i].style.display = 'none';
      }
    }       
  }
}

// Close modals when clicking outside the modal content
window.onclick = function(event) {
  const itemModal = document.getElementById('itemModal');
  const mapModal = document.getElementById('mapModal');
  const addItemModal = document.getElementById('addItemModal');

  if (event.target == itemModal) { 
    closeModal(); 
  } else if (event.target == mapModal) { 
    closeMapModal(); 
  } else if (event.target == addItemModal) {
    closeAddItemModal();
  }
}

// =======================NOTIFICATION MAIN CONTENT 



// =======================USER MANAGEMENT MAIN CONTENT 
// Sample user data with Barangay ID
let users = [
  { id: 1, name: "Juan Dela Cruz", barangayId: "12345", status: "active", role: "Admin" },
  { id: 2, name: "Maria Santos", barangayId: "67890", status: "inactive", role: "User" },
  { id: 3, name: "John Doe", barangayId: "54321", status: "banned", role: "User" },
  // Additional sample users...
];

// Function to render users into the table (includes Barangay ID instead of email)
function renderUserTable() {
  const tableBody = document.querySelector('#user-table tbody');
  tableBody.innerHTML = ''; // Clear existing table rows

  users.forEach(user => {
    const row = `
      <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.barangayId}</td> <!-- Display Barangay ID instead of email -->
        <td><span class="status ${user.status}">${capitalize(user.status)}</span></td>
        <td>${user.role}</td>
        <td>
          <button class="action-btn" onclick="viewUser(${user.id})">View</button>
          <button class="action-btn" onclick="editUser(${user.id})">Edit</button>
          <button class="action-btn delete" onclick="deleteUser(${user.id})">Delete</button>
          <button class="action-btn ban" onclick="toggleUserBan(${user.id}, '${user.status}')">${user.status === 'banned' ? 'Unban' : 'Ban'}</button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });

  updateStatistics();
}

// Function to capitalize the first letter of the status
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Function to register a user by matching Barangay ID and Name
function registerUser(name, barangayId) {
  const user = users.find(user => user.name.toLowerCase() === name.toLowerCase() && user.barangayId === barangayId);

  if (user && user.status === 'inactive') {
    user.status = 'active'; // Activate user
    alert(`Account for ${user.name} has been activated.`);
  } else {
    alert('No matching account found or the account is already active.');
  }

  renderUserTable(); // Re-render table to show updated status
}

// User search function
function filterUsers() {
  const searchQuery = document.getElementById('user-search').value.toLowerCase();
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery) || user.email.toLowerCase().includes(searchQuery)
  );
  updateTable(filteredUsers);
}

// Filter users by status
function filterUsersByStatus() {
  const status = document.getElementById('user-status-filter').value;
  const filteredUsers = status === 'all' ? users : users.filter(user => user.status === status);
  updateTable(filteredUsers);
}

// Update the table with filtered/sorted data
function updateTable(filteredUsers) {
  const tableBody = document.querySelector('#user-table tbody');
  tableBody.innerHTML = ''; // Clear existing table rows

  filteredUsers.forEach(user => {
    const row = `
      <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td><span class="status ${user.status}">${capitalize(user.status)}</span></td>
        <td>${user.role}</td>
        <td>
          <button class="action-btn" onclick="viewUser(${user.id})">View</button>
          <button class="action-btn" onclick="editUser(${user.id})">Edit</button>
          <button class="action-btn delete" onclick="deleteUser(${user.id})">Delete</button>
          <button class="action-btn ban" onclick="toggleUserBan(${user.id}, '${user.status}')">${user.status === 'banned' ? 'Unban' : 'Ban'}</button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// Add new user with inactive status and Barangay ID (no email or password)
document.getElementById('add-user-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const name = document.getElementById('new-user-name').value;
  const barangayId = document.getElementById('new-user-barangay-id').value; // Capture Barangay ID

  const newUser = {
    id: users.length + 1,
    name,
    barangayId,  // Add Barangay ID
    status: 'inactive',  // Default to inactive
    role: 'User'
  };

  users.push(newUser);
  renderUserTable();
  this.reset(); // Clear the form
});

// View user details
function viewUser(userId) {
  const user = users.find(user => user.id === userId);
  alert(`Viewing details for ${user.name}`);
}

// Edit user details
function editUser(userId) {
  const user = users.find(user => user.id === userId);
  alert(`Editing details for ${user.name}`);
}

// Delete user
function deleteUser(userId) {
  users = users.filter(user => user.id !== userId);
  renderUserTable();
}

// Toggle user ban/unban status
function toggleUserBan(userId, currentStatus) {
  const user = users.find(user => user.id === userId);
  user.status = currentStatus === 'banned' ? 'active' : 'banned';
  renderUserTable();
}

// Update statistics section
function updateStatistics() {
  document.getElementById('total-users').textContent = users.length;
  document.getElementById('active-users').textContent = users.filter(user => user.status === 'active').length;
  document.getElementById('inactive-users').textContent = users.filter(user => user.status === 'inactive').length;
  document.getElementById('banned-users').textContent = users.filter(user => user.status === 'banned').length;
}

// Initialize the table 
renderUserTable();


// REPORT MANAGEMENT

document.addEventListener('DOMContentLoaded', () => {
  // Fetch report data from the backend
  fetch('/api/report-summary')  // Replace with your API endpoint
    .then(response => response.json())
    .then(data => {
      // Populate summary cards
      document.getElementById('total-borrowed').textContent = data.totalBorrowed;
      document.getElementById('total-returned').textContent = data.totalReturned;
      document.getElementById('damaged-items').textContent = data.damagedItems;
      document.getElementById('overdue-items').textContent = data.overdueItems;

      // Populate top borrowers and most borrowed items
      const topBorrowers = data.topBorrowers.map(user => `<li>${user.name}</li>`).join('');
      document.getElementById('top-borrowers').innerHTML = topBorrowers;

      const mostBorrowedItems = data.mostBorrowedItems.map(item => `<li>${item.name}</li>`).join('');
      document.getElementById('most-borrowed-items').innerHTML = mostBorrowedItems;
    });

  // Event listener for generating custom reports
  document.getElementById('generate-report').addEventListener('click', () => {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const category = document.getElementById('category-filter').value;
    const user = document.getElementById('user-filter').value;

    // Fetch and populate detailed report based on filters
    fetch(`/api/generate-report?start=${startDate}&end=${endDate}&category=${category}&user=${user}`)
      .then(response => response.json())
      .then(data => {
        // Populate tables with detailed data (e.g., borrowed-returned-report, damaged-items-report)
        populateTable('borrowed-returned-report', data.borrowedReturnedItems);
        populateTable('damaged-items-report', data.damagedItems);
        populateTable('overdue-items-report', data.overdueItems);
      });
  });

  // Helper function to populate tables
  function populateTable(tableId, data) {
    const tableBody = document.querySelector(`#${tableId} tbody`);
    tableBody.innerHTML = '';  // Clear current data
    data.forEach(row => {
      const tr = document.createElement('tr');
      Object.values(row).forEach(value => {
        const td = document.createElement('td');
        td.textContent = value;
        tr.appendChild(td);
      });
      tableBody.appendChild(tr);
    });
  }

  // Download report as Excel
  document.querySelectorAll('.download-report').forEach(button => {
    button.addEventListener('click', () => {
      const reportType = button.getAttribute('data-report');
      window.location.href = `/api/download-report?type=${reportType}`;  // Adjust API endpoint for Excel export
    });
  });
});

// CHART

const ctx = document.getElementById('borrowed-damaged-chart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['January', 'February', 'March', 'April'],  // Example months
    datasets: [{
      label: 'Borrowed Items',
      data: [10, 20, 30, 40],  // Replace with your data
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }, {
      label: 'Damaged Items',
      data: [5, 10, 15, 5],  // Replace with your data
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
