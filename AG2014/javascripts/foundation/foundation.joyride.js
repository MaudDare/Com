!function(t,e,i,n){"use strict";Foundation.libs.joyride={name:"joyride",version:"5.3.3",defaults:{expose:!1,modal:!0,keyboard:!0,tip_location:"bottom",nub_position:"auto",scroll_speed:1500,scroll_animation:"linear",timer:0,start_timer_on_click:!0,start_offset:0,next_button:!0,prev_button:!0,tip_animation:"fade",pause_after:[],exposed:[],tip_animation_fade_speed:300,cookie_monster:!1,cookie_name:"joyride",cookie_domain:!1,cookie_expires:365,tip_container:"body",abort_on_close:!0,tip_location_patterns:{top:["bottom"],bottom:[],left:["right","top","bottom"],right:["left","top","bottom"]},post_ride_callback:function(){},post_step_callback:function(){},pre_step_callback:function(){},pre_ride_callback:function(){},post_expose_callback:function(){},template:{link:'<a href="#close" class="joyride-close-tip">&times;</a>',timer:'<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',tip:'<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',wrapper:'<div class="joyride-content-wrapper"></div>',button:'<a href="#" class="small button joyride-next-tip"></a>',prev_button:'<a href="#" class="small button joyride-prev-tip"></a>',modal:'<div class="joyride-modal-bg"></div>',expose:'<div class="joyride-expose-wrapper"></div>',expose_cover:'<div class="joyride-expose-cover"></div>'},expose_add_class:""},init:function(e,i,n){Foundation.inherit(this,"throttle random_str"),this.settings=this.settings||t.extend({},this.defaults,n||i),this.bindings(i,n)},go_next:function(){this.settings.$li.next().length<1?this.end():this.settings.timer>0?(clearTimeout(this.settings.automate),this.hide(),this.show(),this.startTimer()):(this.hide(),this.show())},go_prev:function(){this.settings.$li.prev().length<1||(this.settings.timer>0?(clearTimeout(this.settings.automate),this.hide(),this.show(null,!0),this.startTimer()):(this.hide(),this.show(null,!0)))},events:function(){var i=this;t(this.scope).off(".joyride").on("click.fndtn.joyride",".joyride-next-tip, .joyride-modal-bg",function(t){t.preventDefault(),this.go_next()}.bind(this)).on("click.fndtn.joyride",".joyride-prev-tip",function(t){t.preventDefault(),this.go_prev()}.bind(this)).on("click.fndtn.joyride",".joyride-close-tip",function(t){t.preventDefault(),this.end(this.settings.abort_on_close)}.bind(this)).on("keyup.joyride",function(t){if(this.settings.keyboard)switch(t.which){case 39:t.preventDefault(),this.go_next();break;case 37:t.preventDefault(),this.go_prev();break;case 27:t.preventDefault(),this.end(this.settings.abort_on_close)}}.bind(this)),t(e).off(".joyride").on("resize.fndtn.joyride",i.throttle(function(){if(t("["+i.attr_name()+"]").length>0&&i.settings.$next_tip&&i.settings.riding){if(i.settings.exposed.length>0){var e=t(i.settings.exposed);e.each(function(){var e=t(this);i.un_expose(e),i.expose(e)})}i.is_phone()?i.pos_phone():i.pos_default(!1)}},100))},start:function(){var e=this,i=t("["+this.attr_name()+"]",this.scope),n=["timer","scrollSpeed","startOffset","tipAnimationFadeSpeed","cookieExpires"],s=n.length;!i.length>0||(this.settings.init||this.events(),this.settings=i.data(this.attr_name(!0)+"-init"),this.settings.$content_el=i,this.settings.$body=t(this.settings.tip_container),this.settings.body_offset=t(this.settings.tip_container).position(),this.settings.$tip_content=this.settings.$content_el.find("> li"),this.settings.paused=!1,this.settings.attempts=0,this.settings.riding=!0,"function"!=typeof t.cookie&&(this.settings.cookie_monster=!1),(!this.settings.cookie_monster||this.settings.cookie_monster&&!t.cookie(this.settings.cookie_name))&&(this.settings.$tip_content.each(function(i){var a=t(this);this.settings=t.extend({},e.defaults,e.data_options(a));for(var o=s;o--;)e.settings[n[o]]=parseInt(e.settings[n[o]],10);e.create({$li:a,index:i})}),!this.settings.start_timer_on_click&&this.settings.timer>0?(this.show("init"),this.startTimer()):this.show("init")))},resume:function(){this.set_li(),this.show()},tip_template:function(e){var i,n;return e.tip_class=e.tip_class||"",i=t(this.settings.template.tip).addClass(e.tip_class),n=t.trim(t(e.li).html())+this.prev_button_text(e.prev_button_text,e.index)+this.button_text(e.button_text)+this.settings.template.link+this.timer_instance(e.index),i.append(t(this.settings.template.wrapper)),i.first().attr(this.add_namespace("data-index"),e.index),t(".joyride-content-wrapper",i).append(n),i[0]},timer_instance:function(e){var i;return i=0===e&&this.settings.start_timer_on_click&&this.settings.timer>0||0===this.settings.timer?"":t(this.settings.template.timer)[0].outerHTML},button_text:function(e){return this.settings.tip_settings.next_button?(e=t.trim(e)||"Next",e=t(this.settings.template.button).append(e)[0].outerHTML):e="",e},prev_button_text:function(e,i){return this.settings.tip_settings.prev_button?(e=t.trim(e)||"Previous",e=0==i?t(this.settings.template.prev_button).append(e).addClass("disabled")[0].outerHTML:t(this.settings.template.prev_button).append(e)[0].outerHTML):e="",e},create:function(e){this.settings.tip_settings=t.extend({},this.settings,this.data_options(e.$li));var i=e.$li.attr(this.add_namespace("data-button"))||e.$li.attr(this.add_namespace("data-text")),n=e.$li.attr(this.add_namespace("data-button-prev"))||e.$li.attr(this.add_namespace("data-prev-text")),s=e.$li.attr("class"),a=t(this.tip_template({tip_class:s,index:e.index,button_text:i,prev_button_text:n,li:e.$li}));t(this.settings.tip_container).append(a)},show:function(e,i){var s=null;this.settings.$li===n||-1===t.inArray(this.settings.$li.index(),this.settings.pause_after)?(this.settings.paused?this.settings.paused=!1:this.set_li(e,i),this.settings.attempts=0,this.settings.$li.length&&this.settings.$target.length>0?(e&&(this.settings.pre_ride_callback(this.settings.$li.index(),this.settings.$next_tip),this.settings.modal&&this.show_modal()),this.settings.pre_step_callback(this.settings.$li.index(),this.settings.$next_tip),this.settings.modal&&this.settings.expose&&this.expose(),this.settings.tip_settings=t.extend({},this.settings,this.data_options(this.settings.$li)),this.settings.timer=parseInt(this.settings.timer,10),this.settings.tip_settings.tip_location_pattern=this.settings.tip_location_patterns[this.settings.tip_settings.tip_location],/body/i.test(this.settings.$target.selector)||this.scroll_to(),this.is_phone()?this.pos_phone(!0):this.pos_default(!0),s=this.settings.$next_tip.find(".joyride-timer-indicator"),/pop/i.test(this.settings.tip_animation)?(s.width(0),this.settings.timer>0?(this.settings.$next_tip.show(),setTimeout(function(){s.animate({width:s.parent().width()},this.settings.timer,"linear")}.bind(this),this.settings.tip_animation_fade_speed)):this.settings.$next_tip.show()):/fade/i.test(this.settings.tip_animation)&&(s.width(0),this.settings.timer>0?(this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed).show(),setTimeout(function(){s.animate({width:s.parent().width()},this.settings.timer,"linear")}.bind(this),this.settings.tip_animation_fade_speed)):this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed)),this.settings.$current_tip=this.settings.$next_tip):this.settings.$li&&this.settings.$target.length<1?this.show():this.end()):this.settings.paused=!0},is_phone:function(){return matchMedia(Foundation.media_queries.small).matches&&!matchMedia(Foundation.media_queries.medium).matches},hide:function(){this.settings.modal&&this.settings.expose&&this.un_expose(),this.settings.modal||t(".joyride-modal-bg").hide(),this.settings.$current_tip.css("visibility","hidden"),setTimeout(t.proxy(function(){this.hide(),this.css("visibility","visible")},this.settings.$current_tip),0),this.settings.post_step_callback(this.settings.$li.index(),this.settings.$current_tip)},set_li:function(t,e){t?(this.settings.$li=this.settings.$tip_content.eq(this.settings.start_offset),this.set_next_tip(),this.settings.$current_tip=this.settings.$next_tip):(this.settings.$li=e?this.settings.$li.prev():this.settings.$li.next(),this.set_next_tip()),this.set_target()},set_next_tip:function(){this.settings.$next_tip=t(".joyride-tip-guide").eq(this.settings.$li.index()),this.settings.$next_tip.data("closed","")},set_target:function(){var e=this.settings.$li.attr(this.add_namespace("data-class")),n=this.settings.$li.attr(this.add_namespace("data-id")),s=function(){return n?t(i.getElementById(n)):e?t("."+e).first():t("body")};this.settings.$target=s()},scroll_to:function(){var i,n;i=t(e).height()/2,n=Math.ceil(this.settings.$target.offset().top-i+this.settings.$next_tip.outerHeight()),0!=n&&t("html, body").stop().animate({scrollTop:n},this.settings.scroll_speed,"swing")},paused:function(){return-1===t.inArray(this.settings.$li.index()+1,this.settings.pause_after)},restart:function(){this.hide(),this.settings.$li=n,this.show("init")},pos_default:function(t){var e=this.settings.$next_tip.find(".joyride-nub"),i=Math.ceil(e.outerWidth()/2),n=Math.ceil(e.outerHeight()/2),s=t||!1;if(s&&(this.settings.$next_tip.css("visibility","hidden"),this.settings.$next_tip.show()),/body/i.test(this.settings.$target.selector))this.settings.$li.length&&this.pos_modal(e);else{var a=this.settings.tip_settings.tipAdjustmentY?parseInt(this.settings.tip_settings.tipAdjustmentY):0,o=this.settings.tip_settings.tipAdjustmentX?parseInt(this.settings.tip_settings.tipAdjustmentX):0;this.bottom()?(this.settings.$next_tip.css(this.rtl?{top:this.settings.$target.offset().top+n+this.settings.$target.outerHeight()+a,left:this.settings.$target.offset().left+this.settings.$target.outerWidth()-this.settings.$next_tip.outerWidth()+o}:{top:this.settings.$target.offset().top+n+this.settings.$target.outerHeight()+a,left:this.settings.$target.offset().left+o}),this.nub_position(e,this.settings.tip_settings.nub_position,"top")):this.top()?(this.settings.$next_tip.css(this.rtl?{top:this.settings.$target.offset().top-this.settings.$next_tip.outerHeight()-n+a,left:this.settings.$target.offset().left+this.settings.$target.outerWidth()-this.settings.$next_tip.outerWidth()}:{top:this.settings.$target.offset().top-this.settings.$next_tip.outerHeight()-n+a,left:this.settings.$target.offset().left+o}),this.nub_position(e,this.settings.tip_settings.nub_position,"bottom")):this.right()?(this.settings.$next_tip.css({top:this.settings.$target.offset().top+a,left:this.settings.$target.outerWidth()+this.settings.$target.offset().left+i+o}),this.nub_position(e,this.settings.tip_settings.nub_position,"left")):this.left()&&(this.settings.$next_tip.css({top:this.settings.$target.offset().top+a,left:this.settings.$target.offset().left-this.settings.$next_tip.outerWidth()-i+o}),this.nub_position(e,this.settings.tip_settings.nub_position,"right")),!this.visible(this.corners(this.settings.$next_tip))&&this.settings.attempts<this.settings.tip_settings.tip_location_pattern.length&&(e.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"),this.settings.tip_settings.tip_location=this.settings.tip_settings.tip_location_pattern[this.settings.attempts],this.settings.attempts++,this.pos_default())}s&&(this.settings.$next_tip.hide(),this.settings.$next_tip.css("visibility","visible"))},pos_phone:function(e){var i=this.settings.$next_tip.outerHeight(),n=(this.settings.$next_tip.offset(),this.settings.$target.outerHeight()),s=t(".joyride-nub",this.settings.$next_tip),a=Math.ceil(s.outerHeight()/2),o=e||!1;s.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"),o&&(this.settings.$next_tip.css("visibility","hidden"),this.settings.$next_tip.show()),/body/i.test(this.settings.$target.selector)?this.settings.$li.length&&this.pos_modal(s):this.top()?(this.settings.$next_tip.offset({top:this.settings.$target.offset().top-i-a}),s.addClass("bottom")):(this.settings.$next_tip.offset({top:this.settings.$target.offset().top+n+a}),s.addClass("top")),o&&(this.settings.$next_tip.hide(),this.settings.$next_tip.css("visibility","visible"))},pos_modal:function(t){this.center(),t.hide(),this.show_modal()},show_modal:function(){if(!this.settings.$next_tip.data("closed")){var e=t(".joyride-modal-bg");e.length<1&&t("body").append(this.settings.template.modal).show(),/pop/i.test(this.settings.tip_animation)?e.show():e.fadeIn(this.settings.tip_animation_fade_speed)}},expose:function(){var i,n,s,a,o,r="expose-"+this.random_str(6);if(arguments.length>0&&arguments[0]instanceof t)s=arguments[0];else{if(!this.settings.$target||/body/i.test(this.settings.$target.selector))return!1;s=this.settings.$target}return s.length<1?(e.console&&console.error("element not valid",s),!1):(i=t(this.settings.template.expose),this.settings.$body.append(i),i.css({top:s.offset().top,left:s.offset().left,width:s.outerWidth(!0),height:s.outerHeight(!0)}),n=t(this.settings.template.expose_cover),a={zIndex:s.css("z-index"),position:s.css("position")},o=null==s.attr("class")?"":s.attr("class"),s.css("z-index",parseInt(i.css("z-index"))+1),"static"==a.position&&s.css("position","relative"),s.data("expose-css",a),s.data("orig-class",o),s.attr("class",o+" "+this.settings.expose_add_class),n.css({top:s.offset().top,left:s.offset().left,width:s.outerWidth(!0),height:s.outerHeight(!0)}),this.settings.modal&&this.show_modal(),this.settings.$body.append(n),i.addClass(r),n.addClass(r),s.data("expose",r),this.settings.post_expose_callback(this.settings.$li.index(),this.settings.$next_tip,s),void this.add_exposed(s))},un_expose:function(){var i,n,s,a,o,r=!1;if(arguments.length>0&&arguments[0]instanceof t)n=arguments[0];else{if(!this.settings.$target||/body/i.test(this.settings.$target.selector))return!1;n=this.settings.$target}return n.length<1?(e.console&&console.error("element not valid",n),!1):(i=n.data("expose"),s=t("."+i),arguments.length>1&&(r=arguments[1]),r===!0?t(".joyride-expose-wrapper,.joyride-expose-cover").remove():s.remove(),a=n.data("expose-css"),"auto"==a.zIndex?n.css("z-index",""):n.css("z-index",a.zIndex),a.position!=n.css("position")&&("static"==a.position?n.css("position",""):n.css("position",a.position)),o=n.data("orig-class"),n.attr("class",o),n.removeData("orig-classes"),n.removeData("expose"),n.removeData("expose-z-index"),void this.remove_exposed(n))},add_exposed:function(e){this.settings.exposed=this.settings.exposed||[],e instanceof t||"object"==typeof e?this.settings.exposed.push(e[0]):"string"==typeof e&&this.settings.exposed.push(e)},remove_exposed:function(e){var i,n;for(e instanceof t?i=e[0]:"string"==typeof e&&(i=e),this.settings.exposed=this.settings.exposed||[],n=this.settings.exposed.length;n--;)if(this.settings.exposed[n]==i)return void this.settings.exposed.splice(n,1)},center:function(){var i=t(e);return this.settings.$next_tip.css({top:(i.height()-this.settings.$next_tip.outerHeight())/2+i.scrollTop(),left:(i.width()-this.settings.$next_tip.outerWidth())/2+i.scrollLeft()}),!0},bottom:function(){return/bottom/i.test(this.settings.tip_settings.tip_location)},top:function(){return/top/i.test(this.settings.tip_settings.tip_location)},right:function(){return/right/i.test(this.settings.tip_settings.tip_location)},left:function(){return/left/i.test(this.settings.tip_settings.tip_location)},corners:function(i){var n=t(e),s=n.height()/2,a=Math.ceil(this.settings.$target.offset().top-s+this.settings.$next_tip.outerHeight()),o=n.width()+n.scrollLeft(),r=n.height()+a,l=n.height()+n.scrollTop(),c=n.scrollTop();return c>a&&(c=0>a?0:a),r>l&&(l=r),[i.offset().top<c,o<i.offset().left+i.outerWidth(),l<i.offset().top+i.outerHeight(),n.scrollLeft()>i.offset().left]},visible:function(t){for(var e=t.length;e--;)if(t[e])return!1;return!0},nub_position:function(t,e,i){t.addClass("auto"===e?i:e)},startTimer:function(){this.settings.$li.length?this.settings.automate=setTimeout(function(){this.hide(),this.show(),this.startTimer()}.bind(this),this.settings.timer):clearTimeout(this.settings.automate)},end:function(e){this.settings.cookie_monster&&t.cookie(this.settings.cookie_name,"ridden",{expires:this.settings.cookie_expires,domain:this.settings.cookie_domain}),this.settings.timer>0&&clearTimeout(this.settings.automate),this.settings.modal&&this.settings.expose&&this.un_expose(),t(this.scope).off("keyup.joyride"),this.settings.$next_tip.data("closed",!0),this.settings.riding=!1,t(".joyride-modal-bg").hide(),this.settings.$current_tip.hide(),("undefined"==typeof e||e===!1)&&(this.settings.post_step_callback(this.settings.$li.index(),this.settings.$current_tip),this.settings.post_ride_callback(this.settings.$li.index(),this.settings.$current_tip)),t(".joyride-tip-guide").remove()},off:function(){t(this.scope).off(".joyride"),t(e).off(".joyride"),t(".joyride-close-tip, .joyride-next-tip, .joyride-modal-bg").off(".joyride"),t(".joyride-tip-guide, .joyride-modal-bg").remove(),clearTimeout(this.settings.automate),this.settings={}},reflow:function(){}}}(jQuery,window,window.document);