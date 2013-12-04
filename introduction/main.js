(function () {

	var canvas = document.querySelector("#canvas"),
		ctx = canvas.getContext("2d"),
		width = canvas.width,
		height = canvas.height,
		cursor = { x: 0, y: 0 };

	document.onmousemove = function (e) {
		cursor.x = e.pageX;
		cursor.y = e.pageY;
	};

	function point(x, y) {
		ctx.fillRect(x, y, 1, 1);
	}

	function Random() {
		return {
			random : Math.random,
			sqrt : Math.sqrt,
			log : Math.log,
			nextGaussian : function () {
				var x1, x2, rad, y1;
				do {
					x1 = 2 * this.random() - 1;
					x2 = 2 * this.random() - 1;
					rad = x1 * x1 + x2 * x2;
				} while (rad >= 1 || rad === 0);
				var c = this.sqrt(-2 * this.log(rad) / rad);
				return x1 * c;
			}
		};
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
			step : function (target) {

				var r = Math.random();

				if (r < 0.01) {
					this.x += random(-100, 100);
					this.y += random(-100, 100);
				} else {
					this.x += random(-1, 1);
					this.y += random(-1, 1);
				}

				/*
				if (r < 0.5) {
					if (target.x > this.x) {
						this.x++;
					} else {
						this.x--;
					}
					if (target.y > this.y) {
						this.y++;
					} else {
						this.y--;
					}
				} else if (r < 0.5 + 0.125) {
					this.x++;
				} else if (r < 0.5 + (0.125 * 2)) {
					this.x--;
				} else if (r < 0.5 + (0.125 * 3)) {
					this.y++;
				} else {
					this.y--;
				}
				*/

			}
		};
	};

	var walkers = [new Walker(random(100), random(100)), new Walker(random(-100), random(-100)), new Walker()],
		randomCounts = [],
		generator = new Random(),
		sd = Math.min(width, height) / 8, meanW = width / 2, meanH = height / 2, numX, numY,
		i, x;

	ctx.fillStyle = "rgba(0, 255, 0, 0.7)";

	// for (i = 0; i < 20; i++) {
	// 	randomCounts[i] = 0;
	// }

	ctx.fillStyle = "rgba(0, 255, 0, 0.5)";

	function loop() {
		// ctx.fillStyle = "rgba(0,0,0,0.1)";
		// ctx.fillRect(0, 0, width, height);


		// randomCounts[i]++;
		numX = generator.nextGaussian();
		numY = generator.nextGaussian();

		for (i = 0; i < walkers.length; i++) {

			walkers[i].display();
			walkers[i].step({
				x: (sd * numX + meanW),
				y: (sd * numY + meanH)
			});
		}

		window.requestAnimationFrame(loop);
	}

	loop();

}());