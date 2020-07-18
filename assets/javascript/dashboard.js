window.addEventListener('DOMContentLoaded', event => {
    const circlesButton = document.querySelectorAll('.right-top__cirlces-c');
    const circleDropDown = document.querySelectorAll('.right-display-c__drop-down');
    const accountButton = document.querySelectorAll('#account');
    const accountDropDown = document.querySelectorAll('.account-display-c');

    circlesButton.forEach(node => {node.addEventListener('click', event => {
        circleDropDown[0].classList.toggle('hidden');
    })})
    accountButton.forEach(node => {node.addEventListener('click', event => {
        accountDropDown[0].classList.toggle('hidden');
    })})
})