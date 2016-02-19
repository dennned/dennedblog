<?php
use TYPO3\CMS\Extbase\Property\TypeConverter\IntegerConverter;

/***************************************************************
 *  Copyright notice
 *
 *  (c) 2010 Georg Ringer <typo3@ringerge.org>
 *  All rights reserved
 *
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
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
 * News repository with all the callable functionality
 *
 * @package TYPO3
 * @subpackage tx_news
 */
class Tx_DennedNews_Domain_Repository_NewsRepository extends Tx_News_Domain_Repository_NewsRepository {

	public function findLastHomePageNews($limit){
		
		$query = $this->createQuery();
		$query->setOrderings(array('crdate' => \Tx_Extbase_Persistence_QueryInterface::ORDER_DESCENDING));
		$query->setLimit($limit);
		return $query->execute();

	}

	/**
	 * Surcharge of the countByDate method to fix the problem #46106 in the forge.typo3.org
	 * @param Tx_News_Domain_Model_DemandInterface $demand
	 * @return array
	 */
	public function countByDateSurcharge(Tx_News_Domain_Model_DemandInterface $demand, $sortBy, $sortByMonth, $sortByYear ) {
		$data = array();
		$sql = $this->findDemandedRaw($demand);
		$sql = explode("ORDER BY", $sql);

		// Get the month/year into the result
		$sql = 'SELECT FROM_UNIXTIME(datetime, "%m") AS "_Month",' .
				' FROM_UNIXTIME(datetime, "%Y") AS "_Year" ,' .
				' count(FROM_UNIXTIME(datetime, "%m")) as count_month,' .
				' count(FROM_UNIXTIME(datetime, "%y")) as count_year' .
				' FROM tx_news_domain_model_news ' . substr($sql[0], strpos($sql[0], 'WHERE '));

		// strip unwanted order by
		$sql = $GLOBALS['TYPO3_DB']->stripOrderBy($sql);

		// group by custom month/year fields
		$orderDirection = strtolower($demand->getOrder());
		if ($orderDirection !== 'desc' && $orderDirection != 'asc') {
			$orderDirection = 'asc';
		}
		$sql .= ' GROUP BY _Month, _Year ORDER BY _Year ' . $sortByYear . ', _Month ' . $sortByMonth  . ', ' . $sortBy;

		$res = $GLOBALS['TYPO3_DB']->sql_query($sql);
		while ($row = $GLOBALS['TYPO3_DB']->sql_fetch_assoc($res)) {
			$data['single'][$row['_Year']][$row['_Month']] = $row['count_month'];
		}
		$GLOBALS['TYPO3_DB']->sql_free_result($res);

		// Add totals
		foreach ($data['single'] as $year => $months) {
			$countOfYear = 0;
			foreach ($months as $month) {
				$countOfYear += $month;
			}
			$data['total'][$year] = $countOfYear;
		}

		return $data;
	}

	/**
	 * GET 9 news for A la une
	 * @see Tx_News_Domain_Repository_NewsRepository::findListAlaUne()
	 */
	public function findListAlaUne($limitStart,$limitEnd,$category,$noCategory,$pid){
		//\TYPO3\CMS\Core\Utility\DebugUtility::debug($category,'$$category');

		$query = $this->createQuery();
		/*$listCat = explode(",",$category);

		$constraints[] = $query->logicalOr(
					$query->contains('categories',$listCat[0]),
					$query->contains('categories',$listCat[1]),
					$query->contains('categories',$listCat[2])
		);

		$constraints[] = $query->logicalNot(
				$query->contains('categories', $noCategory)
		);

		$query->matching($query->logicalAnd($constraints));*/

		$query->matching($query->equals('pid', intval($pid)));

		$query->getQuerySettings()->setRespectStoragePage(FALSE);
		$query->setOrderings(array('datetime' => \Tx_Extbase_Persistence_QueryInterface::ORDER_DESCENDING));
		if (intval($limitStart)){
			//$query->setLimit(intval($limit));

			$query->setOffset(intval($limitStart));
			$query->setLimit(intval($limitEnd));
		}
		//$GLOBALS['TYPO3_DB']->debugOutput = 2;
		return $query->execute();
	}

	/**
	 * GET last news for A la une
	 * @see Tx_News_Domain_Repository_NewsRepository::findNewsAlaUne()
	 */

	public function findNewsAlaUne($limit,$category,$pid){

		$query = $this->createQuery();
		//$query->matching($query->contains('categories',$category));

		$query->matching($query->equals('pid', intval($pid)));

		$query->getQuerySettings()->setRespectStoragePage(FALSE);
		$query->setOrderings(array('datetime' => \Tx_Extbase_Persistence_QueryInterface::ORDER_DESCENDING));
		if (intval($limit)){
			$query->setLimit(intval($limit));
		}
		return $query->execute();

	}
	
	/**
	 * GET news without one news
	 * @see Tx_News_Domain_Repository_NewsRepository::findNewsRight()
	 */
	
	public function findNewsRight($uidNews,$demand){
		
		$limit = $demand->getLimit();
		$pid = $demand->getStoragePage();
		$category = $demand->getCategories();
		
		$query = $this->createQuery();
		
		$query->matching(
				$query->logicalAnd(
					$query->equals('pid', intval($pid)),
					$query->equals('sys_language_uid', $GLOBALS['TSFE']->sys_language_uid),
					$query->logicalNot($query->equals('uid', intval($uidNews)))
				));
	
		$query->getQuerySettings()->setRespectStoragePage(FALSE);
		$query->setOrderings(array('datetime' => \Tx_Extbase_Persistence_QueryInterface::ORDER_DESCENDING));
		if (intval($limit)){
			$query->setLimit(intval($limit));
		}
		return $query->execute();
	
	}

}

?>