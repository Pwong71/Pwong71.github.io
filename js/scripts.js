/*eslint-env browser*/

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

sideItem[0].addEventListener('click', () =>{
    if (conTent[0].style.opacity === "0"){
    conTent[1].style.opacity = "0";
    conTent[2].style.opacity = "0";
    conTent[3].style.opacity = "0";
    conTent[4].style.opacity = "0";
    }
})

sideItem[1].addEventListener('click', () =>{
    if (conTent[1].style.opacity === "0"){
    conTent[0].style.opacity = "0";
    conTent[2].style.opacity = "0";
    conTent[3].style.opacity = "0";
    conTent[4].style.opacity = "0";
    }
})

sideItem[2].addEventListener('click', () =>{
    if (conTent[2].style.opacity === "0"){
    conTent[1].style.opacity = "0";
    conTent[0].style.opacity = "0";
    conTent[3].style.opacity = "0";
    conTent[4].style.opacity = "0";
    }
})

sideItem[3].addEventListener('click', () =>{
    if (conTent[3].style.opacity === "0"){
    conTent[1].style.opacity = "0";
    conTent[2].style.opacity = "0";
    conTent[0].style.opacity = "0";
    conTent[4].style.opacity = "0";
    }
})

sideItem[4].addEventListener('click', () =>{
    if (conTent[4].style.opacity === "0"){
    conTent[1].style.opacity = "0";
    conTent[2].style.opacity = "0";
    conTent[3].style.opacity = "0";
    conTent[0].style.opacity = "0";
    }
})