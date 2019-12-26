$(document).ready(function() {
	// Modal hover
	$(".card").hover(
		function() {
			$(this)
				.addClass("shadow-lg")
				.css("cursor", "pointer");
		},
		function() {
			$(this).removeClass("shadow-lg");
		}
	);

	// auto-hide nav-bar
	var prevScrollpos = window.pageYOffset;
	window.onscroll = function() {
		var currentScrollPos = window.pageYOffset;
		if (prevScrollpos > currentScrollPos) {
			$(".fixed-top").css("top", "0px");
		} else {
			$(".fixed-top").css("top", "-70px");
		}
		prevScrollpos = currentScrollPos;
	};

	// Scroll to Top
	//making the button appear or disappear
	var btn = $("#toTopBtn");

	$(window).scroll(function() {
		if ($(window).scrollTop() > 300) {
			btn.addClass("show");
		} else {
			btn.removeClass("show");
		}
	});

	btn.on("click", function(e) {
		e.preventDefault();
		$("html, body").animate({ scrollTop: 0 }, "300");
	});

	//download file in excel format
	$("#downloadbtn").click(function() {
		var input = {};
		//	input.ticket_no = ticket_no;
		window.location.href =
			"serviceController/getExcelIds?request=" +
			btoa(JSON.stringify(input));
	});

	//onclick of login button login modal opens
	var btnn = $("#loginbtn");
	btnn.on("click", function(e) {
		$("#login_modal").modal("show");
	});

	// Dynamically add outline to nav-link
	$(".nav-outline").click(function() {
		$(".nav")
			.find(".nav-outline")
			.each(function() {
				$(this).css("outline", "none");
			});
		if ($(".nav-outline a").hasClass("active")) {
			$(this).css("outline", "5px solid white");
		}
	});

	// modal fullscreen
	//Toggle fullscreen of Modal
	$(".modal-fullscreen").click(function(e) {
		e.preventDefault();
		$this = $(this);

		if ($this.children("i").hasClass("fas fa-expand")) {
			$this.children("i").removeClass("fas fa-expand");
			$this.children("i").addClass("fas fa-compress");
			$("#main_modal").addClass("modal-full");
		} else if ($this.children("i").hasClass("fas fa-compress")) {
			$this.children("i").removeClass("fas fa-compress");
			$this.children("i").addClass("fas fa-expand");
			$("#main_modal").removeClass("modal-full");
		}
	});

	$(".modal-close").click(function() {
		$this.children("i").removeClass("fas fa-compress");
		$this.children("i").addClass("fas fa-expand");
		$(".modal-content").removeClass("modal-maximize");
	});

	// take username and password from the frontend and check in the DB
	$("#login-button").click(function() {
		var user_name = $("#username").val();
		var pass_word = $("#password").val();
		LoginModal(user_name, pass_word);
	});

	// Slider animation by replacing the image
	setInterval(setSecondimage, 6000);
    setInterval(setThirdImage, 12000);
    setInterval(setFirstImage, 18000);

    function setSecondimage () {
        $(".first-page-bg-image img").attr("src", "images/Asset 2_1@4x.png");
    }
    function setThirdImage () {
        $(".first-page-bg-image img").attr("src", "images/Asset 1@4x.png");
    }
    function setFirstImage () {
        $(".first-page-bg-image img").attr("src", "images/Asset 3@4x.png");
    }

	//submit button in the contact form
	("use strict");
	window.addEventListener(
		"load",
		function() {
			// Fetch all the forms we want to apply custom Bootstrap validation styles to
			var forms = document.getElementsByClassName("needs-validation");

			// Loop over them and prevent submission
			var validation = Array.prototype.filter.call(forms, function(form) {
				form.addEventListener(
					"submit",
					function(event) {
						$("#form_response").html("");
						if (form.checkValidity()) {
							saveEnquiry($(form));
						}

						event.preventDefault();
						event.stopPropagation();
						form.classList.add("was-validated");
					},
					false
				);
			});
		},
		false
	);
});

function saveEnquiry(form) {
	var form_response = $("#form_response");
	console.log(form_response);

	form_response.html(
		"<img src='apphomelibraries/img/loadspin.gif' style='height: 35px; width: 35px;'>"
	);

	$.ajax({
		type: "POST",
		url: "serviceController/saveEnquiry",
		data: form.serialize(), // serializes the form's elements.
		success: function(response) {
			/*alert("success...");
		               alert(response); // show response from the php script.
	*/ var json = JSON.parse(
				response
			);
			var RespMsg = json.RespMsg;
			form_response.html("" + RespMsg);
			form_response.css({ color: "black" });

			form.removeClass("was-validated");
			form.trigger("reset");
		},
		error: function(response) {
			/*alert("error...");
	             		alert(response.responseText); // show response from the php script.
	*/ form_response.html(
				"" + response.responseText
			);
			form.removeClass("was-validated");
			form_response.css({ color: "red" });
		}
	});
}

//Sara
//Login modal whrn the Admin logs in
function LoginModal(user_name, pass_word) {
	var request = {};
	request.username = user_name;
	request.password = pass_word;

	$.ajax({
		type: "POST",
		url: "serviceController/LoginModal",
		dataType: "text",
		data: JSON.stringify(request),
		contentType: "text/xml; charset=utf-8",
		async: false,
		success: LoginModalSuccess,
		error: LoginModalError
	});
}

function LoginModalSuccess(response) {
	getEnquiry();
}
function LoginModalError(response) {
	var resp = JSON.parse(response.responseText);
	$("#loginError")
		.html(resp.Msg)
		.css("color", "red");
}

//displaying contact form data in a grid

function getEnquiry() {
	var request = {};
	$.ajax({
		type: "POST",
		url: "serviceController/getEnquiry",
		data: JSON.stringify(request),
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: getEnquirySuccess,
		error: getEnquiryError
	});
}

function getEnquirySuccess(response) {
	console.log(JSON.stringify(response));
	$("#login_modal").modal("hide");

	$("#myModal").modal("show");

	var casehist = response.RespMsg;
	var htmldom = "";

	htmldom +=
		'<thead><tr><th>Ticket Id</th><th>Firstname</th><th>Lastname</th><th>Emailid</th><th style="width: 2%">Subject</th><th>Message</th><th>Status</th><th>Posted At</th></tr></thead>';

	for (var i = 0; i < casehist.length; i++) {
		var array_element = casehist[i];

		htmldom +=
			"<tr><td>" +
			array_element.ticketid +
			"</td>" +
			"<td>" +
			array_element.fname +
			"</td>" +
			"<td>" +
			array_element.lname +
			"</td>" +
			"<td>" +
			array_element.emailid +
			"</td>" +
			"<td>" +
			array_element.subject +
			"</td>" +
			"<td>" +
			array_element.message +
			"</td>" +
			"<td>" +
			array_element.status +
			"</td>" +
			"<td>" +
			array_element.updt_at +
			"</td>" +
			"</tr>";
	}
	document.getElementById("enquiry_tab").innerHTML = htmldom;
}

function getEnquiryError(response) {
	console.log(JSON.stringify(response));
}

//download file in excel format

function downloadFile() {
	var input = {};
	window.location.href =
		"serviceController/getExcelIds?request=" + btoa(JSON.stringify(input));
}
