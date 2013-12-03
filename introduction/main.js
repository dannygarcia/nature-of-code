(function () {

	var canvas = document.querySelector("#canvas"),
		ctx = canvas.getContext("2d"),
		width = canvas.width,
		height = canvas.height;

	function point(x, y) {
		ctx.fillRect(x, y, 1, 1);
	}

	function random(min, max) {
		if (typeof max === "undefined") {
			max = min;
			min = 0;
		}
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	var Walker = function (x, y) {

		x = x || 0;
		y = y || 0;

		return {
			x : width / 2 + x,
			y : height / 2 + y,
			display : function () {
				point(this.x, this.y);
			},
			step : function () {
				var stepx = random(-1, 1);
				var stepy = random(-1, 1);
				this.x += stepx;
				this.y += stepy;
			}
		};
	};

	var walkers = [new Walker(random(100), random(100)), new Walker(random(-100), random(-100)), new Walker()],
		randomCounts = [],

		i, w, x;

	ctx.fillStyle = "rgba(0, 255, 0, 0.7)";

	for (i = 0; i < 20; i++) {
		randomCounts[i] = 0;
	}

	w = width / randomCounts.length;

	function loop() {
		ctx.fillStyle = "rgba(0,0,0,0.2)";
		ctx.fillRect(0, 0, width, height);

		i = random(randomCounts.length);
		randomCounts[i]++;

		ctx.fillStyle = "rgba(0, 255, 0, 0.7)";
		for (i = 0; i < walkers.length; i++) {
			walkers[i].display();
			walkers[i].step();
		}
		for (x = 0; x < randomCounts.length; x++) {
			ctx.fillRect(x * w, height - randomCounts[x], w - 1, randomCounts[x]);
		}
		window.requestAnimationFrame(loop);
	}

	loop();

}());