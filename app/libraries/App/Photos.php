<?php

namespace App;

use Joelvardy\Config;

/**
 * Photos library
 *
 * @author	Joel Vardy <info@joelvardy.com>
 */
class Photos {


	protected $original_directory;
	protected $processed_directory;


	/**
	 * Initialise the library
	 *
	 * @return	void
	 */
	public function __construct() {

		$config = Config::value('photos');

		$this->original_directory = $config->original_directory;
		$this->processed_directory = $config->processed_directory;

	}


	/**
	 * Read data
	 *
	 * @return	array
	 */
	public function data() {

		return json_decode(file_get_contents($this->original_directory.'/_data.json'));

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
			if ( ! file_exists($this->original_directory.'/'.$photo->filename)) continue;

			// Ensure the processed files exist
			if ( ! file_exists($this->processed_directory.'/'.$photo->filename)) continue;

		}

	}


}