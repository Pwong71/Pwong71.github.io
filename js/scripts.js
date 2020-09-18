/*eslint-env browser*/
window.addEventListener('DOMContentLoaded', () => {
//initiate scroll reveal
ScrollReveal().reveal('.content h1', {distance: '75px', origin: 'bottom', viewFactor: 0.4, duration: 700, delay: 300});
ScrollReveal().reveal('.modal', {distance: '75px', origin: 'bottom', viewFactor: 0.5, duration: 700, delay: 200});
ScrollReveal().reveal('.main-carousel', {distance: '75px', origin: 'bottom', viewFactor: 0.4, duration: 700, delay: 300})
ScrollReveal().reveal('.links div', {distance: '100px', origin: 'left', duration: 500, reset: true});
 
//initiate parallax library
if (document.querySelector('.parallax span')){
    var rellax = new Rellax('.parallax span');
} 
if (document.querySelector('#chipo-parallax span')){
    var rellax = new Rellax('#chipo-parallax span');
}
if (document.querySelector('#charles-parallax span')){
    var rellax = new Rellax('#charles-parallax span');
}

const side = document.querySelector('.side');
let sideItem = document.querySelectorAll('.side > span');
let conTent = document.querySelectorAll('.content');
let oldScroll = 0;
let navBar = document.querySelector('nav');
const pagePath = window.location.pathname;
let currentSession = window.sessionStorage;
let indexButts = document.querySelector('#butts');    

//clean up when animation finishes
animationClean = () => {
    bodyScrollLock.disableBodyScroll(document.body, {reserveScrollBarGap: true,});
    setTimeout(() => {
        bodyScrollLock.enableBodyScroll(document.body);
        document.body.classList.remove('loading');
    }, 4200);
}
//handle landing butts animation
if (pagePath == '/' || pagePath == '/index.html') {
    if (currentSession.getItem("animation") == 'played'){
        //play animation again if index is reloaded
        if (currentSession.getItem("lastURL") == '/' || currentSession.getItem("lastURL") == '/index.html') {
            animationClean();
        } else {
            document.body.classList.remove('loading', 'load-ease');
        }
    } else {
        animationClean();
        currentSession.setItem("animation", "played");
    }
    document.querySelector('#skip-button').addEventListener('click', () => {
        bodyScrollLock.enableBodyScroll(document.body);
        document.body.classList.remove('loading');
    });
};
//store the current page path
currentSession.setItem("lastURL", pagePath);
    
//dropdown click event
navBar.querySelector('span').addEventListener('click', () => {
    navBar.classList.toggle('dropdown');
})
    
//scroll event
window.onscroll = () => {
    //hide the navbar when the window is scrolled down and vice versa
    let newScroll = document.documentElement.scrollTop || document.body.scrollTop || window.scrollY;
    if (newScroll > 0 && newScroll >= oldScroll){
        oldScroll = newScroll;
        navBar.style.top = '-100px';
        if (side && (window.matchMedia('screen and (max-width:856px)').matches)) {side.style.top = "";};
    } else {
        oldScroll = newScroll;
        navBar.style.top = '0';
        if (side && (window.matchMedia('screen and (max-width:856px)').matches)) {side.style.top = "0px";} else if (side) {side.style.top = "";};
    }
    //hide the navbar in play case studies
    if (document.querySelector('#newyork') || document.querySelector('#summer19')){
        if (document.documentElement.scrollTop < window.innerHeight || window.scrollY < window.innerHeight){
            navBar.style.opacity = '0';
        } else {
            navBar.style.opacity = '1';
        }
    }
    //move a sidebar tab when the corresponding content section is in view
    if (conTent[0] && sideItem[0]){
        for (let i = 0; i < 5; i++){
            if ((conTent[i].getBoundingClientRect().top >= (window.innerHeight/1.2 || document.documentElement.clientHeight/1.2) && conTent[i].getBoundingClientRect().bottom > 0) || ((conTent[i].getBoundingClientRect().bottom <= window.innerHeight/2) && conTent[i].getBoundingClientRect().top < 0)){
                sideItem[i].classList.remove('active');
            } else {
                sideItem[i].classList.add('active');
            }
        }
    }
   //change bg color when banner is in viewport
    let bannerScr = document.querySelector('.banner');
    if (bannerScr){
        bannerScr = bannerScr.getBoundingClientRect();
        if ((bannerScr.top >= (window.innerHeight/2 || document.documentElement.clientHeight/2) && bannerScr.bottom > 0) || (bannerScr.bottom <= (window.innerHeight/10 || document.documentElement.clientHeight/10) && bannerScr.top < 0)){
            document.querySelector('.casestudy').style.backgroundColor = "";
            navBar.style.opacity = "1";
            side.style.opacity = "1";
        } else {
            document.querySelector('.casestudy').style.backgroundColor = "black";
            navBar.style.opacity = "0";
            side.style.opacity = "0";
        } 
    }
    let bannerScr2 = document.querySelector('.banner2');
    if (bannerScr2){
        bannerScr2 = bannerScr2.getBoundingClientRect();
        if ((bannerScr2.top >= (window.innerHeight/2 || document.documentElement.clientHeight/2) && bannerScr2.bottom > 0) || (bannerScr2.bottom <= (window.innerHeight/10 || document.documentElement.clientHeight/10) && bannerScr2.top < 0)){
            document.querySelector('.casestudy').classList.remove('darken');
            navBar.classList.remove('darken');
            if (window.matchMedia('screen and (max-width:856px)').matches) {side.classList.remove('darken');};
        } else {
            document.querySelector('.casestudy').classList.add('darken');
            navBar.classList.add('darken');
            if (window.matchMedia('screen and (max-width:856px)').matches) {side.classList.add('darken');};
        }
    }
    //change nav bar color when charles case study is in view
    let summerCase = document.querySelector('#charles-parallax');
    if (summerCase){
        summerCase = summerCase.getBoundingClientRect();
        if (summerCase.top < 0) {
            navBar.classList.add('charles-nav');
        } else {
            navBar.classList.remove('charles-nav');
        }
    }
}

//update carousel indicator
let flicks = document.querySelectorAll('.main-carousel');
flicks.forEach(flick => {
    let flkty = new Flickity(flick);
    flkty.on('change', function(index) {
        flick.querySelector('.indicator span').innerText = index + 1;
    });
});

//click event for modal
let modalImg = document.querySelectorAll('.modal');
let modalBg = document.querySelector('.modal-bg');
modalImg.forEach(moda => {
    moda.addEventListener('click', () =>{
        if (moda.className.match('modal-active')){
            modalBg.classList.remove('modal-active');
            moda.classList.remove('modal-active');
            setTimeout(() => moda.classList.remove('modal-exit'), 550);
            bodyScrollLock.enableBodyScroll(moda);
            document.querySelector('footer').style.backgroundColor = "";
        } else{
            modalBg.classList.add('modal-active');
            moda.classList.add('modal-active');
            moda.classList.add('modal-exit');
            bodyScrollLock.disableBodyScroll(moda, {reserveScrollBarGap: true,});
            document.querySelector('footer').style.backgroundColor = "transparent";
        }
    })
    modalBg.addEventListener('click', () => {
        if(moda.className.match('modal-active')){
            modalBg.classList.remove('modal-active');
            moda.classList.remove('modal-active');
            bodyScrollLock.enableBodyScroll(moda);
            document.querySelector('footer').style.backgroundColor = "";
        }
    })
})
});