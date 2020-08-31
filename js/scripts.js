/*eslint-env browser*/
window.onload = () =>{
//initiates scroll reveal
ScrollReveal().reveal('.content h1', {distance: '75px', origin: 'bottom', viewFactor: 0.4, duration: 700, delay: 300});
ScrollReveal().reveal('.modal', {distance: '75px', origin: 'bottom', viewFactor: 0.5, duration: 700, delay: 200});
ScrollReveal().reveal('.main-carousel', {distance: '75px', origin: 'bottom', viewFactor: 0.4, duration: 700, delay: 300})
ScrollReveal().reveal('.links div',{distance: '100px', origin:'left', duration:500, reset:true});

let sideItem = document.querySelectorAll('.side span');
let conTent = document.querySelectorAll('.content');
let oldScroll = 0;
let navBar = document.querySelector('nav');
//scroll event
window.onscroll = () => {
    //hides the navbar when the window is scrolled down and vice versa
    let newScroll = document.documentElement.scrollTop || document.body.scrollTop || window.scrollY;
    if (newScroll > 0 && newScroll >= oldScroll){
        oldScroll = newScroll;
        navBar.style.top = '-100px';
    } else {
        oldScroll = newScroll;
        navBar.style.top = '0';
    }
    //moves a sidebar tab when the corresponding content section is in view
    if (conTent[0] && sideItem[0]){
        for (let i = 0; i < 5; i++){
            if ((conTent[i].getBoundingClientRect().top >= (window.innerHeight/1.35 || document.documentElement.clientHeight/1.35) && conTent[i].getBoundingClientRect().bottom > 0) || (conTent[i].getBoundingClientRect().bottom <= -100 && conTent[i].getBoundingClientRect().top < 0)){
                sideItem[i].style.flexGrow = "0";
            } else {
                sideItem[i].style.flexGrow = "1";
            }
        }
    }
   //changes bg color when banner is in viewport
    let bannerScr = document.querySelector('.banner');
    if (bannerScr){
        bannerScr = bannerScr.getBoundingClientRect();
        if ((bannerScr.top >= (window.innerHeight/2 || document.documentElement.clientHeight/2) && bannerScr.bottom > 0) || (bannerScr.bottom <= (window.innerHeight/10 || document.documentElement.clientHeight/10) && bannerScr.top < 0)){
            document.querySelector('.casestudy').style.backgroundColor = "";
            navBar.style.opacity = "1";
        } else {
            document.querySelector('.casestudy').style.backgroundColor = "black";
            navBar.style.opacity = "0";
        } 
    }
    let bannerScr2 = document.querySelector('.banner2');
    if (bannerScr2){
        bannerScr2 = bannerScr2.getBoundingClientRect();
        if ((bannerScr2.top >= (window.innerHeight/2 || document.documentElement.clientHeight/2) && bannerScr2.bottom > 0) || (bannerScr2.bottom <= (window.innerHeight/10 || document.documentElement.clientHeight/10) && bannerScr2.top < 0)){
            document.querySelector('.casestudy').classList.remove('darken');
            navBar.classList.remove('darken');
        } else {
            document.querySelector('.casestudy').classList.add('darken');
            navBar.classList.add('darken');
        }
    }
}

//updates carousel indicator
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
        }
    })
})
}