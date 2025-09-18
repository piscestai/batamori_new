'use strict';

$(function() {
  /*
  * 防抖與節流
  */
  window.debounce = function(fn, delay) {
    let timeId = null;
    return function (...args) {
      if (timeId) clearTimeout(timeId);
      timeId = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  };
  window.throttle = function(fn, delay) {
    let timeId = null;
    return function (...args) {
      if (!timeId) {
        timeId = setTimeout(() => {
          timeId = null;
          fn.apply(this, args);
        }, delay);
      }
    };
  };

  // Lenis
  const lenis = new Lenis({
    lerp: 0.05
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // 宣告
  var $win = $(window),
      $winW = window.innerWidth,
      $winH = window.innerHeight,
      $html = $('html'),
      $body = $('body');

  $win.on("resize", function(){
    $winW = window.innerWidth;
    $winH = window.innerHeight;
  });

  // 在任何視窗、裝置大小可以高度填滿整個畫面
  function highFull() {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  highFull();
  $win.resize(highFull);

  // Mobile Detect
  var $md = new MobileDetect(window.navigator.userAgent);
  if ($md.mobile()) $body.addClass('mb');
  else $body.addClass('pc');

  // Lazyload
  var intLazyLoad = new LazyLoad({
    elements_selector: '.js-imglazy',
    container: document
  });

  // AOS
  AOS.init({
    easing: 'ease-in-out-sine',
    duration: 800
  });

  $('#footer').load('library/page_footer.html');

  /* ====
  * header
  ==== */
  // 宣告
  function closeNav() {
    $html.removeClass('is-on');
    $header.removeClass('is-on');
    $navBtn.removeClass('is-on');
    $nav.removeClass('is-on');
  }
  function openNav() {
    $html.addClass('is-on');
    $header.addClass('is-on');
    $navBtn.addClass('is-on');
    $nav.addClass('is-on');
  }

  $('#header').load('library/page_header.html', function() {
    $(document).on('click', '.nav-switch', function() {
      var $header = $('.g-header'),
          $nav = $('.g-header__links'),
          $navBtn = $(this);

      if ($navBtn.hasClass('is-on')) {
        $('html, .g-header, .g-header__links, .nav-switch').removeClass('is-on');
      } else {
        $('html, .g-header, .g-header__links, .nav-switch').addClass('is-on');
      }
    });
  });

});