$animation_elements = null;
$window = null;

$(function () {
    $animation_elements = $('.animation-element');
    $window = $(window);

    $('.text-empathy h1').addClass('in-view');

    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');

    $('.hamburger').click(()=> {
       $('.hamburger').toggleClass('is-active');
       $('.floating-list').toggleClass('is-active');
    });

    $('.modal-close').on('click', function(e) {
        e.preventDefault();
        $('.modal').removeClass('is-active');
        $('.modal-youtube .video').attr('src', '');
    });

    $('.image-container a').on('click', function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        $('.modal-youtube .video').attr('src', href);
        $('.modal-videos').addClass('is-active');
    });

    $('.menu-toggle-icon').on('click', function(e) {
        e.preventDefault();
        $('.modal-menu').addClass('is-active');
    });

    $('.modal-menu a').on('click', function(e) {
        $('.modal-menu').removeClass('is-active');
    });

    $('input').keyup((event) => {
       const input = event.target;
       return input_validity(input);
    });

    $('#send-button').click((e) => {
        e.preventDefault();
        const form_elements = document.getElementById('contact-form').elements;
        let reducer = (acc, current) => acc && (input_validity(current));
        if (Array.from(form_elements).reduce(reducer, true)) {
            let data = new FormData();
            Array.from(form_elements).map((el) => data.append(el.name, el.value));
            fetch('/contact', {'method': 'post', 'body': data}).then(
                (response) => {
                    return response.json();
                }).then(
                (json) => {
                    $('.modal-form .modal-card-body h1').text('Tu mensaje fue enviado con éxito');
                    $('.modal-form').addClass('is-active');
                    Array.from(form_elements).forEach((el) => el.value = '');
                }).catch((error) => {
                    $('.modal-form .modal-card-body h1').text(error);
                    $('.modal-form').addClass('is-active');
            });
        }
    });

    $('.modal-form .modal-background').click(() => {
        $('.modal-form').removeClass('is-active');
    });

    $('.modal-form .button').click(() => {
        $('.modal-form').removeClass('is-active');
    });
});

function input_validity(input) {
    // let error_message = input.parentElement.querySelector('.help');
    // let input_val = input.checkValidity();
    // input_val ? error_message.style.opacity = '0' : error_message.style.opacity = '1';
    // return input_val;
    return true;
}

function check_if_in_view() {
    var currentScreenOffset = $window.scrollTop();
    var fix_factor = - $window.height() / 2;
    // var window_bottom_position = (window_top_position + window_height);
    //
    // $.each($animation_elements, function () {
    //     var $element = $(this);
    //     var element_height = $element.outerHeight();
    //     var element_top_position = $element.offset().top;
    //     var element_bottom_position = (element_top_position + element_height);
    //
    //     //check to see if this current container is within viewport
    //     if ((element_bottom_position >= window_top_position) &&
    //         (element_top_position <= window_bottom_position)) {
    //         if($element.hasClass('bottom-o')) {
    //             $top = $('.top-o');
    //             $top.addClass('in-view');
    //         }
    //         $element.addClass('in-view');
    //     } else {
    //         if($element.hasClass('bottom-o')) {
    //             $top = $('.top-o');
    //             $top.removeClass('in-view');
    //         }
    //         $element.removeClass('in-view');
    //     }
    // });
    var inicio_list = document.getElementById('inicio-list');
    var inicio_height = document.getElementById('inicio').offsetTop + fix_factor;
    var nosotros_list = document.getElementById('nosotros-list');
    var nosotros_height = document.getElementById('nosotros').offsetTop + fix_factor;
    var mamboway_list = document.getElementById('mamboway-list');
    var mamboway_height = document.getElementById('mamboway').offsetTop + fix_factor;
    var testimonios_list = document.getElementById('testimonios-list');
    var testimonios_height = document.getElementById('testimonios').offsetTop + fix_factor;
    var contactos_list = document.getElementById('contactos-list');
    var contactos_height = document.getElementById('contactanos').offsetTop + fix_factor;
    var unete_list = document.getElementById('unete-list');
    var unete_height = document.getElementById('unete').offsetTop + fix_factor;
    if (currentScreenOffset > inicio_height) {
        $('.current-list').removeClass('current-list');
        $('#inicio-list').addClass('current-list');
    }
    if (currentScreenOffset > nosotros_height) {
        $('.current-list').removeClass('current-list');
        $('#nosotros-list').addClass('current-list');
    }
    if (currentScreenOffset > mamboway_height) {
        $('.current-list').removeClass('current-list');
        $('#mamboway-list').addClass('current-list');
    }
    if (currentScreenOffset > testimonios_height) {
        $('.current-list').removeClass('current-list');
        $('#testimonios-list').addClass('current-list');
    }
    if (currentScreenOffset > contactos_height) {
        $('.current-list').removeClass('current-list');
        $('#contactanos-list').addClass('current-list');
    }
    if (currentScreenOffset > unete_height) {
        $('.current-list').removeClass('current-list');
        $('#unete-list').addClass('current-list');
    }
}

