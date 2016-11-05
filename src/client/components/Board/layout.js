var colCount = 0
var colWidth = 0
var margin = 20
var outerMargin = 0
var windowWidth = 0
var blocks = []

var $items = null

$(window).resize(setupBlocks)

export default function setupBlocks() {
	$items = $('.board-post')
	if (!$items.length) return // sometimes called before posts are rendered

	blocks = []
	windowWidth = $(window).width()
	colWidth = $items.outerWidth()
	colCount = Math.floor(windowWidth/(colWidth+margin))
	outerMargin = windowWidth - colCount*(colWidth+margin)

	for (let i=0; i<colCount; i++) {
		blocks.push( margin)
	}

	positionBlocks()
}

function positionBlocks() {
	$items.each(function(){
		var min = Array.min(blocks)
		var index = $.inArray(min, blocks)
		var leftPos = outerMargin/2 + margin+(index*(colWidth+margin))
		$(this).css({
			'top': min+'px',
			'left': leftPos+'px'
		})
		blocks[index] = min+$(this).outerHeight()+margin
	})	
}

// Function to get the Min value in Array
Array.min = function(array) {
    return Math.min.apply(Math, array)
}