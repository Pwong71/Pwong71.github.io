/*eslint-env browser*/
window.addEventListener('load', () => {
    //initiate scroll reveal
    ScrollReveal().reveal('.content h1', {distance: '75px', origin: 'bottom', viewFactor: 0.4, duration: 700, delay: 300});
    ScrollReveal().reveal('.modal', {distance: '75px', origin: 'bottom', viewFactor: 0.5, duration: 700, delay: 200});
    ScrollReveal().reveal('.main-carousel', {distance: '75px', origin: 'bottom', viewFactor: 0.4, duration: 700, delay: 300})
    ScrollReveal().reveal('.links div', {distance: '100px', origin: 'left', duration: 500, reset: true});
});
window.addEventListener('DOMContentLoaded', () => {
//initiate parallax library
if (document.querySelector('.parallax span')){
    var rellax = new Rellax('.parallax span');
} 
if (document.querySelector('#summer19')){
    var rellax = new Rellax('#chipo-parallax span');
    var rellax = new Rellax('#charles-parallax span');
}
//initiate/refresh parallax set cover size to inner browser height
if (document.querySelector('#la19')){
    var rellaxLA = new Rellax('.la19-parallax div:last-of-type', {speed: 3, center: true,});
    document.querySelector('#la19-intro').style.setProperty('height', window.innerHeight + 'px');
    window.addEventListener('resize', () => {document.querySelector('#la19-intro').style.setProperty('height', window.innerHeight + 'px');});
};

const side = document.querySelector('.side');
let sideItem = document.querySelectorAll('.side > span');
const caseStudy = document.querySelector('.casestudy');
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
    }, 3800);
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
    //skip animation on button click
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
    if (document.querySelector('#newyork') || document.querySelector('#summer19') || document.querySelector('#la19')){
        if (document.documentElement.scrollTop < window.innerHeight || window.scrollY < window.innerHeight){
            navBar.style.opacity = '0';
        } else {
            navBar.style.opacity = '1';
        }
    }
    //return true if content is within viewport
    contentBounds = (x, y, z) => {
        return ((x.getBoundingClientRect().top >= (window.innerHeight/y || document.documentElement.clientHeight/y) && x.getBoundingClientRect().bottom > 0) || ((x.getBoundingClientRect().bottom <= window.innerHeight/z) && x.getBoundingClientRect().top < 0))
    }
    if (caseStudy){
        //move a sidebar tab when the corresponding content section is in view
        for (let i = 0; i < 5; i++){
            if (contentBounds(conTent[i], 1.2, 2)){
                sideItem[i].classList.remove('active');
            } else {
                sideItem[i].classList.add('active');
            };
        };
        //change bg color when banner is in viewport
        let banner = document.querySelectorAll('.banner');
        if (banner[0] && banner[1]){
            if (contentBounds(banner[0], 2, 100) && contentBounds(banner[1], 2, 100)) {
                document.body.classList.remove('darken');
            } else {document.body.classList.add('darken');};
        } else if (banner[0]) {
            if (contentBounds(banner[0], 2, 100)) {
                document.body.classList.remove('darken');
            } else {document.body.classList.add('darken');};
        };
        //show footer only if viewport is near end of page
        if (document.querySelector('.links').getBoundingClientRect().top < window.innerHeight){
            document.querySelector('footer').style.visibility = "visible";
        } else {
            document.querySelector('footer').style.visibility = "hidden";
        };
    };
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
    //hide intro when screen is scrolled down
    if (document.querySelector('#la19')){if ((document.body.scrollTop || document.documentElement.scrollTop) > screen.height) {document.body.classList.add('hidden');} else {document.body.classList.remove('hidden');};};
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