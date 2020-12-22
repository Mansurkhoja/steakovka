"use strict";
$(document).ready(function () {
  // for svg support
  svg4everybody(); //self-prod slider
  var $self_slider = $(".self__slider"),
      selfSliderSwiper = {};
  $self_slider.each(function (index) {
    var $this = $(this),
        $pagination = $this.find('.swiper-pagination'),
        $next = $this.parent().find('.swiper-button-next'),
        $prev = $this.parent().find('.swiper-button-prev');
    if ($this.length) {
      selfSliderSwiper[index] = new Swiper($this, {
        speed: 500,
        slidesPerView: 1,
        grabCursor: true,
        spaceBetween: 0,
        watchOverflow: true,
        preloadImages: false,
        autoHeight: true,
        lazy: {
          loadPrevNext: false
        },
        navigation: {
          nextEl: $next,
          prevEl: $prev
        },
        pagination: {
          el: $pagination,
          clickable: true
        }
      });
      selfSliderSwiper[index].on('lazyImageReady', function () {
        selfSliderSwiper[index].updateAutoHeight();
      });
    }
  });
  var transitionActive = false;
  $('body').on('click', '.js-tab-open', function (e) {
    e.preventDefault();
    var $this = $(this),
        $parent = $this.parent(),
        tab_connector = $this.closest('[data-tabs]').data('tabs'),
        $tab_item = $('[data-tabs-content="' + tab_connector + '"]'),
        $link = $this.attr('href'),
        height = $($link).outerHeight(),
        height_initial = $tab_item.outerHeight(),
        transitionDuration = 500;

    if ($parent.hasClass('active') || transitionActive === true) {
      return false;
    }
    $parent.addClass('active').siblings().removeClass('active');
    $($link).addClass('active').siblings().removeClass('active');
    $tab_item.css({
      'height': height_initial
    });
    setTimeout(function () {
      $tab_item.css({
        'height': height
      });
    }, 20);
    transitionActive = true;
    setTimeout(function () {
      $tab_item.css({
        'height': 'auto'
      });
      transitionActive = false;
    }, transitionDuration);

    if ($this.closest('.self__slider').length) {
      setTimeout(function () {
        selfSliderSwiper[0].updateAutoHeight();
      }, transitionDuration);
    }
  }); // for parallax
  var image = document.getElementsByClassName('parallax-img');
  new simpleParallax(image, {
    orientation: 'down',
    scale: 1.5
  }); //manufacture btns
  $('.manufacture__btn-icon').on('click', function () {
    var closest = $(this).closest($('.manufacture__btn'));

    if (!closest.hasClass('active')) {
      $('.manufacture__btn').removeClass('active');
    }
    closest.toggleClass('active');
  }); 
  //  wow js

  new WOW().init();
});