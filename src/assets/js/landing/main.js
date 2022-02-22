document.addEventListener('DOMContentLoaded', function () {
	var node = document.getElementById('block-1-particles');

	if (!node) {
		return;
	}

	particleground(node, {
		dotColor: '#6A6A6A',
		lineColor: '#6A6A6A'
	});
}, true);

new paralax('.block-1 .swiper-container',
	{
		loop: true,
		navigation: {
			nextEl: '.block-1 .swiper-button-next',
			prevEl: '.block-1 .swiper-button-prev'
		},
		spaceBetween: 30
	});

var header = $('.app-header:eq(0)');

$(window)
	.bind('scroll', function () {
		if ($(document).scrollTop() > 0) {
			header.addClass('app-header__floating');
		}
		else {
			header.removeClass('app-header__floating');
		}
	})
	.trigger('scroll');

$('.block-2__grid__item__image__shadow-1, .block-2__grid__item__image__shadow-2, .block-6__shadow-1, .block-6__shadow-2, .block-7__shadow, .block-9__shadow-1, .block-9__shadow-2, .block-11__shadow-1, .block-11__shadow-2, .block-12__shadow, .block-14__shadow, .block-15__grid__item__image__shadow-1, .block-15__grid__item__image__shadow-2, .block-15__shadow-1, .block-19__shadow-3, .block-19__shadow-4, .block-22__shadow')
	.each(function () {
		new Parallax(this);
	});

$('.app-header:eq(0) .app-header__navigation:eq(0) li:has(.app-header__navigation__submenu)')
	.each(function () {
		var parentMenu = this;
		var submenu = $(this).find('.app-header__navigation__submenu');
		var triangle = submenu.find('.app-header__navigation__submenu__triangle:eq(0)');
		var hideTimeout = 0;
		var hideSubmenu = function () {
			submenu.removeClass('visible');

			setTimeout(function () {
				if (!submenu.is('.visible')) {
					submenu.css('display', 'none');
				}
			}.bind(submenu), 300);
		};

		$([this, submenu])
			.bind('mouseenter', function () {
				clearTimeout(hideTimeout);

				triangle
					.css({
						left: $(parentMenu).width() / 2 + 16
					});

				submenu
					.css('display', 'block')
					.delay(50)
					.queue(function (next) {
						$(this).addClass('visible');
						next();
					});
			})
			.bind('mouseleave', function () {
				hideTimeout = setTimeout(hideSubmenu, 300);
			});
	});

(function () {
	$('.app-header__mobile-menu-toggle:eq(0)')
		.bind('click', function () {
			if ($(document.body).is('.mobile-menu-opened')) {
				$(document.body).removeClass('mobile-menu-opened');
			}
			else {
				$(document.body).addClass('mobile-menu-opened');
			}
		});

	$(window)
		.bind('resize.mobilemenu', function () {
			document.documentElement.style.setProperty('--mobile-menu-radius', Math.round(Math.sqrt($(window).width() * $(window).width() + $(window).height() * $(window).height()) * 1.1) + 'px');
		})
		.trigger('resize.mobilemenu');
})();

(function () {
	var lazyImages = [];
	var active = false;

	const lazyLoad = function (_forceUpdate) {
		_forceUpdate = _forceUpdate || false;

		if (_forceUpdate || lazyImages.length === 0) {
			lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
		}

		lazyImages = lazyImages.filter(function (image) {
			return image.offsetParent !== null;
		});

		if (active === false) {
			active = true;

			setTimeout(function () {
				var rect;

				lazyImages.forEach(function (lazyImage) {
					rect = lazyImage.getBoundingClientRect();

					if (
						(rect.top <= window.innerHeight && rect.bottom >= 0) &&
						(rect.left <= window.innerWidth && rect.right >= 0) &&
						getComputedStyle(lazyImage).display !== "none"
					) {
						lazyImage.onload = function () {
							this.classList.remove("lazy");

							var preloader = this.parentNode.querySelector('.swiper-lazy-preloader');

							if (preloader) {
								$(preloader).fadeOut(300);
							}
						};
						lazyImage.src = lazyImage.dataset.src;
						//lazyImage.classList.remove("lazy");

						lazyImages = lazyImages.filter(function (image) {
							return image !== lazyImage;
						});
					}
				});

				active = false;
			}, 200);
		}
	};

	document.addEventListener("DOMContentLoaded", function () {
		document.addEventListener("scroll", lazyLoad);
		window.addEventListener("resize", lazyLoad);
		window.addEventListener("orientationchange", lazyLoad);
		lazyLoad();
	});

	window.triggerLazyLoad = function () {
		lazyLoad(true);
	};
})();

new Swiper('.block-14 .swiper-container',
	{
		loop: true,
		autoHeight: true,
		navigation: {
			nextEl: '.block-14 .swiper-button-next',
			prevEl: '.block-14 .swiper-button-prev'
		},
		pagination: {
			el: '.block-14 .swiper-pagination',
			clickable: true
		},
		//preloadImages : false,
		//lazy : true
		on: {
			slideChangeTransitionStart: function () {
				window.triggerLazyLoad();
			}
		},
		spaceBetween: 40
	});

new Swiper('.block-7 .swiper-container',
	{
		loop: false,
		//autoHeight : true,
		//navigation : {
		////	nextEl : '.block-14 .Parallax-button-next',
		//prevEl : '.block-14 .swiper-button-prev'
		//},
		pagination: {
			el: '.block-7 .parallax-pagination',
			clickable: true
		},
		//preloadImages : false,
		//lazy : true
		on: {
			slideChangeTransitionStart: function () {
				window.triggerLazyLoad();
			}
		},
		centeredSlides: true,
		initialSlide: 1,
		spaceBetween: 30,
		slidesPerView: 1,
		allowSlideNext: true,
		allowSlidePrev: true,
		breakpoints: {
			1000: {
				slidesPerView: 3,
				allowSlideNext: false,
				allowSlidePrev: false
			}
		}
	});

(function () {
	var block3Node = $('.block-3:eq(0)');

	if (!block3Node.length) {
		return;
	}

	var contentBlock = block3Node.find('.block-3__columns:eq(0)');
	var topOffsetBlock = block3Node.find('.block-3__content__left:eq(0) .block-3__columns:eq(0)');
	var path1Node = block3Node.find('> svg:eq(0) path:eq(0)');
	var path2Node = block3Node.find('> svg:eq(0) path:eq(1)');

	$(window)
		.bind('resize.block3', function () {
			var w = block3Node.width();
			var cw = block3Node.find('.content-block__wrapper').width();
			var topOffset = topOffsetBlock.offset().top - block3Node.offset().top + topOffsetBlock.height() / 2;

			console.log(topOffset);

			path1Node.attr('d', 'M ' + (w / 2 - 35) + ' ' + topOffset + ' H ' + (w / 2 - 15) + ' V ' + (contentBlock.offset().top - block3Node.offset().top + contentBlock.outerHeight()) + ' H ' + ((w - cw) / 2) + ' L -5.5 100');
			path2Node.attr('d', 'M ' + w + ' 100 L ' + (w - (w - cw) / 2) + ' ' + (contentBlock.offset().top - block3Node.offset().top + contentBlock.outerHeight()) + ' H ' + (w / 2 + 15) + ' V ' + topOffset + ' H ' + (w / 2 + 35) + '');
		})
		.trigger('resize.block3');
})();

(function () {
	var block5Node = $('.block-5:eq(0)');

	if (!block5Node.length) {
		return;
	}

	var computersNode = block5Node.find('input[name=computers]');
	var serversNode = block5Node.find('input[name=servers]');
	var networkNode = block5Node.find('input[name=network]');
	var mfuNode = block5Node.find('input[name=mfu]');
	var ipTelephonyNode = block5Node.find('input[name=ip_telephony]');
	var exit1Node = block5Node.find('input[name=exit_1]');
	var exit3Node = block5Node.find('input[name=exit_3]');
	var exit5Node = block5Node.find('input[name=exit_5]');

	var calc = function () {
		var result = [
			[0, 0],
			[0, 0, 0, 0, 0, 0]
		];
		var i = 0, tmp1 = 25, tmp2;
		var computers = parseInt(computersNode.val());
		var servers = parseInt(serversNode.val());
		var network = parseInt(networkNode.val());
		var mfu = parseInt(mfuNode.val());

		while (true) {
			tmp1 += i * 15;
			tmp2 = 6 + i * 5;

			if (computers <= tmp1 &&
				servers <= tmp2
			) {
				result[0][0] = i + 1;
				result[0][1] = result[0][0] * 15000;
				break;
			}

			i++;
		}

		if (computers <= 10) {
			result[1][1] = computers * 250;
		}
		else if (computers > 10 && computers <= 20) {
			result[1][1] = computers * 230;
		}
		else {
			result[1][1] = computers * 200;
		}

		if (servers <= 3) {
			result[1][2] = servers * 2000;
		}
		else if (servers > 3 && servers <= 5) {
			result[1][2] = servers * 1800;
		}
		else {
			result[1][2] = servers * 1500;
		}

		result[1][3] = 400 * network;;

		if (ipTelephonyNode.is(':checked')) result[1][4] = 1500;

		if (exit1Node.is(':checked')) result[1][5] = 0;
		if (exit3Node.is(':checked')) result[1][5] = 0;
		if (exit5Node.is(':checked')) result[1][5] = 2 * 250;


		block5Node.find('[data-result-0-0]:eq(0)').text(result[0][0]);
		block5Node.find('[data-result-0-1]:eq(0)').text(result[0][1]);
		block5Node.find('[data-result-1-0]:eq(0)').text(result[1][0]);
		block5Node.find('[data-result-1-1]:eq(0)').text(result[1][1]);
		block5Node.find('[data-result-1-2]:eq(0)').text(result[1][2]);
		block5Node.find('[data-result-1-3]:eq(0)').text(result[1][3]);
		block5Node.find('[data-result-1-4]:eq(0)').text(result[1][4]);
		block5Node.find('[data-result-1-5]:eq(0)').text(result[1][5]);
		block5Node.find('[data-result]:eq(0)').text(
			result[1][1] + result[1][2] + result[1][3] + result[1][4] + result[1][5]
		);
	};

	block5Node
		.find('button')
		.bind('click', function (_e) {
			_e.preventDefault();

			block5Node.find('form:eq(0)')[0].reset();
			block5Node.find('input').trigger('change').trigger('input');
		});

	block5Node
		.find('input[type=range]')
		.bind('input', function () {
			$(this)
				.parents('.block-5__left__range-container:eq(0)')
				.find('.block-5__left__range-value')
				.text($(this).val());

			calc();
		})
		.trigger('input');

	block5Node
		.find('input[type=checkbox]')
		.bind('change', function () {
			calc();
		})
		.trigger('changeww');

	block5Node
		.find('input[name^=exit_]')
		.bind('change', function () {
			var name = $(this).attr('name');

			if ($(this).is(':checked')) {
				block5Node
					.find('input[name^=exit_]')
					.each(function () {
						if ($(this).attr('name') != name) {
							$(this).prop('checked', false).trigger('change');
						}
					});
			}
		});
})();

(function () {
	$(document)
		.on('click', '.block-14__video__play', function () {
			var videoContainerNode = $(this).parents('.block-14__video:eq(0)');

			videoContainerNode.html('<iframe width="100%" height="100%" src="' + videoContainerNode.attr('data-video') + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>');
		});
})();

(function () {
	var block16Node = $('.block-16:eq(0)');
	var isMapLoadRequested = false;

	if (!block16Node.length) {
		return;
	}

	var request = function () {
		console.log('reqeust');
		var xhr = new XMLHttpRequest();

		xhr.open('GET', APP_URL + 'media/landing/block-16-fg.svg', true);
		xhr.onload = function (_e) {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					block16Node
						.find('.block-16__map:eq(0)')
						.append(xhr.responseText);

					block16Node
						.find('svg:eq(0)')
						.fadeIn(300)
						.find('> path')
						.bind('mouseenter', function () {
							$('#map-marker-' + $(this).attr('data-marker-id')).addClass('hovered');
						})
						.bind('mouseout', function () {
							$('#map-marker-' + $(this).attr('data-marker-id')).removeClass('hovered');
						});
				}
				else {
					console.error(xhr.statusText);
				}
			}
		};
		xhr.onerror = function (_e) {
			console.error(xhr.statusText);
		};
		xhr.send(null);
	};

	$(window)
		.bind('scroll', function () {
			if (!isMapLoadRequested &&
				$(document).scrollTop() + $(window).height() > block16Node.offset().top &&
				$(document).scrollTop() < block16Node.offset().top + block16Node.height()
			) {
				isMapLoadRequested = true;
				request();
			}
		});
})();

window.triggerLazyLoad();

System = new function () {
	let contactPopup;
	this.showContactPopup = function (_name) {
		var template = System.Template(_name || 'ContactFormPopup');

		if (!template.content) {
			return;
		}

		window.dataLayer.push({
			event: 'contact-form-popup-open',
			page_url: window.location.href,
			popup_type: _name,
			page: window.location.pathname.split('/').slice(2, 3)
		});

		contactPopup = new System.Popup({
			content: function () {
				var content = $(template.compile());

				if (content.find('[name=phone]').length) {
					content.find('[name=phone]').mask("+380 (99) 999-99-99");
				}

				content
					.find('form')
					.bind('submit', contactFormSubmit);

				return content;
			}
		});
	};

	const contactFormSubmit = function (_e) {
		_e.preventDefault();

		let form = $(this);
		let data = System.CheckForm(form);

		console.log(data);

		if (!data) {
			return;
		}

		data.append('source_url', encodeURIComponent(window.location.href));

		window.dataLayer.push({
			event: 'contact-form-submit',
			page_url: window.location.href,
			page: window.location.pathname.split('/').slice(2, 3)
		});

		form.addClass('loading');

		$.ajax({
			url: APP_LANG_URL + 'ajax/landing.php',
			method: 'POST',
			data: new URLSearchParams(data).toString(),
			processData: false,
			dataType: 'json',
			success: function (_data) {
				form.removeClass('loading');

				if (_data.success) {
					new System.Popup({
						content: function () {
							var popup = this;
							var content = $(System.Template('SuccessFormPopup').compile());

							content
								.find('button')
								.bind('click', function () {
									popup.close();
								});

							return content;
						}
					});

					form[0].reset();
					form
						.find('.custom-tb, .custom-ta')
						.each(function () {
							$(this)
								.attr('data-check-validity', '0')
								.find('input, textarea')
								.trigger('keyup');
						});

					if (contactPopup) {
						setTimeout(function () {
							contactPopup.close();
						}, 300);
					}
				}
				else {
					alert('Form error');
				}
			},
			error: function () {
				form.removeClass('loading');

				alert('Form error');
			}
		});
	};

	this.Init = function () {
		$(document)
			.unbind('click.popup')
			.on('click.popup', '[data-popup]', function (_e) {
				_e.preventDefault();

				var popupName = $(this).attr('data-popup');

				System.showContactPopup(popupName);
			});

		$('[data-contact-form]')
			.unbind('submit.form')
			.bind('submit.form', contactFormSubmit);

		$(document)
			.on('click', 'a[href^="tel:"]', function () {
				dataLayer.push({
					event: 'phone-number-click',
					label: $(this).text(),
					href: $(this).attr('href'),
					page: window.location.pathname.split('/').slice(2, 3)
				});
			});

		$(document)
			.on('click', '[href][data-contact]', function () {
				dataLayer.push({
					event: 'contact-button-click',
					label: $(this).text(),
					href: $(this).attr('href'),
					page: window.location.pathname.split('/').slice(2, 3)
				});
			});

		var formElementValidity = function () {
			var customTextInput = $(this).data('custom-wrapper');

			if (customTextInput instanceof $) {
				if (customTextInput.is('[data-regex]') && (customTextInput.is('[data-check-validity=1]') || customTextInput.is(':not([data-check-validity])'))) {
					var pattern = customTextInput.attr('data-regex').split('/');
					var flags = pattern[pattern.length - 1];

					pattern.shift();
					pattern.pop();

					pattern = pattern.join('/');

					if (new RegExp(pattern, flags).test(this.value)) {
						return true;
					}
					else {
						return false;
					}
				}

				return true;
			}
			else {
				return true;
			}
		};

		HTMLInputElement.prototype.isValid = formElementValidity;
		HTMLSelectElement.prototype.isValid = formElementValidity;
		HTMLTextAreaElement.prototype.isValid = formElementValidity;
	};

	this.UpdateDOM = function () {
		$('*').each(function () {
			if ($(this).is('.custom-tb input[name=phone]')) {
				$(this).mask("+380 (99) 999-99-99");
			}

			if ($(this).is('.custom-tb[data-processed!="1"]') &&
				!$(this).parents('script').length
			) {
				var customTextInput = $(this);
				var nativeTextInput = $(this).find('input');

				customTextInput.data('nativeNode', nativeTextInput[0]);

				customTextInput
					.attr('data-processed', '1');

				nativeTextInput
					.data('custom-wrapper', customTextInput)
					.bind('focus', function () {
						customTextInput.addClass('custom-tb__focused');

						$(this).trigger('keyup');
					})
					.bind('blur', function () {
						customTextInput.removeClass('custom-tb__focused');

						$(this).trigger('keyup');
					})
					.bind('keyup', function () {
						if ($(this).val().length) {
							customTextInput.addClass('custom-tb__not-empty');
						}
						else {
							customTextInput.removeClass('custom-tb__not-empty');
						}

						if (this.isValid()) {
							customTextInput.removeClass('custom-tb__invalid');
						}
						else {
							customTextInput.addClass('custom-tb__invalid');
						}
					})
					.trigger('keyup');

				new MutationObserver(function (_mutations) {
					for (var i = 0, mutation; mutation = _mutations[i]; i++) {
						if (mutation.attributeName == 'disabled') {
							if (mutation.target.disabled) {
								customTextInput.addClass('custom-tb__disabled');
							}
							else {
								customTextInput.removeClass('custom-tb__disabled');
							}
						}
					};
				}).observe(nativeTextInput[0], { attributes: true });

				if (nativeTextInput.is(':disabled')) {
					customTextInput.addClass('custom-tb__disabled');
				}
			}

			if ($(this).is('.custom-ta[data-processed!="1"]') &&
				!$(this).parents('script').length
			) {
				var customTextarea = $(this);
				var nativeTextarea = customTextarea.find('textarea');

				customTextarea.data('nativeNode', nativeTextarea[0]);

				$(this)
					.attr('data-processed', '1')
					.bind('click', function () {
						customTextarea.find('textarea').focus();
					})
					.find('textarea')
					.data('custom-wrapper', customTextarea)
					.bind('focus', function () {
						customTextarea.addClass('custom-ta__focused');
					})
					.bind('blur', function () {
						customTextarea.removeClass('custom-ta__focused');
					})
					.bind('keyup', function () {
						if ($(this).val().length) {
							customTextarea.addClass('custom-ta__not-empty');
						}
						else {
							customTextarea.removeClass('custom-ta__not-empty');
						}

						if (this.isValid()) {
							customTextarea.removeClass('custom-ta__invalid');
						}
						else {
							customTextarea.addClass('custom-ta__invalid');
						}
					})
					.trigger('keyup');
			}
		});
	}

	var templatesReplacementData = [];

	var TemplateItem = function (_templateName) {
		var obejctId = 'tpl' + System.GenerateID(6);
		var content;

		templatesReplacementData[obejctId] = {};

		Object.defineProperty(
			this,
			'id',
			{
				get: function () {
					return obejctId;
				}
			}
		);

		Object.defineProperty(
			this,
			'name',
			{
				get: function () {
					return _templateName;
				}
			}
		);

		Object.defineProperty(
			this,
			'content',
			{
				get: function () {
					return content !== undefined ? content : $('script[type="text/template"][data-name="' + _templateName + '"]').html();
				}
			}
		);
	};

	TemplateItem.prototype = {
		set: function (_key, _value) {
			templatesReplacementData[this.id][_key] = _value;

			return this;
		},
		compile: function () {
			var data = this.content;

			for (key in templatesReplacementData[this.id]) {
				data = data.replace('{{' + key + '}}', templatesReplacementData[this.id][key]);
			}

			return data;
		}
	};

	this.Template = function (_templateName) {
		return new TemplateItem(_templateName);
	};

	this.GetScrollWidth = function () {
		var scrollDiv = document.createElement('div');
		scrollDiv.style.cssText = 'width:100px;height:100px;overflow:scroll !important;position:absolute;top:-9999px';
		document.body.appendChild(scrollDiv);

		var result = scrollDiv.offsetWidth - scrollDiv.clientWidth;
		document.body.removeChild(scrollDiv);

		return result;
	};

	this.GenerateID = function (_length) {
		_length = _length || 8;

		var ts = (+new Date).toString();
		var parts = ts.split('').reverse();
		var id = '';

		var _getRandomInt = function (min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		for (var i = 0; i < _length; ++i) {
			var index = _getRandomInt(0, parts.length - 1);
			id += parts[index];
		}

		return id;
	};

	var popupsStack = [];

	this.Popup = function (_options) {
		var self = this;

		var popupGlobalContainer = $('.popup-container');
		var popupContainer = $(System.Template('Popup').compile());
		var popupPanel = popupContainer.find('.popup-container_popup-panel');
		var popupId = System.GenerateID(8);
		var settings = {
			title: null,
			width: null,
			isContentLoaded: null,
			onCloseEvent: null,
			closeOnEsc: !!(_options.closeOnEsc || true),
			mobileMode: false
		};
		var isPopupClosed = false;
		var popupCreationTime = Date.now();

		popupContainer
			.addClass('popup' + popupId)
			.appendTo(popupGlobalContainer)
			.bind('mousedown', function (e) {
				$(this).data('mouseDownX', e.pageX);
				$(this).data('mouseDownY', e.pageY);
			})
			.bind('mouseup', function (e) {
				if (!settings.mobileMode &&
					$(e.target).is('.popup-container_popup') &&
					$(this).data('mouseDownX') == e.pageX &&
					$(this).data('mouseDownY') == e.pageY
				) {
					self.close();
				}
			});

		if ($(window).width() >= 500) {
			settings.mobileMode = false;
			popupContainer.removeClass('mobile');
		}
		else {
			settings.mobileMode = true;
			popupContainer.addClass('mobile');
		}

		popupPanel
			.find('.popup-container_popup-panel_close')
			.bind('click', function () {
				self.close();
			});

		var show = function () {
			var srollWidth = System.GetScrollWidth();

			if (!popupGlobalContainer.is('visible')) {
				popupGlobalContainer.fadeIn(300);
			}

			if (_options.width) {
				self.setWidth(_options.width);
			}

			if (_options.title) {
				self.setTitle(_options.title);
			}

			if (_options.close) {
				settings.onCloseEvent = _options.close;
			}

			document.body.style.setProperty('overflow-y', 'hidden');
			document.documentElement.style.setProperty('--popup-scroll-offset', srollWidth + 'px');

			if (_options.loading) {
				popupPanel.hide();
			}
			else {
				popupContainer
					.find('> .popup-container_loading')
					.hide();

				if (_options.content) {
					self.setContent(_options.content);
				}
			}

			self.updatePosition();

			$(window).bind('resize.popup' + self.getId(), function () {
				self.updatePosition();
			});

			$(document).bind('keydown.popup' + self.getId(), function (_e) {
				if (_e.keyCode === 27 && settings.closeOnEsc && popupContainer.is(':visible')) {
					self.close();
				}
			});

			if (typeof _options.loading == 'function') {
				_options.loading.call(self);
			}
		};

		this.getId = function () {
			return popupId;
		};

		this.getContainer = function () {
			return popupContainer;
		};

		this.hide = function () {
			/*
			popupContainer
				.addClass('hidden')
				.fadeOut(settings.mobileMode ? 300 : 0);
			*/
		};

		this.show = function () {
			popupGlobalContainer.fadeIn(300);

			var srollWidth = System.GetScrollWidth();

			document.body.style.setProperty('overflow-y', 'hidden');
			document.documentElement.style.setProperty('--popup-scroll-offset', srollWidth + 'px');
		};

		this.isShowingNow = function () {
			return popupContainer.is(':visible');
		};

		this.setWidth = function (_width) {
			settings.width = _width;
			popupPanel.find('.content').width(_width);

			this.updatePosition();
		};

		this.setTitle = function (_title) {
			settings.title = _title;
			popupContainer.find('.title').html(_title);
		}

		this.updatePosition = function () {
			if ($(window).width() >= 500) {
				settings.mobileMode = false;
				popupContainer.removeClass('mobile');
			}
			else {
				settings.mobileMode = true;
				popupContainer.addClass('mobile');
			}

			var offseTop = 0,
				offsetLeft = (popupContainer.width() - popupPanel.outerWidth()) / 2,
				offsetBottom = 50;

			if (popupContainer.is('.mobile')) {
				offseTop = popupContainer.height() - popupPanel.outerHeight();
				offseTop = offseTop < 0 ? 0 : offseTop;
				offsetLeft = 0;
				offsetBottom = 0;
			}
			else {
				if (popupContainer.height() - 100 > popupPanel.outerHeight()) {
					offseTop = (popupContainer.height() - popupPanel.outerHeight()) / 2;
				}
				else {
					offseTop = 50;
				}
			}

			popupPanel.css({
				'margin-top': offseTop,
				'margin-left': offsetLeft,
				'margin-bottom': offsetBottom
			});

			popupContainer.find('> .popup-container_loading').css({
				'margin-top': (popupContainer.height() - 60) / 2,
				'margin-left': (popupContainer.width() - 100) / 2
			});
		};

		this.setContent = function (_content) {
			if (typeof _content == 'function') {
				_content = _content.call(this);
			}

			if (_content instanceof TemplateItem) {
				_content = _content.compile();
			}

			popupPanel.find('.popup-container_popup-panel_wrapper').html(_content || '');
			popupContainer.trigger('scroll');

			System.UpdateDOM();
			this.updatePosition();
		};

		this.setLoadFinished = function () {
			settings.isLoadFinished = true;

			if (_options.content) {
				self.setContent(_options.content);
			}

			setTimeout(function () {
				popupPanel.css('display', 'block');
				popupContainer.find('> .loading').css('display', 'none');
				popupContainer.trigger('scroll');

				setTimeout(() => {
					popupContainer.removeClass('hidden');
					setTimeout(floatingProcessor, 400);
				}, 50);
			}, 200);
		};

		this.setCloseOnEscapeEnabled = function (_value) {
			settings.closeOnEsc = !!_value;
		};

		this.setCloseEventHandler = function (_handler) {
			settings.onCloseEvent = _handler;
		};

		this.isClosed = function () {
			return isPopupClosed;
		};

		this.close = function (_dontFireEvent) {
			if (isPopupClosed) {
				return;
			}

			isPopupClosed = true;

			popupContainer
				.removeClass('current')
				.css({
					'opacity': 0,
					'transform': popupsStack.length > 1 && popupContainer.is('.current') ? 'translateX(-30%)' : 'none',
					'transition': 'transform 0.3s ease, opacity 0.3s ease'
				});

			setTimeout(function () {
				popupContainer.remove();
			}, 300);

			$(window)
				.unbind('resize.popup' + self.getId())
				.unbind('resize.floating' + self.getId());

			$(document)
				.unbind('keyup.popup' + self.getId());

			if (!_dontFireEvent && typeof settings.onCloseEvent == 'function') {
				settings.onCloseEvent.call(self);
			}

			for (var i = 0; i < popupsStack.length; i++) {
				if (popupsStack[i] === self) {
					popupsStack.splice(i, 1);
					break;
				}
			}

			isVisiblePopupExists = false;

			for (var i = 0; i < popupsStack.length; i++) {
				if (popupsStack[i].isShowingNow()) {
					isVisiblePopupExists = true;
					break;
				}
			}

			//if (!isVisiblePopupExists && popupsStack.length)
			//{
			//	popupsStack[popupsStack.length - 1].show();
			//}


			if (isVisiblePopupExists &&
				popupsStack.length &&
				!popupsStack[popupsStack.length - 1].getContainer().is('.current')
			) {
				popupsStack[popupsStack.length - 1]
					.getContainer()
					.css({
						'opacity': 0,
						'transform': 'translateX(30%)',
						'transition': 'none'
					});

				setTimeout(function () {
					popupsStack[popupsStack.length - 1]
						.getContainer()
						.addClass('current')
						.css({
							'opacity': 1,
							'transform': 'translateX(0)',
							'transition': 'transform 0.3s ease, opacity 0.3s ease'
						});
				}, 50);
			}

			if (!popupsStack.length) {
				popupGlobalContainer
					.fadeOut(300, function () {
						document.body.style.setProperty('overflow-y', 'auto');
						document.documentElement.style.setProperty('--popup-scroll-offset', '0px');
					});
			}
		};

		show();
		popupsStack.push(self);

		for (var i = 0; i < popupsStack.length; i++) {
			popupsStack[popupsStack.length - 1].getContainer()
				.removeClass('current')
				.css({
					'opacity': 0,
					'transform': 'none',
					'transition': 'none'
				});
		}

		if (popupsStack.length == 1) {
			popupsStack[0]
				.getContainer()
				.addClass('current')
				.css({
					'opacity': 1,
					'transition': 'transform 0.3s ease, opacity 0.3s ease'
				});
		}
		else {
			popupsStack[popupsStack.length - 2]
				.getContainer()
				.css({
					'opacity': 0,
					'transform': settings.mobileMode ? '' : 'translateX(30%)',
					'transition': 'transform 0.3s ease, opacity 0.3s ease'
				});

			popupsStack[popupsStack.length - 1]
				.getContainer()
				.css({
					'transform': settings.mobileMode ? '' : 'translateX(-30%)'
				});

			setTimeout(function () {
				popupsStack[popupsStack.length - 1]
					.getContainer()
					.addClass('current')
					.css({
						'opacity': 1,
						'transform': 'translate(0, 0)',
						'transition': 'transform 0.3s ease, opacity 0.3s ease'
					});
			}, 50);
		}
	};

	this.CheckForm = function (_form, _scrollToErrorElement) {
		_form = $(_form);
		_scrollToErrorElement = _scrollToErrorElement ? $(_scrollToErrorElement) : null;

		var customTextInputs = _form.find('.custom-ta'),
			customTextareas = _form.find('.custom-tb'),
			customSelectboxes = _form.find('.custom-sb');

		$.merge(customTextInputs, customTextareas)
			.attr('data-check-validity', '1')
			.find('input, textarea')
			.trigger('keyup');

		customSelectboxes
			.attr('data-check-validity', '1')
			.find('input')
			.trigger('blur');

		var isErrorFound = false;

		$.merge(customTextInputs, customTextareas, customSelectboxes)
			.each(function () {
				var nativeNode = $(this).data('nativeNode');

				if (!nativeNode) {
					return;
				}

				if (!isErrorFound && !nativeNode.isValid()) {
					if (_scrollToErrorElement) {
						_scrollToErrorElement.stop().animate({
							'scrollTop': _scrollToErrorElement.offset().top + $(this).offset().top - _scrollToErrorElement[0].scrollHeight + (_scrollToErrorElement.height() - $(this).height()) / 2
						}, 300);
					}

					isErrorFound = true;
				}
			});

		return isErrorFound ? false : new FormData(_form[0]);
	}
};

System.Init();
System.UpdateDOM();

window.addEventListener('onBitrixLiveChat', function (event) {
	var widget = event.detail.widget;

	// UTM tags
	// widget.buttonInstance.b24Tracker.guest.getTags()

	widget.subscribe({
		type: BX.LiveChatWidget.SubscriptionType.every,
		callback: function (event) {
			window.dataLayer.push({
				event: 'bx24-' + event.type,
				page_url: window.location.href,
				page: window.location.pathname.split('/').slice(2, 3)
			});
		}
	});
});