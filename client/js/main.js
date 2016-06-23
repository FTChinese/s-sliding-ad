const div = document.getElementById('touch-area');
const target = document.getElementById('swipe-target');
const loop = document.getElementById('loop');

function swipeDetect(el, callback, options) {
	var swipeDir;
	var startX;
	var startY;
	var distX;
	var distY;
	var startTime;
	var elapsedTime;

	var minDist = 0;
	var maxDeviation = 100;
	var maxTimeAllowed = 300;

	if (options) {
		minDist = options.minDist ? options.minDist : minDist;

		maxDeviation = options.maxDeviation ? options.maxDeviation : maxDeviation;

		maxTimeAllowed = options.maxTimeAllowed ? options.maxTimeAllowed : maxTimeAllowed;
	}

	el.addEventListener('touchstart', function(e) {
		var touch = e.changedTouches[0];
		swipeDir = 'none';
		distX = 0;
		distY = 0;
		startX = touch.pageX;
		startY = touch.pageY;
		startTime = new Date().getTime();
		e.preventDefault();
	}, false);

	el.addEventListener('touchmove', function(e) {
		e.preventDefault();
	}, false);

	el.addEventListener('touchend', function(e) {
		var touch = e.changedTouches[0];
		distX = touch.pageX - startX;
		distY = touch.pageY - startY;
		elapsedTime = new Date().getTime() - startTime;
		console.log('distX: ' + distX);
		console.log('distY: ' + distY);
		console.log('elapsed time: ' + elapsedTime);

		if (elapsedTime <= maxTimeAllowed) {
			if (Math.abs(distX) >= minDist && Math.abs(distY) <= maxDeviation) {
				swipeDir = (distX < 0) ? 'left' : 'right';
			} else if (Math.abs(distY) >= minDist && Math.abs(distX) <= maxDeviation) {
				swipeDir = (distY < 0) ? 'up' : 'down';
			}
		}
		callback(swipeDir);
		e.preventDefault();
	});
}

swipeDetect(div, function(dir) {
	if (dir === 'right') {
		console.log('swiping to right');
		target.setAttribute('aria-expanded', 'true');
		div.setAttribute('aria-expanded', 'false');
	}
}, {
	maxTimeAllowed: 1000
});

swipeDetect(target, function(dir) {
	if (dir === 'left') {
		console.log('swiping to left');
		target.setAttribute('aria-expanded', 'false');
		div.setAttribute('aria-expanded', 'true');	
	}
}, {
	maxTimeAllowed: 1000
});