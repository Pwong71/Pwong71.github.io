/*eslint-env browser*/
window.onload =()=>{
ScrollReveal().reveal('.content', {delay: 50, origin: 'bottom', reset: true, distance: '35px', viewFactor: 0.2});

ScrollReveal().reveal('#two', {viewFactor: 0.35})

ScrollReveal().reveal('#three', {viewFactor: 0.45});

let sideItem = document.querySelectorAll('span');
let conTent = document.querySelectorAll('.content');


window.onscroll = () => {
    for (let i = 0; i < 5; i++) {
        if (conTent[i].style.opacity === "1"){
            sideItem[i].style.flexGrow = "1";
        } else {
            sideItem[i].style.flexGrow = "0";
        }
    }
}

sideItem.forEach( side => {
    side.addEventListener('click', () => {
        setTimeout(() => {window.scrollBy(0, -100)}, 50);
    })
})

let flickArrow = document.querySelectorAll('.flickity-button');
let flkty = new Flickity('.main-carousel');

flickArrow.forEach(arrow =>{
    arrow.addEventListener('click', () =>{
        document.querySelector('.indicator span').innerText = flkty.selectedIndex+1;
    })
});
    }