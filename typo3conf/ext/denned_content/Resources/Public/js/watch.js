
// ******* Configuration ********** //
// language leave blank for english
var rolexClockLanguage = 'en';// en,fr,zhs,ja,de,ru,es

/*
 * Available dimensions.
 * How to: comment unused ones.
 */
//var dim = {width: 56, height: 56, scale: 0.6};// scale 0.6
//var dim = {width: 60, height: 60, scale: 0.65};// scale 0.65
var dim = {width: 90, height: 90, scale: 1};// scale 0.7
//var dim = {width: 68, height: 68, scale: 0.75};// scale 0.75
//var dim = {width: 73, height: 73, scale: 0.8};// scale 0.8
//var dim = {width: 82, height: 82, scale: 0.95};// scale 0.9
//var dim = {width: 90, height: 90, scale: 1};// scale 1 <- default one
//var dim = {width: 99, height: 99, scale: 1.1};// scale 1.1
//var dim = {width: 109, height: 109, scale: 1.2};// scale 1.2

/*
 * Available needles
 * How to use: comment unused ones.
 */
//var needlesFolder = 'img/';// deprecated
var needlesFolder = 'typo3conf/ext/denned_content/Resources/Public/css/images/needles/green/';
//var needlesFolder = 'css/images/needles/black/';
//var needlesFolder = 'css/images/needles/silver/';

/* set the clock width */
var clockWidth = dim.width;
/* set the clock height */
var clockHeight = dim.height;

var clockSettings = {
    LANG: rolexClockLanguage, // Language
    contentWidth: 300, // px Width of the content
    contentHeight: 114, // px Height of the content
    vertical: true,// whether the content orientation is vertical or not
    clockWidth: dim.width, /* width of the clock to be set on top the html file */
    clockHeight: dim.height, /* height of the clock to be set on top the html file */
    flashname: 'denned_300x114_en', /* set the flash name without .swf (place the file in the img folder)*/
    trackingurl: 'http://www.rolex.com?cmpid=dw201400947', /* set the tracking url */
    trackingPixel: '',
    trackUrlW: 300, // px Width of the tracker url a#trackUrl
    trackUrlH: 114, // px Height of the tracker url a#trackUrl
    trackUrlL: 0, // ??
    timeZTop: "19px",
    timeZLeft: "111px",
    yourtTop: "58px",
    yourtLeft: "111px",
    trackUrlNewArea: false,
    theLocalText: 'Your Time', /* set your time text to be shown on the banner */
    trailingZero: true,
    amPm: false, /* set custom offset if city doesn't exist in the list */
    customOffset: "", /* set custom offset if city doesn't exist in the list */
    customOffset1: "",
    customOffset2: "",
    customDST: "",
    customDST1: "",
    customDST2: "",
    time24hours: true, /* show time in 24 hours format with true */
    showText: true, /* hide all text and time with false */
    showTime: false, /* show time without city / your time text with true */
    showDay: false, /* change all text to Uppercase with true */
    upperCase: false, /* change all text to Uppercase with true */
    globalXcenter: dim.width / 2,
    globalYcenter: dim.height / 2 -1,
    globalXscale: dim.scale,
    globalYscale: dim.scale,
    retinaXcenter: dim.width / 2, /* change the clock X position */
    retinaYcenter: dim.height / 2, /* change the clock Y position */
    retinaXscale: dim.scale, /* change the clock X scale */
    retinaYscale: dim.scale, /* change the clock Y scale */
    greencolor: '#027D57', /* change the text city time color */
    yellowcolor: '#A37E2C', /* change the text your time color */
    pointPosition: '78px', /* change the dot right position */
    point2Position: '78px', /* change the dot right position */
    textRightPosition: '0px', /* change the text blocks right position */
    textYourTimeRightPosition: '0px', /* change the text blocks right position */
    fallbackFileExtension: '.png', // file extension for fallback background img
    needlesFolder: needlesFolder, // needles folder
    // needle styles
    needles: {
    	// imagetype SVG
		svg : {
			hour : {
				width : 3.5
			},
			minute : {
				width : 3
			},
			second : {
				width : 2, xrotation : 2
			}
		},
		// imagetype PNG
		png : {
			hour : {
				width : 4
			},
			minute : {
				width : 4
			},
			second : {
				width : 2, xrotation : 1.5
			}
		}
	},
    forceFlash: false,
    forceFallback: false,
    clocktimeAtEvent: true,//Tells whether we display the time at the event location, defined in listofdates.js or not
    countdownNumbersOnly: false,// Display only numbers in count
    onclickCity: function(){
    },
    onclickYourtime: function(){
    },
    showDefaultCity: false,// Show the default city if no configurable city is currently active
    dateList: Cities,// List of date
    isCountdownClock: false// Whether it is a countdown
};

$(document).ready(function() {
    $('.container').rolexClock(clockSettings);
});
