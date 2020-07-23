/*eslint-env browser*/
window.onload = () =>{
//initiates scroll reveal
ScrollReveal().reveal('.content', {delay: 50, reset: true, viewFactor: 0.2, duration: 600});
ScrollReveal().reveal('#two', {viewFactor: 0.28})
ScrollReveal().reveal('#three', {viewFactor: 0.1, viewOffset: {bottom: 150}})
ScrollReveal().reveal('#four', {viewFactor: 0.1, viewOffset: {bottom: 150}})
ScrollReveal().reveal('#five', {viewFactor: 0.4, delay: 150})

let sideItem = document.querySelectorAll('.side span');
let conTent = document.querySelectorAll('.content');
let bannerScr = document.querySelector('.banner').getBoundingClientRect();

//scroll event
window.onscroll = () => {
    //moves a sidebar tab when the corresponding content section is in view
    for (let i = 0; i < 5; i++) {
        if (conTent[i].style.opacity === "1"){
            sideItem[i].style.flexGrow = "1";
        } else {
            sideItem[i].style.flexGrow = "0";
        }
    }
    let bannerScr = document.querySelector('.banner').getBoundingClientRect();
    //hides sidebar when banner is in view, then vice versa
    if (bannerScr.top <= bannerScr.height-650 && !(bannerScr.top*-1 > bannerScr.height)){
    sideItem.forEach(side => {
        side.style.opacity = "0";
        document.querySelector('#comdes').style.backgroundColor = "black";
    })
    } else if(bannerScr.top*-1 > bannerScr.height || bannerScr.top > bannerScr.height-650){
    sideItem.forEach(side => {
        side.style.opacity = "1";
         document.querySelector('#comdes').style.backgroundColor = "#d1d1c5";
    })
    }    
}

//return every other side tabs to their original position except the one clicked
for (let i = 0; i < 5; i++){
    sideItem[i].addEventListener('click', () =>{
        sideItem[i].style.flexGrow = "1";
       console.log("clicked");[...sideItem[i].parentElement.children]
            .filter(el => el !== sideItem[i])
            .forEach(el => el.style.flexGrow = '0');
    })
}

let flickArrow = document.querySelectorAll('.flickity-button');
let flkty = new Flickity('.main-carousel');
//updates carousel indicator
flickArrow.forEach(arrow =>{
    arrow.addEventListener('click', () =>{
        document.querySelector('.indicator span').innerText = flkty.selectedIndex+1;
    })
});

}