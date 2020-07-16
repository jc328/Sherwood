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
    const learnCircle = document.querySelectorAll('.opt1');
    const manageButton = document.querySelector('#manageButton');
    const manageCirlcle = document.querySelectorAll('.opt2');
    const customButton = document.querySelector('#cusomiseButton');
    const customCircle = document.querySelectorAll('.opt3');
    const upArrow = document.querySelector(".black-c__up");
    const downArrow = document.querySelector(".black-c__down");
    const blackTitle = document.querySelectorAll('.black-c__learn-as__span');
    const blackParagraph = document.querySelectorAll('#black-paragraph');
    // const blackParagraph = document.querySelectorAll('.black-c__learn-as__p');
    const phoneScreen = ['phone-screen1', 'phone-screen2', 'phone-screen3'];
    const blackTitleArray = ['Learn As You Grow', 'Manage Your Portfolio', 'Keep Tabs on Your Money'];
    const blackParagraphArray = ['Our goal is to make investing in financial markets more affordable, more intuitive, and more fun, no matter how much experience you have (or don’t have).', 'Keep your portfolio in your pocket. Everything you need to manage your assets is available in a single app.', 'Set up customized news and notifications to stay on top of your assets as casually or as relentlessly as you like. Controlling the flow of info is up to you.'];
    let screenCount = 0;
    let bPhone = document.querySelectorAll('.black-c__phone');

    function removeClass() {
        bPhone.forEach(node => {
            console.log(node)
            node.classList.remove(`margin-top-transition`);
            node.classList.remove(`swipe-top`);
            node.classList.remove(`.warp-bottom`);
        })
    }

    upArrow.addEventListener('click', event => {
        screenCount++;
        if (screenCount > 2) screenCount = 0;
        bPhone.forEach(node => {
            node.classList.remove('phone-screen1');
            node.classList.remove('phone-screen2');
            node.classList.remove('phone-screen3');
            node.classList.add(`${phoneScreen[screenCount]}`);
            node.classList.add('margin-top-transition');
            node.classList.add(`swipe-top`);
            setTimeout(() => {
                bPhone.forEach(node => {
                    // console.log(node)
                    node.classList.remove('margin-top-transition');
                    node.classList.remove(`swipe-top`);
                    node.classList.add(`warp-bottom`);
                    setTimeout(() => {
                        node.classList.add('margin-top-transition');
                        node.classList.remove(`warp-bottom`);
                    }, 25);
                })
            }, 175)
            
        })
        blackTitle[0].innerHTML = `${blackTitleArray[screenCount]}`;
        blackParagraph[0].innerHTML = `${blackParagraphArray[screenCount]}`;
    })
    downArrow.addEventListener('click', event => {
        screenCount++;
        if (screenCount > 2) screenCount = 0;
        bPhone.forEach(node => {
            node.classList.remove('phone-screen1');
            node.classList.remove('phone-screen2');
            node.classList.remove('phone-screen3');
            node.classList.add(`${phoneScreen[screenCount]}`);
            node.classList.add('margin-top-transition');
            node.classList.add(`swipe-top`);
            setTimeout(() => {
                bPhone.forEach(node => {
                    // console.log(node)
                    node.classList.remove('margin-top-transition');
                    node.classList.remove(`swipe-top`);
                    node.classList.add(`warp-bottom`);
                    setTimeout(() => {
                        node.classList.add('margin-top-transition');
                        node.classList.remove(`warp-bottom`);
                    }, 25);
                })
            }, 175)
        })
        blackTitle[0].innerHTML = `${blackTitleArray[screenCount]}`;
        blackParagraph[0].innerHTML = `${blackParagraphArray[screenCount]}`
    })
    
    learnButton.addEventListener('click', event => {
        screenCount = 0;
        bPhone.forEach(node => {
            node.classList.remove('phone-screen1');
            node.classList.remove('phone-screen2');
            node.classList.remove('phone-screen3');
            node.classList.add(`${phoneScreen[screenCount]}`);
            node.classList.add('margin-top-transition');
            node.classList.add(`swipe-top`);
            setTimeout(() => {
                bPhone.forEach(node => {
                    // console.log(node)
                    node.classList.remove('margin-top-transition');
                    node.classList.remove(`swipe-top`);
                    node.classList.add(`warp-bottom`);
                    setTimeout(() => {
                        node.classList.add('margin-top-transition');
                        node.classList.remove(`warp-bottom`);
                    }, 25);
                })
            }, 175)
        })
        blackTitle[0].innerHTML = `${blackTitleArray[screenCount]}`;
        blackParagraph[0].innerHTML = `${blackParagraphArray[screenCount]}`;
    })
    learnCircle[0].addEventListener('click', event => {
        screenCount = 0;
        bPhone.forEach(node => {
            node.classList.remove('phone-screen1');
            node.classList.remove('phone-screen2');
            node.classList.remove('phone-screen3');
            node.classList.add(`${phoneScreen[screenCount]}`)
            node.classList.add('margin-left-transition');
            node.classList.add(`swipe-left`);
            setTimeout(() => {
                bPhone.forEach(node => {
                    console.log(node)
                    node.classList.remove('margin-left-transition');
                    node.classList.remove(`swipe-left`);
                    node.classList.add(`warp-right`);
                    setTimeout(() => {
                        node.classList.add('margin-left-transition');
                        node.classList.remove(`warp-right`);
                    }, 50);
                })
            }, 400);
            removeClass();
        })
        blackTitle[0].innerHTML = `${blackTitleArray[screenCount]}`;
        blackParagraph[0].innerHTML = `${blackParagraphArray[screenCount]}`;
        learnCircle[0].classList.add('white');
        manageCirlcle[0].classList.remove('white');
        customCircle[0].classList.remove('white');
    })
    manageButton.addEventListener('click', event => {
        screenCount = 1;
        bPhone.forEach(node => {
            node.classList.remove('phone-screen1');
            node.classList.remove('phone-screen2');
            node.classList.remove('phone-screen3');
            node.classList.add(`${phoneScreen[screenCount]}`);
            node.classList.add('margin-top-transition');
            node.classList.add(`swipe-top`);
            setTimeout(() => {
                bPhone.forEach(node => {
                    // console.log(node)
                    node.classList.remove('margin-top-transition');
                    node.classList.remove(`swipe-top`);
                    node.classList.add(`warp-bottom`);
                    setTimeout(() => {
                        node.classList.add('margin-top-transition');
                        node.classList.remove(`warp-bottom`);
                    }, 25);
                })
            }, 175)
        })
        blackTitle[0].innerHTML = `${blackTitleArray[screenCount]}`;
        blackParagraph[0].innerHTML = `${blackParagraphArray[screenCount]}`;
    })
    manageCirlcle[0].addEventListener('click', event => {
        screenCount = 1;
        bPhone.forEach(node => {
            node.classList.remove('phone-screen1');
            node.classList.remove('phone-screen2');
            node.classList.remove('phone-screen3');
            node.classList.add(`${phoneScreen[screenCount]}`);
            node.classList.add('margin-left-transition');
            node.classList.add(`swipe-left`);
            setTimeout(() => {
                bPhone.forEach(node => {
                    console.log(node)
                    node.classList.remove('margin-left-transition');
                    node.classList.remove(`swipe-left`);
                    node.classList.add(`warp-right`);
                    setTimeout(() => {
                        node.classList.add('margin-left-transition');
                        node.classList.remove(`warp-right`);
                    }, 50);
                })
            }, 400)
            removeClass();
        })
        blackTitle[0].innerHTML = `${blackTitleArray[screenCount]}`;
        blackParagraph[0].innerHTML = `${blackParagraphArray[screenCount]}`;
        learnCircle[0].classList.remove('white');
        manageCirlcle[0].classList.add('white');
        customCircle[0].classList.remove('white');
    })
    customButton.addEventListener('click', event => {
        screenCount = 2;
        bPhone.forEach(node => {
            node.classList.remove('phone-screen1');
            node.classList.remove('phone-screen2');
            node.classList.remove('phone-screen3');
            node.classList.add(`${phoneScreen[screenCount]}`);
            node.classList.add('margin-top-transition');
            node.classList.add(`swipe-top`);
            setTimeout(() => {
                bPhone.forEach(node => {
                    // console.log(node)
                    node.classList.remove('margin-top-transition');
                    node.classList.remove(`swipe-top`);
                    node.classList.add(`warp-bottom`);
                    setTimeout(() => {
                        node.classList.add('margin-top-transition');
                        node.classList.remove(`warp-bottom`);
                    }, 25);
                })
            }, 175)
        })
        blackTitle[0].innerHTML = `${blackTitleArray[screenCount]}`;
        blackParagraph[0].innerHTML = `${blackParagraphArray[screenCount]}`;
    })
    customCircle[0].addEventListener('click', event => {
        screenCount = 2;
        bPhone.forEach(node => {
            node.classList.remove('phone-screen1');
            node.classList.remove('phone-screen2');
            node.classList.remove('phone-screen3');
            node.classList.add(`${phoneScreen[screenCount]}`);
            node.classList.add('margin-left-transition');
            node.classList.add(`swipe-left`);
            console.log(node);
            setTimeout(() => {
                bPhone.forEach(node => { 
                    console.log(node)
                    node.classList.remove('margin-left-transition');
                    node.classList.remove(`swipe-left`);
                    node.classList.add(`warp-right`);    
                    setTimeout(() => {
                        node.classList.add('margin-left-transition');
                        node.classList.remove(`warp-right`);
                    }, 50);   
                })
            }, 400)
            removeClass();
        })
        blackTitle[0].innerHTML = `${blackTitleArray[screenCount]}`;
        blackParagraph[0].innerHTML = `${blackParagraphArray[screenCount]}`;
        learnCircle[0].classList.remove('white');
        manageCirlcle[0].classList.remove('white');
        customCircle[0].classList.add('white');
        console.log(bPhone)
    })



})