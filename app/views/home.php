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

				$column = 1;
				$tall = false;

				foreach ($photos as $photo) {

					// Is this image wide or tall
					if ($photo->aspect_ratio > 2 && ($column == 1 || $column == 2)) {
						$orientation = 'wide';
						$column += 2;
					} else if ($photo->aspect_ratio < 1 && $column == 1) {
						$orientation = 'tall';
						$column++;
						$tall = true;
					} else {
						$orientation = 'square';
						$column++;
					}

					echo '<div class="photo '.$orientation.'" style="background-image:url('.$photo->sizes['small'].');"></div>';

					if ($column > 3) {
						$column = 1;
						if ($tall) {
							$column = 2;
							$tall = false;
						}
					}

				}

			?>

		</div>
	</body>
</html>