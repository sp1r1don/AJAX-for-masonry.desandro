$.fn.imagesLoaded = function () {

	// get all the images
	let $imgs = this.find('img[src!=""]');
	// if there's no images return resolved promise
	if (!$imgs.length) {return $.Deferred().resolve().promise();}

	// for each image, add a deferred object to the array
	let dfdarr = [];  
	$imgs.each(function(){

		let dfd = $.Deferred();
		dfdarr.push(dfd);
		let img = new Image();
		img.onload = function(){dfd.resolve();}
		img.onerror = function(){dfd.resolve();}
		img.src = this.src;

	});

	// return a master promise object 
	return $.when.apply($,dfdarr);

}

//usage

$.get(..., function(data){
	let $grid = $('.grid');
	let $data = $( data );
	$data.imagesLoaded().then(function(){
		$grid.append($data).masonry('appended', $data, true);
	});
}
