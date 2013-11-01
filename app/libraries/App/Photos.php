<?php

namespace App;

use Joelvardy\Config;

/**
 * Photos library
 *
 * @author	Joel Vardy <info@joelvardy.com>
 */
class Photos {


	/**
	 * Read data
	 *
	 * @return	array
	 */
	public function data() {

		return json_decode(file_get_contents(Config::value('photos')->directory.'/data.json'));

	}


}