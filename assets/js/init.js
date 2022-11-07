/*
@licstart
Copyright (C) 2019-2022 Ulrike Uhlig

    The JavaScript code in this page is free software: you can
    redistribute it and/or modify it under the terms of the GNU
    General Public License (GNU GPL) as published by the Free Software
    Foundation, either version 3 of the License, or (at your option)
    any later version.  The code is distributed WITHOUT ANY WARRANTY;
    without even the implied warranty of MERCHANTABILITY or FITNESS
    FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

    As additional permission under GNU GPL version 3 section 7, you
    may distribute non-source (e.g., minimized or compacted) forms of
    that code without the copy of the GNU GPL normally required by
    section 4, provided you include this license notice and a URL
    through which recipients can access the Corresponding Source.
@licend
*/

$(function($){
    // detect browser lang and redirect homepage to relevant translation if we're on english home
    // but do we want to force this automatically really?
    let current_path = window.location.pathname;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const language = urlParams.get('l')

    if(current_path == "/") {
        /*
        if (/^fr\b/.test(navigator.language) && typeof language !== 'undefined') {
            window.location.replace("/")
        }
        // only for testing purposes
        if (/^en\b/.test(navigator.language) && typeof language !== 'undefined') {
            window.location.replace("/")
        }
        */
        if (/^de\b/.test(navigator.language) && typeof language !== 'undefined') {
            window.location.replace("/de")
        }
    }

    // helper function for mobile layout
    if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $('body').addClass('mobile').removeClass('desktop');
    }
    if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
        $('body').addClass('safari');
    }

    // antispam
    $('a.mail').each(function() {
        e = this.rel.replace('///','@');
        this.href = 'mailto:' + e;
        $(this).html(e);
    });

    // mobile text below images
    $("body.mobile .project-legend").appendTo('.project-images');

    // link posts and projects more easily
    $('.blog .post, #project-list .project').click(function() {
        let href = $(this).find('.permalink').attr('href');
        if(href !== undefined) {
            window.location.href = href;
        }
    });

    // back button
    let backnavhref = $('.main-menu .current-item a').attr('href');
    if(backnavhref !== undefined) {
        $('#back-button').attr('href', backnavhref);
    }
});

/*
// inititalize swiper
var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 0,
    autoplay: false,
    autoplayDisableOnInteraction: true,
    loop: true
});
*/
