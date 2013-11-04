<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<title>Photos Taken By Joel Vardy</title>
		<meta name="description" content="I've taken thousands of photographs, this is a collection of my favourite ones.'" />
		<link rel="stylesheet" href="/assets/css/reset.css" />
		<link rel="stylesheet" href="/assets/css/design.css" />
		<link rel="author" href="https://plus.google.com/102110732747129499789" />
	</head>
	<body>

		<div class="grid">

			<?php

				foreach ($photos as $photo) {

					// Is this image wide or tall
					if ($photo->aspect_ratio > 2) {
						$orientation = 'wide';
					} else if ($photo->aspect_ratio < 1) {
						$orientation = 'tall';
					} else {
						$orientation = 'square';
					}

					echo '<div class="photo '.$orientation.'" data-aspect-ratio="'.$photo->aspect_ratio.'" data-large="'.$photo->sizes['large'].'" style="background-image:url('.$photo->sizes['small'].');"></div>';

				}

			?>

		</div>

		<script>
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
			ga('create', 'UA-45404963-1', 'joelvardy.com');
			ga('send', 'pageview');
		</script>

		<script src="/assets/js/lightbox.js"></script>
		<script src="/assets/js/main.js"></script>

	</body>
</html>