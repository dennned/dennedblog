<?php
namespace TYPO3\DennedContent\Domain\Model;

/***************************************************************
 *  Copyright notice
 *
 *  (c) 2013
 *  All rights reserved
 *
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/

/**
 *
 *
 * @package denned_content
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 *
 */
class Bloc extends \TYPO3\CMS\Extbase\DomainObject\AbstractEntity {


	/**
	 * title
	 *
	 * @var \string
	 */
	protected $title;
	
	
	/**
	 * @var string
	 */
	protected $teaser;
	
	/**
	 * @var string
	 */
	protected $description;
	
	/**
	 * @var string
	 */
	protected $bodytext;
	
	/**
	 * @var \DateTime
	 */
	protected $datetime;
	
	
	/**
	 * @var \TYPO3\CMS\Extbase\Persistence\ObjectStorage<\GeorgRinger\News\Domain\Model\Media>
	 * @lazy
	 */
	protected $media;
	
	/**
	 * Initialize categories and media relation
	 *
	 * @return \GeorgRinger\News\Domain\Model\News
	 */
	public function __construct() {
		$this->media = new \TYPO3\CMS\Extbase\Persistence\ObjectStorage();
	}
	
	/**
	 * Returns the title
	 *
	 * @return \string $title
	 */
	public function getHeader(){

		return $this->title;

	}

	/**
	 * Sets the title
	 *
	 * @param \string $title
	 * @return string
	 */
	public function getTitle() {
		return $this->title;
	}
	
	/**
	 * Get Teaser text
	 *
	 * @return string
	 */
	public function getTeaser() {
		return $this->teaser;
	}
	
	/**
	 * Set Teaser text
	 *
	 * @param string $teaser teaser text
	 * @return void
	 */
	public function setTeaser($teaser) {
		$this->teaser = $teaser;
	}
	
	/**
	 * Get bodytext
	 *
	 * @return string
	 */
	public function getBodytext() {
		return $this->bodytext;
	}
	
	/**
	 * Set bodytext
	 *
	 * @param string $bodytext main content
	 * @return void
	 */
	public function setBodytext($bodytext) {
		$this->bodytext = $bodytext;
	}
	
	/**
	 * Get datetime
	 *
	 * @return \DateTime
	 */
	public function getDatetime() {
		return $this->datetime;
	}
	
	/**
	 * Set date time
	 *
	 * @param \DateTime $datetime datetime
	 * @return void
	 */
	public function setDatetime($datetime) {
		$this->datetime = $datetime;
	}
	
	/**
	 * Get description
	 *
	 * @return string
	 */
	public function getDescription() {
		return $this->description;
	}
	
	/**
	 * Load Media elements
	 *
	 * @return \TYPO3\CMS\Extbase\Persistence\ObjectStorage
	 */
	public function getMedia() {
		return $this->media;
	}
	
	/**
	 * Set media relation
	 *
	 * @param   \TYPO3\CMS\Extbase\Persistence\ObjectStorage $media
	 * @return void
	 */
	public function setMedia(\TYPO3\CMS\Extbase\Persistence\ObjectStorage $media) {
		$this->media = $media;
	}

}
?>