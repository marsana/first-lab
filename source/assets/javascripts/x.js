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

        var magnificPopup = $.magnificPopup.instance,
                cur = magnificPopup.st.el;

              $currContainer = cur.parent();
                var currArr;

        if (cur.hasClass('people-item')) {
            currArr = peopleArr;
            $item.css('z-index','2');

          }else {
                  //--------------------------------------Отмена фильтрации при открытии--------------------------------------
        var flag_status;
        $('.filter_active').removeClass('filter_active');
        $item.removeClass('filtred');
        $('#'+'all').addClass('filter_active');
        $('.item').css({
          display: 'block'
        });
        $('.item').removeClass('display-none');
        if (init($container, [], itemsArr )) init( $peopleItems, [], peopleArr );
      //--------------------------------------***--------------------------------------
            currArr = itemsArr;
            $peopleItems.css('z-index','2');
          }


        $currContainer.addClass(CLASS_ACTIVE);
        $post.addClass(CLASS_ACTIVE);
        init($container, [], currArr);
      },
      beforeClose: function(){
        $('.main').css('display','block');
        $('.close1').removeClass('close1');
        $container.children().addClass('magpop');
        if(history.pushState) {
          var redirect = prefix + '/';
          history.pushState('', '', redirect);
        }else{
          changeHashWithoutScrolling(prefix + '/');
        }
      },
      change: function(){
        var mp = $.magnificPopup.instance,
            t = $(mp.currItem.el[0]);
        t.removeClass('magpop');
        t.addClass('mfp-close');
        t.addClass('close1');
        if(history.pushState) {
          var redirect = prefix + '/#'+ t.data('id');
          window.history.pushState('', '', redirect);
        }else{
          changeHashWithoutScrolling(t.data('id'))
        }

        if ($('.mfp-wrap').hasClass('mfp-ready')){ 
          $('.close1').removeClass('close1');
          $container.children().addClass('magpop');
          var mp = $.magnificPopup.instance,
              t = $(mp.currItem.el[0]);
          t.removeClass('magpop');
          t.addClass('close1');
          $('.mfp-container').addClass('mfp-figure');
          clearTimeout(to);
          to = setTimeout(function() {
            $('.mfp-container').removeClass('mfp-figure');
          }, 300);
        }
        if ($('.mfp-container').hasClass('mfp-s-ready')){
          t.removeClass('magpop');
          t.addClass('mfp-close');
          t.addClass('close1');
        };

        (isMobile.any()) ? $('.main').css('display','none') : $('.main').css('display','block');

      },
      ajaxContentAdded: function(mfpResponse) {
        $(".mfp-content").fitVids();
        $(".mfp-content").fitVids({ customSelector: "iframe"});
        }


    }
  });
  $(document).on("click", "a.anchor", function(e){
    e.preventDefault();
    var idtop = $($(this).attr("href")).offset().top-200;
    if ($post.hasClass(CLASS_ACTIVE)) closeProgect();
    $('html,body').animate({scrollTop: idtop}, A_DURATION);
  });
  
//--------------------------------------***--------------------------------------
  var status_filter = false;
  var href;
  var setFilterActive = function(){
    $('.filter_active').removeClass('filter_active');
    $item.removeClass('filtred');
    $('.item').css({
        display: 'block'
      });
    $('.item').removeClass('display-none');
    $('#' + href + '').addClass('filter_active');
    
    if(history.pushState) {
      var redirect = prefix + '/#'+ href;
      window.history.pushState('', '', redirect);
    }else{
      changeHashWithoutScrolling('')
    }
    
    $item.children().each(function(){
      if(!$(this).hasClass('f_'+href)){
        $(this).addClass('display-none');
      }
    });
    
    setTimeout(function() {
      $('.display-none').css({
        display: 'none'
      });
    }, 500);   
    
    $item.addClass('filtred');
}
  $(document).on("click", ".filter a", function(e){
    e.preventDefault();
    
    var $that = $( this ),
        idtop = $( '.what' ).offset().top - 200,
        flag_status;
    href = $that.attr( 'href' );
     
    if ($that.hasClass('filter_active')) flag_status = true;  
    
    if ($post.hasClass( CLASS_ACTIVE )) {closeProgect();} 
    else if (flag_status) {
      
      $('.filter_active').removeClass('filter_active');
      $item.removeClass('filtred');
      
      $('.item').css({
        display: 'block'
      });
      
      $('.item').removeClass('display-none');
      $('#'+'all').addClass('filter_active');
      if(history.pushState) {
        var redirect = prefix + '/';
        window.history.pushState('', '', redirect);
      }else{
        changeHashWithoutScrolling('')
      }
    } 
    

    if ( !flag_status ) {
      setFilterActive();
    }
    
    
    $('html,body').animate({scrollTop: idtop}, A_DURATION);
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

  $('.peopleAboutItem').css('display','none')
});
