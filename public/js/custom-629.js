$(document).ready(function () {
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
		}
	});
	// alpha only
	$('.alphaonly').bind('keyup blur', function () {
		var node = $(this);
		node.val(node.val().replace(/[^a-zA-Z ]/g, ''));
	});

	//code for numric value in input feild
	$('body').on('keypress', '.contact_no,.numerical,.numerical_value', function (e) {
		if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
			$("#errmsg").html("Digits Only").show().fadeOut("slow");
			return false;
		}
	});
	//code for float value value in input feild
	$('body').on('keypress', '.qty,.float', function () {
		if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57 || hasDecimalPlace($(this).val(), 2))) {
			event.preventDefault();
		}
	});


	// form save -> check  client validation js by  abhilash johri

	$('body').on('click', '.submitform', function (e) {
		e.preventDefault()
		//  getting form  id 
		var formid = $(this).closest("form").attr('id');
		$("#" + formid).validate({
			ignore: [],
			errorElement: 'label',
			errorLabelContainer: '.error',
			errorPlacement: function (error, element) {
				if (element.is(':checkbox')) {
					$(element).parent('div').addClass('checkbox-error');
				} else {
					var cls = element.parent().attr('class');
					console.log(element.parent().attr('class'))
					if (cls == 'input-group') {
						element.parent().before(error);
					} else {
						element.before(error);
					}
				}
			}
		});

		// form validation 
		if (!formid) {
			alert('form id is requried');
		}
		if ($("#" + formid).valid()) {
			return true;
		} else {
			return false;

		}
		$("body,.modal-body").animate({
			scrollTop: 0
		}, "slow");
	});
	// --------form save start ------------
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
		}
	});

	// --------form save end ------------


  $('body').on('click', '.forgetsubmit', function (e) {

    e.preventDefault()
    //   alert();
    //  getting form  id 
    var formid = $(this).closest("form").attr('id');
    var url = $(this).closest("form").attr('action');

    if (url == '') {
      alert('form action missing');
      return false;
    }
    if (formid == '') {
      alert('form id missing');
      return false;
    }

    $("#" + formid).validate({
      ignore: [],
      errorElement: 'label',
      errorLabelContainer: '.error',
      errorPlacement: function (error, element) {
        if (element.is(':checkbox')) {
          $(element).parent('div').addClass('checkbox-error');
        } else {
          $(element).parent('div').addClass('error');
          element.parent().after(error);
        }
      }
    });

    // form validation 
    if (!formid) {
      alert('form id is requried');
    }
    if ($("#" + formid).valid()) {
      $(".loader-container").show();
      //   $( this ).serialize()
      // $("#" + formid).serialize()
      $this = $("#" + formid)[0];
      $(this).prop("disabled", true);

      $.ajax({
        url: url,
        method: "POST",
        data: new FormData($this),
        contentType: false,
        cache: false,
        processData: false,
        // dataType:"json",
        success: function (data) {
          $(".loader-container").hide();
          $('.forgetsubmit').prop("disabled", false);
          console.log(data);
          var html = '';
          if (data.status == 'success') {
            //  window.location.href = data.redirect;
            html = '<div class="alert alert-success">';
            html += '<span>' + data.message + '</span>';
            html += '</div>';

          }

          if (data.status == 'error') {

            html = '<div class="alert alert-danger">';
            html += '<span>' + data.message + '</span>';
            html += '</div>';

          }

          $('#forget_result').html(html);
          return false
        }

      });

    } else {
      return false;

    }
    $("body,.modal-body").animate({
      scrollTop: 0
    }, "slow");
  });

  // --------form save end ------------

  /*$('#submitnews').on('click', function (event) {
    //  alert();       
    var formid = $(this).closest("form").attr('id');
    event.preventDefault();
    if (validated_form2(formid)) {
      $(".loader-container").show();
      var url = $('#' + formid).attr('action');
      $.ajax({
        url: url,
        method: "POST",
        data: new FormData($('#' + formid)[0]),
        contentType: false,
        cache: false,
        processData: false,
        dataType: "json",
        success: function (data) {
          $(".loader-container").hide();
          var html = '';
          if (data.errors) {
            html = '<div class="alert alert-danger">';
            for (var count = 0; count < data.errors.length; count++) {
              html += '<p>' + data.errors[count] + '</p>';
            }
            html += '</div>';
          }
          if (data.success) {
            html = '<div class="alert alert-success">' + data.success + '</div>';
            $('#' + formid)[0].reset();
          }
          $('#news_res').html(html);
          setTimeout(function () {
            $('#news_res').html('');
          }, 4000);
        }

      })

      // $('html, body').animate({scrollTop : 0},700);
    }
  });*/
  //-------------inqSubmit-------------------  
  /*$('#inqSubmit').on('click', function (event) {
    //  alert();

    var formid = $(this).closest("form").attr('id');

    event.preventDefault();
    if (validated_form2(formid)) {
      $(".loader-container").show();
      var url = $('#' + formid).attr('action');
      $.ajax({
        url: url,
        method: "POST",
        data: new FormData($('#' + formid)[0]),
        contentType: false,
        cache: false,
        processData: false,
        dataType: "json",
        success: function (data) {
          $(".loader-container").hide();
          var html = '';
          if (data.errors) {
            html = '<div class="alert alert-danger">';
            for (var count = 0; count < data.errors.length; count++) {
              html += '<p>' + data.errors[count] + '</p>';
            }
            html += '</div>';
          }
          if (data.success) {
            html = '<div class="alert alert-success">' + data.success + '</div>';
            $('#' + formid)[0].reset();
          }
          $('#inq_res').html(html);
          setTimeout(function () {
            $('#inq_res').html('');
          }, 4000);
        },
        error: function (data) {
          $(".loader-container").hide();
          html = '<div class="alert alert-danger">Please try again </div>';
          $('#inq_res').html(html);
        }

      })

      // $('html, body').animate({scrollTop : 0},700);
    }
  });*/

  //---------------------------------------------------------------
  $('.country-code a').on('click', function (event) {
    val = $.trim($(this).text());
    $('#country_code_post').val(val);
  });

  if($('.related-product-slider').length >0) {
		$('.related-product-slider').slick({
			dots: false,
			infinite: false,
			speed: 300,
			slidesToShow: 3,
			slidesToScroll: 3,
			responsive: [
			{
				breakpoint: 991,
				settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				infinite: true,
				dots: false
				}
			},
			{
				breakpoint: 600,
				settings: {
				slidesToShow: 2,
				slidesToScroll: 2
				}
			},
			{
				breakpoint: 580,
				settings: {
				slidesToShow: 1,
				slidesToScroll: 1
				}
			}
			]
		});
	}



});
//------end inqury submit -------------------------
// image prev
function image_prev(input, img_id) {

	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			$('#' + img_id).show();
			$('#' + img_id).attr('src', e.target.result);
		}

		reader.readAsDataURL(input.files[0]);
	}
}

function randomPassword(filed_id, length) {
	var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
	var pass = "";
	for (var x = 0; x < length; x++) {
		var i = Math.floor(Math.random() * chars.length);
		pass += chars.charAt(i);
	}
	//    return pass;
	$("#" + filed_id).val(pass);
}

function validated_form(formid) {

	$("#" + formid).validate({
		ignore: [],
		errorElement: 'label',
		errorLabelContainer: '.error',
		errorPlacement: function (error, element) {
			if (element.is(':checkbox')) {
				$(element).parent('div').parent('div').addClass('checkbox-error');
			} else {


				var cls = element.parent().attr('class');
				console.log(element.parent().attr('class'))
				if (cls == 'input-group') {
					element.parent().before(error);
				} else {
					element.before(error);
				}
			}
		},
		unhighlight: function (element) {

			if ($(element).is(':checkbox') || $(element).is(':radio')) {
				$(element).parent().parent('div').removeClass('checkbox-error');
			}
		}

	});

	// form validation 
	if (!formid) {
		alert('form id is requried');
	}
	if ($("#" + formid).valid()) {
		return true;
	} else {
		return false;

	}
}

function validated_form2(formid) {

	$("#" + formid).validate({
		ignore: [],
		errorElement: 'label',
		errorLabelContainer: '.error',
		errorPlacement: function (error, element) {
			if (element.is(':checkbox') || element.is(':radio')) {
				$(element).parent().parent('div').addClass('error');
			} else {
				$(element).parent('div').addClass('error');
				element.parent().after(error);
			}
		},
		unhighlight: function (element) {

			if ($(element).is(':checkbox') || $(element).is(':radio')) {
				$(element).parent().parent('div').removeClass('error');
			} else {
				$(element).parent('div').removeClass("error");
			}
		}

	});

	// form validation 
	if (!formid) {
		alert('form id is requried');
	}
	if ($("#" + formid).valid()) {
		return true;
	} else {
		return false;

	}
}

function validatedformNearlabel(formid) {

	$("#" + formid).validate({
		ignore: [],
		errorElement: 'label',
		errorLabelContainer: '.error',
		errorPlacement: function (error, element) {
			console.log($(element).attr('class'));
			if (element.is(':checkbox') || element.is(':radio')) {
				$(element).parent().parent('div').addClass('error');

			} else if ($.trim($(element).attr('class')) == 'iti iti--allow-dropdown') {
				console.log('flagContact');
				element.parent().parent().parent().after(error);
			} else {
				$(element).parent('div').addClass('error');
				element.parent().after(error);
			}
		},
		unhighlight: function (element) {

			if ($(element).is(':checkbox') || $(element).is(':radio')) {
				$(element).parent().parent('div').removeClass('error');
			} else {
				$(element).parent('div').removeClass("error");
			}
		}

	});

	// form validation 
	if (!formid) {
		alert('form id is requried');
	}
	if ($("#" + formid).valid()) {
		return true;
	} else {
		return false;

	}
}
$(document).ready(function () { //alert();
	/** add active class and stay opened when selected */
	var url = window.location;
	// for sidebar menu entirely but not cover treeview
	$('ul.nav-sidebar a').filter(function () {
		return this.href == url;
	}).addClass('active').parent().parent().show().addClass('active');


});

// close alert popup status 
$(document).ready(function () {
	$(document).on('click', '.close', function (event) {
		$('body').removeClass('res_alert');
	});
	if ($('.nos_item').length) {;
		cart_qty();
	}
});

function cart_qty() {
	$.get("/cart_total_qty", function (data) {
		$(".nos_item").html(data);
	});
}
// search porduct 
$(document).ready(function () {

	var serlen = $('#searchams').length;
	// alert(len);
	if (serlen) {
		$('#searchams').typeahead({
			source: function (query, result) {
				$.ajax({
					url: "/products/search",
					method: "POST",
					data: {
						q: query
					},
					dataType: "json",
					success: function (data) {
						result($.map(data, function (item) {
							return item;
						}));
					}
				})
			}
		});
	}
});
// model show and hidden time out     
$('.modal').on('shown.bs.modal', function () {
	setTimeout(function () {
		$('body').addClass('modal-open');
	}, 200);
})
$('.modal').on('hidden', function () {
	setTimeout(function () {
		$('body').removeClass('modal-open');
	}, 200);
})
// site header  fiexed
$(function () {
	// Collapse Navbar
	var navbarCollapse = function () {
		if ($(window).scrollTop() > 44) {
			$("#mainNav").addClass("navbar-shrink");
			$('.breadcrum-sec').css('margin-top', $('#mainNav').height());
			$('.banner-sec').css('margin-top', $('#mainNav').height());
			$('.auto-top-margin').css('margin-top', $('#mainNav').height());
		} else {
			$("#mainNav").removeClass("navbar-shrink");
			$('.breadcrum-sec').css('margin-top', 0)
			$('.banner-sec').css('margin-top', 0)
			$('.auto-top-margin').css('margin-top', 0)
		}
	};
	// Collapse now if page is not at top
	navbarCollapse();
	// Collapse the navbar when page is scrolled
	$(window).scroll(navbarCollapse);
	//
});

function valid_dha() {
	// zipcode check  start
	var dhUsrzip = $("#dhUsrzip").val();
	var user = $("#Userkey").val();

	if (user == '') {
		$("#loginModal").modal('show');

		return true;
	} else
	if (dhUsrzip == '' || !dhUsrzip) {
		window.location.href = "/profile?type=edit&r=cart#Delivery_Information";
		return true;
	}
	// zipcode end
}