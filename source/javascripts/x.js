// = require itemPosition
// = require jquery.magnific-popup

/*global $:false */
'use strict';

function changeHashWithoutScrolling(hash) {
  var id = hash.replace(/^.*#/, ''),
      elem = document.getElementById(id)
  elem.id = id+'-tmp'
  window.location.hash = hash
  elem.id = id
}

$(document).ready(function(){


	document.addEventListener('backbutton', function(){
		alert(1);
	});
	$(window).keyup(function(e){
		if(e.keyCode == 8){
			if(location){
				console.log($(location	));
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
		$container = $('.items'),
		$peopleItems = $('.people'),
		$item = $('.item'),
		$post = $('#post'),
		$menu = $('.menu'),
		$menu2 = $('.menu2'),
		menuChapter = $('.chapter'),
		postTopCash = 0;
	var itemSizeSmall = 35;
	itemsArr = [];
	peopleArr = [];
	function closeProgect(){
		$.magnificPopup.close()
		$container.removeClass('is__small')
		$post.removeClass(CLASS_ACTIVE);
		$menu2.removeClass(CLASS_SUB_MENU);
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
		// e.preventDefault();	
		// alert(1);
		var idtop = $('.header').offset().top-200;
		if ($post.hasClass(CLASS_ACTIVE)) {
			// alert(1);
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
				$container.removeClass('filtred');
				$('.item').removeClass('display-none');
				
				init($container, [], itemsArr);

	//--------------------------------------***--------------------------------------

				$container.addClass(CLASS_ACTIVE);
				$menu2.addClass(CLASS_SUB_MENU);
				$post.addClass(CLASS_ACTIVE);
				init($container, [], itemsArr);
			},
			open: function(){
				$item.css('transition','all 0s');

				// $('.mfp-wrap').on("scroll", function(){
				// 	var posTop = $('.article_inner').offset().top;
				// 	var wrapperItemOffset = $('.items').offset().top;

				// 	if ($container.hasClass(CLASS_ACTIVE)) {
				// 		$container.children().css({
				// 			top: - (wrapperItemOffset - posTop) -110
				// 		})
				// 	}
				// });

				return true;
			},
			beforeClose: function(){
				$('.close1').removeClass('close1');
				$container.children().addClass('magpop');
				$item.css('transition','all .5s');

				if(history.pushState) {		
					var redirect = '/#';
					history.pushState('', '', redirect);
				}else{
					changeHashWithoutScrolling('/#');
				}

			},
			change: function(){			
				var mp = $.magnificPopup.instance,
						t = $(mp.currItem.el[0]);

				t.removeClass('magpop');
				t.addClass('mfp-close');
				t.addClass('close1');

				if(history.pushState) {		
					var redirect = '/#'+ t.data('id');
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

		$container.removeClass('filtred');
		$('.item').removeClass('display-none');
		if (!flag_status){
			$(this).addClass('filter_active')
			var filter_search = $(this).attr('href');
			$container.children().each(function(){
				if(!$(this).hasClass('f_'+filter_search)){
				
					if(history.pushState) {

						var redirect = '/#'+ filter_search;
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

	$("body").on("click", ".close", function(){
		closeProgect();
	});	

	$(window).on("scroll", function(){
		changePointMenu();
		
	});

	$container.css({
		top: $('.items-wrapper').offset().top
	});

	$(window).resize(function(){
		$container.children().addClass('item-translate');
		$peopleItems.children().addClass('item-translate');
		if (init($peopleItems, [], peopleArr)) init($container, [], itemsArr);
	});

	if (init($peopleItems, [], peopleArr)) init($container, [], itemsArr);
		if(location){
			console.log($(location	));
			setTimeout(function() {
				var idtop = $('.what').offset().top-200;
				$(window).scrollTop(idtop);
				setTimeout(function() {
					$(location).trigger( "click" );
					$(window).trigger('scroll');
				}, 1000);
			}, 100);
		}
});