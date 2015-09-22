<?php
/**
 * Class, containing function for adding an element to the content element wizard.
 *
 * @author    Kasper Skaarhoj <kasper@typo3.com>
 * @package TYPO3
 * @subpackage tx_ttguest
 */
class tx_dennedcontent{

	/**
	 * Processing the wizard-item array from db_new_content_el.php
	 *
	 * @param    array        Wizard item array
	 * @return    array        Wizard item array, processed (adding a plugin for tt_guest extension)
	 */
	function proc($wizardItems) {

		// Adding the item:
		$wizardItems['plugins_dennedcontent_pi1'] = array(
			'icon' => \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extRelPath('denned_content') . 'ext_icon.gif',
			'title' => 'LLL:EXT:denned_content/Resources/Private/Language/locallang_db.xlf:tt_content.tx_extbase_type.Tx_DennedContent_Bloc_pi1_name',
			'description' => 'LLL:EXT:denned_content/Resources/Private/Language/locallang_db.xlf:tt_content.tx_extbase_type.Tx_DennedContent_Bloc_pi1_description',
			'params' => '&defVals[tt_content][CType]=list&defVals[tt_content][list_type]=dennedcontent_pi1&defVals[tt_content][select_key]=' . rawurlencode('GUESTBOOK, POSTFORM')
		);

		$wizardItems['plugins_dennedcontent_pi2'] = array(
				'icon' => \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extRelPath('denned_content') . 'ext_icon.gif',
				'title' => 'LLL:EXT:denned_content/Resources/Private/Language/locallang_db.xlf:tt_content.tx_extbase_type.Tx_DennedContent_Bloc_pi2_name',
				'description' => 'LLL:EXT:denned_content/Resources/Private/Language/locallang_db.xlf:tt_content.tx_extbase_type.Tx_DennedContent_Bloc_pi2_description',
				'params' => '&defVals[tt_content][CType]=list&defVals[tt_content][list_type]=dennedcontent_pi2&defVals[tt_content][select_key]=' . rawurlencode('GUESTBOOK, POSTFORM')
		);

		return $wizardItems;
	}
}
?>