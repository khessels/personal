/*
=====================================================
Portfolio Website
Kees Hessels
=====================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       Navbar shadow
    ========================================== */

    const navbar = document.querySelector(".navbar");

    function updateNavbar(){

        if(!navbar) return;

        if(window.scrollY > 25){

            navbar.classList.add("navbar-scrolled");

        }else{

            navbar.classList.remove("navbar-scrolled");

        }

    }

    updateNavbar();

    window.addEventListener("scroll", updateNavbar);


    /* ==========================================
       Smooth scrolling
    ========================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

        anchor.addEventListener("click",function(e){

            const target=document.querySelector(this.getAttribute("href"));

            if(!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth"

            });

        });

    });


    /* ==========================================
       Fade animation
    ========================================== */

    const observer = new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("visible");

            }

        });

    },{

        threshold:0.15

    });

    document.querySelectorAll(".fade-in").forEach(item=>{

        observer.observe(item);

    });

});
