//---------------------FILTER------------------\\
  var status_filter = false;
  $(".filter a").on("click", function(e){
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
    $container.removeClass('filtred');
    $('.item').removeClass('display-none');
    if (!flag_status){
      $(this).addClass('filter_active')
      var filter_search = $(this).attr('href');
      $container.children().each(function(){
        if(!$(this).hasClass('f_'+filter_search)){
          if(history.pushState) {
            var redirect = prefix + '/#'+ filter_search;
            window.history.pushState('', '', redirect);
          }else{
          changeHashWithoutScrolling('')
          }
          $container.addClass('filtred');
          $(this).addClass('display-none');
        }
      });
    }
    init($container, [], itemsArr);
  });
//---------------------FILTER------------------\\
