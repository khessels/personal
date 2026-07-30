/* ============================================
   Scroll Animations
============================================ */

const observer = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.15
});

document.querySelectorAll(

".fade-up,.fade-left,.fade-right,.zoom"

).forEach(el=>observer.observe(el));
