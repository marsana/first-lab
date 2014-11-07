//= require isotope.pkgd.min
/*global $:false */

$(document).ready(function(){}); 
'use strict';
$(function() {
	// $('.filter-item').on('click', function() {
	// 	$container.isotope({ filter: '.f_' + $(this).attr('href')});
	// 	return false;
	// })
	var item,
		project,
		menu,
		to,

		CLASS_ACTIVE = 'active',
		CLASS_LOADING = 'loading',
		CLASS_SUB_MENU = 'logotype',
		A_TOP_PADDING = 0,
		A_TOP_MARGIN = 65,
		DIV_DURATION = 500,
		A_DURATION = 500;

	var $container = $('.items');
	$container.isotope({

		itemSelector: '.item',
		masonry: {
			columnWidth: 35,
			gutter: 5,
			isFitWidth: true
		}
	});

	// function Item ($item, size, top, left) {
	// 	this.$item = $item;
	// 	this.size = size;
	// 	this.top = top;
	// 	this.left = left;
	// }

	// Item.prototype.changeSizeItem = function(direction,$item){
	// 	if (direction == 'toBig'){


	// 		this.wrapper.removeClass(CLASS_ACTIVE);				
	// 		$('.item').removeClass(CLASS_ACTIVE).removeClass(CLASS_LOADING)
	// 	}
	// 	if (direction == 'toSmall'){
	// 		$item.removeClass(CLASS_ACTIVE).removeClass(CLASS_LOADING)

	// 		this.wrapper.addClass(CLASS_ACTIVE).css({
	// 			'transform': 'translateY(' + A_TOP_PADDING + 'px)'
	// 		})
	// 		//Isotope
	// 		this.toReplaceItem();
	// 	} 
	// }

	// var item1 = new Item($('#item'), 200, 100, 300);

	item = {
		wrapper:$('#items'),
		filterItem:0,
		changeSizeItem: function(direction,$item){
			if (direction == 'toBig'){


				this.wrapper.removeClass(CLASS_ACTIVE);				
				$('.item').removeClass(CLASS_ACTIVE).removeClass(CLASS_LOADING)
			}
			if (direction == 'toSmall'){
				$item.removeClass(CLASS_ACTIVE).removeClass(CLASS_LOADING)

				this.wrapper.addClass(CLASS_ACTIVE).css({
					'transform': 'translateY(' + A_TOP_PADDING + 'px)'
				})
				//Isotope
				this.toReplaceItem();
			} 
		},
		toReplaceItem: function(){$container.isotope();}
	};

	project = {
		im: $('.content'),
		upload: $('#post'),
		openProject:function(myItem){
			event.preventDefault();
			menu.heightMenu = 'full';
			$("body").css("overflow","hidden");
			var $item = $(myItem);


			$item.addClass(CLASS_LOADING);

			post_id = $item.data('id');
			$.ajax({
				url: '/data/' + post_id + '.json',
				dataType: 'json',
				success: function(data) {

					project.upload.html(data.body);

					$item.removeClass(CLASS_LOADING).addClass(CLASS_ACTIVE);

					clearTimeout(to);
					to = setTimeout(function() {

						item.changeSizeItem('toSmall',$item);

						project.upload.addClass(CLASS_ACTIVE);
						project.im.addClass(CLASS_ACTIVE);
						menu.wrapper.addClass(CLASS_SUB_MENU);
						
						var idtop = item.wrapper.offset().top - A_TOP_MARGIN;
						$('html,body').animate({scrollTop: idtop}, 0);
						// $("html,body").css("overflow","hidden");
					}, A_DURATION);

				},
				error: function() {
					console.log('error');
				}
			});

		},

		closeProgect: function(target){	
			event.preventDefault();
			clearTimeout(to);
			to = setTimeout(function() {

				$("body").css("overflow","auto");

				item.changeSizeItem('toBig');

				project.upload.html('');

				project.upload.removeClass(CLASS_ACTIVE);
				project.im.removeClass(CLASS_ACTIVE);
				menu.wrapper.removeClass(CLASS_SUB_MENU);				
				item.toReplaceItem();
			if (target == 'click') {
				target = $('.what').offset().top;
				console.log (target);
			}	
			menu.baseGoToPointMenu(target);					
			}, A_DURATION);	

		}
	}

	menu = {
		wrapper: $('.menu'),
		im: $('a.anchor'),
		chapter: $('.chapter'),
		baseGoToPointMenu: function(coor){
			console.log(coor);
			$('html,body').animate({scrollTop: coor}, this.durationMenu);
		},
		fullGoToPointMenu: function(coor){
			this.heightMenu = 'full';
			project.closeProgect(coor);
			$('html,body').animate({scrollTop: coor}, this.durationMenu);
		},
		changePointMenu: function(){
			this.chapter.each(function(){
			if ($(this).offset().top-250 <= $(window).scrollTop()){
				var cl = $(this).data('link');
				$('.active-menu').removeClass('active-menu');
				$(cl).addClass('active-menu');
			}
		})
		},
		heightMenu: 'base', //full
		durationMenu: 500

	}






	$(document).on('click', '.item', function() {
		project.openProject(this);
	});

	$(document).on("click", "a.anchor", function(){		
		var idtop = $($(this).attr("href")).offset().top-230;
		project.closeProgect(idtop);
	});

	$("body").on("click", ".close", function(){
		project.closeProgect('click');
	});	

	$(window).on("scroll", function(){
		menu.changePointMenu();
	});


});