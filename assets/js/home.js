/* ============================================================
   KEES HESSELS — HOMEPAGE JAVASCRIPT
============================================================ */

(function () {

    "use strict";


    /* ========================================================
       ELEMENTS
    ======================================================== */

    const siteNav = document.getElementById("site-nav");

    const menuToggle =
        document.getElementById("menu-toggle");

    const mobileMenu =
        document.getElementById("mobile-menu");

    const hero =
        document.getElementById("hero");


    /* ========================================================
       NAVIGATION — SCROLL EFFECT
    ======================================================== */

    function updateNavigation() {

        if (!siteNav) {
            return;
        }

        if (window.scrollY > 30) {

            siteNav.classList.add("scrolled");

        } else {

            siteNav.classList.remove("scrolled");

        }

    }


    /* ========================================================
       MOBILE MENU
    ======================================================== */

    function openMobileMenu() {

        if (!menuToggle || !mobileMenu) {
            return;
        }

        menuToggle.classList.add("open");

        mobileMenu.classList.add("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation"
        );

        document.body.classList.add(
            "mobile-menu-open"
        );

    }


    function closeMobileMenu() {

        if (!menuToggle || !mobileMenu) {
            return;
        }

        menuToggle.classList.remove("open");

        mobileMenu.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation"
        );

        document.body.classList.remove(
            "mobile-menu-open"
        );

    }


    function toggleMobileMenu() {

        if (!mobileMenu) {
            return;
        }

        if (mobileMenu.classList.contains("open")) {

            closeMobileMenu();

        } else {

            openMobileMenu();

        }

    }


    /* ========================================================
       MOBILE MENU BUTTON
    ======================================================== */

    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            toggleMobileMenu
        );

    }


    /* ========================================================
       CLOSE MOBILE MENU AFTER LINK CLICK
    ======================================================== */

    if (mobileMenu) {

        const mobileLinks =
            mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });

    }


    /* ========================================================
       CLOSE MENU WITH ESCAPE
    ======================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                mobileMenu &&
                mobileMenu.classList.contains("open")
            ) {

                closeMobileMenu();

                if (menuToggle) {

                    menuToggle.focus();

                }

            }

        }
    );


    /* ========================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ======================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (
                !mobileMenu ||
                !menuToggle
            ) {
                return;
            }

            if (
                !mobileMenu.classList.contains("open")
            ) {
                return;
            }

            const clickedInsideMenu =
                mobileMenu.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedToggle
            ) {

                closeMobileMenu();

            }

        }
    );


    /* ========================================================
       HERO SCROLL LINK
    ======================================================== */

    const heroScroll =
        document.querySelector(".hero-scroll");

    if (heroScroll) {

        heroScroll.addEventListener(
            "click",
            function (event) {

                const targetId =
                    heroScroll.getAttribute("href");

                if (!targetId) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }
        );

    }


    /* ========================================================
       HERO PARALLAX
       
       Very subtle movement only.
       Disabled on touch devices and reduced-motion systems.
    ======================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    const isTouchDevice =
        window.matchMedia(
            "(hover: none)"
        ).matches;


    if (
        hero &&
        !prefersReducedMotion &&
        !isTouchDevice
    ) {

        let ticking = false;


        function updateHeroParallax() {

            if (!ticking) {

                window.requestAnimationFrame(
                    function () {

                        const scrollY =
                            window.scrollY;

                        if (scrollY <= window.innerHeight) {

                            const image =
                                hero.querySelector(
                                    ".hero-image"
                                );

                            if (image) {

                                const movement =
                                    scrollY * 0.08;

                                image.style.transform =
                                    "scale(1.01) translateY(" +
                                    movement +
                                    "px)";

                            }

                        }

                        ticking = false;

                    }
                );

                ticking = true;

            }

        }


        window.addEventListener(
            "scroll",
            updateHeroParallax,
            {
                passive: true
            }
        );

    }


    /* ========================================================
       INITIAL NAVIGATION STATE
    ======================================================== */

    updateNavigation();


    /* ========================================================
       SCROLL LISTENER
    ======================================================== */

    window.addEventListener(
        "scroll",
        updateNavigation,
        {
            passive: true
        }
    );


    /* ========================================================
       RESIZE HANDLER
    ======================================================== */

    let resizeTimer;


    window.addEventListener(
        "resize",
        function () {

            window.clearTimeout(
                resizeTimer
            );

            resizeTimer =
                window.setTimeout(
                    function () {

                        /*
                         * If the browser is resized from
                         * mobile to desktop, close the
                         * mobile navigation.
                         */

                        if (
                            window.innerWidth > 991 &&
                            mobileMenu &&
                            mobileMenu.classList.contains("open")
                        ) {

                            closeMobileMenu();

                        }

                    },
                    150
                );

        }
    );


})();