// = require itemPosition
// = require jquery.magnific-popup
// = require jquery.fitvids
/*global $:false */
'use strict';


var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

var prefix = window.location.pathname;
if(prefix[prefix.length-1] == '/')
  prefix = prefix.slice(0, prefix.length-1);
function changeHashWithoutScrolling(hash) {
  var id = hash.replace(/^.*#/, ''),
      elem = document.getElementById(id)
  elem.id = id+'-tmp'
  window.location.hash = hash
  elem.id = id
}
$(document).ready(function(){
  document.addEventListener('backbutton', function(){
  });
  $(window).keyup(function(e){
    if(e.keyCode == 8){
      if(location){
        console.log($(location  ));
        setTimeout(function() {
          var idtop = $('.what').offset().top-200;
          $(window).scrollTop(idtop);
          setTimeout(function() {
            $(location).trigger( "click" );
            $(window).trigger('scroll');
          }, 1000);
        }, 100);
      }
    }
  })
  var location = window.location.hash, buffer_hash;
  var item,project,menu,post_id,to,
    CLASS_ACTIVE = 'active',
    CLASS_LOADING = 'loading',
    CLASS_SUB_MENU = 'logotype',
    A_DURATION = 500,
    $container = $('.items-container'),
    $peopleItems = $('.people'),
    $item = $('.items'),
    $post = $('#post'),
    $menu = $('.menu'),
    $menu2 = $('.menu2'),
    menuChapter = $('.chapter'),
    postTopCash = 0,
    $currContainer;
  var itemSizeSmall = 35;
  itemsArr = [];
  peopleArr = [];


  function closeProgect(){
    $.magnificPopup.close()
    $currContainer.removeClass('is__small')
    $post.removeClass(CLASS_ACTIVE);
    $currContainer.removeClass(CLASS_ACTIVE);
    $currContainer.addClass('notActive');
    // init($container, [], itemsArr);
    if ( init($container, [], itemsArr )) init( $peopleItems, [], peopleArr );

        $item.css('z-index','2024');
        $peopleItems.css('z-index','2024');
  }


  function changePointMenu(){
    menuChapter.each(function(){
      if ($(this).offset().top-240 <= $(window).scrollTop()){
        var cl = $(this).data('link');
        $('.active-menu').removeClass('active-menu');
        $(cl).addClass('active-menu');
      }
    });
  }
  $container.children().each(function(){
    var eachItem = {
      linkTo: $(this),
      size: [
        $(this).width(),
        itemSizeSmall
        ],
      coor: {
          top: $(this).offset().top,
          left: $(this).offset().left
        },
      status: 0
    };
    itemsArr.push(eachItem);
  });
  $peopleItems.children().each(function(){
    var eachItem = {
      linkTo: $(this),
      size: [
        $(this).width(),
        itemSizeSmall
        ],
      coor: {
          top: $(this).offset().top,
          left: $(this).offset().left
        },
      status: 0
    };
    peopleArr.push(eachItem);
  });



  $(document).on("click", ".close1", function(e){
    if ($('.mfp-wrap').hasClass('mfp-ready')){
      e.preventDefault();
      closeProgect();
    };
  });
  $(document).on("click", ".logotype", function(e){
    var idtop = $('.header').offset().top-200;
    if ($post.hasClass(CLASS_ACTIVE)) {
      closeProgect();
      }
    $('html,body').animate({scrollTop: idtop}, A_DURATION);
  });
  //--------------------------------------magnificPopup--------------------------------------
  $container.magnificPopup({
    delegate: '.magpop',
    type: 'ajax',
    alignTop: true,
    overflowY: 'scroll',
    removalDelay: 300,
    mainClass: 'mfp-fade',
    callbacks: {
      beforeOpen: function(){
      //--------------------------------------Отмена фильтрации при открытии--------------------------------------
        var flag_status;
        $('.filter_active').removeClass('filter_active');
        $item.removeClass('filtred');
        $('.item').removeClass('display-none');
        if (init($container, [], itemsArr )) init( $peopleItems, [], peopleArr );
      //--------------------------------------***--------------------------------------
      // определение this
        var magnificPopup = $.magnificPopup.instance,
                cur = magnificPopup.st.el;
                //console.log(cur.hasClass('people-item'));

              $currContainer = cur.parent();
                var currArr;

      // если это айтем от людей, то переназначить массив
        if (cur.hasClass('people-item')) {
            currArr = peopleArr;
            $item.css('z-index','2');

          }else {
            currArr = itemsArr;
            $peopleItems.css('z-index','2');
          }


        $currContainer.addClass(CLASS_ACTIVE);
        $post.addClass(CLASS_ACTIVE);
        init($container, [], currArr);
      },
      open: function(){
        // Возможно, что это фиксило какой-то баг. А возможно и нет)

        //$item.css('transition','all 0s');
        // $(window).trigger('resize');
        // return true;

      },
      beforeClose: function(){

      // все вернуть
        $('.main').css('display','block');
        $('.close1').removeClass('close1');
        $container.children().addClass('magpop');

      // Не понимаю зачем это здесь
        //$item.css('transition','all .5s');
      // hash
        if(history.pushState) {
          var redirect = prefix + '/#';
          history.pushState('', '', redirect);
        }else{
          changeHashWithoutScrolling(prefix + '/#');
        }
      },
      change: function(){
        var mp = $.magnificPopup.instance,
            t = $(mp.currItem.el[0]);


      //Закрывать статью по клику по текущему айтому
        t.removeClass('magpop');
        t.addClass('mfp-close');
        t.addClass('close1');
      // hash
        if(history.pushState) {
          var redirect = prefix + '/#'+ t.data('id');
          window.history.pushState('', '', redirect);
        }else{
          changeHashWithoutScrolling(t.data('id'))
        }

        if ($('.mfp-wrap').hasClass('mfp-ready')){ // когда статья открылась
        // найти и убрать класс с крестиком с айтемов
          $('.close1').removeClass('close1');
        // всем вернуть возможность перехода по статьям
          $container.children().addClass('magpop');
        // найти текущий выбранный элемент
          var mp = $.magnificPopup.instance,
              t = $(mp.currItem.el[0]);
        // снять с текущего элемента возможность перехода по статьям
          t.removeClass('magpop');
        // добавить к текущему класс с крестиком
          t.addClass('close1');
        // Что-то связанное с оформлением, кажется opacity при переключении статей
          $('.mfp-container').addClass('mfp-figure');
          clearTimeout(to);
          to = setTimeout(function() {
            $('.mfp-container').removeClass('mfp-figure');
          }, 300);
        }
      // Не знаю о чем это, наверное заглушка на баг
        if ($('.mfp-container').hasClass('mfp-s-ready')){
          t.removeClass('magpop');
          t.addClass('mfp-close');
          t.addClass('close1');
        };

        (isMobile.any()) ? $('.main').css('display','none') : $('.main').css('display','block');

      },
      ajaxContentAdded: function(mfpResponse) {
        // Basic FitVids Test
        $(".mfp-content").fitVids();
        // Custom selector and No-Double-Wrapping Prevention Test
        $(".mfp-content").fitVids({ customSelector: "iframe"});
        }


    }
  });
  //--------------------------------------***--------------------------------------

  $(document).on("click", "a.anchor", function(e){
    e.preventDefault();
    var idtop = $($(this).attr("href")).offset().top-200;
    if ($post.hasClass(CLASS_ACTIVE)) closeProgect();
    $('html,body').animate({scrollTop: idtop}, A_DURATION);
  });
  var status_filter = false;
  $(document).on("click", ".filter a", function(e){
    e.preventDefault();
    if ($post.hasClass(CLASS_ACTIVE)) closeProgect();
    if(history.pushState) {
      var redirect = '/';
      history.pushState('', '', redirect);
    }
    else{
      changeHashWithoutScrolling('')
    }
    var idtop = $('.what').offset().top-200;
    $('html,body').animate({scrollTop: idtop}, A_DURATION);
    var flag_status;
    if ($(this).hasClass('filter_active')) flag_status = true;
    $('.filter_active').removeClass('filter_active');
    $item.removeClass('filtred');
    $('.item').removeClass('display-none');
    if (!flag_status){

      var filter_search = $(this).attr('href');
      // console.log(filter_search);
      $('#'+filter_search).addClass('filter_active')
      $item.children().each(function(){
        if(!$(this).hasClass('f_'+filter_search)){
          if(history.pushState) {
            var redirect = prefix + '/#'+ filter_search;
            window.history.pushState('', '', redirect);
          }else{
          changeHashWithoutScrolling('')
          }
          $item.addClass('filtred');
          $(this).addClass('display-none');
        }
      });
    }
    if (init($container, [], itemsArr )) init( $peopleItems, [], peopleArr );
  });
  $("body").on("click", ".close", function(){
    closeProgect();
  });
  $(window).on("scroll", function(){
    changePointMenu();
  });
  $('.items').css({
    top: $('.items-wrapper').offset().top
  });
  setTimeout(function() {
    $('.people').css({
      top: $('.people-wrapper').offset().top
    });
  }, 200);
  $(window).resize(function(){
    if (!$post.hasClass('active')){
      $('.items').css({
        top: $('.items-wrapper').offset().top
      });
      setTimeout(function() {
        $('.people').css({
          top: $('.people-wrapper').offset().top
        });
      }, 200);
    }
    $container.children().addClass('item-translate');
    $peopleItems.children('.people-item').addClass('item-translate');
    if (init($container, [], itemsArr )) init( $peopleItems, [], peopleArr );
  });
  if (init($container, [], itemsArr))
    setTimeout(function(){
      init($peopleItems, [], peopleArr)
    },500);

  if(location){
    // console.log($(location ));
    setTimeout(function() {
      var idtop = $('.what').offset().top-200;
      $(window).scrollTop(idtop);
      setTimeout(function() {
        $(location).trigger( "click" );
        $(window).trigger('scroll');
      }, 1000);
    }, 100);
  }
  $('.people-item').addClass('people-hover')
  //.isPerson();

  $('.peopleAboutItem').css('display','none')
});
