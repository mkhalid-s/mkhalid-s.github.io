$(document).ready(function () {

    $('[data-toggle="tooltip"]').tooltip();

    $(window).scroll(function () {
        $('nav').toggleClass('bg-dark-scrolled', $(this).scrollTop() > 750);
        if ($(this).scrollTop() > 700) {
            $('#top-btn').fadeIn();
            /*$('#top-btn').css("display", "block");*/
        } else {
            $('#top-btn').fadeOut();
            /*$('#top-btn').css("display", "none");*/
        }

    })

    // scroll body to 0px on click
    $('#top-btn').click(function () {
        $('body,html, footer').animate({
            scrollTop: 0
        }, 1000);
        return false;
    });
});

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    $('body,html, footer').animate({
        scrollTop: 0
    }, 2000);
    return false;
}