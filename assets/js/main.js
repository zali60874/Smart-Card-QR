$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        center: true,
        loop: true,
        margin: 10,
        responsiveClass: true,
        autoplay:false,
        autoplayTimeout:1000,
        autoplayHoverPause:true,
        responsive: {
            0: {
                items: 3
            },
            600: {
                items: 6
            },
            1000: {
                items: 10
            }
        }
    });
});

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))