<?php

namespace App;

use Colors\Color;

/**
 * Console library
 *
 * @author	Joel Vardy <info@joelvardy.com>
 */
class Console {


	/**
	 * Output title
	 *
	 * @return	void
	 */
	public static function title($title) {

		$underline = '';
		for ($i = 1; $i <= strlen($title); $i++) {
			$underline .= '=';
		}
		print(strtoupper($title).PHP_EOL.$underline.PHP_EOL.PHP_EOL);

	}


	/**
	 * Output text
	 *
	 * @return	void
	 */
	public static function output($string) {

		$colour = new Color();

		$colour->setTheme(array(
			'success' => 'green',
			'error' => 'red'
		));

		print($colour($string)->colorize().PHP_EOL);

	}


	/**
	 * Output summary
	 *
	 * @return	void
	 */
	public static function summary($string) {

		$line = '';
		for ($i = 1; $i <= strlen($string); $i++) {
			$line .= '-';
		}

		print(PHP_EOL.$line.PHP_EOL.$string.PHP_EOL.$line.PHP_EOL.PHP_EOL);

	}


}