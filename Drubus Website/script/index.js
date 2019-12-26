


/*var settings = {

    // set #id for validation email
    emailID: '#form_email',

    // set text for validation email
    ErrorTextEmail: 'Enter valid Email Id',

    // set #id for validation password
    passwordID: '#inputPassword',

    // set text for validation password
    ErrorTextPassword: 'Must be 7-20 characters long.',

    // set value required chars for validation password
    MinCharsPass: '7',

    // set #id for validation custom
    Custom: '#inputCustom',

    // set text for validation password
    ErrorTextCustom: 'Must be 5-20 characters long custom.',

    // set value required chars for validation custom form
    MinCharsCustom: '5'
    
}*/

(function() {
  'use strict';
  window.addEventListener('load', function() {
	  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      
    	form.addEventListener('submit', function(event) {
        /*if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        else
        {
        	alert("in else...");
        }*/
    		$('#form_response').html("");
    	  	if (form.checkValidity()) 
    	  	{
    	  		saveEnquiry($(form));
    	  	}
    	  
	    	event.preventDefault();
	        event.stopPropagation();
	        form.classList.add('was-validated');
        //alert("after if else...");
      }, false);
    });
  }, false);
})();


function saveEnquiry(form)
{
	var form_response = $('#form_response');
	
	form_response.html("<img src='apphomelibraries/img/loadspin.gif' style='height: 35px; width: 35px;'>");
	
	 $.ajax({
		 type: 'POST',
		 url: 'serviceController/saveEnquiry',
		 data: form.serialize(), // serializes the form's elements.
		 success: function (response){
			 		/*alert("success...");
	               alert(response); // show response from the php script.
*/	               var json = JSON.parse(response);
	               var RespMsg = json.RespMsg;
	               form_response.html("" +RespMsg);
	               form_response.css({"color":"green"});
	               
	               form.removeClass('was-validated');
	               form.trigger('reset');
		 		},
		 error:  function (response){
			 		/*alert("error...");
             		alert(response.responseText); // show response from the php script.
*/             		form_response.html("" +response.responseText);
					form.removeClass('was-validated');
             		form_response.css({"color":"red"});
	 			}
	 });
	
	 /*$.ajax({
		 type: 'GET',
		 url: 'serviceController/getTest',
		 success: function (response){
			 		alert("success...");
	               alert(response); // show response from the php script.
		 		},
		 error:  function (response){
			 alert("error...");
             		alert(response.responseText); // show response from the php script.
	 			}
	 });*/
	
	
	
//	
//	var myForm = document.getElementById('contact_form');
//	formData = new FormData(myForm);
	
	
	/*var fname = $("#fname").val();
	var lname = $("#lname").val();
	var emaild = $("#emaild").val();
	var subject = $("#subject").val();
	var msg = $("#msg").val();
	
	var json = '{"fname":"'+fname+'", "lname":"'+lname+'", "emaild":"'+emaild+'", "subject":"'+subject+'", "msg":"'+msg+'"}';
	*/
	//alert("saveEnquiry request: "+formData);
	
}