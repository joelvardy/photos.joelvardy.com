<?php

namespace App;

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
		print(strtoupper($title)."\n".$underline."\n\n");

	}


	/**
	 * Output text
	 *
	 * @return	void
	 */
	public static function output($string) {

		print($string."\n");

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

		print("\n{$line}\n{$string}\n{$line}\n\n");

	}


}