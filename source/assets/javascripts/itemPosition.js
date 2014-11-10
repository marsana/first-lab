var margin = 25;
var $items, to,
	width,
	colum,
	col,
	row,
	itemsArr,
	peopleArr,
	maxObjHeight = 3000,
	scrollPosition;

var matrix = [];

function calculate($obj, itemsArr){
	$items = $obj.children();
	width = $obj.parent().parent().width()-150;
	$obj.width(width);
	colum = 3000;
	for(var i = 0; i < $items.length; i++){
		size = itemsArr[i].size[0] + margin;
		if (colum > size){
			colum = size;
		}
	}
	if (colum) col = Math.floor(width / (colum));
	if (col <= 0) col = 1;
	if ($obj.hasClass('active')) {
		col = $obj.children().length;
		colum = 35+10;
	}
}
function findPlaceInMatrix(matrix, sizeCol, i, j){
	for (var h = i; h < i + sizeCol; h++){
		if (!matrix[h]) matrix[h] = new Array();
		for (var k = j; k < j + sizeCol; k++){
			if (matrix[h][k] > col) return false;
			if (matrix[h][k]) return false;
		}
	}
	return true;
}
function setTrueToMatrix(matrix, sizeCol, i, j){
	for (var h = i; h < i + sizeCol; h++){
		if (!matrix[h]) matrix[h] = new Array();
		for (var k = j; k < j + sizeCol; k++){
			matrix[h][k] = true;
		}
	}
}
function findSpan(matrix,sizeCol){
	var flag = false
		i = 0,
		result=false;
	while (!flag){
		if (!matrix[i]) matrix[i] = new Array();
		for (var j = 0; j < col; j++){
			if (findPlaceInMatrix(matrix, sizeCol, i, j)) {
				result = [i,j];
				flag = true;
				setTrueToMatrix(matrix, sizeCol, i, j);
				break;
			}
		}
		i++;
	}
	return result;
}
function draw($obj,matrix, itemsArr){
	var matrix2 = [];
	$items.each(function(i){
		if(!$(this).hasClass('display-none')){
			size = itemsArr[i].size[0] + margin;
			sizeCol = Math.floor(size / colum);
			result = findSpan(matrix,sizeCol);
			if (result) {
				itemsArr[i].coor.left = result[1]*colum;
				itemsArr[i].coor.top = result[0]*colum;
			}
			if ($obj.hasClass('active')) {
				sizeCol = 1;
				result = findSpan(matrix2,sizeCol);
			}
			if (result) {
				$(this).css({
					left: itemsArr[i].coor.left + margin,
					top: itemsArr[i].coor.top + margin
				});
				$obj.css({
					width:'auto'
				})
				$obj.parent().css({
					height: (matrix.length+1)*colum,
					width:'auto'
				})

				if ($obj.hasClass('active')) {
					$obj.css({
						width: (matrix[0].length)*colum,
						height: 75
					})
					var posTop = $(window).scrollTop();
					var wrapperItemOffset = $obj.offset().top;
					var leftOffset = (parseInt($obj.parent().css('width')) - $obj.children().length*65)/2;

					$(this).css({
						left: result[1]*colum+leftOffset,
						top: - (wrapperItemOffset - posTop) +70
					});
				}else if($obj.hasClass('notActive'))  {
					$obj.css({
						top: $obj.parent().offset().top
					})
					$(this).css({
						left: itemsArr[i].coor.left + margin,
						top: itemsArr[i].coor.top + margin
					});
					$obj.removeClass('notActive');
					init($obj, [], itemsArr);
				}

				$(this).css({
					opacity:1
				})

			}
			else {
				console.log('error');
			}
		}
	});
	return true;
}
function init($obj, martix, itemsArr) {
	$obj = itemsArr[0].linkTo.parent()
	matrix = [];
	if ($obj.hasClass('active')) {
		for(var i = 0; i < $obj.children().length; i++){
			itemsArr[i].linkTo.css({
				width: itemsArr[i].size[1],
				height: itemsArr[i].size[1]
			});
			itemsArr[i].linkTo.children().css('display','none');
		}
	}else {

			$obj.children().each(function(){
				var size = $(this).offset().top  + $(this).height();
				if (maxObjHeight > size){
						maxObjHeight = size;
				}
			});
			clearTimeout(to);

			to = setTimeout(function() {
				$obj.css({
					top: $obj.parent().offset().top
				});
				if ($obj.hasClass('filtred')){
					$obj.parent().css({
						height: maxObjHeight + 200
					});
				}
			}, 15);
		for(var i = 0; i < $obj.children().length; i++){
			itemsArr[i].linkTo.css({
				width:itemsArr[i].size[0],
				height:itemsArr[i].size[0]
			})
			itemsArr[i].linkTo.children().css('display','inline-block');

		}
	}
	calculate($obj, itemsArr);
	if (draw($obj,matrix, itemsArr)) {
		$obj.addClass('is__ready')
	}
	return true;
}
