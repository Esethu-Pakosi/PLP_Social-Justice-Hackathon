function toggleMenu() {
    sidebar = document.getElementById("sidebar");

    if (sidebar.style.display === "none") {
        sidebar.style.display = "flex";
    } else {
        sidebar.style.display = "none";
    }
}