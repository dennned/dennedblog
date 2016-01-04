<?php

/***************************************************************
 * Extension Manager/Repository config file for ext "dd_googlesitemap".
 *
 * Auto generated 23-12-2015 09:18
 *
 * Manual updates:
 * Only the data in the array - everything else is removed by next
 * writing. "version" and "dependencies" must not be touched!
 ***************************************************************/

$EM_CONF[$_EXTKEY] = array (
	'title' => 'Google sitemap',
	'description' => 'High performance Google sitemap implementation that avoids typical errors by other similar extensions',
	'category' => 'fe',
	'version' => '2.0.4',
	'state' => 'stable',
	'uploadfolder' => true,
	'createDirs' => 'typo3temp/dd_googlesitemap',
	'clearcacheonload' => true,
	'author' => 'Dmitry Dulepov',
	'author_email' => 'dmitry.dulepov@gmail.com',
	'author_company' => 'SIA "ACCIO"',
	'constraints' => 
	array (
		'depends' => 
		array (
			'typo3' => '6.2.0-7.6.999',
		),
		'conflicts' => 
		array (
		),
		'suggests' => 
		array (
		),
	),
);

