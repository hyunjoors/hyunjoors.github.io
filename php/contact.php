<?php

	$errors = array();

	// Check if name has been entered
	if (!isset($_POST['name'])) {
		$errors['name'] = 'Please enter your name.';
	}

	// Check if email has been entered and is valid
	if (!isset($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
		$errors['email'] = 'Please enter a valid email address.';
	}

	//Check if message has been entered
	if (!isset($_POST['message'])) {
		$errors['message'] = 'Please enter your message.';
	}

	// Check if the attention check has been entered
	if (!isset($_POST['date'])) {
		$errors['message'] = 'Please enter date.';
	}
	if (strtotime($_POST['date']) == false) {
		$errors['message'] = 'Hmm, are you a human?';
	}
	$errorOutput = '';

	if(!empty($errors)){

		// $errorOutput .= '<script>
		// 	window.onload = function() {
		// 		alert(';

		// $errorOutput .= '<div class="alert alert-danger alert-dismissible" role="alert">';
 		// $errorOutput .= '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';

		// $errorOutput  .= '<ul>';

		// foreach ($errors as $key => $value) {
		// 	$errorOutput .= '\"'.$value.'\"\n';
		// }

		// $errorOutput .= '</ul>';
		// $errorOutput .= '</div>';

		$errorOutput .= '<script>
		window.onload = function() {
			alert("Something bad happend during sending this message. Please try again later");
			location.href = "../contact.html";  
		}
		</script>';

		echo $errorOutput;
		die();
	} else {
		$name = $_POST['name'];
		$email = $_POST['email'];
		$message = $_POST['message'];
		$category = $_POST['category'];
		$from = $email;
		$to = 'rosalynhjs@gmail.com';  // please change this email id
		$subject = 'New Contact Form: this is Rosalyn';

		$body = "From: $name\nE-Mail: $email\nMessage:\n $message";

		$headers = "[$category] From: ".$from;

		//Check if message needs to be copied to
		if (isset($_POST['copy'])) {
			$body = "From: $name\nE-Mail: $email\nMessage: Here is a copy of your message to thisisRosalyn!\n $message";
			mail ($email, $subject, $body, $headers);
		}

		//send the email
		$result = '';
		if (mail ($to, $subject, $body, $headers)) {
			
			$result .= '<div class="alert alert-success alert-dismissible" role="alert">';
			$result .= '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
			$result .= 'Thank You! I will be in touch';
			$result .= '</div>';

			// echo $result;
			echo '<script>
				window.onload = function() {
					alert("Thank You! I will be in touch");
					location.href = "../contact.html";  
				}
				</script>';
			die();
		}

		$result = '';
		$result .= '<div class="alert alert-danger alert-dismissible" role="alert">';
		$result .= '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
		$result .= 'Something bad happend during sending this message. Please try again later';
		$result .= '</div>';

		
		// echo $result;
		echo '<script>
				window.onload = function() {
					alert("Something bad happend during sending this message. Please try again later");
					location.href = "../contact.html";  
				}
				</script>';
		// header("Location: ../contact.html"); 
	}
?>
