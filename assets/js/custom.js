(function() {

	"use strict";
  
	var app = {
		
		init: function() {

			//=== Main visible ===\\
			this.mainVisible();

			//=== lazy loading effect ===\\
			this.lazyLoading();

			this.setUpListeners();

			//=== Custom scripts ===\\
			this.headerFixed.init();
			this.btnHover();
			this.appendMfBg();
			this.appendBtnTop();
			this.formingHrefTel();
			this.contentTable();
			this.counters.init();

			//=== Plugins ===\\
			this.device();

		},
        
		setUpListeners: function() {

			//=== Ripple effect for buttons ===\\
			$(".ripple").on("click", this.btnRipple);

			//=== Mobile/tablet main menu ===\\
			// Main menu toogle \\
			$(".main-mnu-btn").on("click", this.mainMenu.toggle);
			// Main menu close not on this element \\
			$(document).on("click", this.mainMenu.closeNotEl);

			//=== Tab ===\\
			$(".tabs-nav li").on("click", this.tab);

			//=== Accordion ===\\
			$(".accordion-trigger").on("click", this.accordion);

			//=== Button top ===\\
			$(document).on("click", '.btn-top', this.btnTop);
			$(window).on("scroll", this.btnTopScroll);

			$(document).on("click", '.scroll-to', this.scrollTo);
			
		},

		//=== Body visible ===\\
		mainVisible: function() {

			$(".main").addClass("main-visible");

		},

		appendMfBg: function() {

			$("body").append('<div class="mf-bg"></div>');

		},

		appendBtnTop: function() {

			$("body").append('<div class="btn-top"><svg class="btn-icon-right" viewBox="0 0 13 9" width="13" height="9"><use xlink:href="assets/img/sprite.svg#arrow-right"></use></svg></div>');

		},

		btnTop: function() {
			
			$('html, body').animate({scrollTop: 0}, 1000, function() {
				$(this).removeClass("active");
			});

		},

		btnTopScroll: function() {
			
			var btnTop = $('.btn-top');
			
			if ($(this).scrollTop() > 700) {

				btnTop.addClass("active");

			} else {

				btnTop.removeClass("active");
				
			}

		},

		scrollTo: function() {

			$('html, body').animate({scrollTop: $($(this).attr('data-scroll-to')).position().top}, 1000);

		},

		//=== Header fixed ===\\
		headerFixed: {

			init: function() {

				if( $('.header-fixed').length ) {
	
					$(window).on("load resize scroll", app.headerFixed.handler);
	
				}
				
			},
	
			IS_FIXED: false,
	
			handler: function() {
	
				var header = $('.header-fixed');
				var height = header.outerHeight();
				var offsetTop = header.offset().top;
				var scrollTop = $(this).scrollTop();
	
				var headerStatic = $(".header-fixed-static");
				if(headerStatic.length) { 
					offsetTop = headerStatic.offset().top;
					headerStatic.css("height", height);
				}
	
				if(scrollTop >= offsetTop) {
					if(!app.headerFixed.IS_FIXED) {
						header.addClass("fixed");
						header.after('<div class="header-fixed-static" style="height:' + height + 'px"></div>');
					}
					app.headerFixed.IS_FIXED = true;
				} else {
					if(app.headerFixed.IS_FIXED) {
						header.removeClass("fixed");
						headerStatic.remove();
					}
					app.headerFixed.IS_FIXED = false;
				}
	
			}

		},

		//=== Tab ===\\
		tab: function() {

			var _this = $(this),
				index = _this.index(),
				tabs = _this.closest(".tabs"),
				items = tabs.find(".tabs-item");

			if (!_this.hasClass("active")) {

				items
					.eq(index)
					.add(_this)
					.addClass("active")
					.siblings()
					.removeClass("active");
			
			}

		},

		//=== Accordion ===\\
		accordion: function(e) {

			e.originalEvent.preventDefault();

			var _this = $(this),
				item = _this.closest(".accordion-item"),
				container = _this.closest(".accordion"),
				items = container.find(".accordion-item"),
				content = item.find(".accordion-content"),
				otherContents = container.find(".accordion-content"),
				duration = 300;

			if (!item.hasClass("active")) {
				items.removeClass("active");
				item.addClass("active");
				otherContents.stop(true, true).slideUp(duration);
				content.stop(true, true).slideDown(duration);
			} else {
				content.stop(true, true).slideUp(duration);
				item.removeClass("active");
			}

		},

		//=== Mobile/tablet main menu ===\\
		mainMenu: {

			toggle: function() {

				var _this = $(this),
					_body = $("body"),
					headerHeight = _this.closest(".header").outerHeight(),
					headerOffsetTop = _this.closest(".header").offset().top,
					mnu = $(".mmm"),
					headeFixedOffsetTop = $(".header-fixed").offset().top;

				if(headeFixedOffsetTop <= headerOffsetTop) {
					$("html").scrollTop(headeFixedOffsetTop + 1);
				}
					
				mnu.css("padding-top", headerHeight);
				$(this).toggleClass("active");
				
				_body.toggleClass("mmm-open").scrollTop(headeFixedOffsetTop);
					
				if(_body.hasClass("mmm-open")) {
					$(".mf-bg").addClass("visible mm");
				} else {
					$(".mf-bg").removeClass("visible mm");
				}
	
			},

			closeNotEl: function(e) {

				if($("body").hasClass("mmm-open")) {
					if ($(e.originalEvent.target).closest(".mmm, .main-mnu-btn").length) return;
					$("body").removeClass("mmm-open");
					$(".main-mnu-btn").removeClass("active");
					$(".mf-bg").removeClass("visible mm");
					e.originalEvent.stopPropagation();
				}
	
			}

		},

		//=== Ripple effect for buttons ===\\
		btnRipple: function(e) {
			
			var _this = $(this),
				offset = $(this).offset(),
				positionX = e.originalEvent.pageX - offset.left,
				positionY = e.originalEvent.pageY - offset.top;
			_this.append("<div class='ripple-effect'>");
			_this
				.find(".ripple-effect")
				.css({
					left: positionX,
					top: positionY
				})
				.animate({
					opacity: 0
				}, 1500, function() {
					$(this).remove();
				});

		},

		btnHover: function() {

			var btns = document.querySelectorAll(".btn, .el-ripple"),
				btn = [];

			btns.forEach(function(element, index) {

				var span = document.createElement("span"); 
				span.className = "el-ripple-circle";
				element.appendChild(span);

				// If The span element for this element does not exist in the array, add it.
				if (!btn[index])
				btn[index] = element.querySelector(".el-ripple-circle");

				element.addEventListener("mouseenter", function(e) {	
					btnHandler(element, index, e);			
				});

				element.addEventListener("mouseleave", function(e) {
					btnHandler(element, index, e);
				});
				
			});

			const btnHandler = function(element, index, e) {

				let offset = element.getBoundingClientRect(),
					left = e.pageX - offset.left - window.scrollX,
					top = e.pageY - offset.top - window.scrollY;

				btn[index].style.left = left + "px";
				btn[index].style.top = top + "px";

			}

		},

		//=== Forming href for phone ===\\
		formingHrefTel: function() {

			var linkAll = $('.formingHrefTel'),
				joinNumbToStringTel = 'tel:';

			$.each(linkAll, function () {
				var _this = $(this),
					linkValue = _this.text(),
					arrayString = linkValue.split("");

				for (var i = 0; i < arrayString.length; i++) {
					var thisNunb = app.isNumber(arrayString[i]);
					if (thisNunb === true || (arrayString[i] === "+" && i === 0)) {
						joinNumbToStringTel += arrayString[i];
					}
				}

				_this.attr("href", function () {
					return joinNumbToStringTel;
				});
				joinNumbToStringTel = 'tel:'

			});

		},

		isNumber: function(n) {

			return !isNaN(parseFloat(n)) && isFinite(n);

		},
		
		//=== Content table responsive ===\\
		contentTable: function() {

			var contentTable = $(".content");
			if(contentTable.length) {
				
				$.each(contentTable.find("table"), function() {
					$(this).wrap("<div class='table-responsive-outer'></div>").wrap("<div class='table-responsive'></div>");
				});
				
			}

		},

		//=== Counters ===\\
		counters: {

			init: function() {

				$(window).on("scroll load resize", function () {

					app.counters.spincrement();
	
				});

			},

			spincrement: function() {

				var counters = $(".spincrement-container");
	
				if(counters.length) {
	
					jQuery.each(counters, function() {
	
						var _this = $(this);
		
						if ( $(window).scrollTop() > _this.offset().top - ($(window).height() * 0.85) && !_this.hasClass("animated") ) {
		
							_this.addClass("animated");
		
							_this.find('.spincrement').spincrement({
								duration: 1500,
								leeway: 10,
								thousandSeparator: '',
								decimalPoint: ''
							});
							
						}
		
					});
	
				}
	
			},

		},

		//=== Plugins ===\\
		lazyLoading: function() {

			var observer = lozad('.lazy');
			observer.observe();

		},

		device: function() {

			if( (device.mobile() || device.tablet()) && device.ios() ) {
				var tempCSS = $('a').css('-webkit-tap-highlight-color');
				$('main, .main-inner').css('cursor', 'pointer')
						 .css('-webkit-tap-highlight-color', 'rgba(0, 0, 0, 0)');
				$('a').css('-webkit-tap-highlight-color', tempCSS);
			}

		},
		
	}
 
	app.init();
 
}());