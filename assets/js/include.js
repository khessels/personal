/* ============================================================
   KEES HESSELS — SHARED COMPONENT LOADER
============================================================ */

document.addEventListener("DOMContentLoaded", async () => {

    /*
     * ----------------------------------------------------------
     * LOAD SHARED COMPONENT
     * ----------------------------------------------------------
     */

    async function loadComponent(targetId, file) {

        const target = document.getElementById(targetId);

        if (!target) {
            return;
        }

        try {

            const response = await fetch(file);

            if (!response.ok) {
                throw new Error(
                    `Unable to load ${file}: ${response.status}`
                );
            }

            const html = await response.text();

            target.innerHTML = html;

        } catch (error) {

            console.error(
                `Component loading error: ${file}`,
                error
            );

        }

    }



    /*
     * ----------------------------------------------------------
     * LOAD NAVIGATION AND FOOTER
     * ----------------------------------------------------------
     */

    await Promise.all([

        loadComponent(
            "navbar",
            "partials/navbar.html"
        ),

        loadComponent(
            "footer",
            "partials/footer.html"
        )

    ]);



    /*
     * ----------------------------------------------------------
     * DETERMINE CURRENT PAGE
     * ----------------------------------------------------------
     */

    function getCurrentPage() {

        let path =
            window.location.pathname;

        let filename =
            path.split("/").pop();


        /*
         * Empty filename means the visitor is
         * normally at the root of the website.
         */

        if (
            !filename ||
            filename === ""
        ) {

            return "home";

        }


        /*
         * Convert filename into our navigation
         * page identifiers.
         */

        const pageMap = {

            "index.html":
                "home",

            "what-i-do.html":
                "what-i-do",

            "work.html":
                "work",

            "about.html":
                "about",

            "contact.html":
                "contact"

        };


        return (
            pageMap[filename] ||
            null
        );

    }



    /*
     * ----------------------------------------------------------
     * SET ACTIVE NAVIGATION ITEM
     * ----------------------------------------------------------
     */

    const currentPage =
        getCurrentPage();


    if (currentPage) {

        const navigationLinks =
            document.querySelectorAll(
                "[data-page]"
            );


        navigationLinks.forEach(link => {

            const page =
                link.dataset.page;


            if (
                page === currentPage
            ) {

                link.classList.add(
                    "active"
                );

                link.setAttribute(
                    "aria-current",
                    "page"
                );

            }

        });

    }



    /*
     * ----------------------------------------------------------
     * MOBILE NAVIGATION
     * ----------------------------------------------------------
     */

    const menuToggle =
        document.getElementById(
            "menu-toggle"
        );

    const mobileMenu =
        document.getElementById(
            "mobile-menu"
        );


    if (
        menuToggle &&
        mobileMenu
    ) {


        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    menuToggle.getAttribute(
                        "aria-expanded"
                    ) === "true";


                menuToggle.setAttribute(
                    "aria-expanded",
                    String(!isOpen)
                );


                mobileMenu.classList.toggle(
                    "open",
                    !isOpen
                );


                document.body.classList.toggle(
                    "menu-open",
                    !isOpen
                );

            }
        );



        /*
         * ------------------------------------------------------
         * CLOSE MOBILE MENU AFTER CLICKING A LINK
         * ------------------------------------------------------
         */

        mobileMenu
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );


                        mobileMenu.classList.remove(
                            "open"
                        );


                        document.body.classList.remove(
                            "menu-open"
                        );

                    }
                );

            });

    }



    /*
     * ----------------------------------------------------------
     * FOOTER YEAR
     * ----------------------------------------------------------
     */

    const footerYear =
        document.getElementById(
            "footer-year"
        );


    if (footerYear) {

        footerYear.textContent =
            new Date().getFullYear();

    }



    /*
     * ----------------------------------------------------------
     * HEADER SCROLL STATE
     * ----------------------------------------------------------
     *
     * Adds "scrolled" to the header after the visitor
     * moves away from the top of the page.
     */

    const siteHeader =
        document.querySelector(
            ".site-header"
        );


    if (siteHeader) {

        const updateHeader =
            () => {

                if (
                    window.scrollY > 30
                ) {

                    siteHeader.classList.add(
                        "scrolled"
                    );

                } else {

                    siteHeader.classList.remove(
                        "scrolled"
                    );

                }

            };


        updateHeader();


        window.addEventListener(
            "scroll",
            updateHeader,
            {
                passive: true
            }
        );

    }



    /*
     * ----------------------------------------------------------
     * SMOOTH SCROLL FOR SAME-PAGE LINKS
     * ----------------------------------------------------------
     */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });

});