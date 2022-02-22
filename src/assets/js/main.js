/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2016, Codrops
 * http://www.codrops.com
 */
;(function(window) {

	'use strict';

	// Helper vars and functions.
	function extend( a, b ) {
		for( var key in b ) {
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	// from http://www.quirksmode.org/js/events_properties.html#position
	function getMousePos(e) {
		var posx = 0, posy = 0;
		if (!e) var e = window.event;
		if (e.pageX || e.pageY) 	{
			posx = e.pageX;
			posy = e.pageY;
		}
		else if (e.clientX || e.clientY) 	{
			posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		return { x : posx, y : posy }
	}

	/**
	 * TiltFx obj.
	 */
	function TiltFx(el, options) {
		this.DOM = {};
		this.DOM.el = el;
		this.options = extend({}, this.options);
		extend(this.options, options);
		this._init();
	}

	TiltFx.prototype.options = {
		movement: {
			imgWrapper : {
				translation : {x: 0, y: 0, z: 0},
				rotation : {x: -10, y: 10, z: 0},
				reverseAnimation : {
					duration : 1200,
					easing : 'easeOutElastic',
					elasticity : 600
				}
			},
			lines : {
				translation : {x: 10, y: 10, z: 0},
				reverseAnimation : {
					duration : 1000,
					easing : 'easeOutExpo',
					elasticity : 600
				}
			},
			caption : {
				translation : {x: 2, y: 2, z: 0},
				rotation : {x: 0, y: 0, z: 0},
				reverseAnimation : {
					duration : 1500,
					easing : 'easeOutElastic',
					elasticity : 600
				}
			},
			/*
			overlay : {
				translation : {x: 10, y: 10, z: [0,50]},
				reverseAnimation : {
					duration : 500,
					easing : 'easeOutExpo'
				}
			},
			*/
			shine : {
				translation : {x: 50, y: 50, z: 0},
				reverseAnimation : {
					duration : 1200,
					easing : 'easeOutElastic',
					elasticity: 600
				}
			}
		}
	};

	/**
	 * Init.
	 */
	TiltFx.prototype._init = function() {
		this.DOM.animatable = {};
		this.DOM.animatable.imgWrapper = this.DOM.el.querySelector('.cards-grid_card-wrapper3');
		// this.DOM.animatable.lines = this.DOM.el.querySelector('.dashboard-home__box-img');
		this.DOM.animatable.caption = this.DOM.el.querySelector('.cards-grid_card-wrapper4');
		// this.DOM.animatable.overlay = this.DOM.el.querySelector('.dashboard-home__box-img');
		// this.DOM.animatable.shine = this.DOM.el.querySelector('.holder-animate');
		this._initEvents();
	};

	/**
	 * Init/Bind events.
	 */
	TiltFx.prototype._initEvents = function() {
		var self = this;

		this.mouseenterFn = function() {
			for(var key in self.DOM.animatable) {
				anime.remove(self.DOM.animatable[key]);
			}
		};

		this.mousemoveFn = function(ev) {
			requestAnimationFrame(function() { self._layout(ev); });
		};

		this.mouseleaveFn = function(ev) {
			requestAnimationFrame(function() {
				for(var key in self.DOM.animatable) {
					if( self.options.movement[key] == undefined ) {continue;}
					anime({
						targets: self.DOM.animatable[key],
						duration: self.options.movement[key].reverseAnimation != undefined ? self.options.movement[key].reverseAnimation.duration || 0 : 1,
						easing: self.options.movement[key].reverseAnimation != undefined ? self.options.movement[key].reverseAnimation.easing || 'linear' : 'linear',
						elasticity: self.options.movement[key].reverseAnimation != undefined ? self.options.movement[key].reverseAnimation.elasticity || null : null,
						scaleX: 1,
						scaleY: 1,
						scaleZ: 1,
						translateX: 0,
						translateY: 0,
						translateZ: 0,
						rotateX: 0,
						rotateY: 0,
						rotateZ: 0
					});
				}
			});
		};

		this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
		this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
		this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
	};

	TiltFx.prototype._layout = function(ev) {
		// Mouse position relative to the document.
		var mousepos = getMousePos(ev),
			// Document scrolls.
			docScrolls = {left : document.body.scrollLeft + document.documentElement.scrollLeft, top : document.body.scrollTop + document.documentElement.scrollTop},
			bounds = this.DOM.el.getBoundingClientRect(),
			// Mouse position relative to the main element (this.DOM.el).
			relmousepos = { x : mousepos.x - bounds.left - docScrolls.left, y : mousepos.y - bounds.top - docScrolls.top };

		// Movement settings for the animatable elements.
		for(var key in this.DOM.animatable) {
			if( this.DOM.animatable[key] == undefined || this.options.movement[key] == undefined ) {
				continue;
			}
			var t = this.options.movement[key] != undefined ? this.options.movement[key].translation || {x:0,y:0,z:0} : {x:0,y:0,z:0},
				r = this.options.movement[key] != undefined ? this.options.movement[key].rotation || {x:0,y:0,z:0} : {x:0,y:0,z:0},
				setRange = function (obj) {
					for(var k in obj) {
						if( obj[k] == undefined ) {
							obj[k] = [0,0];
						}
						else if( typeof obj[k] === 'number' ) {
							obj[k] = [-1*obj[k],obj[k]];
						}
					}
				};

			setRange(t);
			setRange(r);

			var transforms = {
				translation : {
					x: (t.x[1]-t.x[0])/bounds.width*relmousepos.x + t.x[0],
					y: (t.y[1]-t.y[0])/bounds.height*relmousepos.y + t.y[0],
					z: (t.z[1]-t.z[0])/bounds.height*relmousepos.y + t.z[0],
				},
				rotation : {
					x: (r.x[1]-r.x[0])/bounds.height*relmousepos.y + r.x[0],
					y: (r.y[1]-r.y[0])/bounds.width*relmousepos.x + r.y[0],
					z: (r.z[1]-r.z[0])/bounds.width*relmousepos.x + r.z[0]
				}
			};

			this.DOM.animatable[key].style.WebkitTransform = this.DOM.animatable[key].style.transform = 'translateX(' + transforms.translation.x + 'px) translateY(' + transforms.translation.y + 'px) translateZ(' + transforms.translation.z + 'px) rotateX(' + transforms.rotation.x + 'deg) rotateY(' + transforms.rotation.y + 'deg) rotateZ(' + transforms.rotation.z + 'deg)';
		}
	};

	window.TiltFx = TiltFx;

})(window);

	function init()
	{
		[].slice.call(document.querySelectorAll('.cards-grid_card-wrapper2')).forEach(function(el, pos)
		{
			new TiltFx(el);
		});
	}
	
	init();

document.addEventListener('DOMContentLoaded', function ()
{
	particleground(document.getElementById('particles'), {
		dotColor: '#ffffff',
		lineColor: '#ffffff'
	});
}, true);

/*
setTimeout(function ()
{
	new ZammadChat({
		background: '#131429',
		fontSize: '12px',
		chatId: 1,
		host : 'wss://hd.it-lance.com.ua/ws',
		cssAutoload : false
	});
}, 0);
*/

////////////////////////////////////////////

var withinViewport = (function() {

  'use strict';

  // Cutting the mustard
  // http://webfieldmanual.com/guides/cutting-the-mustard.html

  if (window.requestAnimationFrame && document.documentElement.classList) {

    // Passes the test so add enhanced class to HTML tag
    document.documentElement.classList.add('enhanced');

    // Throttle
    // https://underscorejs.org/#throttle
    var throttle = function(func, wait, options) {
      var _ = {
        now: Date.now || function() {
          return new Date().getTime();
        }
      };
      var context, args, result;
      var timeout = null;
      var previous = 0;
      if (!options) {
        options = {};
      }
      var later = function() {
        previous = options.leading === false ? 0 : _.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) {
          context = args = null;
        }
      };
      return function() {
        var now = _.now();
        if (!previous && options.leading === false) {
          previous = now;
        }
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }
          previous = now;
          result = func.apply(context, args);
          if (!timeout) {
            context = args = null;
          }
        } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
        }
        return result;
      };
    };
    
    // requestAnimationFrame
    // http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    var _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;

    // Global class for revealing element
    var revealer = document.querySelectorAll('.revealer');

    // Get the viewport (window) dimensions
    var getViewportSize = function() {
      return {
        width: window.document.documentElement.clientWidth,
        height: window.document.documentElement.clientHeight
      };
    };

    // Get the current scoll position
    var getCurrentScroll = function() {
      return {
        x: window.pageXOffset,
        y: window.pageYOffset
      };
    };

    // Get element dimensions and position
    var getElemInfo = function(elem) {
      var offsetTop = 0;
      var offsetLeft = 0;
      var offsetHeight = elem.offsetHeight;
      var offsetWidth = elem.offsetWidth;

      do {
        if (!isNaN(elem.offsetTop)) {
          offsetTop += elem.offsetTop;
        }
        if (!isNaN(elem.offsetLeft)) {
          offsetLeft += elem.offsetLeft;
        }
      } while ((elem = elem.offsetParent) !== null);

      return {
        top: offsetTop,
        left: offsetLeft,
        height: offsetHeight,
        width: offsetWidth
      };
    };

    // Check visibility of the element in the viewport
    var checkVisibility = function(elem) {
      var viewportSize = getViewportSize();
      var currentScroll = getCurrentScroll();
      var elemInfo = getElemInfo(elem);
      var spaceOffset = 0.2;
      var elemHeight = elemInfo.height;
      var elemWidth = elemInfo.width;
      var elemTop = elemInfo.top;
      var elemLeft = elemInfo.left;
      var elemBottom = elemTop + elemHeight;
      var elemRight = elemLeft + elemWidth;

      var checkBoundaries = function() {
        // Defining the element boundaries and extra space offset
        var top = elemTop + elemHeight * spaceOffset;
        var left = elemLeft + elemWidth * spaceOffset;
        var bottom = elemBottom - elemHeight * spaceOffset;
        var right = elemRight - elemWidth * spaceOffset;

        // Defining the window boundaries and window offset
        var wTop = currentScroll.y + 0;
        var wLeft = currentScroll.x + 0;
        var wBottom = currentScroll.y - 0 + viewportSize.height;
        var wRight = currentScroll.x - 0 + viewportSize.width;

        // Check if the element is within boundary
        return (top < wBottom) && (bottom > wTop) && (left > wLeft) && (right < wRight);
      };

      return checkBoundaries();
    };

    // Run a loop with checkVisibility() and add / remove classes to the elements
    var toggleElement = function() {
      for (var i = 0; i < revealer.length; i++) {
        if (checkVisibility(revealer[i])) {
          revealer[i].classList.add('revealed');
        } else {
          revealer[i].classList.remove('revealed');
        }
      }
    };

    // Throttle events and requestAnimationFrame
    var scrollHandler = throttle(function() {
      _requestAnimationFrame(toggleElement);
    }, 300);

    var resizeHandler = throttle(function() {
      _requestAnimationFrame(toggleElement);

      // For demo purposes only
      fullscreenIntro();
    }, 300);

    scrollHandler();

    // Listening for events
    if (window.addEventListener) {
      addEventListener('scroll', scrollHandler, false);
      addEventListener('resize', resizeHandler, false);
    } else if (window.attachEvent) {
      window.attachEvent('onscroll', scrollHandler);
      window.attachEvent('onresize', resizeHandler);
    } else {
      window.onscroll = scrollHandler;
      window.onresize = resizeHandler;
    }

  }

  // FOR DEMO PURPOSES ONLY
  // Makes fullscreen intro on any device so user is forced to scroll
  var fullscreenIntro = function() {
    var fullscreen = document.querySelectorAll('.fullscreen');
    for (var i = 0; i < fullscreen.length; i++) {
      fullscreen[i].style.height = getViewportSize().height + 1 + 'px';
    }
  };
  fullscreenIntro();

  return withinViewport;

}());

////////////////////////////////////////////

(function ()
{
	var page = $('.1c-integration-page, .support-page');
	
	if (!page.length)
	{
		return;
	}
	
	page.find('.clients-list').slick({
		adaptiveHeight : true,
		autoplay: true,
		autoplaySpeed: 2000,
		arrows: true,
		dots: true,
		//rows: 1,
		//slidesPerRow: 3,
		slidesToShow: 3,
		slidesToScroll: 3,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					arrows: false
				}
			},
			{
				breakpoint: 450,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false
				}
			}
		]
	});
	
	page.find('.reviews-block .reviews').slick({
		adaptiveHeight : true,
		autoplay: true,
		autoplaySpeed: 4000,
		arrows: true,
		dots: true,
		//rows: 1,
		//slidesPerRow: 3,
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: true,
		centerPadding: 0,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false
				}
			}
		]
	});
	
	new Typed('.support-page .typed', {
		strings : [
			'Первая неисправность до 30 минут - <b>бесплатно</b>!',
			'Гарантия по договору'
		],
		typeSpeed : 40,
		loop : true
	});
	/*
	new Typed('.1c-integration-page .typed', {
		strings : [
			'автоматически обновлять цены и остатки',
			'вести учёт товаров',
			'менять статусы заказов на сайте',
			'быстро обрабатывать заказы'
		],
		typeSpeed : 40,
		loop : true
	});
	*/
	
	var popupForm = $('.popup-form');
	
	popupForm
		.bind('click', function (_e)
		{
			if (!$(_e.target).is('.popup-form__window') &&
				!$(_e.target).parents('.popup-form__window').length
			)
			{
				popupForm
					.find('.popup-form__window')
						.css({
							top : '50%',
							left : '50%'
						});
				
				popupForm
					.fadeOut(200)
					.removeClass('opened');
			}
		});
	
	page
		.on('click', '[data-popup-form]', function (_e)
		{
			_e.preventDefault();
			_e.stopPropagation();
			
			popupForm
				.find('.popup-form__window')
					.css({
						top : ($(this).offset().top - $(document).scrollTop() + $(this).height() / 2) / $(window).height() * 100 + '%',
						left : ($(this).offset().left - $(document).scrollLeft() + $(this).width() / 2) / $(window).width() * 100 + '%'
					});
			
			popupForm
				.find('[data-service]')
					.text($(this).find('[data-popup-form-service]').text() || 'Любая неисправность в IT-инфраструктуре');
			
			popupForm
				.fadeIn(300)
				.addClass('opened');
				
			popupForm
				.find('input[name=name]')
					.focus();
		});
})();

////////////////////////////////////////////

$(document).ready(function()
{
(function()
{
	$('.slider1').bxSlider({
		slideWidth: 180,
		minSlides: 2,
		maxSlides: 5,
		slideMargin: 50
	});
	
	$(window)
		.bind('resize.fullscreen', function ()
		{
			var height = $(window).height();
			
			if ($(window).width() >= 1024)
			{
				if ($('.support-page').length)
				{
					height -= 300;
				}
				else
				{
					height -= $('.padding.btb').outerHeight() + 50;
				}
			}
			
			$('.full-screen').height(height);
		})
		.trigger('resize.fullscreen');
	
	$('input[type=phone]').mask('+380 (99) 999-99-99');
	
	$('header:eq(0) .menu li:has(.submenu)')
		.each(function ()
		{
			var submenu = $(this).find('.submenu');
			var triangle = submenu.find('.triangle:eq(0)');
			var hideTimeout = 0;
			var hideSubmenu = function ()
			{
				submenu.removeClass('visible');
				
				setTimeout(function ()
				{
					if (!submenu.is('.visible'))
					{
						submenu.css('display', 'none');
					}
				}.bind(submenu), 300);
			};
			
			$([this, submenu])
				.bind('mouseenter', function ()
				{
					clearTimeout(hideTimeout);
					
					triangle
						.css({
							left : submenu.parent().width() / 2 + 16
						});
					
					submenu
						.css('display', 'block')
						.delay(50)
						.queue(function (next)
						{
							$(this).addClass('visible');
							next();
						});
				})
				.bind('mouseleave', function()
				{
					hideTimeout = setTimeout(hideSubmenu, 300);
				});
		});
	
	$(document)
		.bind('click', function (_e)
		{
			var elem;
			
			if ((elem = $(_e.target)).is('a') || (elem = $(_e.target).parents('a:eq(0)')).length)
			{
				var url = elem.attr('href');
				
				if (url.indexOf('#') >= 0)
				{
					url = url.split('#');
					
					console.log(url);
					
					if (elem.parents('nav').length && $('header').is('.active') && elem.parents('li:eq(0)').is(':has(.submenu)'))
					{
						_e.preventDefault();
						return;
					}
					
					if (url[0] == '' || url[0] == window.location.pathname + window.location.search || url[0] == window.location.origin + window.location.pathname + window.location.search)
					{
						_e.stopPropagation();
						
						$('header').removeClass('active');
						
						$("html, body").animate({
							scrollTop: $('#' + url[1]).offset().top + 'px'
						}, {
							duration: 500,
							easing: 'swing'
						});
					}
				}
			}
		});
})($);

(function($) {
  "use strict";

  // Remove preload class once page is fully loaded

  $(window).on('load', function() {
    $('body').removeClass('preload');
  });

  // Add class to navigation when scrolling down

  $(window).bind('scroll.header', function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 9) {
      $('.header-main').addClass('fade-in');
    } else {
      $('.header-main').removeClass('fade-in');
    }
  }).trigger('scroll.header');

  // Add class when mobile navigation icon is clicked

  $('.nav-toggle').on('click', function() {
    $('body').toggleClass('no-scroll');
    $('.header-main').toggleClass('active');
  });

  // Prevent background from scrolling on mobile when navigation is toggled

  $('html, body').on('touchmove', function(e) {
    e.preventDefault();
  });

})(jQuery);

 

              $(function() {
                  var num = $(".number");
                  num.each(function(indx, el) {
                      var max = $(el).data("max");
                      var duration = 1000;
                      var visibility = checkViewport(el);
                      $(el).on("animeNum", function() {
                          $({n: 0}).animate({n: max}, {
                              easing: "linear",
                              duration: duration,
                              step: function(now, fx) {
                                  $(el).html(now | 0)
                              }
                          })
                      }).data("visibility", visibility);
                      visibility && $(el).trigger("animeNum")
                  });

                  function checkViewport(el) {
                  var H = document.documentElement.clientHeight,
                      h = el.scrollHeight,
                      pos = el.getBoundingClientRect();
                      return pos.top + h > 0 && pos.bottom - h < H
                  }
                  $(window).scroll(function() {
                      num.each(function(indx, el) {
                          var visibility = checkViewport(el);
                          el = $(el);
                          var old = el.data("visibility");
                          old != visibility && el.data("visibility", visibility) && !old && el.trigger("animeNum")
                      })
                  })
              });
			  
			  
          $(function() {
            $(window).scroll(function() {
              if($(this).scrollTop() != 0) {
                $('#totop').fadeIn();
              } else {
                $('#totop').fadeOut();
              }
            });
            $('#totop').click(function() {
              $('body,html').animate({scrollTop:0},800);
            });
          });
});
$(document).ready(function(){
 /*script for gallery functionality*/
  var imgIndex;
	var imgCount = $('.galleryImage').length;
	$('.galleryImage').click(function(){
    $(".imageBox").attr("src",$(this).attr('src'));
    $(".fullSizeImage").fadeIn(500);
		imgIndex = $(this).data( "index" );
  });

  /*click for next image*/
	$('.floatRight').click(function(){
		imgIndex++;
		if (imgIndex == (imgCount+1)) {
			imgIndex = 1;
		}
		$(".imageBox").attr("src",$('[data-index="'+imgIndex+'"]').attr('src'));
	});

  /*click for previous image*/
	$('.floatLeft').click(function(){
		imgIndex--;
		if (imgIndex == 0) {
			imgIndex = 4;
		}
		$(".imageBox").attr("src",$('[data-index="'+imgIndex+'"]').attr('src'));
	});

  /*close gallery modal window*/
  $('.closeBtn').click(function(){
    $(".fullSizeImage").fadeOut(500);
  });

  /*smooth scroll to section*/
  /*
  $("a").on('click', function(event) {

    if (this.hash !== "") {

    event.preventDefault();

      $('html, body').animate({
        scrollTop: $(this.hash).offset().top-30
      }, 800, function(){});
    }
  });
  */
});

(function ()
{
	
$(document).ready(function(){
    $('.button-sale').click(function(){
        $('.popup-wrapper').show();
        
    });
    $('.popup-close').click(function(){
        $('.popup-wrapper').hide();
        
    });
});

const button = document.querySelector('.button-gift');
const popup = document.querySelector('.popup-wrapper');
const close = document.querySelector('.popup-close');

if (button)
button.addEventListener('click', () => {
  popup.style.display = 'block';
});

if (close)
close.addEventListener('click', () => {
  popup.style.display = 'none';
});

if (popup)
popup.addEventListener('click', (e) => {
  if(e.target.className === 'popup-wrapper'){
    popup.style.display = 'none';
  }
});

})();