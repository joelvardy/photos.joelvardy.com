<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<title>Photo Wall</title>
		<link rel="stylesheet" href="/assets/css/reset.css" />
		<link rel="stylesheet" href="/assets/css/design.css" />
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

					echo '<div class="photo '.$orientation.'" data-aspect-ratio="'.$photo->aspect_ratio.'" style="background-image:url('.$photo->sizes['small'].');"></div>';

				}

			?>

		</div>

		<div class="overlay"></div>
		<div class="overlay-photo"></div>

		<script src="/assets/js/main.js"></script>

	</body>
</html>