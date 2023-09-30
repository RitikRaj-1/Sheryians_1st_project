var timeout;

const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
});

function firstPageAnime(){
    var t1 = gsap.timeline();
    t1.from("#nav",{
        y: '-10',
        opacity: 0,
        duration: 1,
        ease: Expo.easeInOut,
    });
    t1.to(".boundingelem",{
        y:'0',
        duration:1.7,
        ease: Expo.easeInOut,
        delay: -1,
        stagger: .2,
    });
    t1.from("#herofooter",{
        y:'-10',
        opacity: 0,
        duration:1.5,
        ease: Expo.easeInOut,
        delay: -1,
        // stagger: .2,
    });
}

function circlemousefollower(xscale, yscale){
    window.addEventListener("mousemove",function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale}, ${yscale})`;
        // console.log(dets.clientX, dets.clientY)
    })
}

function circleChaptakaro(){
    var xscale = 1;
    var yscale = 1;
    
    var xprev = 0;
    var yprev = 0;
    
    window.addEventListener("mousemove",function(dets){
        this.clearTimeout(timeout);
        var xdiff = dets.clientX - xprev;
        var ydiff = dets.clientY - xprev;
        xscale = gsap.utils.clamp(.8,1.2,xdiff);
        yscale = gsap.utils.clamp(.8,1.2,ydiff);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circlemousefollower(xscale, yscale);
        timeout = setTimeout(function(){
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${1}, ${1})`;
        },100);
    })
}

circleChaptakaro();
circlemousefollower();
firstPageAnime();


document.querySelectorAll(".element").forEach(function(element){
    
    var rotate = 0;
    var diffrot = 0;
    element.addEventListener("mouseleave",function(dets){

        var diff = dets.clientY - element.getBoundingClientRect().top;
        console.log(diff);
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(element.querySelector("img"),{
        opacity: 0,
        ease: Power3,
        duration: .5,
        });
    });
    element.addEventListener("mousemove",function(dets){

        var diff = dets.clientY - element.getBoundingClientRect().top;
        console.log(diff);
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(element.querySelector("img"),{
        opacity: 1,
        ease: Power3,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20,20,diffrot*0.5),
        });
    });
});

var span = document.getElementById('clock');

function time() {
  var d = new Date();
  var s = d.getSeconds();
  var m = d.getMinutes();
  var h = d.getHours();
  var ampm = d.getHours( ) >= 12 ? ' PM' : ' AM';

  span.textContent = 
    ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2) + ampm;
}

setInterval(time, 1000);