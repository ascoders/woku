// namespace.js
'use strict';

var wk = wk || {};

// 提示框
wk.notice = function (text, color) {
	require(['jquery', 'jquery.jbox'], function ($) {
		new jBox('Notice', {
			content: text,
			attributes: {
				x: 'right',
				y: 'bottom'
			},
			animation: 'flip',
			color: color
		});
	});
};

// 选择框
wk.confirm = function (content, callback) {
	require(['jquery', 'jquery.jbox'], function ($) {
		var myModal = new jBox('Confirm', {
			minWidth: '200px',
			content: content,
			animation: 'flip',
			confirmButton: '确定',
			cancelButton: '取消',
			confirm: function confirm() {
				callback();
			}
		});

		myModal.open();
	});
};

//调整用户头像图片路径
wk.userImage = function (str) {
	if (str != undefined && str != '') {
		if (!isNaN(str)) {
			return '/static/img/user/' + str + '.jpg';
		}
		return str;
	}
	return;
};

// 短链接
wk.ajax = function (method, opts) {
	var defaultOpts = {
		url: '',
		data: '',
		success: function success(data) {},
		error: function error() {}
	};
	opts = $.extend(defaultOpts, opts);

	require(['jquery', 'jquery.cookie'], function ($) {
		var csrf = $.cookie('_csrf') || '';

		return $.ajax({
			url: opts.url,
			type: method,
			traditional: true, // 便于传数组
			data: opts.data,
			beforeSend: function beforeSend(xhr) {
				xhr.setRequestHeader('X-CSRFToken', csrf);
			}
		}).done(function (data, status, xhr) {
			opts.success(data);
		}).fail(function (xhr, status, error) {
			var message = '';
			if (xhr.responseJSON) {
				message = xhr.responseJSON.message;
			} else {
				message = xhr.responseText;
			}
			wk.notice(message, 'red');

			opts.error();
		});
	});
};
wk.get = function (opts) {
	return wk.ajax('GET', opts);
};
wk.post = function (opts) {
	return wk.ajax('POST', opts);
};
wk.put = function (opts) {
	return wk.ajax('PUT', opts);
};
wk.patch = function (opts) {
	return wk.ajax('PATCH', opts);
};
wk['delete'] = function (opts) {
	return wk.ajax('DELETE', opts);
};

//字符串截取方法，支持中文
wk.subStr = function (str, start, end) {
	var _start = 0;
	for (var i = 0; i < start; i++) {
		if (escape(str.charCodeAt(i)).indexOf('%u') >= 0) {
			_start += 2;
		} else {
			_start += 1;
		}
	}
	var _end = _start;
	for (var i = start; i < end; i++) {
		if (escape(str.charCodeAt(i)).indexOf('%u') >= 0) {
			_end += 2;
		} else {
			_end += 1;
		}
	}
	var r = str.substr(_start, _end);
	return r;
};

// 上传组件
wk.createDropzone = function (obj, url, data, accept, callback) {
	require(['jquery', 'dropzone', 'md5', 'jquery.jbox'], function ($, Dropzone, md5) {
		//上传框组
		var modals = {};

		//实例化dropzone
		return new Dropzone(obj, {
			url: url,
			maxFiles: 10,
			maxFilesize: 0.5,
			method: 'POST',
			acceptedFiles: accept,
			autoProcessQueue: false,
			init: function init() {
				//事件监听
				this.on('addedfile', function (file) {
					//实例化上传框
					modals[md5(file.name)] = new jBox('Notice', {
						attributes: {
							x: 'left',
							y: 'bottom'
						},
						title: '上传 ' + file.name + ' 中..',
						theme: 'NoticeBorder',
						color: 'black',
						animation: {
							open: 'slide:bottom',
							close: 'slide:left'
						},
						autoClose: false,
						closeOnClick: false,
						onCloseComplete: function onCloseComplete() {
							this.destroy();
						}
					});

					var _this = this;

					//获取上传到七牛的token
					wk.get({
						url: '/api/qiniu/token',
						data: data,
						success: function success(data) {
							_this.options.params['token'] = data;

							// 开始上传
							_this.processQueue();
						},
						error: function error() {
							modals[md5(file.name)].close();
						}
					});
				});
				this.on('thumbnail', function (file, img) {
					//文件内容,缩略图base64
					//如果模态框被关闭,return
					if (!modals[md5(file.name)]) {
						return;
					}

					// 给缩略图赋值
					modals[md5(file.name)].setContent('<img src="' + img + '"><br><div class="progress" style="margin:10px 0 0 0"><div class="progress-bar" id="upload' + md5(file.name) + '" style="min-width:5%;">0%</div></div><br>尺寸: ' + file.width + ' × ' + file.height + ' &nbsp;&nbsp;大小: ' + (file.size / 1000).toFixed(1) + ' Kb<br>');
				});
				this.on('error', function (file, err) {
					notice(err.toString(), 'red');

					//如果模态框被关闭,return
					if (!modals[md5(file.name)]) {
						return;
					}

					//模态框关闭
					modals[md5(file.name)].close();
					modals[md5(file.name)] = null;
				});
				this.on('uploadprogress', function (file, process, size) {
					//如果模态框被关闭,return
					if (!modals[md5(file.name)]) {
						return;
					}

					process = process.toFixed(2);

					if (process == 100) {
						process = 99;
					}

					$('#upload' + md5(file.name)).css('width', process + '%').text(process + '%');
				});
				this.on('success', function (file, data) {
					notice('上传成功', 'green');

					//如果模态框被关闭,return
					if (!modals[md5(file.name)]) {
						return;
					}

					$('#upload' + md5(file.name)).css('width', '100%').text('100%');

					setTimeout(function () {
						//如果模态框被关闭,return
						if (!modals[md5(file.name)]) {
							return;
						}
						//模态框关闭
						modals[md5(file.name)].close();
						modals[md5(file.name)] = null;
					}, 200);

					//触发回调
					callback(data, file);
				});
			}
		});
	});
};

// 判断ie9及其以下版本
wk.ieVersion = function () {
	var v = 3,
	    div = document.createElement('div'),
	    all = div.getElementsByTagName('i');
	while ((div.innerHTML = '<!--[if gt IE ' + ++v + ']><i></i><![endif]-->', all[0]));
	return v > 4 ? v : false;
};

// 倒计时
wk.timediff = function (element, options, callback) {
	// 初始化
	var defaults = {
		second: 0
	};
	var opts = $.extend(defaults, options);
	opts.second = parseInt(opts.second);

	function Run() {
		var day = 0,
		    hour = 0,
		    minute = 0,
		    second = 0; //时间默认值  

		if (opts.second > 0) {
			day = Math.floor(opts.second / (60 * 60 * 24));
			hour = Math.floor(opts.second / (60 * 60)) - day * 24;
			minute = Math.floor(opts.second / 60) - day * 24 * 60 - hour * 60;
			second = Math.floor(opts.second) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;
		} else if (opts.second == 0) {
			callback();
		}
		if (minute <= 9) minute = '0' + minute;
		if (second <= 9) second = '0' + second;
		element.find('#j-day').html(day + ' 天');
		element.find('#j-hour').html(hour + ' 时');
		element.find('#j-minute').html(minute + ' 分');
		element.find('#j-second').html(second + ' 秒');
		opts.second--;
	}

	var inter = setInterval(function () {
		if (!$.contains(document, element[0])) {
			//dom不存在就停止事件
			clearInterval(inter);
		}
		Run();
	}, 1000);

	Run();
};

// jbox插件渲染dom
wk.jbox = function () {
	require(['jquery', 'jquery.jbox'], function ($) {
		// jbox插件
		$('.jbox').each(function () {
			var title = $(this).attr('title');
			if (!title) {
				return;
			}

			// 方向
			var jboxPositionX = $(this).attr('jbox-position-x') || 'center';
			var jboxPositionY = $(this).attr('jbox-position-y') || 'top';

			$(this).removeAttr('title');
			$(this).jBox('Tooltip', {
				content: title,
				animation: 'zoomIn',
				closeOnMouseleave: true,
				position: {
					x: jboxPositionX,
					y: jboxPositionY
				}
			});
		});
	});
};