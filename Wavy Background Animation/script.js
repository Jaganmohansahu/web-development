var scene = document.getElementById("scene");
var catchAll = document.getElementById("catchAll");
var container01 = document.getElementById("lineContainer01");
var container02 = document.getElementById("lineContainer02");
var dragBall = document.getElementById("dragBall");
var sliderVal = document.getElementById("test-result");
var range = document.getElementById("range-slider-1");
var body = document.getElementsByTagName("body")[0];
catchAll.addEventListener("click", timeScalePause);

var tl = new TimelineMax();
/* var wavFreq = null;
var wavAmp = null;
var numLines = null;
var offsetLeft = null;
var lnWidth = null;
var lnHeight = null;
var color01 = null;
var color02 = null;
var color03 = null;
var color04 = null; 
var backOffset = null;
var updateOffset = null;*/

sliderVal.innerHTML += "%";
range.style.width = "860px";
dragBall.style.left = "86px";

/* ******************************************** */
/* ******************************************** */
var ampVal = 80;
var freqVal = 3;
var lnNumVal = 66;
var lnSpcVal = 4;
var lnWidthVal = 10;
var lnHeightVal = 160;
var invertBack = false;
var backOff = 0.1;
var clr01 = "#FD795B";
var clr02 = "#505050";
var clr03 = "#FDEDD0";
var clr04 = "#FD795B";
var clr05 = "#BCF1ED";

var varSet = function() {
	this.amplitude = ampVal;
	this.frequency = freqVal;
	this.lines = lnNumVal;
	this.spacing = lnSpcVal;
	this.width = lnWidthVal;
	this.height = lnHeightVal;
	this.twist = invertBack;
	this.backOffset = backOff;

	this.background = clr05;
	this.color1 = clr01;
	this.color2 = clr02;
	this.color3 = clr03;
	this.color4 = clr04;
};

function init() {
	console.log("start");

	varSet();

	wavAmp = this.amplitude;
	wavFreq = this.frequency * 0.01;
	numLines = this.lines;

	color01 = this.color1;
	color02 = this.color2;
	color03 = this.color3;
	color04 = this.color4;
	body.style.backgroundColor = this.background;

	tl = new TimelineMax();
	var TSval = Math.round(parseInt(dragBall.style.left) * 1.163) / 100;
	console.log("this is the Time Scale value: " + TSval);
	tl.timeScale(TSval);
	//dragBall.style.left = "86px";
	//sliderVal.innerHTML = "100";

	var lines01;
	var lines02;
	for (var i = 0; i < numLines; i++) {
		/*   JQUERY
      $particle = $('<div class="particle" />'), //create a new particle
      $emitter.append( $particle );  //add it to emitter
  var particles = $('.particle');  //jQuery class to array method */

		// vanilla javascript
		var line01 = document.createElement("div");
		var line02 = document.createElement("div");

		line01.classList.add("line01");
		container01.appendChild(line01);
		line02.classList.add("line02");
		container02.appendChild(line02);
		lines01 = [].slice.call(document.getElementsByClassName("line01"));
		lines02 = [].slice.call(document.getElementsByClassName("line02"));

		lnWidth = line01.style.width = line02.style.width = this.width + "px";
		//offsetLeft = parseInt(document.getElementById("lnSpc").value, 10) + (parseInt(lnWidth, 10)); //sets space between each element
		offsetLeft = this.spacing + this.width; //sets space between each element
		var lnSpacing = i * offsetLeft;

		lnHeight = line01.style.height = line02.style.height =
			this.height + "px";
		//sets the lines' every 'lnSpacing' px apart
		TweenLite.set(lines01[i], { left: lnSpacing });
		TweenLite.set(lines02[i], { left: lnSpacing });

		tl.add(fnLines01(lines01[i]), i * wavFreq);

		if (this.twist === true) {
			updateOffsetTwist();

			tl.add(fnLines02(lines02[i]), i * wavFreq);
			tl.set(lines02[i], { zIndex: 2 });
			tl.set(lines01[i], { zIndex: 1 });
		} else {
			tl.add(fnLines02(lines02[i]), backOff + i * wavFreq);
			updateOffset();
		}
	}
	//sets the scene div container width to the width of the line array.
	var x = lines01.length - 1;
	var sceneWidth = (scene.style.width = lines01[x].style.left);
}

function fnLines01(target) {
	var nestedTL = new TimelineMax({ repeat: -1 });
	nestedTL.add(
		[
			TweenLite.set(target, { zIndex: 1 }),
			TweenLite.fromTo(
				target,
				1.2,
				{
					transformOrigin: "50% 50%",
					backgroundColor: color01,
					y: -wavAmp
				},
				{ backgroundColor: color02, y: wavAmp, ease: Power1.easeInOut }
			),
			TweenLite.to(target, 1.2, {
				y: -wavAmp,
				backgroundColor: color01,
				ease: Power1.easeInOut
			})
		],
		0,
		"sequence"
	);

	return nestedTL;
}

function fnLines02(target) {
	//var backAmp;

	var nestedTL2 = new TimelineMax({ repeat: -1 });

	if (this.twist === true) {
		//backAmp = wavAmp*-1;
		TweenLite.set(target, { zIndex: 2 });
		nestedTL2.add(
			[
				TweenLite.set(target, { zIndex: 2 }),
				TweenLite.fromTo(
					target,
					1.2,
					{
						transformOrigin: "50% 50%",
						backgroundColor: color03,
						y: wavAmp
					},
					{
						backgroundColor: color04,
						y: -wavAmp,
						ease: Power1.easeInOut
					}
				),
				TweenLite.set(target, { zIndex: 0 }),
				TweenLite.to(target, 1.2, {
					backgroundColor: color03,
					y: wavAmp,
					ease: Power1.easeInOut
				})
			],
			0,
			"sequence"
		);
	} else {
		//backAmp = wavAmp;
		nestedTL2.add(
			[
				TweenLite.fromTo(
					target,
					1.2,
					{
						transformOrigin: "50% 50%",
						backgroundColor: color03,
						y: -wavAmp
					},
					{
						backgroundColor: color04,
						y: wavAmp,
						ease: Power1.easeInOut
					}
				),
				TweenLite.to(target, 1.2, {
					backgroundColor: color03,
					y: -wavAmp,
					ease: Power1.easeInOut
				})
			],
			0,
			"sequence"
		);
	}

	return nestedTL2;
}

/************************************************************   

      TIMESCALE WITH SLIDER

 **************************************************************/
function rangeSlider(id, onDrag) {
	var dragger = range.children[0],
		draggerWidth = 20, // width of your dragger
		down = false,
		rangeWidth,
		rangeLeft;

	dragger.style.width = draggerWidth + "px";
	//dragger.style.left = -draggerWidth + 'px';
	dragger.style.marginLeft = -draggerWidth / 2 + "px";

	range.addEventListener("mousedown", function(e) {
		rangeWidth = this.offsetWidth;
		rangeLeft = this.offsetLeft;
		down = true;
		updateDragger(e);
		return false;
	});

	document.addEventListener("mousemove", function(e) {
		updateDragger(e);
	});

	document.addEventListener("mouseup", function() {
		down = false;
	});

	function updateDragger(e) {
		if (down && e.pageX >= rangeLeft && e.pageX <= rangeLeft + rangeWidth) {
			dragger.style.left = e.pageX - rangeLeft + "px";
			if (typeof onDrag == "function")
				onDrag(Math.round(((e.pageX - rangeLeft) / rangeWidth) * 1000));
		}
	}
}

// Run!

rangeSlider("range-slider-1", function(value) {
	sliderVal.innerHTML = value + "%";
	var newTimeScale = tl.timeScale(value / 100);
});

/************************************************************   

      CLICK TO PAUSE WITH TIMESCALE

 **************************************************************/

function timeScalePause() {
	var startSpeed = 86; /* (document.getElementById("range-slider-1").style.width)/10 */

	//click anywhere to toggle paused state
	var currentTimeScale = tl.timeScale();
	if (currentTimeScale >= 0.5) {
		TweenMax.to(tl, 1.8, { timeScale: 0 });
		TweenMax.to(dragBall, 1.8, {
			left: 0,
			onUpdate: function() {
				sliderVal.innerHTML =
					Math.round(parseInt(dragBall.style.left) * 1.163) + "%";
			}
		});
	} else {
		currentTimeScale = 0;
	}
	if (currentTimeScale < 0.5) {
		TweenMax.to(tl, 1.8, { timeScale: 1 });
		TweenMax.to(dragBall, 1.8, {
			left: startSpeed,
			onUpdate: function() {
				sliderVal.innerHTML =
					Math.round(parseInt(dragBall.style.left) * 1.163) + "%";
			}
		});
	} else {
		currentTimeScale = 1;
	}
}

function destroy() {
	console.log("killed");
	tl.kill();
	while (container01.hasChildNodes()) {
		container01.removeChild(container01.lastChild);
	}
	while (container02.hasChildNodes()) {
		container02.removeChild(container02.lastChild);
	}
} //destroy end
function killAndReInit() {
	destroy();
	init();
}

//////////////////////////////////////////////////////////

var json =
	'{ "preset":"Default", "closed":false, "remembered":{ "Default":{ "0":{ "amplitude":80, "frequency":3, "lines":66, "spacing":4, "width":10, "height":160, "twist":false, "backOffset":0.1, "color1":"#FD795B", "color2":"#505050", "color3":"#FDEDD0", "color4":"#FD795B", "background":"#BCF1ED" } }, "SolidPastels":{ "0":{ "amplitude":90, "frequency":1.5, "lines":90, "spacing":-2, "width":10, "height":41, "twist":false, "backOffset":0.39, "color1":"#93ecff", "color2":"#c5ffbe", "color3":"#FDEDD0", "color4":"#ffafd9", "background":"#dffaf7" } }, "SquareDance":{ "0":{ "amplitude":20, "frequency":17.5, "lines":24, "spacing":40, "width":11, "height":11, "twist":true, "backOffset":0, "color1":"#008baa", "color2":"#008baa", "color3":"#643737", "color4":"#643737", "background":"#c7b2ca" } } }, "folders":{ "waveproperties":{ "preset":"Default", "closed":false, "folders":{} }, "colors":{ "preset":"Default", "closed":true, "folders":{} } } }';

var wavy = new varSet();

var gui = new dat.GUI({ load: JSON.parse(json) });

gui.remember(wavy);
var f1 = gui.addFolder("wave properties");
f1.add(wavy, "amplitude", -700, 700)
	.step(10)
	.onChange(function(newValue) {
		ampVal = newValue;
		killAndReInit();
	});
f1.add(wavy, "frequency", -40, 40)
	.step(0.5)
	.onChange(function(newValue) {
		freqVal = newValue;
		killAndReInit();
	});
f1.add(wavy, "lines", 1, 400)
	.step(2)
	.onChange(function(newValue) {
		lnNumVal = newValue;
		killAndReInit();
	});
f1.add(wavy, "spacing", -2, 300)
	.step(1)
	.onChange(function(newValue) {
		lnSpcVal = Math.trunc(newValue);
		killAndReInit();
	});
f1.add(wavy, "width", 1, 300)
	.step(1)
	.onChange(function(newValue) {
		lnWidthVal = Math.trunc(newValue);
		killAndReInit();
	});
f1.add(wavy, "height", 1, 300)
	.step(1)
	.onChange(function(newValue) {
		lnHeightVal = Math.trunc(newValue);
		killAndReInit();
	});
f1.add(wavy, "twist").onChange(function(newValue) {
	invertBack = newValue;
	killAndReInit();
});
var guiBackOff = f1.add(wavy, "backOffset", -0.99, 0.99).step(0.01);
guiBackOff.listen();
guiBackOff.onChange(function(newValue) {
	backOff = newValue;
	killAndReInit();
});

var f2 = gui.addFolder("colors");
f2.addColor(wavy, "color1").onChange(function(newValue) {
	clr01 = newValue;
	killAndReInit();
});
f2.addColor(wavy, "color2").onChange(function(newValue) {
	clr02 = newValue;
	killAndReInit();
});
f2.addColor(wavy, "color3").onChange(function(newValue) {
	clr03 = newValue;
	killAndReInit();
});
f2.addColor(wavy, "color4").onChange(function(newValue) {
	clr04 = newValue;
	killAndReInit();
});
f2.addColor(wavy, "background").onChange(function(newValue) {
	clr05 = newValue;
	killAndReInit();
});

updateOffsetTwist = function() {
	requestAnimationFrame(updateOffsetTwist);
	this.backOffset = wavy.backOffset = 0;

	// Iterate over all controllers
	for (var i in gui.__controllers) {
		gui.__controllers[i].updateDisplay();
	}
};

updateOffset = function() {
	requestAnimationFrame(updateOffset);
	this.backOffset = wavy.backOffset = backOff;

	// Iterate over all controllers
	for (var i in gui.__controllers) {
		gui.__controllers[i].updateDisplay();
	}
};
init();

/* var f2 = gui.addFolder('colors');
f2.add(text, 'growthSpeed'); */
