window.addEventListener('DOMContentLoaded', event => {
    const eqx = document.querySelectorAll('.eqx-c');
    const eqxTop = document.querySelectorAll('.eqx-c__top');
    const eqxBottom = document.querySelectorAll('.eqx-c__bottom');
    // console.log(eqx)
    document.addEventListener("click", event => {
        console.log(event.target)
    })
    
    eqx.forEach( node => { node.addEventListener('click', event => {
        eqxTop.forEach(node => {
            node.classList.toggle("rotate-r");
        })
        eqxBottom.forEach(node => {
            node.classList.toggle("rotate-l");
        })
    })});

    // eqx[0].addEventListener('click', event => {
    //     console.log(eqxTop)
    //     if (eqxTop[1].classList.includes("rotate-r")){
    //         eqxTop[0].classList.remove("rotate-r");
    //     } else {
    //         eqxTop[0].classList.add("rotate-r");
    //     }
    //     if (eqxBottom[0].classList.includes("rotate-l")){
    //         eqxBottom[0].classList.remove("rotate-l")
    //     } else {
    //         eqxBottom[0].classList.add("rotate-l");
    //     }
    // })
})