const navSlide = () => {
	const burger = document.querySelector('.burger');
	const nav = document.querySelector('.nav-links');
	const navLinks = document.querySelectorAll('.nav-links li');
//adds class to burger that creates the animation
	burger.addEventListener('click', () => {
		nav.classList.toggle('nav-active');
		navLinks.forEach((link, ind) => {
			if (link.style.animation) {
				link.style.animation = '';
			} else {
				link.style.animation = `navLinkFade 0.5s ease forwards ${ind / 7 + 1.0}s`;
			}
		});
		burger.classList.toggle('toggle');
	});
};

const editor = () => {
	var TxtRotate = function(el, toRotate, period) {
		this.toRotate = toRotate;
		this.el = el;
		this.loopNum = 0;
		this.period = parseInt(period, 10) || 2000;
		this.txt = '';
		this.tick();
		this.isDeleting = false;
	};
	
	TxtRotate.prototype.tick = function() {
		var i = this.loopNum % this.toRotate.length;
		var fullTxt = this.toRotate[i];
//i was gonna implement to delete but if it doesnt delete it adds the next letter
		if (this.isDeleting) {
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}

		this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

		var that = this;
		var delta = 200 - Math.random() * 100;

		if (this.isDeleting) {
			delta /= 2;
		}
//calls the function above but inside the set timeour using delta as the time
		setTimeout(function() {
			that.tick();
		}, delta);
	};
//goes through the array 
	window.onload = function() {
		var elements = document.getElementsByClassName('txt-rotate');
		for (var i = 0; i < elements.length; i++) {
			var toRotate = elements[i].getAttribute('data-rotate');
			var period = elements[i].getAttribute('data-period');
			if (toRotate) {
				new TxtRotate(elements[i], JSON.parse(toRotate), period);
			}
		}
//adds css to element
		var css = document.createElement('style');
		css.type = 'text/css';
		css.innerHTML = '.txt-rotate > .wrap { border-right: 0.3em solid #32CD32 }';
		document.body.appendChild(css);
	};
};
//will call the functions above
const app = () => {
	navSlide();
	editor();
};

app();
