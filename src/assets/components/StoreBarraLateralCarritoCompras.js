document.addEventListener('DOMContentLoaded', (event) => {

    // (INICIO) ABRIR Y CERRAR COMPONENTE TAILWIND CSS SHOPPING CARTS / SLIDE-OVER
    const slideOver = document.getElementById('slide-over');
    const closeButton = document.getElementById('close-button');
    const openButton = document.getElementById('open-button');
    slideOver.classList.remove('block');
    slideOver.classList.add('hidden');

    function openSlideOver() {
        slideOver.classList.remove('hidden');
        slideOver.classList.add('block');
    }

    function closeSlideOver() {
        slideOver.classList.remove('block');
        slideOver.classList.add('hidden');
    }

    openButton.addEventListener('click', openSlideOver);
    closeButton.addEventListener('click', closeSlideOver);
    // (FIN) ABRIR Y CERRAR COMPONENTE TAILWIND CSS SHOPPING CARTS / SLIDE-OVER

});