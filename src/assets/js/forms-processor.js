$(function() {

	var form = $('.ajax-contact-v2');
	var submitButton = form.find('.field button');
	var formMessages = $('.form-messages');
	
	window.recaptchaProcessingCompleted = function ()
	{
		var formData = form.serialize();
		
		$.ajax({
			type: 'POST',
			url: form.attr('action'),
			data: formData,
			success: function (_data)
			{
				dataLayer.push({'event' : 'contact-form-submitted'});
				
				formMessages
					.removeClass('error')
					.addClass('success')
					.html(_data);
				
				form
					.find('input:visible, textarea:visible')
						.val('');
			},
			error: function (_xhr)
			{
				formMessages
					.removeClass('success')
					.addClass('error')
					.html(_xhr.responseText);
			},
			complete: function ()
			{
				if (typeof grecaptcha != 'undefined')
				{
					grecaptcha.reset();
				}
				
				submitButton
					.prop('disabled', false)
					.removeClass('disabled');
			}
		});
	};
	
	form.submit(function(e)
	{
		e.preventDefault();
		
		submitButton
			.prop('disabled', true)
			.addClass('disabled');
		
		if ($('#RecaptchaExplicit').length || typeof grecaptcha == 'undefined')
		{
			recaptchaProcessingCompleted();
		}
		else
		{
			grecaptcha.execute();
		}
	});
});