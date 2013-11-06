<?php

namespace App;

use Joelvardy\Config;
use Joelvardy\Cache;

/**
 * Photos library
 *
 * @author	Joel Vardy <info@joelvardy.com>
 */
class Photos {


	protected $config;


	/**
	 * Initialise the library
	 *
	 * @return	void
	 */
	public function __construct() {

		$this->config = Config::value('photos');

	}


	/**
	 * Return directory path or false
	 *
	 * @return	string|boolean
	 */
	public function directory($type) {

		switch ($type) {

			case 'original':
				return $this->config->original_directory;
				break;

			case 'processed':
				return PUBLIC_PATH.$this->config->processed_directory;
				break;

			default:
				return false;

		}

	}


	/**
	 * Return photo sizes
	 *
	 * @return	array
	 */
	public function sizes() {

		return $this->config->sizes;

	}


	/**
	 * Read data
	 *
	 * @return	array
	 */
	public function data() {

		$photos = (array) json_decode(file_get_contents($this->directory('original').'/_data.json'));

		foreach ($photos as $photo) {

			$filepath = $this->directory('original').'/'.$photo->filename;

			// Ensure the original file exists
			if ( ! file_exists($filepath)) continue;

			// Add MD5 hash to each photo
			$photo->hash = md5_file($filepath);

			// Define the largest dimension
			list($width, $height, $type, $attr) = getimagesize($filepath);
			$photo->largest_dimension = ($height > $width ? 'height' : 'width');
			$photo->aspect_ratio = $width / $height;

		}

		return $photos;

	}


	/**
	 * Read photos
	 *
	 * @return	array
	 */
	public function read() {

		// Read from cache
		$photos = Cache::fetch('photos');
		if ( ! empty($photos)) return $photos;

		$photos = array();

		// Read data from file
		$data = $this->data();

		foreach ($data as $photo) {

			// If the hash hasn't been set the file can't be found
			if ( ! isset($photo->hash)) continue;

			// Generate the filepath to the processed folder
			$photo_folder = $this->directory('processed').'/'.$photo->hash;

			// Check whether each size exists
			$status = true;
			foreach ($this->sizes() as $size => $size_info) {
				if (file_exists($photo_folder.'/'.$size.'.jpg')) {
					$photo->sizes[$size] = $this->config->processed_directory.'/'.$photo->hash.'/'.$size.'.jpg';
				} else {
					$status = false;
				}
			}

			// Clean up data
			if ($status) {
				unset($photo->filename);
				unset($photo->largest_dimension);
				$photos[] = $photo;
			}

		}

		$photos = array_reverse($photos);

		// Save in cache for 60 minutes
		Cache::store('photos', $photos, (60 * 60));

		return $photos;

	}


}