window.addEventListener('DOMContentLoaded', event => {
    const circlesButton = document.querySelectorAll('.right-top__cirlces-c');
    const dropDown = document.querySelectorAll('.right-display-c__drop-down');

    circlesButton.forEach(node => {node.addEventListener('click', event => {
        dropDown[0].classList.toggle('hidden');
    })})
})