<?php
$MCONF['name'] = 'tools_txt3adminerM1';
$MCONF['script'] = '_DISPATCH';
	
$MCONF['access'] = 'admin';

$MCONF['ADM_subdir'] = 'res/';
$MCONF['ADM_script'] = 't3adminer.php';

if (\TYPO3\CMS\Core\Utility\GeneralUtility::compat_version('7.0')) {
	$MLANG['default']['tabs_images']['tab'] = '../Resources/Public/Icons/module-adminer.png';
} else {
	$MLANG['default']['tabs_images']['tab'] = 'moduleicon.gif';
}
$MLANG['default']['ll_ref'] = 'LLL:EXT:t3adminer/mod1/locallang_mod.xml';