
$(document).ready(function() {
    if ($('.stricky').length) {
        $('.stricky').addClass('original').clone(true).insertAfter('.stricky').addClass('stricked-menu').removeClass('original');
    }
});


$(window).on('scroll', function() {
    if ($('.stricked-menu').length) {
        var headerScrollPos = 100;
        var stricky = $('.stricked-menu');
        if ($(window).scrollTop() > headerScrollPos) {
            stricky.addClass('stricky-fixed');
        } else if ($(this).scrollTop() <= headerScrollPos) {
            stricky.removeClass('stricky-fixed');
        }
    }
});

$(document).ready(function () {
    $('#lightgallery').lightGallery({
        thumbnail: true,
        animateThumb: true,
        showThumbByDefault: true
    });
});


$(document).ready(function(){
    $("#bannerslider").owlCarousel({
        dots: true,
        nav: false,
        loop: true,
        autoplay: false,
        animateOut: 'rotateIn',
        animateIn: 'fadeIn',
        active: true,
        smartSpeed: 5000,
        items:1,
    });

    $("#whatwedo").owlCarousel({
        dots: false,
        nav: true,
        loop: true,
        autoplay: false,
        items:5,
    });

    $("#testimonials").owlCarousel({
        dots: true,
        nav: false,
        loop: true,
        autoplay: false,
        items:2,
    });

    $("#team").owlCarousel({
        dots: false,
        nav: true,
        loop: true,
        autoplay: 1000,
        items:2,
    });
});




;(function($, window, document, underfined) {
    'use strict';
    console.log('32123');

    var swipers = [],
    vivus = [],
    slicks = [],
    winScr,
    isotopeGridVar,
    isotopeMasonryVar,
    _isresponsive,
    smPoint = 768,
    mdPoint = 992,
    lgPoint = 1200,
    addPoint = 1600,
    _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);

    /**
     *
     * PageCalculations function
     * @since 1.0.0
     * @version 1.0.1
     * @var winW
     * @var winH
     * @var winS
     * @var pageCalculations
     * @var onEvent
     **/

    if (typeof pageCalculations !== 'function') {

        var winW, winH, winS, pageCalculations, documentHeight, $html, latestKnownScrollY, lastKnownScrollY, onEvent = window.addEventListener;

        pageCalculations = function (func) {

            winW = window.innerWidth;
            winH = window.innerHeight;
            winS = $(window).scrollTop();
            documentHeight = $(document).height(),
                $html = $('html');
            latestKnownScrollY = $(window).scrollTop(),
                lastKnownScrollY = latestKnownScrollY;

            if (!func) return;

            onEvent('load', func, true); // window onload
            onEvent('resize', func, true); // window resize
            //onEvent("orientationchange", func, false); // window orientationchange

        } // end pageCalculations

        pageCalculations(function () {
            pageCalculations();
        });

    }

    $(window).on('load', function () {
        
        testimonialsSliderHeight();
        initSwiper();
        console.log('abcd');
    });

    /***********************************/
    /* WINDOW RESIZE */
    /**********************************/
    $(window).on('resize', function () {
        $('.filmstrip-slider').each(function (index) {
            var that = $(this);
            setTimeout(function () {
                that[index].slick.refresh();
            }, 0);
        });
        console.log('4234234');
        testimonialsSliderHeight();
        // topBannerHeight();
    });

    /* ADD ZERO FUNCTION */
    var currentSwiper, totalSwiper;

    function ifZero(current, total) {
        currentSwiper = current + 1 < 10 ? '0' + (current + 1) : current + 1;
        totalSwiper = total < 10 ? '0' + total : total;
    }

    /*---------------*/
    /* SWIPER SLIDER */
    /*---------------*/
    function initSwiper() {
        if ($('.full_showcase_slider').length) {
            var attrsToSize = {
                'data-lg-slides': '1600',
                'data-md-slides': '1300',
                'data-sm-slides': '992',
                'data-xs-slides': '768'
            };
        } else {
            var attrsToSize = {
                'data-lg-slides': '1200',
                'data-md-slides': '992',
                'data-sm-slides': '768',
                'data-xs-slides': '599'
            };
        }

        function parseSlidesAttrValue(value) {
            var parts = value.split(',');
            return {
                slidesPerView: parseInt(parts[0], 10),
                spaceBetween: parseInt(parts[1], 10)
            }
        }

        function createBreakpoints(container, attrsToSize) {
            var breakpointsObj = {};
            $.each(attrsToSize, function (key, value) {
                if (container.attr(key)) {
                    breakpointsObj[value] = parseSlidesAttrValue(container.attr(key));
                }
            });
            return breakpointsObj;
        }

        function setMousewheel(activeIndex, slidesNum, container) {
            if (activeIndex == slidesNum - 1) {
                $(window).bind('mousewheel', function (event) {
                    if (event.originalEvent.wheelDelta >= 0) {
                        container.enableMousewheelControl();
                    } else {
                        container.disableMousewheelControl();
                    }
                });
            } else if (activeIndex == 0) {
                $(window).bind('mousewheel', function (event) {
                    if (event.originalEvent.wheelDelta >= 0) {
                        container.disableMousewheelControl();
                    } else {
                        container.enableMousewheelControl();
                    }
                });
            }
        }

        $('.swiper-container').each(function (index) {

            var that = $(this);

            var sliderIndex = 'swiper-unique-id-' + index;

            that.addClass(sliderIndex + ' initialized').attr('id', sliderIndex);
            that.find('.swiper-pagination').addClass('pagination-' + sliderIndex);

            if (that.find('.swiper-slide').length <= 1) {
                $('.slider-click[data-pagination-rel="' + that.data('pagination-rel') + '"]').addClass('disabled');
            }

            var setThumb = function (activeIndex, slidesNum) {
                var
                    customSliderCurrent = that.find('.swiper-pagination-current'),
                    customSliderTotal = that.find('.swiper-pagination-total');

                ifZero(activeIndex, slidesNum);

                customSliderCurrent.text(currentSwiper);
                customSliderTotal.text(totalSwiper);
            };

            var speedVar = parseInt(that.attr('data-speed'), 10);
            var loopVar = parseInt(that.attr('data-loop'), 10);
            var paginationType = that.attr('data-pagination-type') ? that.attr('data-pagination-type') : 'bullets';
            var autoPlayVar = parseInt(that.attr('data-autoplay'), 10);
            var autoHeightVar = parseInt(that.attr('data-autoheight'), 10);
            var centerVar = $.isNumeric(that.attr('data-center')) ? parseInt(that.attr('data-center'), 10) : true;
            var effectVar = that.attr('data-effect');
            var mode = that.attr('data-mode');
            var slidesPerViewVar = parseInt(that.attr('data-slides-per-view'), 10);
            var spaceBetweenVar = parseInt(that.attr('data-space-between'), 10);
            var mouseVar = $.isNumeric(that.attr('data-mouse')) ? parseInt(that.attr('data-mouse'), 10) : true;

            if (isNaN(slidesPerViewVar)) {
                slidesPerViewVar = 'auto';
            }

            swipers[sliderIndex] = new Swiper('.' + sliderIndex, {
                pagination: '.pagination-' + sliderIndex,
                
                // pagination: {
                //     el: '.pagination-' + sliderIndex,
                //     type: 'bullets',
                //     dynamicBullets: true,
                // },
                // dynamicBullets: true,
                
                paginationType: paginationType,
                paginationClickable: true,
                keyboardControl: true, // Set to true to enable navigation through slides using keyboard right and left (for horizontal mode), top and borrom (for vertical mode) keyboard arrows
                simulateTouch: true, //If true, Swiper will accept mouse events like touch events (click and drag to change slides)
                roundLengths: true, //Set to true to round values of slides widt h and height to prevent blurry texts on usual resolution screens (if you have such)
                autoplayDisableOnInteraction: false,
                grabCursor: false,
                watchSlidesProgress: true,
                speed: speedVar,
                loop: loopVar,
                noSwiping: mouseVar,
                // autoplay: autoPlayVar,
                autoplay: false,
                autoHeight: autoHeightVar, // Set to true and slider wrapper will adopt its height to the height of the currently active slide
                centeredSlides: centerVar,
                mousewheelControl: true,
                effect: effectVar || 'slide',
                direction: mode || 'horizontal',
                slidesPerView: slidesPerViewVar,
                spaceBetween: spaceBetweenVar || 0,
                paginationCurrentClass: 'swiper-pagination-current',
                paginationTotalClass: 'swiper-pagination-total',

                

                // Navigation arrows
                nextButton: '.swiper-button-next', 
                prevButton: '.swiper-button-prev', 
                
                breakpoints: createBreakpoints(that, attrsToSize),

                
                onInit: function (swiper) {
                    var totalSlides = $('.swiper-slide:not(.swiper-slide-duplicate)').length;
                    if ($('.banner-slider-wrap.andra').length) {
                        if (totalSlides < 10) {
                            $('.banner-slider-wrap.andra').find('.pag-wrapper').addClass('total-less10 current-less10');
                        }
                    }
                },
                onSlideChangeEnd: function (swiper) {
                    var totalSlides = that.find($('.swiper-slide:not(.swiper-slide-duplicate)')).length;
                    if ($('.projects-list-slider').length) {
                        setMousewheel(activeIndex, swiper.slides.length, swiper);
                    }
                },
                onSlideChangeStart: function (swiper) {
                    var activeIndex = (loopVar == 1) ? swiper.realIndex : swiper.activeIndex;

                    if (that.parent().find('.swiper-pagination-bullet').length) {
                        that.parent().find('.swiper-pagination-bullet').removeClass('swiper-pagination-bullet-active').eq(activeIndex).addClass('swiper-pagination-bullet-active');
                    }
                },
                onSlideClick: function (swiper) {},
                paginationBulletRender: function (swiper, index, className) {
                    console.log('mil ja')
                    if ($('.testimonials-swiper').length) {
                        var newIndex = swiper.activeIndex + index;
                        var newIndexAuthor = $(swiper.slides[newIndex]).find('.testimonials-author-img').html();
                        return '<span class="' + className + '">' + newIndexAuthor + '</span>';
                    }
                },

                // pagination: {
                //     el: '.pagination-' + sliderIndex,
                //     dynamicBullets: true, 
                //     type: 'bullets',

                //     renderBullet: function (swiper, index, className) {
                //         if ($('.testimonials-swiper').length) {
                //             return '<span class="' + className + '">' +('dasda') + '</span>';
                //         }
                        
                //         console.log('sadfad');
                //         if ($('.testimonials-swiper').length) {
                //             console.log('milgya')
                //             var newIndex = swiper.activeIndex +  (index);
                //             var newIndexAuthor = $(swiper.slides[newIndex]).find('.testimonials-author-img').html();
                //             return '<span class="' + className + '">' + newIndexAuthor + '</span>';
                        
                //         }
                //       },
                // }, 

                
            });
            swipers[sliderIndex].update();
        });
    }



    /***********************************/
    /* TESTIMONIALS */
    /**********************************/
    function testimonialsSliderHeight() {
        console.log('slider');
        var testimonialsWrapp = $('.testimonials-wrapper'),
            testimonialsSlider = testimonialsWrapp.find('.testimonials-swiper'),
            testimonialsItemHeight = testimonialsWrapp.find('.testimonials-item'),
            maxHeight = 0;

        testimonialsItemHeight.each(function () {
            console.log('slider-one');
            testimonialsItemHeight = parseInt($(this).innerHeight());
            if (testimonialsItemHeight > maxHeight) {
                maxHeight = testimonialsItemHeight;
            };
        });

        testimonialsSlider.css('height', maxHeight);
    }
})(jQuery, window, document);