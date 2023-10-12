const slider = new Vue ({
	el: '#slider',
	
	data: () => ({
		val: 70
	}),
	
	// Just for fun, set the value randomly each time the component loads. (Means the value of 70 above really doesn't do anything.)
	mounted() {
		this.val = Math.floor(Math.random() * 101)
	},
	
	computed: {
		// This is not ideal just because it needs knowledge of how wide the track is.
		// Ideally I'd like to do this more dynamically so it works with any track length,
		// but for the sake of smooth animations I kept it like this.
		getPlacement() {
			return ((this.val * 14.5)) + `%`;
		},
		
		// This is kinda hacky, but if the background is rounded at too low a value, you can see it peeking out from behind the emoji.
		greaterThanFifty() {
			return this.val > 50 ? `var(--roundness)` : `0`;
		},
		
		// Makes the color smoothly move from red to orange to yellow
		getHappinessColor() {
  		return `rgba(255, ${106 + (103 / 100 * this.val)}, ${(Math.floor(this.val * -1 / 7.692)) + 13}`;
		},
		
		// Adjusts the amount of yellow in the filled slider
		getSliderBackground() {
			return `linear-gradient(to right, var(--orange), ${(this.val * -1) + 125}%, var(--yellow))`
		},
		
		// Changes which emoji is displayed
		getHappiness() {
			let moods = ["😡","😠","😞","😦","🙁","😐","🙂","😊","😄","🥰","😍"]
			
			if (this.val === 0) {
				return "🤬";
			} 
				
			return moods[(Math.floor(this.val / 10))];
		}
	}
});



var container = document.getElementById('animate');
var emoji = ['😡', '😠', '😞', '😦', '🙁', '😐', '🙂', '💖', '😊', '🥰', '🙂', '🥰', '😍', '😕', '🥺', '💖', '💕 ', '😑', '😁', '😱', '😬', '😂', '🤣'];
var circles = [];

for (var i = 0; i < 1; i++) {
  addCircle(i * 300, [10 + 0, 300], emoji[Math.floor(Math.random() * emoji.length)]);
  addCircle(i * 300, [10 + 0, -300], emoji[Math.floor(Math.random() * emoji.length)]);
  addCircle(i * 300, [10 - 200, -300], emoji[Math.floor(Math.random() * emoji.length)]);
  addCircle(i * 300, [10 + 200, 300], emoji[Math.floor(Math.random() * emoji.length)]);
  addCircle(i * 300, [10 - 400, -300], emoji[Math.floor(Math.random() * emoji.length)]);
  addCircle(i * 300, [10 + 400, 300], emoji[Math.floor(Math.random() * emoji.length)]);
  addCircle(i * 300, [10 - 600, -300], emoji[Math.floor(Math.random() * emoji.length)]);
  addCircle(i * 300, [10 + 600, 300], emoji[Math.floor(Math.random() * emoji.length)]);
}



function addCircle(delay, range, color) {
  setTimeout(function() {
    var c = new Circle(range[0] + Math.random() * range[1], 80 + Math.random() * 4, color, {
      x: -0.15 + Math.random() * 0.3,
      y: 0.5 + Math.random() * 1
    }, range);
    circles.push(c);
  }, delay);
}

function Circle(x, y, c, v, range) {
  var _this = this;
  this.x = x;
  this.y = y;
  this.color = c;
  this.v = v;
  this.range = range;
  this.element = document.createElement('span');
  /*this.element.style.display = 'block';*/
  this.element.style.opacity = 0;
  this.element.style.position = 'absolute';
  this.element.style.fontSize = '26px';
  this.element.style.color = 'hsl('+(Math.random()*360|0)+',80%,50%)';
  this.element.innerHTML = c;
  container.appendChild(this.element);

  this.update = function() {
    if (_this.y > 800) {
      _this.y = 80 + Math.random() * 4;
      _this.x = _this.range[0] + Math.random() * _this.range[1];
    }
    _this.y += _this.v.y;
    _this.x += _this.v.x;
    this.element.style.opacity = 1;
    this.element.style.transform = 'translate3d(' + _this.x + 'px, ' + _this.y + 'px, 0px)';
    this.element.style.webkitTransform = 'translate3d(' + _this.x + 'px, ' + _this.y + 'px, 0px)';
    this.element.style.mozTransform = 'translate3d(' + _this.x + 'px, ' + _this.y + 'px, 0px)';
  };
}

function animate() {
  for (var i in circles) {
    circles[i].update();
  }
  requestAnimationFrame(animate);
}

animate();