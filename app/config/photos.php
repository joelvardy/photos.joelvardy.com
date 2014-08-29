<?php

return (object) array(
	'original_directory' => PHOTOS_PATH,
	'processed_directory' => '/assets/photos',
	'sizes' => array(
		'large' => (object) array(
			'max_dimension' => 2000,
			'quality' => 70
		),
		'small' => (object) array(
			'max_dimension' => 800,
			'quality' => 60
		)
	)
);
