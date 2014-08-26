// = require itemPosition
// = require jquery.magnific-popup

/*global $:false */
'use strict';

$(document).ready(function(){


	var item,project,menu,post_id,to,
		CLASS_ACTIVE = 'active',
		CLASS_LOADING = 'loading',
		CLASS_SUB_MENU = 'logotype',
		A_DURATION = 500, 
		$container = $('.items'),
		$item = $('.item');
		$post = $('#post'),
		$menu = $('.menu'),
		menuChapter = $('.chapter'),
		postTopCash = 0;
	var itemSizeSmall = 35;
	itemsArr = [];
	function closeProgect(target){
		$.magnificPopup.close()
		$container.removeClass('is__small')
		$post.removeClass(CLASS_ACTIVE);
		$menu.removeClass(CLASS_SUB_MENU);
		$container.removeClass(CLASS_ACTIVE);
		$container.addClass('notActive');
		init($container, [], itemsArr);
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

	peopleArr = [];
	$('.people').children().each(function(){
		var eachMan = { 
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
		peopleArr.push(eachMan);
	});

	//--------------------------------------***--------------------------------------
	$container.magnificPopup({
		delegate: 'a',
		type: 'ajax',
		alignTop: true,
		overflowY: 'scroll',
		removalDelay: 300,
		mainClass: 'mfp-fade',
		callbacks: {
			beforeOpen: function(){
				$container.addClass(CLASS_ACTIVE);
					$menu.addClass(CLASS_SUB_MENU);
					$post.addClass(CLASS_ACTIVE);
					init($container, [], itemsArr);
			},
			open: function(){
				$item.css('transition','all 0s');

				$('.mfp-wrap').on("scroll", function(){
					var posTop = $('.article_inner').offset().top;
					var wrapperItemOffset = $('.items').offset().top;

					if ($container.hasClass(CLASS_ACTIVE)) {
						$container.children().css({
							top: - (wrapperItemOffset - posTop) -110
						})
					}
				});
			},
			beforeClose: function(){
				$item.css('transition','all .5s');
			}
		}
	});
	//--------------------------------------***--------------------------------------

	$(document).on("click", "a.anchor", function(e){	
		e.preventDefault();	
		var idtop = $($(this).attr("href")).offset().top-200;
		$('html,body').animate({scrollTop: idtop}, A_DURATION);
		if ($post.hasClass(CLASS_ACTIVE)) closeProgect();
	});

	$(document).on("click", ".filter a", function(e){	
		e.preventDefault();	
		var idtop = $('.what').offset().top-200;
		$('html,body').animate({scrollTop: idtop}, A_DURATION);
		if ($post.hasClass(CLASS_ACTIVE)) closeProgect();
	});

	$("body").on("click", ".close", function(){
		closeProgect('click');
	});	

	$(window).on("scroll", function(){
		changePointMenu();
		
	});

	$container.css({
		top: $('.items-wrapper').offset().top
	});

	$(window).resize(function(){
		$container.children().addClass('item-translate');
		init($container,[], itemsArr);
	});

	init($container, [], itemsArr);

});