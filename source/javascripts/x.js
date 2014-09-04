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

var location = window.location.hash, buffer_hash;
console.log(location);

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
		menuChapter = $('.chapter'),
		postTopCash = 0;
	var itemSizeSmall = 35;
	itemsArr = [];
	peopleArr = [];
	function closeProgect(){
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

	//--------------------------------------magnificPopup--------------------------------------
	$container.magnificPopup({
		delegate: 'a',
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

				// buffer_hash = window.location.hash;
				$container.addClass(CLASS_ACTIVE);
				$menu.addClass(CLASS_SUB_MENU);
				$post.addClass(CLASS_ACTIVE);
				init($container, [], itemsArr);
			},
			open: function(){
				var mp = $.magnificPopup.instance,
						t = $(mp.currItem.el[0]);
					
					if(history.pushState) {	
					var redirect = '/#'+ t.data('id');
					window.history.pushState('', '', redirect);
				}else{
					changeHashWithoutScrolling(t.data('id'))
					// window.location.hash = t.data('id');
				}
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
				// $('.mfp-wrap').trigger('scroll');
			},
			beforeClose: function(){
				$item.css('transition','all .5s');

				if(history.pushState) {		
					// var redirect = '/#'+ buffer_hash;
					var redirect = '/#';
					history.pushState('', '', redirect);
				}else{
					changeHashWithoutScrolling('/#');
					// changeHashWithoutScrolling(buffer_hash);


				}

			},
			change: function(){
				var mp = $.magnificPopup.instance,
						t = $(mp.currItem.el[0]);
				if(history.pushState) {		
					var redirect = '/#'+ t.data('id');
					window.history.pushState('', '', redirect);
				}else{
					changeHashWithoutScrolling(t.data('id'))
					// window.location.hash = t.data('id');
				}
				if ($('.mfp-wrap').hasClass('mfp-ready')){
					// alert(1);
					$('.mfp-container').addClass('mfp-figure');
					clearTimeout(to);
					to = setTimeout(function() {
						$('.mfp-container').removeClass('mfp-figure');	
					}, 300);			
				}
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

			// window.location.hash = '';
		}
		var idtop = $('.what').offset().top-200; // где бы ни были отскролить к итемам		
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

					// window.location.hash = filter_search;
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


	// $('html').promise().done(function(){
		if(location){
			// alert(1);
			console.log($(location	));
			// console.log('777777777777777777777',idtop);
			setTimeout(function() {
				var idtop = $('.what').offset().top-200; // где бы ни были отскролить к итемам		
				$(window).scrollTop(idtop);
				setTimeout(function() {
					$(location).trigger( "click" );
					$(window).trigger('scroll');
				}, 1000);
				
			}, 100);
			// $(location).trigger( "click" );
			
		}
	// });

});