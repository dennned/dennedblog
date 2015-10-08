<?php
if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile($_EXTKEY, 'Configuration/TypoScript', '[Denned] News');

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addLLrefForTCAdescr('tx_dennednews_domain_model_news', 'EXT:denned_news/Resources/Private/Language/locallang_csh_tx_dennednews_domain_model_news.xlf');
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::allowTableOnStandardPages('tx_dennednews_domain_model_news');


/* Hide and add additional actions - START */

$GLOBALS['TYPO3_CONF_VARS']['EXT']['news']['switchableControllerActions']['newItems']['News->listLast'] = 'LLL:EXT:denned_news/Resources/Private/Language/locallang_db:tx_dennednews_domain_model_news_action_list_last_news';
$GLOBALS['TYPO3_CONF_VARS']['EXT']['news']['switchableControllerActions']['newItems']['News->listMedia'] = 'LLL:EXT:denned_news/Resources/Private/Language/locallang_db:tx_dennednews_domain_model_news_action_list_media_news';

$GLOBALS['TYPO3_CONF_VARS']['EXT']['news']['switchableControllerActions']['newItems']['News->listNewsFilter'] = 'LLL:EXT:denned_news/Resources/Private/Language/locallang_db:tx_dennednews_domain_model_news_action_list_news_filter';
$GLOBALS['TYPO3_CONF_VARS']['EXT']['news']['switchableControllerActions']['newItems']['News->listNewsNonFilter'] = 'LLL:EXT:denned_news/Resources/Private/Language/locallang_db:tx_dennednews_domain_model_news_action_list_news_non_filter';

$GLOBALS['TYPO3_CONF_VARS']['EXT']['news']['switchableControllerActions']['newItems']['News->alaUne'] = 'LLL:EXT:denned_news/Resources/Private/Language/locallang_db:tx_dennednews_domain_model_news_action_list_news_alaune';

$GLOBALS['TYPO3_CONF_VARS']['EXT']['news']['templateLayouts']['web'] = array('LLL:EXT:denned_news/Resources/Private/Language/locallang_db:tx_dennednews_domain_model_news_template_layout_news', 1);
$GLOBALS['TYPO3_CONF_VARS']['EXT']['news']['templateLayouts']['mobile'] = array('LLL:EXT:denned_news/Resources/Private/Language/locallang_db:tx_dennednews_domain_model_news_template_layout_mobile', 2);

$GLOBALS['TYPO3_CONF_VARS']['EXT']['news']['orderByNews'] =  'starttime,tstamp,datetime,crdate,title';
/* Hide and add additional actions - END */

$TCA['tx_news_domain_model_news']['interface']['showRecordFieldList'] = 'cruser_id,pid,sys_language_uid,l10n_parent,l10n_diffsource,hidden,starttime,endtime,title,bodytext,datetime,categories,related,media,internalurl,externalurl,istopnews,related_files,related_links,content_elements,tags,path_segment,alternative_title';
$TCA['tx_news_domain_model_news']['types']['0']['showitem'] = 'l10n_parent, l10n_diffsource,title,teaser,datetime,bodytext;;;richtext::rte_transform[flag=rte_disabled|mode=ts_css],rte_disabled;LLL:EXT:cms/locallang_ttc.xml:rte_enabled_formlabel,content_elements,path_segment,--div--;LLL:EXT:cms/locallang_ttc.xml:tabs.access,--palette--;LLL:EXT:cms/locallang_ttc.xml:palette.access;paletteAccess,--div--;LLL:EXT:cms/locallang_tca.xml:pages.tabs.options,categories,--div--;LLL:EXT:news/Resources/Private/Language/locallang_db.xml:tx_news_domain_model_news.tabs.relations,media,related_files,--div--;LLL:EXT:cms/locallang_tca.xml:pages.tabs.extended,';
$TCA['tx_news_domain_model_news']['columns']['categories']['config']['minitems'] = 1;

$TCA['tx_news_domain_model_media']['interface']['showRecordFieldList'] = 'sys_language_uid,l10n_parent,l10n_diffsource,hidden,title,media,type,html,video,showInPreview,';
$TCA['tx_news_domain_model_media']['types']['0']['showitem'] = 'type;;palettteCore,image,caption;;paletteTitle,';
$TCA['tx_news_domain_model_media']['types']['1']['showitem'] = 'type;;palettteCore,multimedia,';
$TCA['tx_news_domain_model_media']['columns']['showinpreview']['config']['default'] = 1;
$TCA['tx_news_domain_model_file']['interface']['showRecordFieldList'] = 'sys_language_uid,l10n_parent,l10n_diffsource,hidden,file';
$TCA['tx_news_domain_model_file']['types']['0']['showitem'] = 'file;;palettteCore,';

?>