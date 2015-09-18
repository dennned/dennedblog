/**
 * Package: buildClock
 *
 * Description:
 * this file is the javascript to generate the watch.
 *
 * Files:
 *  - rolex-core-1.1.0.js
 *
 * License:
 * Copyright (c) 2012, matchbox France http://www.matchbox.fr
 * This program is dual licensed under the GNU General Public License
 * and Simplified BSD license.
 */
(function($) {
    // image folder
    var imgFolder = "typo3conf/ext/denned_content/Resources/Public/img";
    if (Modernizr.retina == true) {
        // TODO
//        imgFolder = "imgRetina";
    }

    // get needle extension
    var extension = "png";
    if (Modernizr.svg == true) {
        extension = "svg";
    }

    /**
     * Build clock.
     * @param {object} options
     * @returns {undefined}
     */
    $.fn.rolexClock = function(options) {
        // default params
        var params = {
            blockClass: 'block',
            activeClass: 'active',
            forceFlash: false,
            forceFallback: false,
            vertical: false,
            onclickCity: function() {
            },
            onclickYourtime: function() {
            },
            showDefaultCity: false,
            dateList: typeof Cities !== 'undefined' ? Cities : typeof Events !== 'undefined' ? Events : typeof cityArray !== 'undefined' ? cityArray : typeof EVENTS !== 'undefined' ? EVENTS : undefined,// List of date
            isCountdownClock: false// Whether it is a countdown. Defaults to false.
        };
        // methods
        var methods = {
            /**
             * Activate a block time.
             * args:
             * - ID of block
             */
            activeBlock: function() {
                if (typeof arguments[0] === 'string') {
                    var target = $('.block#' + arguments[0]);
                    if (target.length > 0) {
                        target.trigger('click');
                    }
                }
            }
        }

        // options calls
        if (options && typeof options === 'string' && methods[options]) {
            return methods[ options ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (options && typeof options === 'object') {
            params = $.extend({}, params, options);
        }

        function init() {

            // add <div#loads> at the end of body
            var loads = document.createElement('div');
            loads.id = 'loads';
            loads.style.position = 'absolute';
            loads.style.top = '-99999px';
            document.body.appendChild(loads);

            // set a default date
            if (params.dateList === undefined) {
                // set a default city
                if (params.isCountdownClock) {

                    params.dateList = [
                        {
                            city: {
                                en: 'GMT',
                                cdwText: 'ROLEX COUNTDOWN'
                            },
                            timeText: {
                                en: 'Your Time'
                            },
                            startDate: "19700101",
                            endDate: "99990101",
                            cdyear: "1970",
                            cdmonth: "11",
                            cdday: "29",
                            cdhour: "09",
                            cdmin: "00",
                            timezone: "0",
                            dst: 'EUROPE'
                        }
                    ];

                } else {
                    params.dateList = [
                        {
                            city: {
                                en: 'GMT'
                            },
                            timeText: {
                                en: 'Your Time'
                            },
                            startDate: "19700101",
                            endDate: "99990101",
                            timezone: 0,
                            dst: 'EUROPE'
                        }
                    ];
                }
            } else {
                // push a default city
                if (params.isCountdownClock) {
                    params.dateList[params.dateList.length] =
                            {
                                city: {
                                    en: 'GMT',
                                    cdwText: 'ROLEX COUNTDOWN'
                                },
                                timeText: {
                                    en: 'Your Time'
                                },
                                startDate: "19700101",
                                endDate: "99990101",
                                cdyear: "1970",
                                cdmonth: "11",
                                cdday: "29",
                                cdhour: "09",
                                cdmin: "00",
                                timezone: 0,
                                dst: 'EUROPE'
                            };

                } else {
                    params.dateList[params.dateList.length] =
                            {
                                city: {
                                    en: 'GMT' // {string} city name
                                },
                                timeText: {
                                    en: 'Your Time' // {string} local text
                                },
                                startDate: '19700101', // {string} start date yyyymmdd
                                endDate: '99990101', // {string} end date yyyymmdd
                                timezone: 0, // {float} Timezone
                                dst: 'EUROPE' // {string} Daylight saving time
                            };
                }
            }
        }

        init();

        // if NO-JS, fallback static image is shown by default.
        // if JS, fallback static image is hidden and grid is shown.
        function showClock() {
            $('#fallback').hide();
            $('.content').show();
        }

        window.requestAnimFrame = (function() {
            return  window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function(callback) {
                        window.setTimeout(callback, 1000 / 10);
                    };
        })();

        var image_folder = params.needlesFolder;
        var all_parts = new Array("hours", "minutes", "seconds", "top_center");

        var hours_p = new Array;
        hours_p["url"] = "hours." + extension + "";
        hours_p["update_mode"] = "hours_base_12";
        hours_p["width"] = params.needles[extension].hour.width;
        hours_p["height"] = 25;
        hours_p["xrotation"] = 2;
        hours_p["yrotation"] = 20;
        hours_p["xcenteroffset"] = 0;
        hours_p["ycenteroffset"] = 0;

        var minutes_p = new Array;
        minutes_p["url"] = "minutes." + extension + "";
        minutes_p["update_mode"] = "minutes_base_60";
        minutes_p["width"] = params.needles[extension].minute.width;
        minutes_p["height"] = 32;
        minutes_p["xrotation"] = 1.5;
        minutes_p["yrotation"] = 27;
        minutes_p["xcenteroffset"] = 0;
        minutes_p["ycenteroffset"] = 0;

        var seconds_p = new Array;
        seconds_p["url"] = "seconds." + extension + "";
        seconds_p["update_mode"] = "seconds_base_60";
        seconds_p["width"] = params.needles[extension].second.width;
        seconds_p["height"] = 39;
        seconds_p["xrotation"] = params.needles[extension].second.xrotation;
        seconds_p["yrotation"] = 31;
        seconds_p["xcenteroffset"] = 0;
        seconds_p["ycenteroffset"] = 0;
        seconds_p["watch_x_center"] = 0;
        seconds_p["watch_y_center"] = 0;

        var top_center_p = new Array;
        top_center_p["url"] = "center.png";
        top_center_p["width"] = 5;
        top_center_p["height"] = 5;
        top_center_p["xcenteroffset"] = -2.5;
        top_center_p["ycenteroffset"] = -2.5;

        var cyclop_mask_p = new Array;

        var global_watch_p = new Array;
        global_watch_p["rotation_angle"] = 0;
        global_watch_p["width"] = params.clockWidth;
        global_watch_p["height"] = params.clockHeight;
        global_watch_p["xscale"] = .9;
        global_watch_p["yscale"] = .9;

        function countProperties(a) {
            var b = 0;
            for (var c in a) {
                if (a.hasOwnProperty(c))
                    ++b
            }
            return b
        }
        function onImageLoaded(a) {
//            console.log(all_p_to_be_loaded)
            all_p_to_be_loaded--;
            if (all_p_to_be_loaded == 0) {
            }
        }
        var all_p = new Array;
        var all_p_to_be_loaded = all_parts.length;
        for (i = 0; i < all_parts.length; i++) {
            all_p[i] = eval(all_parts[i] + "_p")
        }
        for (var i = 0; i < all_p.length; i++) {
            if (all_p[i]["light_effects"] != null) {
                var baseName = all_p[i]["url"].split(".png")[0];
                all_p[i]["__lightEffects"] = new Object;
                for (var j = 0; j < all_p[i]["light_effects"].length; j++) {
                    all_p[i]["__lightEffects"][all_p[i]["light_effects"][j]] = new Image;
                    all_p[i]["__lightEffects"][all_p[i]["light_effects"][j]].src = image_folder + baseName + "_" + all_p[i]["light_effects"][j] + ".png";
                    all_p[i]["__lightEffects"][all_p[i]["light_effects"][j]].onerror = function(a) {
                    };
                    all_p[i]["__lightEffects"][all_p[i]["light_effects"][j]].onload = function(a) {
                    }
                }
            }
        }
        if (cyclop_mask_p["url"]) {
            all_p_to_be_loaded++;
            cyclop_mask_p["image"] = new Image;
            cyclop_mask_p["image"].oncomplete = onImageLoaded(image_folder + cyclop_mask_p["url"]);
            cyclop_mask_p["image"].src = image_folder + cyclop_mask_p["url"]
        }
        var loads = document.getElementById('loads');
        for (var i = 0; i < all_parts.length; i++) {
            if (all_p[i]["url"] != null) {
                // Cr?e DOM Image
                var domImg = document.createElement('img');
                domImg.id = "p_" + all_parts[i];
                // append dans le DOM
                loads.appendChild(domImg);
                all_p[i]["image"] = domImg;
                all_p[i]["image"].oncomplete = onImageLoaded(image_folder + all_p[i]["url"]);
                all_p[i]["image"].src = image_folder + all_p[i]["url"];
                if (!all_p[i]["fileformat"]) {
                    all_p[i]["fileformat"] = all_p[i]["url"].substring(all_p[i]["url"].length - 3, all_p[i]["url"].length)
                }
            } else {
                all_p_to_be_loaded--
            }
            if (!all_p[i]["xcenteroffset"]) {
                all_p[i]["xcenteroffset"] = 0
            }
            if (!all_p[i]["ycenteroffset"]) {
                all_p[i]["ycenteroffset"] = 0
            }
            if (!all_p[i]["xoriginoffset"]) {
                all_p[i]["xoriginoffset"] = null
            }
            if (!all_p[i]["yoriginoffset"]) {
                all_p[i]["yoriginoffset"] = null
            }
            if (!all_p[i]["xcenter"]) {
                all_p[i]["xcenter"] = 0
            }
            if (!all_p[i]["ycenter"]) {
                all_p[i]["ycenter"] = 0
            }
            if (!all_p[i]["update_mode"]) {
                all_p[i]["update_mode"] = null
            }
            if (!all_p[i]["watch_x_center"]) {
                all_p[i]["offset_alternate_x_center"] = 0
            } else {
                all_p[i]["offset_alternate_x_center"] = global_watch_p[all_p[i]["watch_x_center"]] - global_watch_p["xcenter"]
            }
            if (!all_p[i]["watch_y_center"]) {
                all_p[i]["offset_alternate_y_center"] = 0
            } else {
                all_p[i]["offset_alternate_y_center"] = global_watch_p[all_p[i]["watch_y_center"]] - global_watch_p["ycenter"]
            }
        }
        function f_calculate_additional_vars() {
            if (GLOBAL_LIGHT_SOURCE != undefined) {
                TOP_LIGHT_START = GLOBAL_LIGHT_SOURCE - 90;
                TOP_LIGHT_END = GLOBAL_LIGHT_SOURCE + 90;
                BOTTOM_LIGHT_START = GLOBAL_LIGHT_SOURCE - 90;
                BOTTOM_LIGHT_END = GLOBAL_LIGHT_SOURCE + 90;
                TOP_SHADE_START = GLOBAL_LIGHT_SOURCE + 90;
                TOP_SHADE_END = GLOBAL_LIGHT_SOURCE - 90;
                BOTTOM_SHADE_START = GLOBAL_LIGHT_SOURCE + 90;
                BOTTOM_SHADE_END = GLOBAL_LIGHT_SOURCE - 90;
                LEFT_LIGHT_START = GLOBAL_LIGHT_SOURCE;
                LEFT_LIGHT_END = GLOBAL_LIGHT_SOURCE + 180;
                RIGHT_LIGHT_START = GLOBAL_LIGHT_SOURCE + 180;
                RIGHT_LIGHT_END = GLOBAL_LIGHT_SOURCE;
                LEFT_SHADE_START = GLOBAL_LIGHT_SOURCE + 180;
                LEFT_SHADE_END = GLOBAL_LIGHT_SOURCE;
                RIGHT_SHADE_START = GLOBAL_LIGHT_SOURCE;
                RIGHT_SHADE_END = GLOBAL_LIGHT_SOURCE + 180
            }
            if (GLOBAL_MIN_ALPHA != undefined) {
                TOP_LIGHT_MIN = BOTTOM_LIGHT_MIN = TOP_SHADE_MIN = BOTTOM_SHADE_MIN = LEFT_LIGHT_MIN = RIGHT_LIGHT_MIN = LEFT_SHADE_MIN = RIGHT_SHADE_MIN = GLOBAL_MIN_ALPHA
            }
            if (GLOBAL_MAX_ALPHA != undefined) {
                TOP_LIGHT_MAX = BOTTOM_LIGHT_MAX = TOP_SHADE_MAX = BOTTOM_SHADE_MAX = LEFT_LIGHT_MAX = RIGHT_LIGHT_MAX = LEFT_SHADE_MAX = RIGHT_SHADE_MAX = GLOBAL_MAX_ALPHA
            }
            while (TOP_LIGHT_START > TOP_LIGHT_END) {
                TOP_LIGHT_END += 360
            }
            while (BOTTOM_LIGHT_START > BOTTOM_LIGHT_END) {
                BOTTOM_LIGHT_END += 360
            }
            while (TOP_SHADE_START > TOP_SHADE_END) {
                TOP_SHADE_END += 360
            }
            while (BOTTOM_SHADE_START > BOTTOM_SHADE_END) {
                BOTTOM_SHADE_END += 360
            }
            while (LEFT_LIGHT_START > LEFT_LIGHT_END) {
                LEFT_LIGHT_END += 360
            }
            while (RIGHT_LIGHT_START > RIGHT_LIGHT_END) {
                RIGHT_LIGHT_END += 360
            }
            while (LEFT_SHADE_START > LEFT_SHADE_END) {
                LEFT_SHADE_END += 360
            }
            while (RIGHT_SHADE_START > RIGHT_SHADE_END) {
                RIGHT_SHADE_END += 360
            }
            while (TOP_LIGHT_END > 360) {
                TOP_LIGHT_START -= 360;
                TOP_LIGHT_END -= 360
            }
            while (BOTTOM_LIGHT_END > 360) {
                BOTTOM_LIGHT_START -= 360;
                BOTTOM_LIGHT_END -= 360
            }
            while (TOP_SHADE_END > 360) {
                TOP_SHADE_START -= 360;
                TOP_SHADE_END -= 360
            }
            while (BOTTOM_SHADE_END > 360) {
                BOTTOM_SHADE_START -= 360;
                BOTTOM_SHADE_END -= 360
            }
            while (LEFT_LIGHT_END > 360) {
                LEFT_LIGHT_START -= 360;
                LEFT_LIGHT_END -= 360
            }
            while (RIGHT_LIGHT_END > 360) {
                RIGHT_LIGHT_START -= 360;
                RIGHT_LIGHT_END -= 360
            }
            while (LEFT_SHADE_END > 360) {
                LEFT_SHADE_START -= 360;
                LEFT_SHADE_END -= 360
            }
            while (RIGHT_SHADE_END > 360) {
                RIGHT_SHADE_START -= 360;
                RIGHT_SHADE_END -= 360
            }
            if (TOP_LIGHT_START < TOP_LIGHT_END) {
                top_light_max_point = (TOP_LIGHT_START + TOP_LIGHT_END) / 2 % 360;
                top_light_range = TOP_LIGHT_END - TOP_LIGHT_START
            } else {
                top_light_max_point = (TOP_LIGHT_START + TOP_LIGHT_END) % 360 / 2;
                top_light_range = 360 + TOP_LIGHT_END - TOP_LIGHT_START
            }
            top_light_mid_range = top_light_range / 2;
            if (BOTTOM_LIGHT_START < BOTTOM_LIGHT_END) {
                bottom_light_max_point = (BOTTOM_LIGHT_START + BOTTOM_LIGHT_END) / 2 % 360;
                bottom_light_range = BOTTOM_LIGHT_END - BOTTOM_LIGHT_START
            } else {
                bottom_light_max_point = (BOTTOM_LIGHT_START + BOTTOM_LIGHT_END) % 360 / 2;
                bottom_light_range = 360 + BOTTOM_LIGHT_END - BOTTOM_LIGHT_START
            }
            bottom_light_mid_range = bottom_light_range / 2;
            if (TOP_SHADE_START < TOP_SHADE_END) {
                top_shade_max_point = (TOP_SHADE_START + TOP_SHADE_END) / 2 % 360;
                top_shade_range = TOP_SHADE_END - TOP_SHADE_START
            } else {
                top_shade_max_point = (TOP_SHADE_START + TOP_SHADE_END) % 360 / 2;
                top_shade_range = 360 + TOP_SHADE_END - TOP_SHADE_START
            }
            top_shade_mid_range = top_shade_range / 2;
            if (BOTTOM_SHADE_START < BOTTOM_SHADE_END) {
                bottom_shade_max_point = (BOTTOM_SHADE_START + BOTTOM_SHADE_END) / 2 % 360;
                bottom_shade_range = BOTTOM_SHADE_END - BOTTOM_SHADE_START
            } else {
                bottom_shade_max_point = (BOTTOM_SHADE_START + BOTTOM_SHADE_END) % 360 / 2;
                bottom_shade_range = 360 + BOTTOM_SHADE_END - BOTTOM_SHADE_START
            }
            bottom_shade_mid_range = bottom_shade_range / 2;
            if (LEFT_LIGHT_START < LEFT_LIGHT_END) {
                left_light_max_point = (LEFT_LIGHT_START + LEFT_LIGHT_END) / 2 % 360;
                left_light_range = LEFT_LIGHT_END - LEFT_LIGHT_START
            } else {
                left_light_max_point = (LEFT_LIGHT_START + LEFT_LIGHT_END) % 360 / 2;
                left_light_range = 360 + LEFT_LIGHT_END - LEFT_LIGHT_START
            }
            left_light_mid_range = left_light_range / 2;
            if (RIGHT_LIGHT_START < RIGHT_LIGHT_END) {
                right_light_max_point = (RIGHT_LIGHT_START + RIGHT_LIGHT_END) / 2 % 360;
                right_light_range = RIGHT_LIGHT_END - RIGHT_LIGHT_START
            } else {
                right_light_max_point = (RIGHT_LIGHT_START + RIGHT_LIGHT_END) % 360 / 2;
                right_light_range = 360 + RIGHT_LIGHT_END - RIGHT_LIGHT_START
            }
            right_light_mid_range = right_light_range / 2;
            if (LEFT_SHADE_START < LEFT_SHADE_END) {
                left_shade_max_point = (LEFT_SHADE_START + LEFT_SHADE_END) / 2 % 360;
                left_shade_range = LEFT_SHADE_END - LEFT_SHADE_START
            } else {
                left_shade_max_point = (LEFT_SHADE_START + LEFT_SHADE_END) % 360 / 2;
                left_shade_range = 360 + LEFT_SHADE_END - LEFT_SHADE_START
            }
            left_shade_mid_range = left_shade_range / 2;
            if (RIGHT_SHADE_START < RIGHT_SHADE_END) {
                right_shade_max_point = (RIGHT_SHADE_START + RIGHT_SHADE_END) / 2 % 360;
                right_shade_range = RIGHT_SHADE_END - RIGHT_SHADE_START
            } else {
                right_shade_max_point = (RIGHT_SHADE_START + RIGHT_SHADE_END) % 360 / 2;
                right_shade_range = 360 + RIGHT_SHADE_END - RIGHT_SHADE_START
            }
            right_shade_mid_range = right_shade_range / 2
        }
        function getAlphaForRotation(a, b, c) {
            b = 180 * b / Math.PI + 90;
            subf_find_distance_to_max_point = function(a) {
                var c = Math.abs(a - b);
                if (c > 180) {
                    c = Math.abs(180 - (c - 180))
                }
                return c
            };
            var d;
            if (a == "top_light") {
                if (c == "reverse") {
                    this_hand_distance_to_top_light_point = subf_find_distance_to_max_point(-top_light_max_point)
                } else {
                    this_hand_distance_to_top_light_point = subf_find_distance_to_max_point(top_light_max_point)
                }
                if (this_hand_distance_to_top_light_point <= top_light_mid_range) {
                    d = TOP_LIGHT_MIN + (1 - this_hand_distance_to_top_light_point / top_light_mid_range) * (TOP_LIGHT_MAX - TOP_LIGHT_MIN)
                } else {
                    d = TOP_LIGHT_MIN
                }
            } else if (a == "bottom_light") {
                if (c == "reverse") {
                    this_hand_distance_to_bottom_light_point = subf_find_distance_to_max_point(-bottom_light_max_point)
                } else {
                    this_hand_distance_to_bottom_light_point = subf_find_distance_to_max_point(bottom_light_max_point)
                }
                if (180 - this_hand_distance_to_bottom_light_point <= bottom_light_mid_range) {
                    d = BOTTOM_LIGHT_MIN + (1 - (180 - this_hand_distance_to_bottom_light_point) / bottom_light_mid_range) * (BOTTOM_LIGHT_MAX - BOTTOM_LIGHT_MIN)
                } else {
                    d = BOTTOM_LIGHT_MIN
                }
            } else if (a == "top_shade") {
                if (c == "reverse") {
                    this_hand_distance_to_top_shade_point = subf_find_distance_to_max_point(-top_shade_max_point)
                } else {
                    this_hand_distance_to_top_shade_point = subf_find_distance_to_max_point(top_shade_max_point)
                }
                if (this_hand_distance_to_top_shade_point <= top_shade_mid_range) {
                    d = TOP_SHADE_MIN + (1 - this_hand_distance_to_top_shade_point / top_shade_mid_range) * (TOP_SHADE_MAX - TOP_SHADE_MIN)
                } else {
                    d = TOP_SHADE_MIN
                }
            } else if (a == "bottom_shade") {
                if (c == "reverse") {
                    this_hand_distance_to_bottom_shade_point = subf_find_distance_to_max_point(-bottom_shade_max_point)
                } else {
                    this_hand_distance_to_bottom_shade_point = subf_find_distance_to_max_point(bottom_shade_max_point)
                }
                if (180 - this_hand_distance_to_bottom_shade_point <= bottom_shade_mid_range) {
                    d = BOTTOM_SHADE_MIN + (1 - (180 - this_hand_distance_to_bottom_shade_point) / bottom_shade_mid_range) * (BOTTOM_SHADE_MAX - BOTTOM_SHADE_MIN)
                } else {
                    d = BOTTOM_SHADE_MIN
                }
            }
            if (c == "reverse") {
                if (a == "left_light") {
                    this_hand_distance_to_left_light_point = subf_find_distance_to_max_point(-left_light_max_point);
                    if (this_hand_distance_to_left_light_point <= left_light_mid_range) {
                        d = LEFT_LIGHT_MIN + (1 - this_hand_distance_to_left_light_point / left_light_mid_range) * (LEFT_LIGHT_MAX - LEFT_LIGHT_MIN)
                    } else {
                        d = LEFT_LIGHT_MIN
                    }
                } else if (a == "right_light") {
                    if (this_hand_distance_to_right_light_point <= right_light_mid_range) {
                        d = RIGHT_LIGHT_MIN + (1 - this_hand_distance_to_right_light_point / right_light_mid_range) * (RIGHT_LIGHT_MAX - RIGHT_LIGHT_MIN)
                    } else {
                        d = RIGHT_LIGHT_MIN
                    }
                } else if (a == "left_shade") {
                    this_hand_distance_to_left_shade_point = subf_find_distance_to_max_point(-left_shade_max_point);
                    if (this_hand_distance_to_left_shade_point <= left_shade_mid_range) {
                        d = (1 - this_hand_distance_to_left_shade_point / left_shade_mid_range) * (LEFT_SHADE_MAX - LEFT_SHADE_MIN)
                    } else {
                        d = LEFT_SHADE_MIN
                    }
                } else if (a == "right_shade") {
                    this_hand_distance_to_right_shade_point = subf_find_distance_to_max_point(-right_shade_max_point);
                    if (this_hand_distance_to_right_shade_point <= right_shade_mid_range) {
                        d = (1 - this_hand_distance_to_right_shade_point / right_shade_mid_range) * (RIGHT_SHADE_MAX - RIGHT_SHADE_MIN)
                    } else {
                        d = RIGHT_SHADE_MIN
                    }
                }
            } else {
                if (a == "left_light") {
                    this_hand_distance_to_left_light_point = subf_find_distance_to_max_point(left_light_max_point);
                    if (this_hand_distance_to_left_light_point <= left_light_mid_range) {
                        d = LEFT_LIGHT_MIN + (1 - this_hand_distance_to_left_light_point / left_light_mid_range) * (LEFT_LIGHT_MAX - LEFT_LIGHT_MIN)
                    } else {
                        d = LEFT_LIGHT_MIN
                    }
                } else if (a == "right_light") {
                    this_hand_distance_to_right_light_point = subf_find_distance_to_max_point(-right_light_max_point);
                    this_hand_distance_to_right_light_point = subf_find_distance_to_max_point(right_light_max_point);
                    if (this_hand_distance_to_right_light_point <= right_light_mid_range) {
                        d = RIGHT_LIGHT_MIN + (1 - this_hand_distance_to_right_light_point / right_light_mid_range) * (RIGHT_LIGHT_MAX - RIGHT_LIGHT_MIN)
                    } else {
                        d = RIGHT_LIGHT_MIN
                    }
                } else if (a == "left_shade") {
                    this_hand_distance_to_left_shade_point = subf_find_distance_to_max_point(left_shade_max_point);
                    if (this_hand_distance_to_left_shade_point <= left_shade_mid_range) {
                        d = LEFT_SHADE_MIN + (1 - this_hand_distance_to_left_shade_point / left_shade_mid_range) * (LEFT_SHADE_MAX - LEFT_SHADE_MIN)
                    } else {
                        d = LEFT_SHADE_MIN
                    }
                } else if (a == "right_shade") {
                    this_hand_distance_to_right_shade_point = subf_find_distance_to_max_point(right_shade_max_point);
                    if (this_hand_distance_to_right_shade_point <= right_shade_mid_range) {
                        d = RIGHT_SHADE_MIN + (1 - this_hand_distance_to_right_shade_point / right_shade_mid_range) * (RIGHT_SHADE_MAX - RIGHT_SHADE_MIN)
                    } else {
                        d = RIGHT_SHADE_MIN
                    }
                }
            }
            return d / 100
        }
        var GLOBAL_LIGHT_SOURCE = 360;
        var GLOBAL_MIN_ALPHA = 0;
        var GLOBAL_MAX_ALPHA = 100;
        var TOP_LIGHT_START = 0;
        var TOP_LIGHT_END = 0;
        var BOTTOM_LIGHT_START = 0;
        var BOTTOM_LIGHT_END = 0;
        var TOP_SHADE_START = 0;
        var TOP_SHADE_END = 0;
        var BOTTOM_SHADE_START = 0;
        var BOTTOM_SHADE_END = 0;
        var LEFT_LIGHT_START = 0;
        var LEFT_LIGHT_END = 0;
        var RIGHT_LIGHT_START = 0;
        var RIGHT_LIGHT_END = 0;
        var LEFT_SHADE_START = 0;
        var LEFT_SHADE_END = 0;
        var RIGHT_SHADE_START = 0;
        var RIGHT_SHADE_END = 0;
        var TOP_LIGHT_MIN = 0;
        var TOP_LIGHT_MAX = 0;
        var BOTTOM_LIGHT_MIN = 0;
        var BOTTOM_LIGHT_MAX = 0;
        var TOP_SHADE_MIN = 0;
        var TOP_SHADE_MAX = 0;
        var BOTTOM_SHADE_MIN = 0;
        var BOTTOM_SHADE_MAX = 0;
        var LEFT_LIGHT_MIN = 0;
        var LEFT_LIGHT_MAX = 0;
        var RIGHT_LIGHT_MIN = 0;
        var RIGHT_LIGHT_MAX = 0;
        var LEFT_SHADE_MIN = 0;
        var LEFT_SHADE_MAX = 0;
        var RIGHT_SHADE_MIN = 0;
        var RIGHT_SHADE_MAX = 0;
        var top_light_max_point = 0;
        var top_light_range = 0;
        var top_light_mid_range = 0;
        var bottom_light_max_point = 0;
        var bottom_light_range = 0;
        var bottom_light_mid_range = 0;
        var top_shade_max_point = 0;
        var top_shade_range = 0;
        var top_shade_mid_range = 0;
        var bottom_shade_max_point = 0;
        var bottom_shade_range = 0;
        var bottom_shade_mid_range = 0;
        f_calculate_additional_vars();
        var updated;
        function getHiddenProp() {
            var prefixes = ['webkit', 'moz', 'ms', 'o'];

            // if 'hidden' is natively supported just return it
            if ('hidden' in document)
                return 'hidden';

            // otherwise loop over all the known prefixes until we find one
            for (var i = 0; i < prefixes.length; i++) {
                if ((prefixes[i] + 'Hidden') in document)
                    return prefixes[i] + 'Hidden';
            }

            // otherwise it's not supported
            return null;
        }
        function isHidden() {
            var prop = getHiddenProp();
            if (!prop)
                return false;

            return document[prop];
        }
        var visProp = getHiddenProp();
        if (visProp) {
            var evtname = visProp.replace(/[H|h]idden/, '') + 'visibilitychange';
            document.addEventListener(evtname, visChange);
        }

        function visChange() {
            if (isHidden())
                updated = false;
            else
                updateTime();
        }


// self.onblur = function() { updated = false; }
// self.onfocus = function() { updateTime() }

        function updateTime() {
            if (params.isCountdownClock) {
                if (updated == true) {
                    current_seconds += 1000 / 10;

                    if (current_seconds >= 60) {
                        //console.log(current_seconds)
                        currentTime = new Date;
                        currentTime.setHours(currentTime.getHours() + hoursOffset);
                        currentTime.setMinutes(currentTime.getMinutes() + minutesOffset);
                        currentTime.setSeconds(currentTime.getSeconds() + secondsOffset);
                        current_hours = currentTime.getHours();
                        current_minutes = currentTime.getMinutes();
                        current_seconds = currentTime.getSeconds();
                        current_milliseconds = currentTime.getMilliseconds();
                    }
                    //console.log(currentTime)
                } else {
                    currentTime = new Date;
                    // console.log(current_seconds)
                    currentTime.setHours(currentTime.getHours() + hoursOffset);
                    currentTime.setMinutes(currentTime.getMinutes() + minutesOffset);
                    currentTime.setSeconds(currentTime.getSeconds() + secondsOffset);
                    monthdate = currentTime.getDate();// n¬¨¬®¬¨¬Æ¬¨¬®¬¨√Ü‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂¬¨‚Ñ¢ du jour local: 0..31
                    weekday_num = currentTime.getDay();// jour de la semaine local: 0=> sun, ..., 6=> sat
                    current_hours = currentTime.getHours();
                    current_minutes = currentTime.getMinutes();
                    current_seconds = currentTime.getSeconds();
                    current_milliseconds = currentTime.getMilliseconds();
                    // console.log(current_seconds,currentTime.getMilliseconds())
                    // console.log(monthdate,weekday_num,current_hours,current_minutes,current_seconds)
                    updated = true;
                }
            } else {
                currentTime = new Date;
                currentTime.setHours(currentTime.getHours() + hoursOffset);
                currentTime.setMinutes(currentTime.getMinutes() + minutesOffset);
                currentTime.setSeconds(currentTime.getSeconds() + secondsOffset);
                monthdate = currentTime.getDate();
                weekday_num = currentTime.getDay();
                current_seconds = currentTime.getSeconds();
                current_minutes = currentTime.getMinutes();
                current_hours = currentTime.getHours();
                current_milliseconds = currentTime.getMilliseconds();
            }
        }
        function setTimeToDefaultTime() {
            currentTime = new Date;
            currentTime.setHours(10);
            currentTime.setMinutes(11);
            currentTime.setSeconds(31);
            monthdate = currentTime.getDate();
            weekday_num = currentTime.getDay();
            current_seconds = currentTime.getSeconds();
            current_minutes = currentTime.getMinutes();
            current_hours = currentTime.getHours();
            current_milliseconds = currentTime.getMilliseconds()
        }
        function updateTimeCalculations() {
            var a = current_hours;
            weekday_num++;
            if (a > 12) {
                a -= 12
            }
            display_calculation["seconds_base_60"] = current_seconds * timeSlice;
            display_calculation["seconds_base_60"] += current_milliseconds * timeSlice / 1e3;
            display_calculation["seconds_base_60"] += rotCorrect;
            display_calculation["minutes_base_60"] = current_minutes * timeSlice;
            display_calculation["minutes_base_60"] += current_seconds * timeSlice / 60;
            display_calculation["minutes_base_60"] += rotCorrect;
            display_calculation["minutes_base_30"] = current_minutes * timeSlice * 2;
            display_calculation["minutes_base_30"] += current_seconds * timeSlice * 2 / 60;
            display_calculation["minutes_base_30"] += rotCorrect;
            display_calculation["hours_base_12"] = a * timeSlice * 5;
            display_calculation["hours_base_12"] += current_minutes * timeSlice / 12;
            display_calculation["hours_base_12"] += rotCorrect;
            display_calculation["monthdate_base_31"] = monthdate * (timeSlice / 6) * (360 / 31);
            display_calculation["monthdate_base_31"] += rotCorrect
        }
        function easeInOutQuad(a, b, c, d) {
            if (a < d / 2)
                return 2 * c * a * a / (d * d) + b;
            ts = a - d / 2;
            return -2 * c * ts * ts / (d * d) + 2 * c * ts / d + c / 2 + b
        }
        function setHoursOffset(a) {
            hoursOffset = a
        }
        function setMinutesOffset(a) {
            minutesOffset = a
        }
        function setSecondsOffset(a) {
            secondsOffset = a
        }
        function getCurrentShownTime() {
            var a = "";
            if (current_hours < 10) {
                a += "0"
            }
            a += current_hours;
            a += ":";
            if (current_minutes < 10) {
                a += "0"
            }
            a += current_minutes;
            return a
        }
        function updateOnTimeDisplayOnce() {
            updateTimeCalculations();
            updateDisplay()
        }
        function updateOnTimeDisplayOvertime() {
            updateTime();
            updateOnTimeDisplayOnce();
            timeoutID = window.setTimeout(updateOnTimeDisplayOvertime, tickDelay)
        }
        var ticks_per_seconds = 10;
        var parts_starting_z_index = 23;
        var tickDelay = 1e3 / ticks_per_seconds;
        var timeSlice = Math.PI * 2 / 60;
        var rotCorrect = global_watch_p["rotation_angle"] * (timeSlice / 6);
        var display_calculation = new Array;
        var currentTime = null;
        var hoursOffset = 0;
        var minutesOffset = 0;
        var secondsOffset = 0;
        var monthdate = null;
        var weekday_num = null;
        var current_seconds = null;
        var current_minutes = null;
        var current_hours = null;
        var current_milliseconds = null;
        var canvasId = 'regular_timepiece_canvas';
        var watchContainer = 'global_watch';
        var canvasParent = document.getElementById(canvasId);
        function prepareTimepieceElements() {
            if (prepareTimepieceElementsIsDone == false) {
                for (i = 0; i < all_parts.length; i++) {
                    if (all_p[i]["update_mode"] == "monthdate" || all_p[i]["update_mode"] == "weekday") {
                        if (all_p[i]["url"] == null) {
                            var a = document.createElement("DIV")
                        } else {
                            var a = document.createElement("CANVAS")
                        }
                        document.getElementById(watchContainer).appendChild(a);
                        if (typeof G_vmlCanvasManager != "undefined") {
                            a = G_vmlCanvasManager.initElement(a)
                        }
                        a.setAttribute("id", all_parts[i] + "_div");
                        a.style.position = "absolute";
                        a.style.width = all_p[i]["width"] + "px";
                        a.style.height = all_p[i]["height"] + "px";
                        a.style.left = all_p[i]["xoriginoffset"] + "px";
                        a.style.top = all_p[i]["yoriginoffset"] + "px";
                        if (all_p[i]["url"] == null) {
                            a.style.color = "#" + all_p[i]["txt_color"];
                            a.style.fontSize = all_p[i]["txt_fontSize"];
                            a.style.fontFamily = "Arial";
                            a.style.textAlign = "center"
                        }
                        parts_starting_z_index += i;
                        a.style.zIndex = parts_starting_z_index
                    }
                }
                var b = document.createElement("CANVAS");
                document.getElementById("global_watch").appendChild(b);
                if (typeof G_vmlCanvasManager != "undefined") {
                    b = G_vmlCanvasManager.initElement(b)
                }
                b.setAttribute("id", "regular_timepiece_canvas");
                b.style.position = "absolute";
                b.setAttribute("width", global_watch_p["width"]);
                b.setAttribute("height", global_watch_p["height"]);
                b.style.zIndex = parts_starting_z_index;
                if (cyclop_mask_p["url"]) {
                    var b = document.createElement("CANVAS");
                    document.getElementById("global_watch").appendChild(b);
                    if (typeof G_vmlCanvasManager != "undefined") {
                        b = G_vmlCanvasManager.initElement(b)
                    }
                    b.setAttribute("id", "magnified_timepiece_canvas");
                    b.style.position = "absolute";
                    b.setAttribute("width", global_watch_p["width"]);
                    b.setAttribute("height", global_watch_p["height"]);
                    b.style.zIndex = parts_starting_z_index + 1
                }
                prepareTimepieceElementsIsDone = true
            }
        }
        function placeCanvas(a, b, c) {
            a.clearRect(-global_watch_p["width"], -global_watch_p["height"], global_watch_p["width"] * 2, global_watch_p["height"] * 2);
            if (b == false) {
            } else {
                a.save();
                if (c) {
                    a.translate(global_watch_p[c["watch_x_center"]], global_watch_p[c["watch_y_center"]])
                } else {
                    a.translate(global_watch_p["xcenter"], global_watch_p["ycenter"])
                }
            }
        }
        function updateDisplay() {
            if (cyclop_mask_p["url"]) {
                var a = document.getElementById(canvasId);
                var b = a.getContext("2d");
                placeCanvas(b, true);
                drawTimepiece(b, true);
                b.save();
                b.translate(-global_watch_p["xcenter"], -global_watch_p["ycenter"]);
                b.globalCompositeOperation = "destination-in";
                b.drawImage(cyclop_mask_p["image"], 0, 0, cyclop_mask_p["width"], cyclop_mask_p["height"]);
                b.restore();
                b.restore()
            }
            var a = document.getElementById(canvasId);
            if (a.getContext) {
                var b = a.getContext("2d");
                placeCanvas(b, true);
                drawTimepiece(b, false);
                if (cyclop_mask_p["url"]) {
                    b.save();
                    b.translate(-global_watch_p["xcenter"], -global_watch_p["ycenter"]);
                    b.globalCompositeOperation = "destination-out";
                    b.drawImage(cyclop_mask_p["image"], 0, 0, cyclop_mask_p["width"], cyclop_mask_p["height"]);
                    b.restore()
                }
                b.restore();
            } else {
                alert('no context')
            }
        }
        function drawTimepiece(a, b) {
            magnify_x_offset = 0;
            magnify_y_offset = 0;
            magnify_x_scale = 1;
            magnify_y_scale = 1;
            if (b == true) {
                magnify_x_offset = cyclop_mask_p["xcenteroffset"];
                magnify_y_offset = cyclop_mask_p["ycenteroffset"];
                magnify_x_scale = cyclop_mask_p["xscale"];
                magnify_y_scale = cyclop_mask_p["yscale"];
            }
            a.globalCompositeOperation = "source-over";
            for (var i = 0; i < all_parts.length; i++) {
                var c = all_p[i];
                a.save();
                if (all_p[i]["update_mode"] != null) {
                    if (all_p[i]["update_mode"] == "monthdate") {
                        if (all_p[i]["url"] == null) {
                            document.getElementById(all_parts[i] + "_div").innerHTML = monthdate
                        } else {
                            document.getElementById(all_parts[i] + "_div").style.background = "url('" + image_folder + "num_" + monthdate + "." + all_p[i]["fileformat"] + "')"
                        }
                    } else if (all_p[i]["update_mode"] == "weekday") {
                        document.getElementById(all_parts[i] + "_div").style.background = "url('" + image_folder + "weekday_" + weekday_num + "." + all_p[i]["fileformat"] + "')"
                    } else {
                        a.translate(c["xcenteroffset"], c["ycenteroffset"]);
                        a.translate(magnify_x_offset, magnify_y_offset);
                        a.translate(c["offset_alternate_x_center"], c["offset_alternate_y_center"]);
                        a.scale(global_watch_p["xscale"] * magnify_x_scale, global_watch_p["yscale"] * magnify_y_scale);
                        a.rotate(display_calculation[c["update_mode"]]);
                        a.translate(-c["xrotation"], -c["yrotation"]);

//                        var img = c["image"];
//                        console.log(img, c["width"],c["height"])
                        var img = document.getElementById("p_" + all_parts[i]);
//                        console.log("p_" + all_parts[i]);
//                        canvas = document.getElementById(canvasId)
//                        ctx = canvas.getContext('2d')
//                        ctx.drawImage(img, 0, 0, c["width"], c["height"]);
                        a.drawImage(img, 0, 0, c["width"], c["height"]);
                        for (var d in all_p[i]["__lightEffects"]) {
                            if (all_p[i]["__lightEffects"][d].height > 0) {
                                a.globalAlpha = getAlphaForRotation(d, display_calculation[c["update_mode"]], "normal");
                                a.drawImage(c["__lightEffects"][d], 0, 0, c["width"], c["height"])
                            }
                        }
                    }
                } else {
                    a.translate(all_p[i]["xcenteroffset"], all_p[i]["ycenteroffset"]);
                    a.translate(-all_p[i]["xcenter"], -all_p[i]["ycenter"]);
                    a.drawImage(all_p[i]["image"], 0, 0, all_p[i]["width"], all_p[i]["height"])
                }
                a.restore()
            }
        }
        function startWatchEngineWhenReady() {
            if (all_p_to_be_loaded < 1) {
                prepareTimepieceElements();
//                updateOnTimeDisplayOvertime();
                window.setTimeout(updateOnTimeDisplayOvertime, 250);
            } else {
                requestAnimFrame(startWatchEngineWhenReady);
            }
        }
        function startWatchEngine() {
//            if (window.addEventListener) {
//                window.addEventListener("load", function() {
            startWatchEngineWhenReady()
//                }, false)
//            } else if (window.attachEvent) {
//                window.attachEvent("onload", function() {
//                    startWatchEngineWhenReady()
//                })
//            }
        }
        function showStaticWatchOnTime() {
            if (all_p_to_be_loaded < 1) {
                prepareTimepieceElements();
                setTimeToDefaultTime();
                updateOnTimeDisplayOnce();
            } else {
                timeoutID = window.setTimeout(showStaticWatchOnTime, tickDelay)
            }
        }
        function spinToCurrentTimeAfterDelay(a) {
        }
        var prepareTimepieceElementsIsDone = false;
        var weekday_displayed = false;
        var magnify_x_offset = 0;
        var magnify_y_offset = 0;

        var blockLocal = document.getElementById("yourtime");
        var blockCity = document.getElementById("city");

        var oldIE;
        if ($('html').is('.ie6, .ie7, .ie8, .ie9')) {
            oldIE = true;
        }

        /* vars for countdown  */
        var liftoffTime = new Date();
        liftoffTime.setDate(liftoffTime.getDate());
        var rolexClockCountdownCalc;

        function removeElement(id) {
            var element = document.getElementById(id);
            element.parentNode.removeChild(element);
        }

        function loadListofdates() {

            var language = params.LANG;
            var language = language.toLowerCase();
            var now_date = new Date();


            var year = now_date.getFullYear();
            var month = now_date.getMonth() + 1;
            var day = now_date.getDate();
            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }

            var names = [];
            var timezones = [];
            var timezone_dst = [];
            var timeText = [];

            var cdYear = [];
            var cdMonth = [];
            var cdDay = [];
            var cdHour = [];
            var cdMin = [];
            var ClockRacetext = [];

            var todayfull = Number(year + "" + month + "" + day);
            var index = null;
            for (var i = 0; i < params.dateList.length; i++) {
                if (todayfull >= params.dateList[i].startDate && todayfull <= params.dateList[i].endDate) {
                    index = i;
                    if (language == '') {
                        names.push(params.dateList[index].city['en']);
                    } else {
                        names.push(params.dateList[index].city[language]);
                        timeText.push(params.dateList[index].timeText[language])
                    }
                    timezones.push(params.dateList[index].timezone);
                    timezone_dst.push(params.dateList[index].dst);

                    if (params.isCountdownClock) {
                        cdYear.push(params.dateList[index].cdyear);
                        cdMonth.push(params.dateList[index].cdmonth);
                        cdDay.push(params.dateList[index].cdday);
                        cdHour.push(params.dateList[index].cdhour);
                        cdMin.push(params.dateList[index].cdmin)

                        ClockRacetext.push(params.dateList[index].city['cdwText']);
                    }
                }
            }

            return {
                names: names,
                timezones: timezones,
                timezone_dst: timezone_dst,
                timeText: timeText,
                cdYear: cdYear,
                cdMonth: cdMonth,
                cdDay: cdDay,
                cdHour: cdHour,
                cdMin: cdMin,
                ClockRacetext: ClockRacetext
            }
        }
        var flashMode = false;
        /**
         * Build the clock.
         * @param {object} options Options or method name
         * @returns {unresolved}
         */
        function buildClock() {
            $('body').addClass(params.LANG);
            var container = document.getElementById("rolexClockWim-container");


            if (Modernizr.retina == true) {
//                global_watch_p["xscale"] = params.retinaXscale;
//                global_watch_p["yscale"] = params.retinaYscale;
            }

            var blockLocal = document.getElementById("local");
            var blockCity = document.getElementById("city");

            function changeBg(bg) {
                if (params.isCountdownClock) {
                    if (bg == 'full') {
                        // When Countdown is present
                        //document.getElementById("rolexClockWim-container").style.background = "#fff url(''" + imgFolder + "/bg.jpg') no-repeat";
                        global_watch_p["xcenter"] = params.globalXcenter;
                        global_watch_p["ycenter"] = params.globalYcenter;
                        blockCity.style.display = "block";
                        //trackUrl.style.left = params.trackUrlL;
                        //trackUrl.style.height = params.trackUrlH;
                        //trackUrl.style.width = params.trackUrlW;
                        if (Modernizr.retina == true) {
                            //document.getElementById("rolexClockWim-container").style.background = "transparent url('" + imgFolder + "/bg.jpg') no-repeat";
                            //document.getElementById("rolexClockWim-container").style.backgroundSize = "auto 100%";
                        }
                    } else {

                        //document.getElementById("rolexClockWim-container").style.background = "transparent url('" + imgFolder + "/bg.jpg') no-repeat";
                        global_watch_p["xcenter"] = params.globalXcenter;
                        global_watch_p["ycenter"] = params.globalYcenter;
                        blockCity.style.display = "block";
                        //trackUrl.style.left = params.trackUrlL;
                        //trackUrl.style.height = params.trackUrlH;
                        //trackUrl.style.width = params.trackUrlW;
                        if (Modernizr.retina == true) {
                            //document.getElementById("rolexClockWim-container").style.background = "transparent url('" + imgFolder + "/bg.jpg') no-repeat";
                            //document.getElementById("rolexClockWim-container").style.backgroundSize = "auto 100%";

                        }

                    }
                } else {
                    global_watch_p["xscale"] = params.globalXscale;
                    global_watch_p["yscale"] = params.globalYscale;
                    global_watch_p["xcenter"] = params.globalXcenter;
                    global_watch_p["ycenter"] = params.globalYcenter;
                    //yourtime.style.top = params.yourtTop;
                    //yourtime.style.left = params.yourtLeft;
                    //timeTimezon.style.top = params.timeZTop;
                    //timeTimezon.style.left = params.timeZLeft;
                    if (bg == 'full') {
                        //document.getElementById("rolexClockWim-container").style.background = "#fff url(''" + imgFolder + "/bg.jpg') no-repeat";
                        blockCity.style.display = "block";
                        blockLocal.style.display = "block";
                        //trackUrl.style.left = params.trackUrlL + 'px';
                        //trackUrl.style.height = params.trackUrlH + 'px';
                        //trackUrl.style.width = params.trackUrlW + 'px';
                        if (Modernizr.retina == true) {
                            //document.getElementById("rolexClockWim-container").style.background = "transparent url('" + imgFolder + "/bg.jpg') no-repeat";
                            //document.getElementById("rolexClockWim-container").style.backgroundSize = "auto 100%";
                        }
                    } else {
                        //document.getElementById("rolexClockWim-container").style.background = "transparent url('" + imgFolder + "/bg.jpg') no-repeat";
                        blockLocal.style.display = "none";
                        blockCity.style.display = "none";
                        //trackUrl.style.left = params.trackUrlL + 'px';
                        //trackUrl.style.height = params.trackUrlH + 'px';
                        //trackUrl.style.width = params.trackUrlW + 'px';
                        if (Modernizr.retina == true) {
                            //document.getElementById("rolexClockWim-container").style.background = "transparent url('" + imgFolder + "/bg.jpg') no-repeat";
                            //document.getElementById("rolexClockWim-container").style.backgroundSize = "auto 100%";

                        }
                    }
                }

            }
            if (!params.forceFallback && !params.forceFlash && Modernizr.canvas == true && document.compatMode != 'Quirks' && oldIE != true) {
                document.getElementById("trackUrl").href = params.trackingurl;
                document.getElementById("trackUrl2").href = params.trackingurl;
                if (!params.showText) {
                    $(blockCity).hide();
                    $(blockLocal).hide();
                    changeBg('full');
                } else {

                    var e = loadListofdates();
                    var names = e.names,
                            timezones = e.timezones,
                            timezone_dst = e.timezone_dst,
                            timeText = e.timeText;
                    var cdYear = e.cdYear,
                            cdMonth = e.cdMonth,
                            cdDay = e.cdDay,
                            cdHour = e.cdHour,
                            cdMin = e.cdMin,
                            ClockRacetext = e.ClockRacetext;

                    if (names.length > 0) {

                        if (params.isCountdownClock) {
                            rolexClockRacetext = ClockRacetext[0];
                            $('#racetext').html(rolexClockRacetext);
                        }
                        changeBg('full');

                        params.theLocalText = timeText[0];
                        params.theCityText = names[0];
                        params.customOffset = timezones[0],
                                params.theCity = (names[0].toLowerCase()).trim();
                        /*params.theCityText1 = "";
                         params.customOffset1 = "",
                         params.theCity1 = "";
                         params.theCityText2 = "";
                         params.customOffset2 = "",
                         params.theCity2 = "";*/
                        params.customDST = timezone_dst[0];

                        document.getElementById("cityText").innerHTML = params.theCityText;
                        document.getElementById("localtext").innerHTML = params.theLocalText;
                        document.getElementById("city-link").title = params.theCityText.replace('"', '&quot;');
                        document.getElementById("local-link").title = params.theLocalText.replace('"', '&quot;');
                        //document.getElementById("city-link").href = '#' + params.theCityText.replace('"', '&quot;').replace(' ', '_');
                        //document.getElementById("local-link").href = '#' + params.theLocalText.replace('"', '&quot;').replace(' ', '_');
                        /*UPDATE SMILE, KEEP THE BASE URL - START */
                        document.getElementById("city-link").href = document.URL + '#' + params.theCityText.replace('"', '&quot;').replace(' ', '_');
                        document.getElementById("local-link").href = document.URL + '#' + params.theLocalText.replace('"', '&quot;').replace(' ', '_');
                        /*UPDATE SMILE, KEEP THE BASE URL - END */

                        if (params.upperCase == true) {
                            document.getElementById("cityText").style.textTransform = "uppercase";
                            document.getElementById("localtext").style.textTransform = "uppercase";
                        }

                    } else {
// si aucun actif
                        if (params.isCountdownClock) {
                            document.getElementById("cityText").innerHTML = '&nbsp;';
                            document.getElementById("localtext").innerHTML = '&nbsp;';
                            document.getElementById("city-link").title = '&nbsp;';
                            document.getElementById("local-link").title = '&nbsp;';
                            document.getElementById("city-link").href = '#';
                            document.getElementById("local-link").href = '#';
                            if (params.upperCase == true) {
                                document.getElementById("cityText").style.textTransform = "uppercase";
                                document.getElementById("localtext").style.textTransform = "uppercase";
                            }
                        } else {

                            changeBg();
                            if (params.showTime == true) {
                                document.getElementById("block-control").removeChild(blockCity);
                                document.getElementById("block-control").removeChild(blockLocal);
                            } else {
                                document.getElementById("cityText").innerHTML = params.theCityText;
                                document.getElementById("localtext").innerHTML = params.theLocalText;
                                document.getElementById("city-link").title = params.theCityText.replace('"', '&quot;');
                                document.getElementById("local-link").title = params.theLocalText.replace('"', '&quot;');
                                document.getElementById("city-link").href = '#' + params.theCityText.replace('"', '&quot;').replace(' ', '_');
                                document.getElementById("local-link").href = '#' + params.theLocalText.replace('"', '&quot;').replace(' ', '_');
                                if (params.upperCase == true) {
                                    document.getElementById("cityText").style.textTransform = "uppercase";
                                    document.getElementById("localtext").style.textTransform = "uppercase";
                                }
                            }
                        }
                    }


                    var thenewOffset,
                            customOffset,
                            elem;

                    blockLocal.onclick = function() {

                        $('.' + params.blockClass + '.' + params.activeClass).removeClass(params.activeClass);
                        $(this).addClass(params.activeClass);

                        showCurrentTime();

                        // callback
                        return params.onclickYourtime();
                    };
                    blockCity.onclick = function() {

                        $('.' + params.blockClass + '.' + params.activeClass).removeClass(params.activeClass);
                        $(this).addClass(params.activeClass);

                        showTimeIn(params.theCity, params.customOffset, "", params.customDST);

                        // callback
                        return params.onclickCity();
                    };




                    function updateShownTimeInHTMLComponentOvertime() {
                        updateShownTimeInHTMLComponent();
                        // timeoutID = window.setTimeout("updateShownTimeInHTMLComponentOvertime()", 100)
                        requestAnimFrame(updateShownTimeInHTMLComponentOvertime());
                    }

                    function showTimeIn(a, offset, elem, DST_TiMEZONE) {
                        if (params.isCountdownClock) {
                            var now = new Date;
                            var tempOffset = now.getTimezoneOffset();
                            if (params.theCityText !== '' && elem == "") {
                                if (a) {
                                    if (names.length > 0) {
                                        tempOffset += 60 * timezones[0];
                                        gettimezoneDST = getDST(new Date(), params.customDST);
                                        if (gettimezoneDST == 100) {
                                            // Si heure d'‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á¬¨¬®¬¨¬Æ¬¨¬®¬¨¬©t‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á¬¨¬®¬¨¬Æ¬¨¬®¬¨¬© au lieu de l'‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á¬¨¬®¬¨¬Æ¬¨¬®¬¨¬©v‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á¬¨¬®¬¨¬Æ‚Äö√†√∂‚àö√∫nement
                                            tempOffset += 60;// on ajoute 1h du DST
                                        }

                                        if (params.clocktimeAtEvent) {
                                            // si fuseau horaire local est en DST, on ajoute 1h
                                            var dstMinutes = now.dst() ? 60 : 0;
                                            rolexClockCountdown = new Date(cdYear[0], parseInt(cdMonth[0]) - 1, cdDay[0], parseInt(cdHour[0]), parseInt(cdMin[0]) + dstMinutes);
                                            cityTime(tempOffset, timezones[0], '');
                                            rolexClockCountdownCalc = foreignToLocal(rolexClockCountdown, timezones[0] * 100, timezone_dst[0]);
                                            setMinutesOffset(tempOffset); // Correct to time at event location
                                        } else {
                                            // on test la date de l'event du visiteur
                                            var event = foreignToLocal(new Date(cdYear[0], parseInt(cdMonth[0]) - 1, cdDay[0], parseInt(cdHour[0]), parseInt(cdMin[0])), timezones[0] * 100, timezone_dst[0]);
                                            // on retient la diff‚àö¬©rence entre l'offset courant et le std offset ‚àö‚Ä† la date de l'event
                                            var dstMinutes = now.dst() && !event.dst() ? -60 :
                                                    !now.dst() && event.dst() ? -60 : 0;
                                            cityTime(tempOffset, timezones[0], '');
                                            // on r‚àö¬©cup‚àö¬Ære le bon countdown
                                            rolexClockCountdownCalc = foreignToLocal(new Date(cdYear[0], parseInt(cdMonth[0]) - 1, cdDay[0], parseInt(cdHour[0]), parseInt(cdMin[0]) + dstMinutes), timezones[0] * 100, timezone_dst[0]);
                                            //setMinutesOffset(tempOffset);
                                        }
                                    }
                                }
                            }
                        } else {
                            var b = new Date;
                            var tempOffset = b.getTimezoneOffset();
                            today = b.getFullYear() + "-" + b.getMonth() + "-" + b.getDate() + "-" + b.getHours();
                            if (params.theCityText !== '' && elem == "") {
                                if (a) {
                                    if ((names[0]).replace(/\+\b/gi, ' ') == params.theCityText) {
                                        tempOffset += 60 * timezones[0];
                                        gettimezoneDST = getDST(new Date(), params.customDST);
                                        if (gettimezoneDST == 100) {
                                            tempOffset += 60;
                                        }
                                        cityTime(tempOffset, timezones[0], '');
                                        setMinutesOffset(tempOffset);
                                    }
                                }
                            }
                        }
                    }
                    /* timezone text clock */

                    function cityTime(thenewOffset, customOffset, elem) {
                        var cityTime = new Date();
                        cityTime.setHours(cityTime.getHours());
                        cityTime.setMinutes(cityTime.getMinutes() + thenewOffset);
                        cityTime.setSeconds(cityTime.getSeconds());
                        var cityTime_millisecondes = cityTime.getMilliseconds();
                        var cityTime_seconds = cityTime.getSeconds();
                        var cityTime_minutes = cityTime.getMinutes();
                        var cityTime_hours = cityTime.getHours();
                        var cityTime_day = cityTime.getDay();
                        if (cityTime_day == 0) {
                            var f = "Sun"
                        } else if (cityTime_day == 1) {
                            var f = "Mon"
                        } else if (cityTime_day == 2) {
                            var f = "Tue"
                        } else if (cityTime_day == 3) {
                            var f = "Wed"
                        } else if (cityTime_day == 4) {
                            var f = "Thu"
                        } else if (cityTime_day == 5) {
                            var f = "Fri"
                        } else if (cityTime_day == 6) {
                            var f = "Sat"
                        }
                        // console.log(cityTime_hours)
                        if (params.amPm == true) {
                            var g = " ";
                            if (cityTime_hours >= 12) {
                                g = " PM"
                            } else {
                                g = " AM"
                            }
                        } else {
                            g = ""
                        }
                        if (params.time24hours == true) {
                            g = ""
                        } else {
                            if (cityTime_hours >= 13) {
                                cityTime_hours -= 12
                            } else if (cityTime_hours == 0) {
                                cityTime_hours = 12
                            }
                        }
                        if (params.trailingZero == true) {
                            if (cityTime_hours < 10) {
                                cityTime_hours = "0" + cityTime_hours
                            }
                        }

                        if (cityTime_minutes < 10)
                            cityTime_minutes = "0" + cityTime_minutes;

                        if (params.showText == true) {
                            if (params.showDay == true) {
                                f = f;
                            } else {
                                f = "";
                            }
                        }


                        function updateText(updated) {
                            if (cityTime_seconds >= 0 && cityTime_seconds < 1) {
                                update = document.getElementById("rolexClockCityTime" + elem + "").innerHTML = f + " " + cityTime_hours + ":" + cityTime_minutes + "" + g;
                                updateTime(thenewOffset, customOffset, elem);

                            } else {
                                if (checked === undefined && params.showTime == false) {
                                    update = document.getElementById("rolexClockCityTime" + elem + "").innerHTML = f + " " + cityTime_hours + ":" + cityTime_minutes + "" + g;
                                    var checked = 1;
                                    updateTime(thenewOffset, customOffset, elem);
                                }

                            }
                        }
                        requestAnimFrame(updateText);
                    }

                    function updateTime(thenewOffset, customOffset, elem) {
                        cityTime(thenewOffset, customOffset, elem);
                    }
                    /* yourtime text clock */
                    function yourTime() {
                        var a = new Date;
                        a.setHours(a.getHours());
                        a.setMinutes(a.getMinutes());
                        a.setSeconds(a.getSeconds());
                        var b = a.getSeconds();
                        var c = a.getMinutes();
                        var d = a.getHours();
                        var e = a.getDay();
                        if (e == 0) {
                            var f = "Sun"
                        } else if (e == 1) {
                            var f = "Mon"
                        } else if (e == 2) {
                            var f = "Tue"
                        } else if (e == 3) {
                            var f = "Wed"
                        } else if (e == 4) {
                            var f = "Thu"
                        } else if (e == 5) {
                            var f = "Fri"
                        } else if (e == 6) {
                            var f = "Sat"
                        }
                        if (params.amPm == true) {
                            var g = " ";
                            if (d >= 12) {
                                g = " PM"
                            } else {
                                g = " AM"
                            }
                        } else {
                            g = ""
                        }
                        if (params.time24hours == true) {
                            g = ""
                        } else {
                            if (d >= 13) {
                                d -= 12
                            }
                        }
                        if (params.trailingZero == true) {
                            if (d < 10) {
                                d = "0" + d
                            }
                        }
                        if (c < 10)
                            c = "0" + c;

                        if (params.showText == true) {
                            if (params.showDay == true) {
                                f = f;
                            } else {
                                f = "";
                            }
                            if (!params.showTime) {
                                update = document.getElementById("rolexClockYourTime").innerHTML = f + " " + d + ":" + c + "" + g;
                            }
                        }
                        if (params.upperCase == true) {
                            document.getElementById("rolexClockYourTime").style.textTransform = "uppercase"
                        }
                        requestAnimFrame(yourTime);
                    }

                    function showCurrentTime() {
                        setMinutesOffset(0)
                    }

                    function updateShownTimeInHTMLComponent() {
                        tempString = getCurrentShownTime()
                    }
                    // cityTime();

                    if (params.theCity != '') {
                        showTimeIn(params.theCity, params.customOffset, "");
                    }

                    // showCurrentTime();

                    yourTime();
                }

                startWatchEngine();

                showClock();

                if (params.isCountdownClock) {
// start countdown
                    startCountdownPlugin(rolexClockLanguage, rolexClockCountdownCalc);

                }

            } else if (!params.forceFallback && (params.forceFlash || Modernizr.canvas == false || document.compatMode != 'Quirks' || oldIE == true)) {

                flashMode = true;
                if (params.isCountdownClock) {

                    container.style.display = 'block';

                    var language = params.LANG;
                    var language = language.toLowerCase();
                    var now_date = new Date();

                    $('.fallback').css('display', 'none');// cache les blocks de fallback

                    var year = now_date.getFullYear();
                    var month = now_date.getMonth() + 1;
                    var day = now_date.getDate();
                    if (month < 10) {
                        month = "0" + month;
                    }
                    if (day < 10) {
                        day = "0" + day;
                    }
                    var names = [];
                    var timezones = [];
                    var timezone_dst = [];
                    var timeText = [];
                    var cdYear = [];
                    var cdMonth = [];
                    var cdDay = [];
                    var cdHour = [];
                    var cdMin = [];
                    var ClockRacetext = [];
                    var flashcustomOffset = [];
                    var todayfull = Number(year + "" + month + "" + day);
                    String.prototype.trim = function() {
                        return this.replace(/\s/g, "");
                    }

                    var index;
                    for (var i = 1; i < Events.length; i++) {
                        if (todayfull >= Events[i].startDate && todayfull <= Events[i].endDate) {
                            index = i;
                            if (language == '') {
                                names.push(Events[i].city['en']);
                            } else {
                                names.push(Events[i].city[language]);
                                timeText.push(Events[i].timeText[language]);
                            }

                            timezones.push(Events[i].timezone);
                            timezone_dst.push(Events[i].dst);

                            //console.log(cdYear, cdYear[0], cdMonth[0] - 1, cdDay[i], cdHour[i])
                            cdYear.push(Events[i].cdyear);
                            cdMonth.push(Events[i].cdmonth);
                            cdDay.push(Events[i].cdday);
                            cdHour.push(Events[i].cdhour);
                            cdMin.push(Events[i].cdmin);

                            ClockRacetext.push(Events[i].city['cdwText']);
                            rolexClockRacetext = ClockRacetext[0];

                            flashcustomOffset.push(Math.round(Events[i].timezone * 100).toString());
//                        if (flashcustomOffset.length === 3 && flashcustomOffset.charAt(1) != 0) {
//                            var indexToReplace = 1;
//                            var stringToPutIn = 3;
//                            var temp = flashcustomOffset;
//                            var startString = temp.substr(0, indexToReplace);
//                            var endString = temp.substring(indexToReplace + 1);
//                            flashcustomOffset = startString + stringToPutIn + endString;
//
//                        } else if (flashcustomOffset.length === 4 && flashcustomOffset.charAt(2) != 0) {
//                            var indexToReplace = 2;
//                            var stringToPutIn = 3;
//                            var temp = flashcustomOffset;
//                            var startString = temp.substr(0, indexToReplace);
//                            var endString = temp.substring(indexToReplace + 1);
//                            flashcustomOffset = startString + stringToPutIn + endString;
//
//                        }
                        }

                        if (names.length > 0) {

                            rolexClockCountdown = new Date(cdYear[0], cdMonth[0] - 1, cdDay[0], cdHour[0], cdMin[0]);
                            params.theLocalText = timeText[0];
                            if (cdMonth[0] < 10) {
                                cdMonth[0] = parseInt("0") + cdMonth[0];
                            }
                            if (cdDay[0] < 10) {
                                cdDay[0] = parseInt("0") + cdDay[0];
                            }

                            //console.log(cdYear+""+cdMonth+""+cdDay);
                            //console.log(todayfull)
                            if ((cdYear[0] + "" + cdMonth[0] + "" + cdDay[0]) >= todayfull) {
                                // still countdown
                                document.getElementById("rolexClockWim-container").style.background = "";

//                            document.getElementById("rolexClockWim-container").innerHTML = '<object width="' + params.contentWidth + '" height="' + params.contentHeight + '" align="middle" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,,," id="rolex-clock">'
//                                    + '<param name="quality" value="high" />'
//                                    + '<param name="wmode" value="" />'
//                                    + '<param name="movie" value="img/' + params.flashname + '.swf?location=' + names[0] + '&amp;offset=' + flashcustomOffset[0] + '&amp;dst=' + eval(timezone_dst[0]) + '&event_text=' + rolexClockRacetext + '&amp;event_start_date=' + cdYear[0] + '-' + cdMonth[0] + '-' + cdDay[0] + '&amp;event_start_time=' + cdHour[0] + '' + cdMin[0] + '" />'
//                                    + '<embed src="img/' + params.flashname + '.swf?location=' + names[0] + '&amp;offset=' + flashcustomOffset[0] + '&amp;dst=' + eval(timezone_dst[0]) + '&event_text=' + rolexClockRacetext + '&amp;event_start_date=' + cdYear[0] + '-' + cdMonth[0] + '-' + cdDay[0] + '&amp;event_start_time=' + cdHour[0] + '' + cdMin[0] + '" width="' + params.contentWidth + '" height="' + params.contentHeight + '" quality="high" bgcolor="" name="rolex-clock" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />'
//                                    + '<a href="' + params.trackingurl + '" title="Rolex" target="_blank">'
//                                    + '<img class="no-border" src="img/' + params.flashname + params.fallbackFileExtension + '" alt="Rolex">'
//                                    + '</a>'
//                                    + '</object>';

                                var ih = '    <!-- flash -->'
                                        + '    <object width="' + params.contentWidth + '" height="' + params.contentHeight + '" type="application/x-shockwave-flash" data="typo3conf/ext/denned_content/Resources/Public/img/' + params.flashname + '.swf?location=' + names[0] + '&amp;offset=' + flashcustomOffset[0] + '&amp;dst=' + eval(timezone_dst[0]) + '&event_text=' + rolexClockRacetext + '&amp;event_start_date=' + cdYear[0] + '-' + cdMonth[0] + '-' + cdDay[0] + '&amp;event_start_time=' + cdHour[0] + '' + cdMin[0] + '">'
                                        + '        <!-- Firefox uses the `data` attribute above, IE/Safari uses the param below -->'
                                        + '        <param name="movie" value="typo3conf/ext/denned_content/Resources/Public/img/' + params.flashname + '.swf?location=' + names[0] + '&amp;offset=' + flashcustomOffset[0] + '&amp;dst=' + eval(timezone_dst[0]) + '&event_text=' + rolexClockRacetext + '&amp;event_start_date=' + cdYear[0] + '-' + cdMonth[0] + '-' + cdDay[0] + '&amp;event_start_time=' + cdHour[0] + '' + cdMin[0] + '" />'
                                        + '        <param name="wmode" value="transparent"> '
                                        + '        <param name="flashvars" value="image=' + params.flashname + params.fallbackFileExtension + '" />'
                                        + '        <!-- fallback image -->'
                                        + '        <a href="' + params.trackingurl + '" target="_blank" style="margin:0px;padding:0px;border:0;position:absolute;width:' + params.trackUrlW + 'px;height:' + params.trackUrlH + 'px;display:block;z-index:60;text-decoration:none;">'
                                        + '            <img src="typo3conf/ext/denned_content/Resources/Public/img/' + params.flashname + params.fallbackFileExtension + '" width="' + params.contentWidth + '" height="' + params.contentHeight + '" alt="Rolex" class="no-border" />'
                                        + '        </a>'
                                        + '    </object>'
                                        + '';
                                document.getElementById("rolexClockWim-container").innerHTML = ih;
                            } else {
                                // no countdown
                                document.getElementById("rolexClockWim-container").style.background = "";

//                            document.getElementById("rolexClockWim-container").innerHTML = '<object width="' + params.contentWidth + '" height="' + params.contentHeight + '" align="middle" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,,," id="rolex-clock">'
//                                    + '<param name="quality" value="high" />'
//                                    + '<param name="wmode" value="" />'
//                                    + '<param name="movie" value="img/' + params.flashname + '.swf?location=' + names[0] + '&amp;offset=' + flashcustomOffset[0] + '&amp;dst=' + eval(timezone_dst[0]) + '" />'
//                                    + '<embed src="img/' + params.flashname + '.swf?location=' + names[0] + '&amp;offset=' + flashcustomOffset[0] + '&amp;dst=' + eval(timezone_dst[0]) + '" width="' + params.contentWidth + '" height="' + params.contentHeight + '" quality="high" bgcolor="" name="rolex-clock" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />'
//                                    + '<a href="' + params.trackingurl + '" title="Rolex" target="_blank">'
//                                    + '<img class="noborder" src="img/' + params.flashname + params.fallbackFileExtension + '" alt="Rolex">'
//                                    + '</a>'
//                                    + '</object>';

                                var ih = '    <!-- flash -->'
                                        + '    <object width="' + params.contentWidth + '" height="' + params.contentHeight + '" type="application/x-shockwave-flash" data="typo3conf/ext/denned_content/Resources/Public/img/' + params.flashname + '.swf?location=' + names[0] + '&amp;offset=' + flashcustomOffset[0] + '&amp;dst=' + eval(timezone_dst[0]) + '">'
                                        + '        <!-- Firefox uses the `data` attribute above, IE/Safari uses the param below -->'
                                        + '        <param name="movie" value="typo3conf/ext/denned_content/Resources/Public/img/' + params.flashname + '.swf?location=' + names[0] + '&amp;offset=' + flashcustomOffset[0] + '&amp;dst=' + eval(timezone_dst[0]) + '" />'
                                        + '        <param name="wmode" value="transparent"> '
                                        + '        <param name="flashvars" value="image=' + params.flashname + params.fallbackFileExtension + '" />'
                                        + '        <!-- fallback image -->'
                                        + '        <a href="' + params.trackingurl + '" target="_blank" style="margin:0px;padding:0px;border:0;position:absolute;width:' + params.trackUrlW + 'px;height:' + params.trackUrlH + 'px;display:block;z-index:60;text-decoration:none;">'
                                        + '            <img src="typo3conf/ext/denned_content/Resources/Public/img/' + params.flashname + params.fallbackFileExtension + '" width="' + params.contentWidth + '" height="' + params.contentHeight + '" alt="Rolex" class="no-border" />'
                                        + '        </a>'
                                        + '    </object>'
                                        + '';
                                document.getElementById("rolexClockWim-container").innerHTML = ih;
                            }
                        }
                    }

                    showClock();
                } else {
                    var e = loadListofdates();
                    var names = e.names;
                    var timezones = e.timezones;
                    var timezone_dst = e.timezone_dst;
                    var timeText = e.timeText;

                    if (names.length > 0) {

                        var flashcustomOffset = Math.round(timezones[0] * 100).toString();

                        if (flashcustomOffset.charAt(1) == "3" || flashcustomOffset.charAt(2) == "3") {
                            flashcustomOffset = flashcustomOffset.replace(/3/g, "5");
                        }


                        document.getElementById("rolexClockWim-container").style.background = "";
                        //                var ih = '<a id="trackUrl" href="" target="_blank" class="rolexClockWim-backToRolex" style="margin:0px;padding:0px;border:0;position:absolute;width:' + params.trackUrlW + 'px;height:' + params.trackUrlH + 'px;display:block;z-index:60;text-decoration:none;"></a>'
                        //                        + '<object width="' + params.contentWidth + '" height="' + params.contentHeight + '" style="width:' + params.contentWidth + 'px;height:' + params.contentHeight + 'px;display:block;" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,,," id="rolex-clock">'
                        //                        + '<param name="quality" value="high" /><param name="wmode" value="" />'
                        //                        + '<param name="movie" value="img/' + params.flashname + '.swf?location=' + params.theCityText + '&offset=' + flashcustomOffset + '&dst=' + eval(timezone_dst[0]) + '" />'
                        //                        + '<embed src="img/' + params.flashname + '.swf?location=' + params.theCityText + '&offset=' + flashcustomOffset + '&dst=' + eval(timezone_dst[0]) + '" width="' + params.contentWidth + '" height="' + params.contentHeight + '" quality="high" bgcolor="" name="rolex-clock" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />'
                        //                        + '<a href="' + params.trackingurl + '" title="Rolex" target="_blank">'
                        //                        + '<img class="no-border" src="img/' + params.flashname + params.fallbackFileExtension + '" alt="Rolex">'
                        //                        + '</a>'
                        //                        + '</object>';
                        //                document.getElementById("rolexClockWim-container").innerHTML = ih;
                        //                document.getElementById("trackUrl").href = params.trackingurl;

                        var ih = '    <!-- flash -->'
                                + '    <object width="' + params.contentWidth + '" height="' + params.contentHeight + '" type="application/x-shockwave-flash" data="typo3conf/ext/denned_content/Resources/Public/img/' + params.flashname + '.swf?location=' + names[0] + '&amp;offset=' + flashcustomOffset + '&amp;dst=' + eval(timezone_dst[0]) + '">'
                                + '        <!-- Firefox uses the `data` attribute above, IE/Safari uses the param below -->'
                                + '        <param name="movie" value="typo3conf/ext/denned_content/Resources/Public/img/' + params.flashname + '.swf?location=' + names[0] + '&amp;offset=' + flashcustomOffset + '&amp;dst=' + eval(timezone_dst[0]) + '" />'
                                + '        <param name="wmode" value="transparent"> '
                                + '        <param name="flashvars" value="image=' + params.flashname + params.fallbackFileExtension + '" />'
                                + '        <!-- fallback image -->'
                                + '        <a href="' + params.trackingurl + '" target="_blank" style="margin:0px;padding:0px;border:0;position:absolute;width:' + params.trackUrlW + 'px;height:' + params.trackUrlH + 'px;display:block;z-index:60;text-decoration:none;">'
                                + '            <img src="typo3conf/ext/denned_content/Resources/Public/img/' + params.flashname + params.fallbackFileExtension + '" width="' + params.contentWidth + '" height="' + params.contentHeight + '" alt="Rolex" title="Rolex" class="no-border" />'
                                + '        </a>'
                                + '    </object>'
                                + '';

                        document.getElementById("rolexClockWim-container").innerHTML = ih;

                        showClock();
                    }
                }
            } else {
                // fallback
                $('.fallback').show();
//                document.getElementById("rolexClockWim-container").style.background = "";
//                var ih = '<a id="trackUrl" href="" target="_blank" class="rolexClockWim-backToRolex" style="margin:0px;padding:0px;border:0;display:block;z-index:60;text-decoration:none; height:' + params.contentHeight + 'px;">'
//                        + '<img src="img/' + params.flashname + params.fallbackFileExtension + '" alt="Rolex" />'
//                        + '</a>';
//                document.getElementById("rolexClockWim-container").innerHTML = ih;
//                document.getElementById("trackUrl").href = params.trackingurl;
            }
        }


        /**
         * Callback function called when countdown has expired
         * @returns {undefined}
         */
        function expiration() {
            if (!flashMode) {
                // si pas flash
                $('.countdown').hide();
            }
            // add class for triggering styles without CD
            $('.content').removeClass('has-countdown').addClass('no-countdown');
        }

        /**
         * Start countdown plugin.
         * @param {string} lang The language (ex: "en")
         * @returns {undefined}
         */
        function startCountdownPlugin(lang, expirationTime)
        {

            if (lang == "fr") {
                $.countdown.regional['fr'] = {
                    labels: ['Ann‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚àö√´‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√Ñ√∂‚àö√ë‚Äö√Ñ‚Ä†‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√Ñ√∂‚àö‚Ä†‚àö√°¬¨¬®¬¨¬Æ¬¨¬®¬¨√Ü¬¨¬®¬¨¬Æ¬¨¬®¬¨¬©es', 'Mois', 'Semaines', 'Jours', 'Heures', 'Min', 'Sec'],
                    labels1: ['Ann‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚àö√´‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√Ñ√∂‚àö√ë‚Äö√Ñ‚Ä†‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√Ñ√∂‚àö‚Ä†‚àö√°¬¨¬®¬¨¬Æ¬¨¬®¬¨√Ü¬¨¬®¬¨¬Æ¬¨¬®¬¨¬©e', 'Mois', 'Semaine', 'Jour', 'Heure', 'Min', 'Sec'],
                    compactLabels: ['a', 'm', 's', 'j'],
                    whichLabels: function(amount) {
                        return (amount > 1 ? 0 : 1);
                    },
                    timeSeparator: ':',
                    isRTL: false
                };
                $.countdown.setDefaults($.countdown.regional['fr']);
            } else if (lang == "zhs") {
                $.countdown.regional['zh-CN'] = {
                    labels: ['‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂¬¨‚àû‚Äö√Ñ√∂‚àö¬¢‚àö‚Ä†‚Äö√†√∂¬¨¬Æ‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂‚àö¬¥¬¨¬®¬¨¬Æ¬¨¬®¬¨√Ü‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚àö√´¬¨¬®¬¨¬¢', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ¬¨¬®‚àö√º‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†¬¨¬®¬¨‚Ä¢‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚àö√´‚Äö√Ñ√∂‚àö√ë‚Äö√Ñ‚Ä†', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂¬¨‚àû‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á¬¨¬®¬¨¬Æ¬¨¬®‚Äö√Ñ¬¢¬¨¬®¬¨¬Æ¬¨¬®¬¨√Ü‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂‚àö‚à´', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂¬¨‚àû¬¨¬®¬¨¬Æ¬¨¬®¬¨√Ü‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂¬¨‚à´¬¨¬®¬¨¬Æ¬¨¬®¬¨√Ü¬¨¬®¬¨¬Æ¬¨¬®¬¨¬©', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ¬¨¬®‚àö√º‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂¬¨¬¢‚Äö√Ñ√∂‚àö√ë¬¨¬¢‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚àö√´‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√Ñ√∂‚àö√ë‚Äö√Ñ‚Ä†‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂¬¨‚àû', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂¬¨‚àû‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚àö√´‚Äö√Ñ√∂‚àö√ë‚Äö√Ñ‚Ä†‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√Ñ√∂‚àö‚Ä†¬¨¬•', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂‚àö¬±‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ¬¨¬®‚Äö√†¬¥‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂¬¨¬¢‚Äö√Ñ√∂‚àö√ë‚Äö√Ñ‚Ä†'],
                    labels1: ['‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂¬¨‚àû‚Äö√Ñ√∂‚àö¬¢‚àö‚Ä†‚Äö√†√∂¬¨¬Æ‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂‚àö¬¥¬¨¬®¬¨¬Æ¬¨¬®¬¨√Ü‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚àö√´¬¨¬®¬¨¬¢', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ¬¨¬®‚àö√º‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†¬¨¬®¬¨‚Ä¢‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚àö√´‚Äö√Ñ√∂‚àö√ë‚Äö√Ñ‚Ä†', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂¬¨‚àû‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á¬¨¬®¬¨¬Æ¬¨¬®‚Äö√Ñ¬¢¬¨¬®¬¨¬Æ¬¨¬®¬¨√Ü‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂‚àö‚à´', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂¬¨‚àû¬¨¬®¬¨¬Æ¬¨¬®¬¨√Ü‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂¬¨‚à´¬¨¬®¬¨¬Æ¬¨¬®¬¨√Ü¬¨¬®¬¨¬Æ¬¨¬®¬¨¬©', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ¬¨¬®‚àö√º‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂¬¨¬¢‚Äö√Ñ√∂‚àö√ë¬¨¬¢‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚àö√´‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√Ñ√∂‚àö√ë‚Äö√Ñ‚Ä†‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂¬¨‚àû', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂¬¨‚àû‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚àö√´‚Äö√Ñ√∂‚àö√ë‚Äö√Ñ‚Ä†‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√Ñ√∂‚àö‚Ä†¬¨¬•', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂‚àö¬±‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ¬¨¬®‚Äö√†¬¥‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂¬¨¬¢‚Äö√Ñ√∂‚àö√ë‚Äö√Ñ‚Ä†'],
                    compactLabels: ['‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂¬¨‚àû‚Äö√Ñ√∂‚àö¬¢‚àö‚Ä†‚Äö√†√∂¬¨¬Æ‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂‚àö¬¥¬¨¬®¬¨¬Æ¬¨¬®¬¨√Ü‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚àö√´¬¨¬®¬¨¬¢', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ¬¨¬®‚àö√º‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†¬¨¬®¬¨‚Ä¢‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚àö√´‚Äö√Ñ√∂‚àö√ë‚Äö√Ñ‚Ä†', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂¬¨‚àû‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á¬¨¬®¬¨¬Æ¬¨¬®‚Äö√Ñ¬¢¬¨¬®¬¨¬Æ¬¨¬®¬¨√Ü‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂‚àö‚à´', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂¬¨‚àû¬¨¬®¬¨¬Æ¬¨¬®¬¨√Ü‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂¬¨‚à´¬¨¬®¬¨¬Æ¬¨¬®¬¨√Ü¬¨¬®¬¨¬Æ¬¨¬®¬¨¬©'],
                    compactLabels1: ['‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂¬¨‚àû‚Äö√Ñ√∂‚àö¬¢‚àö‚Ä†‚Äö√†√∂¬¨¬Æ‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂‚àö¬¥¬¨¬®¬¨¬Æ¬¨¬®¬¨√Ü‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚àö√´¬¨¬®¬¨¬¢', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ¬¨¬®‚àö√º‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†¬¨¬®¬¨‚Ä¢‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚àö√´‚Äö√Ñ√∂‚àö√ë‚Äö√Ñ‚Ä†', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂¬¨‚àû‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á¬¨¬®¬¨¬Æ¬¨¬®‚Äö√Ñ¬¢¬¨¬®¬¨¬Æ¬¨¬®¬¨√Ü‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂‚àö‚à´', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂¬¨‚àû¬¨¬®¬¨¬Æ¬¨¬®¬¨√Ü‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂¬¨‚à´¬¨¬®¬¨¬Æ¬¨¬®¬¨√Ü¬¨¬®¬¨¬Æ¬¨¬®¬¨¬©'],
                    whichLabels: null,
                    timeSeparator: ':',
                    isRTL: false
                };
                $.countdown.setDefaults($.countdown.regional['zh-CN']);
            } else if (lang == "ja") {
                $.countdown.regional['ja'] = {
                    labels: ['‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂¬¨‚àû‚Äö√Ñ√∂‚àö¬¢‚àö‚Ä†‚Äö√†√∂¬¨¬Æ‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂‚àö¬¥¬¨¬®¬¨¬Æ¬¨¬®¬¨√Ü‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚àö√´¬¨¬®¬¨¬¢', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ¬¨¬®‚àö√º‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†¬¨¬®¬¨‚Ä¢‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚àö√´‚Äö√Ñ√∂‚àö√ë‚Äö√Ñ‚Ä†', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√Ñ√∂‚àö√ë‚Äö√Ñ‚Ä†‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂¬¨¬•¬¨¬®¬¨¬Æ¬¨¬®¬¨√Ü¬¨¬®¬¨¬Æ¬¨¬®¬¨¬±', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ¬¨¬®‚àö√º‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂¬¨¬¢‚Äö√Ñ√∂‚àö√ë¬¨¬¢‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚àö√´‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂‚àö¬¥¬¨¬®¬¨¬Æ¬¨¬®¬¨¬¢', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ¬¨¬®‚àö√º‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á¬¨¬®¬¨¬Æ‚Äö√Ñ√∂‚àö√ë¬¨¬¢‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ¬¨¬®‚Äö√†√ª', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂¬¨‚àû‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚àö√´‚Äö√Ñ√∂‚àö√ë‚Äö√Ñ‚Ä†‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√Ñ√∂‚àö‚Ä†¬¨¬•', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂‚àö¬±‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ¬¨¬®‚Äö√†¬¥‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂¬¨¬¢‚Äö√Ñ√∂‚àö√ë‚Äö√Ñ‚Ä†'],
                    labels1: ['‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂¬¨‚àû‚Äö√Ñ√∂‚àö¬¢‚àö‚Ä†‚Äö√†√∂¬¨¬Æ‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂‚àö¬¥¬¨¬®¬¨¬Æ¬¨¬®¬¨√Ü‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚àö√´¬¨¬®¬¨¬¢', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ¬¨¬®‚àö√º‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†¬¨¬®¬¨‚Ä¢‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚àö√´‚Äö√Ñ√∂‚àö√ë‚Äö√Ñ‚Ä†', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√Ñ√∂‚àö√ë‚Äö√Ñ‚Ä†‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂¬¨¬•¬¨¬®¬¨¬Æ¬¨¬®¬¨√Ü¬¨¬®¬¨¬Æ¬¨¬®¬¨¬±', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ¬¨¬®‚àö√º‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂¬¨¬¢‚Äö√Ñ√∂‚àö√ë¬¨¬¢‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚àö√´‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂‚àö¬¥¬¨¬®¬¨¬Æ¬¨¬®¬¨¬¢', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ¬¨¬®‚àö√º‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á¬¨¬®¬¨¬Æ‚Äö√Ñ√∂‚àö√ë¬¨¬¢‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ¬¨¬®‚Äö√†√ª', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂¬¨‚àû‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚àö√´‚Äö√Ñ√∂‚àö√ë‚Äö√Ñ‚Ä†‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√Ñ√∂‚àö‚Ä†¬¨¬•', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂‚àö¬±‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ¬¨¬®‚Äö√†¬¥‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂¬¨¬¢‚Äö√Ñ√∂‚àö√ë‚Äö√Ñ‚Ä†'],
                    compactLabels: ['‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂¬¨‚àû‚Äö√Ñ√∂‚àö¬¢‚àö‚Ä†‚Äö√†√∂¬¨¬Æ‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂‚àö¬¥¬¨¬®¬¨¬Æ¬¨¬®¬¨√Ü‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚àö√´¬¨¬®¬¨¬¢', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ¬¨¬®‚àö√º‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†¬¨¬®¬¨‚Ä¢‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚àö√´‚Äö√Ñ√∂‚àö√ë‚Äö√Ñ‚Ä†', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√Ñ√∂‚àö√ë‚Äö√Ñ‚Ä†‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂¬¨¬•¬¨¬®¬¨¬Æ¬¨¬®¬¨√Ü¬¨¬®¬¨¬Æ¬¨¬®¬¨¬±', '‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ¬¨¬®‚àö√º‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂¬¨¬¢‚Äö√Ñ√∂‚àö√ë¬¨¬¢‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚àö√´‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö‚Ä†‚àö‚àÇ‚Äö√†√∂‚àö¬¥¬¨¬®¬¨¬Æ¬¨¬®¬¨¬¢'],
                    whichLabels: null,
                    digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                    timeSeparator: ':', isRTL: false};
                $.countdown.setDefaults($.countdown.regional['ja']);

            } else if (lang == "de") {
                $.countdown.regional['de'] = {
                    labels: ['Jahre', 'Monate', 'Wochen', 'Tage', 'Stunden', 'Min', 'Sek'],
                    labels1: ['Jahr', 'Monat', 'Woche', 'Tag', 'Stunde', 'Min', 'Sek'],
                    compactLabels: ['J', 'M', 'W', 'T'],
                    whichLabels: null,
                    digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                    timeSeparator: ':', isRTL: false};
                $.countdown.setDefaults($.countdown.regional['de']);
            } else if (lang == "ru") {
                $.countdown.regional['ru'] = {
                    labels: ['???', '???????', '??????', '????', '?????', '?????', '??????'],
                    labels1: ['???', '?????', '??????', '????', '???', '??????', '???????'],
                    labels2: ['????', '??????', '??????', '???', '????', '??????', '???????'],
                    compactLabels: ['?', '?', '?', '?'], compactLabels1: ['?', '?', '?', '?'],
                    whichLabels: function(amount) {
                        var units = amount % 10;
                        var tens = Math.floor((amount % 100) / 10);
                        return (amount == 1 ? 1 : (units >= 2 && units <= 4 && tens != 1 ? 2 :
                                (units == 1 && tens != 1 ? 1 : 0)));
                    },
                    digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                    timeSeparator: ':', isRTL: false};
                $.countdown.setDefaults($.countdown.regional['ru']);
            } else if (lang == "es") {
                $.countdown.regional['es'] = {
                    labels: ['A‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á¬¨¬®¬¨¬Æ¬¨¬®¬¨¬±os', 'Meses', 'Semanas', 'D‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂¬¨¬¢‚Äö√Ñ√∂‚àö√ë‚Äö√Ñ‚Ä†as', 'Horas', 'Minutos', 'Segundos'],
                    labels1: ['A‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á¬¨¬®¬¨¬Æ¬¨¬®¬¨¬±o', 'Mes', 'Semana', 'D‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂‚Äö√Ñ‚Ä†‚Äö√†√∂‚Äö√†√á‚Äö√Ñ√∂‚àö√ë‚àö‚àÇ‚Äö√†√∂¬¨¬¢‚Äö√Ñ√∂‚àö√ë‚Äö√Ñ‚Ä†a', 'Hora', 'Minuto', 'Segundo'],
                    compactLabels: ['a', 'm', 's', 'g'],
                    whichLabels: null,
                    digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                    timeSeparator: ':', isRTL: false};
                $.countdown.setDefaults($.countdown.regional['es']);
            } else {

            }
            if (expirationTime !== undefined) {
                $('.content').addClass('has-countdown').removeClass('no-countdown');
                var tpl = '';
                if (params.countdownNumbersOnly)
                    tpl = '<ul class="cd-listview">{y<}<li class="cd-years"><span></span>{yn} </li>{y>}{o<}<li class="cd-months"><span></span>{on} </li>{o>}'
                            + '{d<}<li class="cd-days"><span></span>{dnnn} </li>{d>}{h<}<li class="cd-hours"><span></span>{hnn} </li>{h>}'
                            + '{m<}<li class="cd-minutes"><span></span>{mnn} </li>{m>}{s<}<li class="cd-seconds"><span></span>{snn} </li>{s>}</ul>';
                else
                    tpl = '<ul class="cd-listview">{y<}<li class="cd-years"><span></span>{yn} {yl}</li>{y>}{o<}<li class="cd-month"><span></span>{on} {ol}</li>{o>}'
                            + '{d<}<li class="cd-days"><span></span>{dnnn} {dl}</li>{d>}{h<}<li class="cd-hours"><span></span>{hnn} {hl}</li>{h>}'
                            + '{m<}<li class="cd-minutes"><span></span>{mnn} {ml}</li>{m>}{s<}<li class="cd-seconds"><span></span>{snn} {sl}</li>{s>}</ul>';
                $('#watch_countdown').countdown({
                    until: expirationTime,
                    significant: 0,
                    format: 'DHMS',
                    alwaysExpire: true,
                    layout: tpl,
                    onExpiry: expiration
                });
            }
        }

        // build the clock
        buildClock(params);
    };
}(jQuery));

/**
 * Get Standard Timezone Offset
 * @returns {integer} Returns offset in minutes
 */
Date.prototype.stdTimezoneOffset = function() {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}
/**
 * Tells whether it is in Daylight Saving Time (Summer Time)
 * @returns {Boolean} DST or not
 */
Date.prototype.dst = function() {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
}

String.prototype.trim = function() {
    return this.replace(/\s/g, "");
}
