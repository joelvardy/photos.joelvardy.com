<?php

namespace App;

use Joelvardy\Config;

/**
 * Photos library
 *
 * @author	Joel Vardy <info@joelvardy.com>
 */
class Photos {


	protected $directories;


	/**
	 * Initialise the library
	 *
	 * @return	void
	 */
	public function __construct() {

		$config = Config::value('photos');

		$this->directories = (object) array(
			'original' => $config->original_directory,
			'processed' => $config->processed_directory
		);

	}


	/**
	 * Return directory path
	 *
	 * @return	array
	 */
	public function directory($type) {

		return $this->directories->$type;

	}


	/**
	 * Read data
	 *
	 * @return	array
	 */
	public function data() {

		$photos = json_decode(file_get_contents($this->directory('original').'/_data.json'));

		foreach ($photos as $photo) {

			$filepath = $this->directory('original').'/'.$photo->filename;

			// Ensure the original file exists
			if ( ! file_exists($filepath)) continue;

			// Add MD5 hash to each photo
			$photo->hash = md5_file($filepath);

		}

		return $photos;

	}


	/**
	 * Read photos
	 *
	 * @return	array
	 */
	public function read() {

		// Read data from file
		$data = $this->data();

		foreach ($data as $photo) {

			// Ensure the original file exists
			if ( ! file_exists($this->directory('original').'/'.$photo->filename)) continue;

			// Ensure the processed files exist
			if ( ! file_exists($this->directory('processed').'/'.$photo->filename)) continue;

		}

	}


}