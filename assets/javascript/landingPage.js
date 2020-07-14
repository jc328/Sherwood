window.addEventListener('DOMContentLoaded', event => {
    const eqx = document.querySelectorAll('.eqx-c');
    const eqxTop = document.querySelectorAll('.eqx-c__top');
    const eqxBottom = document.querySelectorAll('.eqx-c__bottom');

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

    
    const learnButton = document.querySelector('#learnButton');
    const manageButton = document.querySelector('#manageButton');
    const customButton = document.querySelector('#cusomiseButton');
    const upArrow = document.querySelector(".black-c__up");
    const downArrow = document.querySelector(".black-c__down");
    const phoneScreen = ['phone-screen1', 'phone-screen2', 'phone-screen3']
    let screenCount = 0;
    let bPhone = document.querySelectorAll('.black-c__phone');

    upArrow.addEventListener('click', event => {
        screenCount++;
        if (screenCount > 3) screenCount = 1;
        bPhone.forEach(node => {
            node.classList.remove('phone-screen1');
            node.classList.remove('phone-screen2');
            node.classList.remove('phone-screen3');
            node.classList.add(`${phoneScreen[screenCount]}`);
        })
    })
    downArrow.addEventListener('click', event => {
        screenCount++;
        if (screenCount > 3) screenCount = 1;
        bPhone.forEach(node => {
            node.classList.remove('phone-screen1');
            node.classList.remove('phone-screen2');
            node.classList.remove('phone-screen3');
            node.classList.add(`${phoneScreen[screenCount]}`);
        })
    })
    
    learnButton.addEventListener('click', event => {
        screenCount = 1;
        bPhone.forEach(node => {
            node.classList.remove('phone-screen1');
            node.classList.remove('phone-screen2');
            node.classList.remove('phone-screen3');
            node.classList.add(`${phoneScreen[screenCount]}`);
        })
    })
    manageButton.addEventListener('click', event => {
        screenCount = 2;
        bPhone.forEach(node => {
            node.classList.remove('phone-screen1');
            node.classList.remove('phone-screen2');
            node.classList.remove('phone-screen3');
            node.classList.add(`${phoneScreen[screenCount]}`);
        })
    })
    customButton.addEventListener('click', event => {
        screenCount = 3;
        bPhone.forEach(node => {
            node.classList.remove('phone-screen1');
            node.classList.remove('phone-screen2');
            node.classList.remove('phone-screen3');
            node.classList.add(`${phoneScreen[screenCount]}`);
        })
    })

})