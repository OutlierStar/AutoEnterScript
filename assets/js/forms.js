(function() {

	"use strict";
  
	const app = {
		
		init: function() {

			app.setUpListeners();

			app.textareaAutoSize.init();

		},

		DEFAULT_CONFIG: {
			classTo: 'form-field',
			errorClass: 'error',
			successClass: 'success',
			errorTextParent: 'form-field',
			errorTextTag: 'div',
			errorTextClass: 'error'
		},
		AJAX_URL: './assets/php/handle.php',
 
		setUpListeners: function() {

            $(".form-submission").on("submit", app.form);

            //=== Form fields ===\\
			$(".form-field-input")
				.each(app.formFields.default)
				.on("focus", app.formFields.focus)
				.on("blur", app.formFields.blur);

		},

		form: function(e) {

			e.preventDefault();

            var form = e.currentTarget;

            var pristine = new Pristine(form, app.DEFAULT_CONFIG),
				valid = pristine.validate();

			if(valid) {

                $.ajax({
                    type: "POST",
                    url: ajaxurl,
                    data: th.serialize()
                }).done(function() {

                    //customAlert(text, duration, alertInfo) info = "success" || "danger" || "warning" || "default"
                    app.customAlert("Successfully sent!", 4000, "success");

                    form.trigger("reset");
                    form.find(".form-field").removeClass("focus");

                });

			}

		},

        //=== Form fields ===\\
		formFields: {

			default: function() {

				var _this = $(this),
					val = _this.val(),
					tag = _this.prop("tagName").toLowerCase();

				if(tag === "input" || tag === "textarea") {
					if (val === "") {
						_this.closest('.form-field').removeClass("focus");
					} else {
						_this.closest('.form-field').addClass("focus");
					}
				}

			},

			focus: function() {

				var _this = $(this),
					tag = _this.prop("tagName").toLowerCase();

				if(tag === "input" || tag === "textarea") {
					_this.closest('.form-field').addClass("focus");
				}

			},

			blur: function() {

				var _this = $(this),
					tag = _this.prop("tagName").toLowerCase();

				if( ( tag === "input" || tag === "textarea" ) && _this.val() === "") {
					_this.closest('.form-field').removeClass("focus");
				}

			},

		},

		textareaAutoSize: {

			init: function() {

				var el = app.textareaAutoSize;

				el.target.forEach(function(item) {

					item.style.overflow = 'hidden';
					item.style.height = 'hidden';

					el.observe(item, 'change',  el.resize);
					el.observe(item, 'cut',     el.delayedResize);
					el.observe(item, 'paste',   el.delayedResize);
					el.observe(item, 'drop',    el.delayedResize);
					el.observe(item, 'keydown', el.delayedResize);

				});

			},

			target: document.querySelectorAll("textarea"),

			observe: function (element, event, handler) {

				element.addEventListener(event, handler);

			},

			resize: function() {

				app.textareaAutoSize.target.forEach(function(item) {
					item.style.height = 'auto';
					item.style.height = item.scrollHeight+1+'px';
				});

			},

			delayedResize: function() {

				window.setTimeout(app.textareaAutoSize.resize, 0);

			}

        },

        //=== Custom alert ===\\
		customAlert: function(text, duration, alertInfo) {

			var alerts = $(".alerts"),
				body = $("body"),
				alertClass = "",
				alertIco = "info";
			
			if (!alerts.length) {
				body.append('<div class="alerts"></div>');
			}
			$(".alert").remove();

			if (alertInfo === "success") {
				alertClass = "alert-success";
				alertIco = "check";
			} else if (alertInfo === "danger") {
				alertClass = "alert-danger";
				alertIco = "error";
			} else if (alertInfo === "warning") {
				alertClass = "alert-warning";
				alertIco = "warning";
			} else if (alertInfo == "default") {
				alertClass = "alert-default";
				alertIco = "info";
			}

			if (!$("." + alertClass + "").length) {
				$(".alerts").append(
				'<div class="alert ' +
					alertClass +
					'" data-duration-hide="' +
					duration +
					'"> <div class="alert-ico"> <i class="material-icons md-22">' +
					alertIco +
					'</i> </div> <div class="alert-text">' +
					text +
					"</div> </div>"
				);

				setTimeout(function() {
					$("." + alertClass + "").remove();
				}, duration);
			}

			$(document).on("click", ".alert-close", function() {
				$(this)
				.closest(".alert")
				.remove();
			});

		},
		
	}
 
	app.init();
 
}());