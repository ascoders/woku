// init.js

// 初始化timeago组件
'use strict';

require(['jquery', 'jquery.timeago'], function ($) {
	$.timeago.settings.allowFuture = true;
	$.timeago.settings.localeTitle = true;
	$.timeago.settings.strings = {
		prefixAgo: null,
		prefixFromNow: null,
		suffixAgo: '前',
		suffixFromNow: '后',
		inPast: '现在',
		seconds: '<1分钟',
		minute: '1分钟',
		minutes: '%d 分钟',
		hour: '1小时',
		hours: '%d 小时',
		day: '一天',
		days: '%d 天',
		month: '一个月',
		months: '%d 个月',
		year: '一年',
		years: '%d 年',
		wordSeparator: ' ',
		numbers: []
	};
});

//导航条
require(['jquery'], function ($) {
	//一级导航条
	$('.m-nav').on('mouseenter mouseleave', '.j-drop', function (event) {
		switch (event.type) {
			case 'mouseenter':
				$(this).find('.j-drop-content').show();
				break;
			case 'mouseleave':
				$(this).find('.j-drop-content').hide();
				break;
		}
	});
	//二级拓展条
	$('.m-nav').on('mouseenter mouseleave', '.j-right-drop', function (event) {
		switch (event.type) {
			case 'mouseenter':
				$(this).find('.j-right-drop-content').show();
				break;
			case 'mouseleave':
				$(this).find('.j-right-drop-content').hide();
				break;
		}
	});
});

// 导航条处理
// 鼠标移动到drop出现下拉菜单
require(['jquery', 'jquery.timeago'], function ($) {
	var header_message = false
	/*
 	if (store.get("read") > 0 || header_message == false) {
 		var newNumber = parseInt(store.get("read"));
 		header_message = true;
 		store.set("read", 0);
 		$(".m-nav .info-number").text("").hide();
 		$.ajax({
 			url: "/web/admin/account_messagepost",
 			type: "POST",
 			data: {
 				page: 1,
 				clear: "true"
 			},
 			beforeSend: function () {
 				_this.find(".j-drop-content").html("<li class='f-tac f-p20 text-muted'>消息获取中&nbsp;<i class='fa fa-refresh fa-spin'></i></li>");
 			},
 			success: function (data, textStatus) {
 				var c = _this.find(".j-drop-content");
 				c.html("");
 				if (data == "") {
 					c.html("<li class='f-tac f-p20 text-muted'>暂无消息</li>");
 					return false;
 				}
 				for (var i = 0; i < data.length; i++) {
 					var title = getMessageType(data[i].Message.Type, data[i].Message.Link);
 					var description = "<span class='f-ml10'>" + data[i].Message.Description + "</span><span class='f-ml10 timeago' title='" + data[i].Time + "'></span>";
 					var link = "<a href='" + data[i].Message.Link + "' target='_blank'>点击查看</a>";
 					c.append("<a href='" + data[i].Message.Link + "' id='message-" + i + "' class='message-content f-cb'>" + title + description + "</a>");
 					c.append("<li class='cut'></li>");
 					//显示友好时间
 					$(".timeago").timeago();
 				}
 				c.append("<a href='user.html?to=/web/admin/account_message' class='f-cb f-tac f-wm'>更多消息</a>");
 				//让最新的消息闪一下
 				for (var i = 0; i < newNumber; i++) {
 					$("#message-" + i).css("font-weight", "bold");
 				}
 				setTimeout(function () {
 					$(".m-nav .message-content").removeAttr("style");
 				}, 2000);
 			}
 		});
 	}
 	break;
 }
 */
	;
});

//导航栏自动隐藏
var autoHidePreHeight = 0;
var autoHideFlag = false;
var forceHideNav = false;
require(['jquery'], function ($) {
	$(window).scroll(function () {
		//是否禁用
		if (forceHideNav == true) {
			$('.m-nav').hide();
			return;
		}

		$('.m-nav').show();

		if ($(window).scrollTop() <= 40) {
			if (autoHideFlag) {
				autoHideFlag = false;
				$('.m-nav').css('top', '0px');
			}
			autoHidePreHeight = $(window).scrollTop();
			return;
		}
		if ($(window).scrollTop() > autoHidePreHeight && !autoHideFlag) {
			autoHideFlag = true;
			$('.m-nav').css('top', '-40px');
		} else if ($(window).scrollTop() < autoHidePreHeight && autoHideFlag) {
			autoHideFlag = false;
			$('.m-nav').css('top', '0px');
		}
		autoHidePreHeight = $(window).scrollTop();
	});
});