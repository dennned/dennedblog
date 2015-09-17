<?php
if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}

\TYPO3\CMS\Extbase\Utility\ExtensionUtility::configurePlugin(
	'TYPO3.' . $_EXTKEY,
	'ListNewsHomePage',
	array(
		'News' => 'listLastNewsHomePage',
		'News' => 'listNewsFilter',
		'News' => 'listNewsNonFilter',
		'News' => 'alaUne',
	),
	// non-cacheable actions
	array(
		'News' => 'listLastNewsHomePage',
		'News' => 'listNewsFilter',
		'News' => 'listNewsNonFilter',
		//'News' => 'alaUne',
	)
);


?>