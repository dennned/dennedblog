<?php
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
 * @package denned_news
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 *
 */
class Tx_DennedNews_Controller_NewsController extends Tx_News_Controller_NewsController{
	
	
	/**
	 * categoryRepository
	 *
	 * @var Tx_News_Domain_Repository_CategoryRepository
	 * @inject
	 */
	protected $categoryRepository;
	
	/**
	 * Method to display a list of last news
	 *
	 * @param array $overwriteDemand
	 * @return void
	 */
	
	public function listLastAction(){
	
		$demand = $this->createDemandObjectFromSettings($this->settings);
		
		if ($this->settings['disableOverrideDemand'] != 1 && $overwriteDemand !== NULL) {
			$demand = $this->overwriteDemandObject($demand, $overwriteDemand);
		}
		$newsRecords = $this->newsRepository->findDemanded($demand);
		
		//\TYPO3\CMS\Core\Utility\DebugUtility::debug($this->settings['list']['news'],'$$$$$$this->settings');
		//\TYPO3\CMS\Core\Utility\DebugUtility::debug($contentObject->data['header'],'TITLE');
		
		$contentObject = $this->configurationManager->getContentObject();
		
		$pageHome = $this->settings['list']['news']['uidPageNewsHome'];
		
		$this->view->assignMultiple(array(
				'news' => $newsRecords,
				'overwriteDemand' => $overwriteDemand,
				'demand' => $demand,
				'uidPageHome' => $pageHome,
				'blockTitle' => htmlspecialchars($contentObject->data['header']),
		));
	
	}


	/**
	 * Method to display a list view of news media
	 *
	 * @param array $overwriteDemand
	 * @return void
	 */

	public function listMediaAction(array $overwriteDemand = NULL){

		$arrayCategories = array();
		$choiseUser = array();
		$uidCategoryParent = intval($this->settings['list']['media']['categorieParent']);
		$listCategories = $this->categoryRepository->findChildren($uidCategoryParent);

		$parameterGet = \TYPO3\CMS\Core\Utility\GeneralUtility::_GET();

		if ( isset($parameterGet['tx_news_pi1']['overwriteDemand']['categories'][$uidCategoryParent]) ){

			$uidCategory = intval($parameterGet['tx_news_pi1']['overwriteDemand']['categories'][$uidCategoryParent]);

		}

		if ( $listCategories->count() > 0 ){

			foreach( $listCategories as $category){

				$conf['parameter'] = $GLOBALS['TSFE']->id;

				if ( $GLOBALS['TSFE']->id == $this->settings['list']['media']['uidPageYourComing'] )
				{
					$conf['additionalParams'] = '&tx_news_pi1[overwriteDemand][categories]['.$uidCategoryParent.']='.$category->getUid() . '&tx_news_pi1[overwriteDemand][categories]['. $this->settings['list']['media']['categoryParentTheme'] .']=' . $this->settings['list']['media']['categoryChildYourComing'].'&tx_news_pi1[overwriteDemand][categoryConjunction]=and';

				} elseif ( $GLOBALS['TSFE']->id == $this->settings['list']['media']['uidPageFollowTheTournament'] ) {
					$conf['additionalParams'] = '&tx_news_pi1[overwriteDemand][categories]['.$uidCategoryParent.']='.$category->getUid() . '&tx_news_pi1[overwriteDemand][categories]['. $this->settings['list']['media']['categoryParentTheme'] .']=' . $this->settings['list']['media']['categoryChildFollowTournament'].'&tx_news_pi1[overwriteDemand][categoryConjunction]=and';

				} elseif ( $GLOBALS['TSFE']->id == $this->settings['list']['media']['uidPageInformationAndGraphics'] ) {
					$conf['additionalParams'] = '&tx_news_pi1[overwriteDemand][categories]['.$uidCategoryParent.']='.$category->getUid() . '&tx_news_pi1[overwriteDemand][categories]['. $this->settings['list']['media']['categoryParentTheme'] .']=' . $this->settings['list']['media']['categoryChildInformationAndGraphics'].'&tx_news_pi1[overwriteDemand][categoryConjunction]=and';

				} elseif( $GLOBALS['TSFE']->id == $this->settings['list']['media']['uidPagePhotos'] ){
					$conf['additionalParams'] = '&tx_news_pi1[overwriteDemand][categories]['.$uidCategoryParent.']='.$category->getUid() . '&tx_news_pi1[overwriteDemand][categories]['. $this->settings['list']['media']['categoryParentTheme'] .']=' . $this->settings['list']['media']['categoryChildPhotos'].'&tx_news_pi1[overwriteDemand][categoryConjunction]=and';
				}

				$conf['useCacheHash'] = true;
				$uid = $GLOBALS['TSFE']->cObj->typoLink_URL($conf);

				if ( $uidCategory === $category->getUid() ){
					$selectDefault = $uid ;
				}
				$arrayCategories =  $arrayCategories + array($uid => $category->getTitle()) ;

			}
		}

		$confParentePage['parameter'] = $GLOBALS['TSFE']->id;
		$confParentePage['useCacheHash'] = true;
		$uidPageParente = $GLOBALS['TSFE']->cObj->typoLink_URL($confParentePage);

		$labelSelectDefault = \TYPO3\CMS\Extbase\Utility\LocalizationUtility::translate('tx_dennednews_domain_model_news.tx_news_list_media_select_default', 'DennedNews');
		$selectCategory = array($uidPageParente => $labelSelectDefault) + $arrayCategories;

		$demand = $this->createDemandObjectFromSettings($this->settings);

		if ($this->settings['disableOverrideDemand'] != 1 && $overwriteDemand !== NULL) {
			$demand = $this->overwriteDemandObject($demand, $overwriteDemand);
		}
		$newsRecords = $this->newsRepository->findDemanded($demand);

		$this->view->assignMultiple(array(
				'news' => $newsRecords,
				'overwriteDemand' => $overwriteDemand,
				'demand' => $demand,
				'category' => $selectCategory,
				'titlePage' => $GLOBALS['TSFE']->page['title'],
				'selectedDefault' => $selectDefault,
		));
	}


	/**
	 * Output a list view of news
	 *
	 * @param $overwriteDemand test
	 * @return void
	 */
	public function listAction(array $overwriteDemand = NULL){

		
		$arrayFilter = array();
		$choiseUser = array();
		$selectFilter = array();
		$compterYear = 0;
		$compterMonth = 0;
		$sortBy = $this->settings['orderBy'] . ' ' . $this->settings['orderDirection'];
		$sortByMonth = 'desc';
		$sortByYear = 'desc';


		$parameterGet = \TYPO3\CMS\Core\Utility\GeneralUtility::_GET();
		$monthChoice = intval( $parameterGet['tx_news_pi1']['overwriteDemand']['month'] );
		$yearChoice = intval( $parameterGet['tx_news_pi1']['overwriteDemand']['year'] );

		$demand = $this->createDemandObjectFromSettings($this->settings);

		if( $this->settings['templateLayout'] == 1 ){ // IF THE TEMPLATE WEB IS SELECTED IN THE PLUGIN CONFIGURATION

			$demand->setOrder($sortBy);

			$arrayNewsArchive = $this->newsRepository->countByDateSurcharge($demand, $sortBy, $sortByMonth, $sortByYear);

			//add label in the head of select
			$arrayNewsArchive['single']['3000'] = array('99'=>'99');
			krsort($arrayNewsArchive['single']);

			foreach ( $arrayNewsArchive['single'] as $year => $value) {

				if ( $compterYear == 0 ) {
					$yearFirst = $year;
				}

				$compterYear ++;

				foreach ( $arrayNewsArchive['single'][$year] as $month => $value ) {

					if ( $compterMonth == 0 ) {
						$label = \TYPO3\CMS\Extbase\Utility\LocalizationUtility::translate('tx_dennednews_domain_model_news.tx_news_filter_month_all', 'DennedNews');
						//$uid = TYPO3\CMS\Core\Utility\GeneralUtility::getIndpEnv(TYPO3_SITE_SCRIPT);
						$conf['parameter'] = $GLOBALS['TSFE']->id;
						$conf['additionalParams'] = '&tx_news_pi1[allnews]=1';
						$conf['useCacheHash'] = true;
						$uid = $GLOBALS['TSFE']->cObj->typoLink_URL($conf);
						$arrayFilter =  $arrayFilter + array($uid => $label) ;
					}else{
						$conf['parameter'] = $GLOBALS['TSFE']->id;
						$conf['additionalParams'] = '&tx_news_pi1[overwriteDemand][year]=' . $year . '&tx_news_pi1[overwriteDemand][month]=' . $month ;
						$conf['useCacheHash'] = true;
						$uid = $GLOBALS['TSFE']->cObj->typoLink_URL($conf);

						$label = \TYPO3\CMS\Extbase\Utility\LocalizationUtility::translate('tx_dennednews_domain_model_news.tx_news_filter_month_' . $month, 'DennedNews') . ' ' . $year;

						if ( ($monthChoice == $month ) && ( $yearChoice == $year ) ) {
							$selectDefault = $uid ;
						}
						$arrayFilter =  $arrayFilter + array($uid => $label) ;
					}

					$compterMonth ++;
				}
			}

			$selectFilter =  $arrayFilter;

			if ($this->settings['disableOverrideDemand'] != 1 && $overwriteDemand !== NULL) {
				$demand = $this->overwriteDemandObject($demand, $overwriteDemand);

			}
		}

 		$newsRecords = $this->newsRepository->findDemanded($demand);

		$this->view->assignMultiple(array(
				'news' => $newsRecords,
				'overwriteDemand' => $overwriteDemand,
				'demand' => $demand,
				'titlePage' => $GLOBALS['TSFE']->page['title'],
				'filter' => $selectFilter,
				'selectedDefault' => $selectDefault,
		));

	}


	public function listNewsFilterAction(array $overwriteDemand = NULL){

		$arrayFilter = array();
		$choiseUser = array();
		$selectFilter = array();
		$compterYear = 0;
		$compterMonth = 0;
		$sortBy = $this->settings['orderBy'] . ' ' . $this->settings['orderDirection'];
		$sortByMonth = 'desc';
		$sortByYear = 'desc';


		$parameterGet = \TYPO3\CMS\Core\Utility\GeneralUtility::_GET();
		$monthChoice = intval( $parameterGet['tx_news_pi1']['overwriteDemand']['month'] );
		$yearChoice = intval( $parameterGet['tx_news_pi1']['overwriteDemand']['year'] );

		$demand = $this->createDemandObjectFromSettings($this->settings);

		if( $this->settings['templateLayout'] == 1 ){ // IF THE TEMPLATE WEB IS SELECTED IN THE PLUGIN CONFIGURATION

			$demand->setOrder($sortBy);

			$arrayNewsArchive = $this->newsRepository->countByDateSurcharge($demand, $sortBy, $sortByMonth, $sortByYear);

			//add label in the head of select
			$arrayNewsArchive['single']['3000'] = array('99'=>'99');
			krsort($arrayNewsArchive['single']);

			foreach ( $arrayNewsArchive['single'] as $year => $value) {

				if ( $compterYear == 0 ) {
					$yearFirst = $year;
				}

				$compterYear ++;

				foreach ( $arrayNewsArchive['single'][$year] as $month => $value ) {

					if ( $compterMonth == 0 ) {
						$label = \TYPO3\CMS\Extbase\Utility\LocalizationUtility::translate('tx_dennednews_domain_model_news.tx_news_filter_month_all', 'DennedNews');
						//$uid = TYPO3\CMS\Core\Utility\GeneralUtility::getIndpEnv(TYPO3_SITE_SCRIPT);
						$conf['parameter'] = $GLOBALS['TSFE']->id;
						$conf['additionalParams'] = '&tx_news_pi1[allnews]=1';
						$conf['useCacheHash'] = true;
						$uid = $GLOBALS['TSFE']->cObj->typoLink_URL($conf);
						$arrayFilter =  $arrayFilter + array($uid => $label) ;
					}else{
						$conf['parameter'] = $GLOBALS['TSFE']->id;
						$conf['additionalParams'] = '&tx_news_pi1[overwriteDemand][year]=' . $year . '&tx_news_pi1[overwriteDemand][month]=' . $month ;
						$conf['useCacheHash'] = true;
						$uid = $GLOBALS['TSFE']->cObj->typoLink_URL($conf);

						$label = \TYPO3\CMS\Extbase\Utility\LocalizationUtility::translate('tx_dennednews_domain_model_news.tx_news_filter_month_' . $month, 'DennedNews') . ' ' . $year;

						if ( ($monthChoice == $month ) && ( $yearChoice == $year ) ) {
							$selectDefault = $uid ;
						}
						$arrayFilter =  $arrayFilter + array($uid => $label) ;
					}

					$compterMonth ++;
				}
			}

			$selectFilter =  $arrayFilter;

			if ($this->settings['disableOverrideDemand'] != 1 && $overwriteDemand !== NULL) {
				$demand = $this->overwriteDemandObject($demand, $overwriteDemand);

			}
		}

 		$newsRecords = $this->newsRepository->findDemanded($demand);

		$this->view->assignMultiple(array(
				'news' => $newsRecords,
				'overwriteDemand' => $overwriteDemand,
				'demand' => $demand,
				'titlePage' => $GLOBALS['TSFE']->page['title'],
				'filter' => $selectFilter,
				'selectedDefault' => $selectDefault,
		));
	}

	public function listNewsNonFilterAction(array $overwriteDemand = NULL){

		$arrayFilter = array();
		$choiseUser = array();
		$selectFilter = array();
		$compterYear = 0;
		$compterMonth = 0;
		$sortBy = $this->settings['orderBy'] . ' ' . $this->settings['orderDirection'];
		$sortByMonth = 'desc';
		$sortByYear = 'desc';


		$parameterGet = \TYPO3\CMS\Core\Utility\GeneralUtility::_GET();
		$monthChoice = intval( $parameterGet['tx_news_pi1']['overwriteDemand']['month'] );
		$yearChoice = intval( $parameterGet['tx_news_pi1']['overwriteDemand']['year'] );

		$demand = $this->createDemandObjectFromSettings($this->settings);

		if( $this->settings['templateLayout'] == 1 ){ // IF THE TEMPLATE WEB IS SELECTED IN THE PLUGIN CONFIGURATION

			$demand->setOrder($sortBy);

			$arrayNewsArchive = $this->newsRepository->countByDateSurcharge($demand, $sortBy, $sortByMonth, $sortByYear);

			//add label in the head of select
			$arrayNewsArchive['single']['3000'] = array('99'=>'99');
			krsort($arrayNewsArchive['single']);

			foreach ( $arrayNewsArchive['single'] as $year => $value) {

				if ( $compterYear == 0 ) {
					$yearFirst = $year;
				}

				$compterYear ++;

				foreach ( $arrayNewsArchive['single'][$year] as $month => $value ) {

					if ( $compterMonth == 0 ) {
						$label = \TYPO3\CMS\Extbase\Utility\LocalizationUtility::translate('tx_dennednews_domain_model_news.tx_news_filter_month_all', 'DennedNews');
						//$uid = TYPO3\CMS\Core\Utility\GeneralUtility::getIndpEnv(TYPO3_SITE_SCRIPT);
						$conf['parameter'] = $GLOBALS['TSFE']->id;
						$conf['additionalParams'] = '&tx_news_pi1[allnews]=1';
						$conf['useCacheHash'] = true;
						$uid = $GLOBALS['TSFE']->cObj->typoLink_URL($conf);
						$arrayFilter =  $arrayFilter + array($uid => $label) ;
					}else{
						$conf['parameter'] = $GLOBALS['TSFE']->id;
						$conf['additionalParams'] = '&tx_news_pi1[overwriteDemand][year]=' . $year . '&tx_news_pi1[overwriteDemand][month]=' . $month ;
						$conf['useCacheHash'] = true;
						$uid = $GLOBALS['TSFE']->cObj->typoLink_URL($conf);

						$label = \TYPO3\CMS\Extbase\Utility\LocalizationUtility::translate('tx_dennednews_domain_model_news.tx_news_filter_month_' . $month, 'DennedNews') . ' ' . $year;

						if ( ($monthChoice == $month ) && ( $yearChoice == $year ) ) {
							$selectDefault = $uid ;
						}
						$arrayFilter =  $arrayFilter + array($uid => $label) ;
					}

					$compterMonth ++;
				}
			}

			$selectFilter =  $arrayFilter;

			if ($this->settings['disableOverrideDemand'] != 1 && $overwriteDemand !== NULL) {
				$demand = $this->overwriteDemandObject($demand, $overwriteDemand);

			}
		}

		$newsRecords = $this->newsRepository->findDemanded($demand);

		$this->view->assignMultiple(array(
				'news' => $newsRecords,
				'overwriteDemand' => $overwriteDemand,
				'demand' => $demand,
				'titlePage' => $GLOBALS['TSFE']->page['title'],
				'filter' => $selectFilter,
				'selectedDefault' => $selectDefault,
		));
	}

	/**
	 * Method to display a list of last news into the home page
	 *
	 * @return void
	 */

	public function listLastNewsHomePageAction(){

		$news = $this->newsRepository->findLastHomePageNews(5);

		$this->view->assign('news', $news);
	}

	/**
	 * Show a la une
	 *
	 * @param array $overwriteDemand
	 */

	public function alaUneAction(array $overwriteDemand = NULL){
		
		$pid = $this->settings['list']['media']['pidMedia'];
		
		var_dump($pid);
		die('TEST');

		$categoryAlaUne = $this->settings['list']['media']['catAlaUne'];
		$limitAlaUne = $this->settings['list']['media']['limitAlaUne'];
		$newsUne = $this->newsRepository->findNewsAlaUne($limitAlaUne,$categoryAlaUne,$pid);

		$categoryList = $this->settings['list']['media']['catAlaUneList'];
		//$limitList = $this->settings['list']['media']['limitAlaUneList'];

		$limitStart = $this->settings['list']['media']['limitAlaUneListStart'];
		$limitEnd = $this->settings['list']['media']['limitAlaUneListEnd'];

		$newsRecords = $this->newsRepository->findListAlaUne($limitStart,$limitEnd,$categoryList,$categoryAlaUne,$pid);

		//\TYPO3\CMS\Core\Utility\DebugUtility::debug($categoryAlaUne,'$$$categoryAlaUne');

		$this->view->assignMultiple(array(
				'newsAlaUne' => $newsUne,
				'news' => $newsRecords,
				'titlePage' => $GLOBALS['TSFE']->page['title'],
				'urlBase' => \TYPO3\CMS\Core\Utility\GeneralUtility::getIndpEnv(TYPO3_SITE_URL),
		));
	}

}