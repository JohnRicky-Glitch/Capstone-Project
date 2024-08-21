<script>
        // Toggling the dashboard content
        const dashboardLink = document.getElementById('dashboard-link');
        const mainContent = document.getElementById('main-content');

        dashboardLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior
            if (mainContent.style.display === 'none' || mainContent.style.display === '') {
                mainContent.style.display = 'block';
            } else {
                mainContent.style.display = 'none';
            }
        });

        // Hide the content by default
        mainContent.style.display = 'none';
    </script>