<?php
if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}

\TYPO3\CMS\Extbase\Utility\ExtensionUtility::configurePlugin(
	'TYPO3.' . $_EXTKEY,
	'Pi1',
	array(
		'Bloc' => 'blocHomePage',

	),
	// non-cacheable actions
	array(
		'Bloc' => '',

	)
);

\TYPO3\CMS\Extbase\Utility\ExtensionUtility::configurePlugin(
	'TYPO3.' . $_EXTKEY,
	'Pi2',
	array(
		'Bloc' => 'blocLinkImage',

	),
	// non-cacheable actions
	array(
		'Bloc' => '',

	)
);

?>
