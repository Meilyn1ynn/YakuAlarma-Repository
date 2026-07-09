document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // MENU RESPONSIVE
    // ==========================
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");

    if (menuToggle && sidebar) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation(); 
            sidebar.classList.toggle("active");
        });

        document.addEventListener("click", (e) => {
            if (sidebar.classList.contains("active") && !sidebar.contains(e.target)) {
                sidebar.classList.remove("active");
            }
        });
    }
});