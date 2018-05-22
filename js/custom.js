$(document).ready(function(){

	// Nav toggle
	var navToggle = $('.header__toggle');
	var navWrapper = $('.header__wrapper');

	navToggle.on('click', function(){

		if ($(this).hasClass('header__toggle--closed')) {
			$(this).removeClass('header__toggle--closed').addClass('header__toggle--opened');
			navWrapper.removeClass('header__wrapper--closed').addClass('header__wrapper--opened');
		} else {
			$(this).removeClass('header__toggle--opened').addClass('header__toggle--closed');
			navWrapper.removeClass('header__wrapper--opened').addClass('header__wrapper--closed');
		}

	});

	// Form validation
	function validatePane(paneId) {
		var hasError = false;
		$('#' + paneId + ' input').each(function(){
			setError($(this), false);
			if (validateElement($(this)) === false) {
				hasError = true;
			}
		});

		return !hasError;
	}

	function validateElement(element) {
		var inputType = element.attr('type');
		var inputVal = element.val();

		if (inputType == 'text') {
			var check = validateText(inputVal);
		}

		if (inputType == 'email') {
			var check = validateEmail(inputVal);
		}

		if (check === true) {
			setError(element, false);
			return true;
		} else {
			setError(element, check);
			return false;
		}
	}

	function validateText(value) {
		if (value == '') {
			return 'Error! Field is empty.';
		}
		return true;
	}

	function validateEmail(value) {
		
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (value == '') {
			return 'Error! Field is empty.';
		} else if (re.test(String(value).toLowerCase()) === false) {
			return 'Error! Please provide a valid email.';
		}
		return true;
	}

	function setError(element, error) {
		if (element.hasClass('error')) {
			element.removeClass('error');
			element.next('.error-message').remove();
		}
		if (error != false) {
			element.addClass('error');
			element.after('<div class="error-message">' + error + '</div>');
		}
	}

	// Tabs toggle
	$('#tabs a').on('click', function(e){
      e.preventDefault();

      var currentStep = $('#tabs a.active').data('step');
      var nextStep = $(this).data('step');

      if (nextStep > currentStep) {
      	if (!validatePane(currentStep)) {
      		return false;
      	}
      }

      $('#tabs a').removeClass('active');
      $('div[id^="step"]').removeClass('active');

      $(this).addClass('active');
      $('#' + nextStep).addClass('active');
    });

    $('#form button[type="button"]').on('click', function(){
    	var step = $(this).data('step');

    	$('#tabs a[data-step="' + step + '"]').trigger('click');
    });

    $('#form button[type="submit"]').on('click', function(e){
    	e.preventDefault();
    	var currentStep = $('#tabs a.active').data('step');
    	validatePane(currentStep);
    });

    $('.form__element').on('change', function(){
    	validateElement($(this));
    });

    //  Spinner
    $('.product__add').on('click', function(){

    	var productQty = $(this).parent().find('.product__qty');
    	var value = Number(productQty.val());

    	if (value < 999) {
    		productQty.val(value + 1);
    	}	
    });

    $('.product__delete').on('click', function(){

    	var productQty = $(this).parent().find('.product__qty');
    	var value = Number(productQty.val());

    	if (value > 0) {
    		productQty.val(value - 1);
    	}	
    });

    $('.product__qty').on('change', function(){
    	var value = Number($(this).val());

    	if (Number.isInteger(value) && value > 0 && value < 1000) {
    		$(this).val(value);
    	} else {
    		$(this).val(0);
    	}
    	
    });
})