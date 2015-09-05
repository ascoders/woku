// namespace.js
var wk = wk || {}

// 提示框
wk.notice = function (opts) {
    if (wk._noticeTimeout) {
        clearTimeout(wk._noticeTimeout)
    }

    $('#j-logo')
        .popup(opts)
        .popup('show')

    wk._noticeTimeout = setTimeout(function () {
        clearTimeout(wk._noticeTimeout)
        wk._noticeTimeout = null
        $('#j-logo')
            .popup('hide')

        setTimeout(function () {
            $('#j-logo')
                .popup('destroy')
        }, 200)
    }, 2000)
}

// 选择框
wk.confirm = function (content, callback) {

}

//调整用户头像图片路径
wk.userImage = function (str) {
    if (str != undefined && str != "") {
        if (!isNaN(str)) {
            return "/static/common/global/image/user/" + str + ".jpg";
        }
        return str;
    }
    return;
}

// 短链接
wk.ajax = function (method, opts) {
    var defaultOpts = {
        url: '',
        data: '',
        done: function () {},
        fail: function () {},
        always: function () {}
    }
    opts = $.extend(defaultOpts, opts)

    require(['cookie'], function (cookie) {
        var csrf = cookie.get('_csrf') || ''

        return $.ajax({
                url: opts.url,
                type: method,
                traditional: true, // 便于传数组
                data: opts.data,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-CSRFToken', csrf);
                },
            })
            .done(function (data, status, xhr) {
                opts.done(data)
            })
            .fail(function (xhr, status, error) {
                var message = ''
                if (xhr.responseJSON) {
                    message = xhr.responseJSON
                } else {
                    message = xhr.responseText
                }
                opts.fail(message)
            })
            .always(function () {
                opts.always()
            })
    })
}
wk.get = function (opts) {
    return wk.ajax('GET', opts)
}
wk.post = function (opts) {
    return wk.ajax('POST', opts)
}
wk.put = function (opts) {
    return wk.ajax('PUT', opts)
}
wk.patch = function (opts) {
    return wk.ajax('PATCH', opts)
}
wk.delete = function (opts) {
    return wk.ajax('DELETE', opts)
}

// 上传组件
wk.createDropzone = function (obj, url, data, accept, callback) {
    require(['dropzone', 'md5'], function (Dropzone, md5) {
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
            init: function () {
                //事件监听
                this.on("addedfile", function (file) {
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
                        onCloseComplete: function () {
                            this.destroy();
                        }
                    });

                    var _this = this;

                    //获取上传到七牛的token
                    wk.get({
                        url: '/api/qiniu/token',
                        data: data,
                        success: function (data) {
                            _this.options.params['token'] = data;

                            // 开始上传
                            _this.processQueue();
                        },
                        error: function () {
                            modals[md5(file.name)].close();
                        }
                    })
                })
                this.on("thumbnail", function (file, img) { //文件内容,缩略图base64
                    //如果模态框被关闭,return
                    if (!modals[md5(file.name)]) {
                        return;
                    }

                    // 给缩略图赋值
                    modals[md5(file.name)].setContent('<img src="' + img + '"><br><div class="progress" style="margin:10px 0 0 0"><div class="progress-bar" id="upload' + md5(file.name) + '" style="min-width:5%;">0%</div></div><br>尺寸: ' + file.width + ' × ' + file.height + ' &nbsp;&nbsp;大小: ' + (file.size / 1000).toFixed(1) + ' Kb<br>');
                });
                this.on("error", function (file, err) {
                    notice(err.toString(), 'red');

                    //如果模态框被关闭,return
                    if (!modals[md5(file.name)]) {
                        return;
                    }

                    //模态框关闭
                    modals[md5(file.name)].close();
                    modals[md5(file.name)] = null;
                });
                this.on("uploadprogress", function (file, process, size) {
                    //如果模态框被关闭,return
                    if (!modals[md5(file.name)]) {
                        return;
                    }

                    process = process.toFixed(2);

                    if (process == 100) {
                        process = 99;
                    }

                    $('#upload' + md5(file.name)).css('width', process + "%").text(process + '%');
                });
                this.on("success", function (file, data) {
                    notice('上传成功', 'green');

                    //如果模态框被关闭,return
                    if (!modals[md5(file.name)]) {
                        return;
                    }

                    $('#upload' + md5(file.name)).css('width', "100%").text('100%');

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
}

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
            hour = Math.floor(opts.second / (60 * 60)) - (day * 24);
            minute = Math.floor(opts.second / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(opts.second) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        } else if (opts.second == 0) {
            callback();
        }
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        element.find("#j-day").html(day + " 天");
        element.find("#j-hour").html(hour + " 时");
        element.find("#j-minute").html(minute + " 分");
        element.find("#j-second").html(second + " 秒");
        opts.second--;
    }

    var inter = setInterval(function () {
        if (!$.contains(document, element[0])) { //dom不存在就停止事件
            clearInterval(inter);
        }
        Run();
    }, 1000);

    Run();
}

wk.jumpLastLocation = function () {
    if (avalon.router.getLastPath().indexOf('auth') > -1) {
        // auth页直接跳转至首页
        avalon.router.navigate('/')
    } else {
        // 跳回上个页面
        avalon.router.navigate(avalon.router.getLastPath())
    }
}
