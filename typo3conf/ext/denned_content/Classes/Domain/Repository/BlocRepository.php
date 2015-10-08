<?php
namespace TYPO3\DennedContent\Domain\Repository;

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

use TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 *
 *
 * @package denned_player
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 *
 */
class BlocRepository extends \TYPO3\CMS\Extbase\Persistence\Repository {

	/**
	 * The findAllCountries method
	 * @return object $results list of countries
	 */
	public function findByUidNews($listUids, $respectEnableFields = TRUE){
		
		// uids news
		$uidList = GeneralUtility::intExplode(',', $listUids, TRUE);
		//\TYPO3\CMS\Core\Utility\DebugUtility::debug($uidList, 'SQL');
		
		$query = $this->createQuery();
		$query->getQuerySettings()->setRespectStoragePage(FALSE);
		$query->getQuerySettings()->setRespectSysLanguage(FALSE);
		$query->getQuerySettings()->setIgnoreEnableFields(!$respectEnableFields);
		
		$constraints = array();
		foreach ($uidList as $uid) {
			$constraints[] = $query->equals('uid', $uid);
		}
		
		return $query->matching(
				$query->logicalAnd(
						$query->logicalOr($constraints),
						$query->equals('deleted', 0),
						$query->equals('hidden', 0)
				))->execute();
	}
}
?>