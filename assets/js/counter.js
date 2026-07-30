const counters=document.querySelectorAll("[data-counter]");

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(!entry.isIntersecting)return;

const el=entry.target;

const target=parseInt(el.dataset.counter);

let current=0;

const timer=setInterval(()=>{

current+=Math.ceil(target/60);

if(current>=target){

current=target;

clearInterval(timer);

}

el.textContent=current+"+";

},25);

observer.unobserve(el);

});

});

counters.forEach(c=>observer.observe(c));
