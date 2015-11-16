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
        $container.removeClass('filtred');
        $('.item').removeClass('display-none');
        init($container, [], itemsArr);
  //--------------------------------------***--------------------------------------
        $container.addClass(CLASS_ACTIVE);
        $post.addClass(CLASS_ACTIVE);
        init($container, [], itemsArr);
      },
      open: function(){
        $item.css('transition','all 0s');
        $(window).trigger('resize');
        return true;
      },
      beforeClose: function(){
        $('.main').css('display','block');
        $('.close1').removeClass('close1');

        $container.children().addClass('magpop');
        $item.css('transition','all .5s');
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

        if(isMobile.any()){
          $('.main').css('display','none');
        }
        else {
          $('.main').css('display','block');
        }
      },
      ajaxContentAdded: function(mfpResponse) {
        // Basic FitVids Test
        $(".mfp-content").fitVids();
        // Custom selector and No-Double-Wrapping Prevention Test
        $(".mfp-content").fitVids({ customSelector: "iframe"});

          console.log('Ajax content loaded:', mfpResponse);
        }


    }
  });
  //--------------------------------------***--------------------------------------
;
