async function loadPartial(elementId, file) {

    const target = document.getElementById(elementId);

    if (!target)
        return;

    const response = await fetch(file);

    if (!response.ok)
        return;

    target.innerHTML = await response.text();

}

document.addEventListener("DOMContentLoaded", async () => {

    await Promise.all([
        loadPartial("navbar", "partials/navbar.html"),
        loadPartial("footer", "partials/footer.html")
    ]);

    activateNavigation();

    initializeAnimations();

});

function activateNavigation() {

    const current =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-link").forEach(link => {

        if (link.getAttribute("href") === current) {

            link.classList.add("active");

        }

    });

}

function initializeAnimations() {

    document.querySelectorAll(".fade-up").forEach(el => {

        el.classList.add("show");

    });

}
