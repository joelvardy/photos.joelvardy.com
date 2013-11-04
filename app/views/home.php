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

		<script src="/assets/js/lightbox.js"></script>
		<script src="/assets/js/main.js"></script>

	</body>
</html>