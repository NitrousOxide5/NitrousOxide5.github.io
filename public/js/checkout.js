$(document).ready(function(){ //alert();
   //----  payment_option--------

	 $('.payment_option').on('click', function(event){
           val =  $(this).attr("data-name");
            $('#payment_option').val(val);
});

 // -------- order from submit----------
	 $('#submit_order').on('click', function(event){
     //   alert();
     var len  =  $("#adformj .text-danger").length;  
    
     var presp_desc  = $("#presp_desc").val();
     var presp_image = $("#presp_image").val();

    // $("#presp_desc,#presp_image").prop('required',true);

     if(presp_desc || presp_image){
        $("#prescription").val(1);   
      } 
     
         var formid = $(this).closest("form").attr('id');
     
         error =$.trim($('#'+formid).find(".text-danger").text());
          if(error){
            $('#submit_order').prop('disabled', true);
          }else {
            $('#submit_order').prop('disabled', false);
          }
    event.preventDefault();
      if(validated_form(formid) && error==''){
     $(".loader-container").show();
    var url = $('#'+formid).attr('data-action');
     $.ajax({
      url:url,
      method:"POST",
      data: new FormData($('#'+formid)[0]),
      contentType: false,
      cache: false,
      processData: false,
      dataType:"json",
      success:function(data)
      {
      	 $(".loader-container").hide();
       var html = '';
       if(data.msg_code && data.msg_code == "out_of_stock"){
        location.reload();
        return false;
       }
       if(data.errors)
       {
        html = '<div class="alert alert-danger">';
        for(var count = 0; count < data.errors.length; count++)
        {
         html += '<p>' + data.errors[count] + '</p>';
       }
       html += '</div>';
     }
       if(data.href){
        window.location.href = data.href;
        return true;
       }
     if(data.success)
     {
     	$('#'+formid)[0].reset();
      html = '<div class="alert alert-success">' + data.success + '</div>';
         setTimeout(function(){$('#ord_res').html(''); 
             window.location.href = "/myorders";
     }, 1200);

    }
    $('#ord_res').html(html);
      $('html, body').animate({scrollTop : 50},600);
  },
   error:function(data)
      {
        $(".loader-container").hide();
           html = '<div class="alert alert-danger">Please try again </div>';
             $('#ord_res').html(html);
      }
});
      }else{
          ht = $('label.error:first').offset().top;
      	 $('html, body').animate({scrollTop : ht-330},400);
      }
     }); 


    $('.dhclose').on('click', function(event){
	   $('#aformj')[0].reset();
 	     }); 
   // -------- dilsery address from submit----------
		 /*$('#dha_submit').on('click', function(event){
     //   alert();
         var formid = $(this).closest("form").attr('id');
    event.preventDefault();

      if(validated_form(formid)){

        $(".loader-container").show();
    var url = $('#'+formid).attr('action');
     $.ajax({
      url:url,
      method:"POST",
      data: new FormData($('#'+formid)[0]),
      contentType: false,
      cache: false,
      processData: false,
      dataType:"json",
      success:function(data)
      {
      	$(".loader-container").hide();
       var html = '';
       if(data.errors)
       {
        html = '<div class="alert alert-danger">';
        for(var count = 0; count < data.errors.length; count++)
        {
         html += '<p>' + data.errors[count] + '</p>';
       }
       html += '</div>';
     }
     if(data.success)
     {

     $( "#ref_addr").load( "/checkout #ref_addr" )
     	$('#'+formid)[0].reset();
      html = '<div class="alert alert-success">' + data.success + '</div>';
         setTimeout(function(){
         	$('#dha_result').html('');
         	 $('#addressModal').modal("hide"); 
         	}, 1200);
    }
    $('#dha_result').html(html);
  }, 
  error:function(data)
      {
        $(".loader-container").hide();
           html = '<div class="alert alert-danger">Please try again </div>';
            $('#dha_result').html(html);    
      }
});

  
  $('html, body').animate({scrollTop : 0},700);
}
 });*/
		   $('.select2').select2();
		 $('#country').change(function(){
        var cid = $(this).val();
         var cname = $("#country option:selected").text()
       	$(".loader-container").show();
        if(cid){
        $.ajax({
           type:"get",
           url:"/getStates/"+cid, 
           success:function(res)
           {   
                if(res)
                {
                		$(".loader-container").hide();
                   //   $("#country_name").val(cname);
                    $("#state").empty();
                    $("#city").empty();
                    $("#state").append('<option value ="">Select State</option>');
                    $.each(res,function(key,value){
                        $("#state").append('<option value="'+key+'">'+value+'</option>');
                    });
                }
           }

        });
        }
    });
    $('#state').change(function(){
        var sid = $(this).val();
          var cname = $("#state option:selected").text()
        if(sid){
        	   $(".loader-container").show();     
        $.ajax({
           type:"get",
           url:"/getCities/"+sid,
           success:function(res)
           {  
           $(".loader-container").hide();     
                if(res)
                {
                  //   $("#state_name").val(cname);
                    $("#city").empty();
                    $("#city").append('<option value ="">Select City</option>');
                    $.each(res,function(key,value){
                        $("#city").append('<option value="'+key+'">'+value+'</option>');
                    });
                }
           }

        });
        }
    }); 
	
 $(document).on('change click', '.cart_check , .cart_qty',function(event){ 

   pid = $(this).attr('data-id');
 	 qty = parseInt($('#cqty'+pid).val());

    if(qty>0) {
   
    $("#dp"+pid).parent().parent().find('.text-danger').remove()
 	 price = parseFloat($('#cqty'+pid).attr('data-price'));
 	 discount_price = parseFloat($('#cqty'+pid).attr('data-discount_price'));
     var zip_code  = ($('#cqty' + pid).attr('data-zip_code'));
     var  country_code= ($('#cqty' + pid).attr('data-country_code'));
     var csrf_token = $('meta[name="csrf-token"]').attr('content');
      $(".loader-container").show();       
      $.post("/addtocart", { pid: pid,qty:qty,  zip_code: zip_code, calculate_shipping_charge: 1,
                country_code: country_code,action:"update" , "_token": csrf_token}, function(data){
                if(data.error){
                  $('#cqty'+pid).val(data.qty);
                 $("#dp"+pid).parent().parent().append('<b class="text-danger">'+data.error+'</b>');  
                 $(".loader-container").hide(); return false;
                }
                if(data.shipping_data.error && data.shipping_data.error != ""){
                  $(".shipping_error").html(data.shipping_data.error);
                  $('#submit_order').attr('disabled', 'disabled');
                }else if (data.shipping_data.shipping_charge && data.shipping_data.shipping_charge > 0) {
                  $('#delivery_Fee_post').val(data.shipping_data.shipping_charge);
                  $(".shipping_error").html(data.shipping_data.error);
                  $('#submit_order').removeAttr('disabled');
                }
                $(".has_out_of_stock_items_"+pid).html("");  
               $("#cqty"+pid).val( data.qty); 
                 total_disprice= parseFloat( data.qty*discount_price);
              total_price =parseFloat( data.qty*price);
                if(data.AusPost.shipping_charge){
                    $('#cqty' + pid).attr('data-shipping_charge',data.AusPost.shipping_charge)
                  }
              setTimeout(function(){ 
                  $("#dp"+pid).parent().parent().find('.text-danger').remove() 
                }, 5000);
          $('#dp'+pid).text(total_disprice);
          $('#delp'+pid).text("$"+total_price);
          calculate();
               $(".loader-container").hide();       
      	 }).fail(function() { 
         $(".loader-container").hide();       
            // just in case posting your form failed
            alert( "Please try again later" );       
        });
      }else{
        $('#cqty'+pid).val(1)
      }      

    });   
        calculate();
	    });  
	
function calculate(){
         var ol = $(".order-item").length;

            cart_qty();
     
         
          var delivery_Fee = 0;
      var total_price = 0;
      var discount_total = 0;
         var  sub_total =0;
    $(".product_price").each(function() {
           var   val = parseFloat($(this).text());
               total_price += val;
           });
      var   tota_qty =   0;
    $(".cart_qty").each(function() {
           tota_qty += parseFloat($(this).val());
           var   coupon_price = parseFloat($(this).attr("data-coupon-price"));
                 total = coupon_price * parseFloat($(this).val());
            if(total) {
               discount_total += total;
            }
            shipping_charge = parseFloat($(this).attr("data-shipping_charge"));
        
          //  delivery_total = shipping_charge * parseFloat($(this).val());
          //  if (delivery_total) {
                // delivery_Fee += shipping_charge;
         //   }
           });

     total_price = total_price.toFixed(2);
     delivery_Fee = parseFloat($('#delivery_Fee_post').val());
     delivery_Fee = delivery_Fee.toFixed(2);
     sub_total = parseFloat(total_price) + parseFloat(delivery_Fee);
     discount_total = discount_total.toFixed(2);
         total_Payble =sub_total - parseFloat(discount_total);
     
     $('#total_price').text("$"+total_price);
     $('#delivery_Fee').text("$"+delivery_Fee);
     $('#sub_total').text("$"+sub_total.toFixed(2));
     $('#discount').text("$"+discount_total);
      $('#total_Payble').text("$"+total_Payble.toFixed(2));

      $('#total_price_post').val(total_price);
     // $('#delivery_Fee_post').val(delivery_Fee);
     $('#sub_total_post').val(sub_total.toFixed(2));
     $('#discount_post').val(discount_total);
      $('#total_Payble_post').val(total_Payble.toFixed(2));

       $('#total_qty_post').val(tota_qty);
       $('#nos_item_post').val(ol);
         
  }
	$(document).on('click', '.cart_removed',function(event)
        {

      var id = $(this).attr('data-id');
      //  alert(id);
      jQuery('#rm'+id).prop("disabled", true); 
        $('#rm'+id).html('<i class="fas fa-spinner fa-spin"></i> Processing...');
        $.post("/cart/removed", { id: id, calculate_shipping_charge: 1}, function(data){
        jQuery('#rm'+id).prop("disabled", false); 
            // show the response
           $('#rm'+id).parent().parent().parent().remove();   
            $('#submit_order').prop('disabled', false);
            if (data.shipping_data.shipping_charge > 0) {
                  $('#delivery_Fee_post').val(data.shipping_data.shipping_charge);
              }
              calculate();      
              if ($('.cart_removed').length <= 0) {
                location.reload();
              }
        }).fail(function() {
         
            // just in case posting your form failed
            alert( "Posting failed." );
             
        });
      

       });  
