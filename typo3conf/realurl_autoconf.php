<?php
$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl']=unserialize('a:1:{s:8:"_DEFAULT";a:3:{s:4:"init";a:6:{s:16:"enableCHashCache";b:1;s:18:"appendMissingSlash";s:18:"ifNotFile,redirect";s:18:"adminJumpToBackend";b:1;s:20:"enableUrlDecodeCache";b:1;s:20:"enableUrlEncodeCache";b:1;s:19:"emptyUrlReturnValue";s:1:"/";}s:8:"pagePath";a:5:{s:4:"type";s:4:"user";s:8:"userFunc";s:68:"EXT:realurl/class.tx_realurl_advanced.php:&tx_realurl_advanced->main";s:14:"spaceCharacter";s:1:"-";s:14:"languageGetVar";s:1:"L";s:11:"rootpage_id";s:1:"1";}s:8:"fileName";a:3:{s:25:"defaultToHTMLsuffixOnPrev";i:0;s:16:"acceptHTMLsuffix";i:1;s:5:"index";a:1:{s:5:"print";a:1:{s:9:"keyValues";a:1:{s:4:"type";i:98;}}}}}}');

$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl']=array (
		'_DEFAULT' =>
		array (
				'init' => array (
						'enableCHashCache' => true,
						'appendMissingSlash' => 'ifNotFile',
						'adminJumpToBackend' => true,
						'enableUrlDecodeCache' => true,
						'enableUrlEncodeCache' => true,
						'emptyUrlReturnValue' => '/',
				),
				'pagePath' => array (
						'type' => 'user',
						'userFunc' => 'EXT:realurl/class.tx_realurl_advanced.php:&tx_realurl_advanced->main',
						'spaceCharacter' => '-',
						'languageGetVar' => 'L',
						'autoUpdatePathCache' => false,
						'rootpage_id' => 1
				),
				'fileName' => array (
						'defaultToHTMLsuffixOnPrev' => 0,
						'acceptHTMLsuffix' => 0,
						'index' => array (
								'print' => array (
										'keyValues' => array (
												'type' => 98,
										),
								),
						),
				),
				// Pre variables
				'preVars' => array(
						// No Cache
						array(
								'GETvar' => 'no_cache',
								'valueMap' => array(
					 				'nc' => '1',
								),
								'noMatch' => 'bypass',
						),
						array(
								'GETvar' => 'L',
								'valueMap' => array(
										'' => '0',
								),
								'noMatch' => 'bypass',
						),

				),
				'postVarSets' => array(
						'_DEFAULT' => array(

								'news' => array(
											array(
													'GETvar' => 'tx_news_pi1[action]',
											),
											array(
													'GETvar' => 'tx_news_pi1[controller]',
											),
											array(
													'GETvar' => 'tx_news_pi1[news]',
													'lookUpTable' => array(
															'table' => 'tx_news_domain_model_news',
															'id_field' => 'uid',
															'alias_field' => 'title',
															'addWhereClause' => ' AND NOT deleted',
															'useUniqueCache' => 1,
															'useUniqueCache_conf' => array(
																	'strtolower' => 1,
																	'spaceCharacter' => '-',
															),
															'languageGetVar' => 'L',
															'languageExceptionUids' => '',
															'languageField' => 'sys_language_uid',
															'transOrigPointerField' => 'l10n_parent',
															'autoUpdate' => 1,
															'expireDays' => 180,
													),
											),
								),
						),
				),
		),
);