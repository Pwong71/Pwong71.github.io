/*eslint-env browser*/
window.onload = () =>{
//initiates scroll reveal
ScrollReveal().reveal('.content', { viewFactor: 0.1, reset: true, duration: 600});
//ScrollReveal().reveal('#two', {viewFactor: 0.28});
//ScrollReveal().reveal('#three', {viewFactor: 0.1, viewOffset: {bottom: 150}});
//ScrollReveal().reveal('#four', {viewFactor: 0.1, viewOffset: {bottom: 150}});
//ScrollReveal().reveal('#five', {viewFactor: 0.4, delay: 150});
ScrollReveal().reveal('.links',{distance: '100px', origin:'left', duration:500, reset:true});

let sideItem = document.querySelectorAll('.side span');
let conTent = document.querySelectorAll('.content');
    
//scroll event
window.onscroll = () => {
    //moves a sidebar tab when the corresponding content section is in view
    for (let i = 0; i < 5; i++){
        if ((conTent[i].getBoundingClientRect().top >= (window.innerHeight/1.35 || document.documentElement.clientHeight/1.35) && conTent[i].getBoundingClientRect().bottom > 0) || (conTent[i].getBoundingClientRect().bottom <= -100 && conTent[i].getBoundingClientRect().top < 0)){
            sideItem[i].style.flexGrow = "0";
        } else {
            sideItem[i].style.flexGrow = "1";
        }
    }
   //changes bg color when banner is in viewport
    let bannerScr = document.querySelector('.banner').getBoundingClientRect();
    if ((bannerScr.top >= (window.innerHeight/2 || document.documentElement.clientHeight/2) && bannerScr.bottom > 0) || (bannerScr.bottom <= (window.innerHeight/10 || document.documentElement.clientHeight/10) && bannerScr.top < 0)){
        document.body.style.backgroundColor = "";
    } else {
        document.body.style.backgroundColor = "black";
    } 
    let bannerScr2 = document.querySelector('.banner2').getBoundingClientRect();
    if ((bannerScr2.top >= (window.innerHeight/2 || document.documentElement.clientHeight/2) && bannerScr2.bottom > 0) || (bannerScr2.bottom <= (window.innerHeight/10 || document.documentElement.clientHeight/10) && bannerScr2.top < 0)){
        document.body.className = "";
    } else {
        document.body.className = "darken";
    }
}

//updates carousel indicator
let flickArrow = document.querySelectorAll('.flickity-button');
let flkty = new Flickity('.main-carousel');
flickArrow.forEach(arrow =>{
    arrow.addEventListener('click', () =>{
        document.querySelector('.indicator span').innerText = flkty.selectedIndex+1;
    })
});

//click event for modal
let modalImg = document.querySelectorAll('.modal');
let modalBg = document.querySelector('.modal-bg');
modalImg.forEach(moda => {
    moda.addEventListener('click', () =>{
        if (moda.className.match('modal-active')){
            modalBg.classList.remove('modal-active');
            moda.classList.remove('modal-active');
        } else{
            modalBg.classList.add('modal-active');
            moda.classList.add('modal-active');
        }
    })
    modalBg.addEventListener('click', () => {
        if(moda.className.match('modal-active')){
            modalBg.classList.remove('modal-active');
            moda.classList.remove('modal-active');
        }
    })
})
}