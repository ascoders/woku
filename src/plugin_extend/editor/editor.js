define('editor', ['marked', 'prettify', 'autosize', 'jquery.selection'], function (marked, prettify, autosize) {
    // 字符串截取方法，支持中文
    function subStr(str, start, end) {
        var _start = 0;
        for (var i = 0; i < start; i++) {
            if (escape(str.charCodeAt(i)).indexOf("%u") >= 0) {
                _start += 2;
            } else {
                _start += 1;
            }
        }
        var _end = _start;
        for (var i = start; i < end; i++) {
            if (escape(str.charCodeAt(i)).indexOf("%u") >= 0) {
                _end += 2;
            } else {
                _end += 1;
            }
        }
        var r = str.substr(_start, _end);
        return r;
    }

    $.fn.editor = function (options) {
        //参数
        var opts = $.extend({}, $.fn.editor.defaults, options);
        var _this = this;

        /* 初始化 */

        // textarea增加class
        _this.addClass('ui form attached fluid segment')

        // 添加容器
        _this.wrap("<div class='f-cb edit-box'></div>"); //添加容器

        // 整体容器
        var box = _this.parent();

        // 预览框父级
        var previewBox = $('<div/>')
            .addClass('ui stacked segment preview-box')
            .appendTo(box);

        // 预览框文案
        var previewText = $('<div>')
            .addClass('ui blue ribbon label preview-text')
            .html('<i class="unhide icon"></i>预览')
            .appendTo(previewBox)

        // 预览框
        var preview = $('<div/>')
            .addClass('preview')
            .appendTo(previewBox); //预览

        // 工具栏
        var tools = $('<div/>')
            .addClass('ui attached basic icon buttons tool-bar')
            .prependTo(box);

        autosize(_this) //自动拓展高度

        //记录上一刻鼠标Y轴位置
        var lastY;

        //渲染模式
        var render = 0; //0:实时渲染 1:延时渲染

        //判断渲染模式数组，每3次取一个平均值判断是否渲染过慢
        var renderTime = new Array();

        //延时渲染的timeout
        var renderTimeout = null;

        //tabOverride.tabSize(4).autoIndent(true).set(_this); //tab键

        //是否支持markdown
        var markdown = true;

        //设置按钮
        var buttons = {
            "header": "标题",
            "bold": "加粗",
            "italic": "斜体",
            "linkify": "超链接",
            "quote left": "引用",
            "code": "代码块",
            "tag": "标签",
            "ordered list": "有序列表",
            "unordered  list": "无序列表",
            "minus": "分割线",
            "file image outline": "图片",
            "table": "表格"
        };

        // 刷新dom
        this.createDom = function () {
            // 创建提示tips
            for (var key in buttons) {
                var button = $("<div/>")
                    .addClass('ui button effect')
                    .attr('type', key)
                    .appendTo(tools)

                var icon = $('<i>')
                    .addClass('icon ' + key)
                    .appendTo(button)

                button.popup({
                    content: buttons[key]
                })

                switch (key) {
                case 'header':
                    button.addClass('j-ul-list');
                    var ul = $("<ul/>").appendTo(button).addClass('f-bln');
                    var headers = [
                        "h1", "h2", "h3", "h4", "h5", "h6"
                    ];
                    for (var item in headers) {
                        var li = $("<li/>").appendTo(ul).addClass('effect');
                        li.text(headers[item]).attr("type", headers[item]);
                    }
                    break;
                case 'table':
                    button.addClass('j-table').removeAttr('type');
                    var table = $("<table/>").appendTo(button);
                    for (var i = 0; i < 6; i++) {
                        var tr = $("<tr/>").appendTo(table);
                        for (var j = 0; j < 6; j++) {
                            var td = $("<td/>").appendTo(tr).addClass('effect').attr('type', 'table');
                        }
                    }
                    break;
                case 'image': //图片上传
                    wk.createDropzone(button[0], 'http://upload.qiniu.com', opts.uploadParams, ".jpg,.jpeg,.png,.gif,.ico", function (data, file) {
                        _this.selection('insert', {
                            text: '\n![' + file.name + '](http://img.wokugame.com/' + data.name + ')',
                            mode: 'before'
                        });
                        //刷新视图
                        _this.freshPreview();
                    });

                    break;
                }
            }
        }

        /* --------------- createDom end -------------------- */

        //响应下拉菜单工具
        $(document).on('mouseenter mouseleave', ".j-ul-list", function (e) {
            switch (e.type) {
            case 'mouseenter':
                $(this).find("ul").show();
                break;
            case 'mouseleave':
                $(this).find("ul").hide();
                break;
            }
        });

        //响应表格下拉列表
        $(document).on('mouseenter mouseleave', ".j-table", function (e) {
            switch (e.type) {
            case 'mouseenter':
                $(this).find("table").show();
                break;
            case 'mouseleave':
                $(this).find("table").hide();
                break;
            }
        });

        $(document).on('mouseenter mouseleave', ".j-table .effect", function (e) {
            var _this = this;
            switch (e.type) {
            case 'mouseenter':
                $(_this).parent().parent().find("td").removeClass('active error');
                var col = $(_this).index();
                var row = $(_this).parent().index();
                var clas = 'active';
                if (col == 0 || row == 0) {
                    clas = 'error';
                }
                $(_this).parent().parent().find("tr:lt(" + (row + 1) + ")").each(function () {
                    $(this).find("td:lt(" + (col + 1) + ")").addClass(clas);
                });
                break;
            case 'mouseleave':
                $(_this).parent().parent().find("td").removeClass('active error');
                break;
            }
        });

        //点击工具按钮
        $(document).on('click', ".tool-bar .effect", function () {
            switch ($(this).attr('type')) {
            case 'bold':
                _this.selection().prepend('**', false)
                _this.selection().after('**', false)
                break;
            case 'italic':
                _this.selection('insert', {
                    text: '*',
                    mode: 'before'
                });
                _this.selection('insert', {
                    text: '*',
                    mode: 'after'
                });
                break;
            case 'link':
                _this.selection('insert', {
                    text: '[',
                    mode: 'before'
                });
                _this.selection('insert', {
                    text: '](http://)',
                    mode: 'after'
                });
                break;
            case 'quote-left':
                _this.selection('insert', {
                    text: '> ',
                    mode: 'before'
                });
                break;
            case 'code':
                var val = _this.selection().val
                _this.selection().remove()
                _this.selection().before('~~~js\n', false)
                if (val !== '') {
                    _this.selection().after(val + '\n', true)
                } else {
                    _this.selection().after('your code\n', true)
                }
                _this.selection().after('~~~', false)
                break;
            case 'tag':
                _this.selection('insert', {
                    text: '`',
                    mode: 'before'
                });
                _this.selection('insert', {
                    text: '`',
                    mode: 'after'
                });
                break;
            case 'list-ol':
                _this.selection('insert', {
                    text: '1. ',
                    mode: 'before'
                });
                break;
            case 'list-ul':
                _this.selection('insert', {
                    text: '- ',
                    mode: 'before'
                });
                break;
            case 'minus':
                var content = "\n\n---";
                var lastLine = getLineContent(0);
                if (lastLine == "") {
                    content = "\n---"
                }
                _this.selection('insert', {
                    text: content,
                    mode: 'before'
                });
                break;
            case 'h1':
                _this.selection('insert', {
                    text: '# ',
                    mode: 'before'
                });
                _this.selection('insert', {
                    text: ' #',
                    mode: 'after'
                });
                break;
            case 'h2':
                _this.selection('insert', {
                    text: '## ',
                    mode: 'before'
                });
                _this.selection('insert', {
                    text: ' ##',
                    mode: 'after'
                });
                break;
            case 'h3':
                _this.selection('insert', {
                    text: '### ',
                    mode: 'before'
                });
                _this.selection('insert', {
                    text: ' ###',
                    mode: 'after'
                });
                break;
            case 'h4':
                _this.selection('insert', {
                    text: '#### ',
                    mode: 'before'
                });
                _this.selection('insert', {
                    text: ' ####',
                    mode: 'after'
                });
                break;
            case 'h5':
                _this.selection('insert', {
                    text: '##### ',
                    mode: 'before'
                });
                _this.selection('insert', {
                    text: ' #####',
                    mode: 'after'
                });
                break;
            case 'h6':
                _this.selection('insert', {
                    text: '###### ',
                    mode: 'before'
                });
                _this.selection('insert', {
                    text: ' ######',
                    mode: 'after'
                });
                break;
            case 'table':
                var col = $(this).index();
                var row = $(this).parent().index();
                if (col == 0 || row == 0) {
                    break;
                }
                var text = "\n";
                for (var i = 0; i < row + 1; i++) {
                    var cols = new Array();
                    for (var j = 0; j < col + 1; j++) {
                        if (i == 0) {
                            cols.push(' `           ');
                        } else {
                            cols.push('             ');
                        }
                    }
                    text += cols.join('|') + "\n";
                    if (i == 0) { //表格分割线
                        for (var j = 0; j < col + 1; j++) {
                            text += "-----------";
                            if (j != col) {
                                text += "|";
                            }
                        }
                        text += "\n";
                    }
                }
                _this.selection('insert', {
                    text: text,
                    mode: 'after'
                });
                break;
            }

            //如果是li，父级隐藏
            if ($(this).is('li')) {
                $(this).parent().hide();
            }

            //如果是td，父级隐藏
            if ($(this).is('td')) {
                $(this).parents('table').first().hide();
            }

            //textarea刷新高度
            _this.trigger('autosize.resize');

            //刷新视图
            _this.freshPreview();
        });

        //设置markdown解析格式
        marked.setOptions({
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            sanitize: true,
            smartLists: false,
            silent: false,
            langPrefix: 'prettyprint',
            smartypants: false,
            headerPrefix: '',
            xhtml: false
        });

        //刷新预览视图
        this.freshPreview = function () {
            if (!markdown) {
                return
            }

            if (_this.val() === '') {
                previewBox.hide()
                preview.html('')
                return
            }

            if (render == 0) { // 实时渲染
                _this.doRender();
            } else if (render == 1) { // 延时渲染
                if (renderTimeout != null) {
                    clearTimeout(renderTimeout); // 每次有输入都清除timeout执行
                }

                renderTimeout = setTimeout(_this.doRender, 300);
            }

            previewBox.show();

            //编辑区刷新高度
            _this.trigger('autosize.resize');
        }

        this.doRender = function () { //执行渲染，耗时
            // 计算代码耗时：开始
            var start = new Date().getTime();

            preview.html(marked(_this.val()));

            // 代码高亮
            $('pre').addClass('prettyprint pre-scrollable linenums');
            prettify.prettyPrint();

            // 计算代码耗时：结束
            var end = new Date().getTime();

            // 计算平均耗时
            var cost = 0;
            renderTime.push(end - start);

            if (renderTime.length > 3) {
                // 计算平均耗时
                cost = (renderTime[0] + renderTime[1] + renderTime[2]) / 3;

                renderTime = [];

                // 时差大于30毫秒判定为执行缓慢
                if (cost > 30 && render < 1) {
                    wk.notice({
                        content: '文档过长，切换到延时渲染'
                    })
                    render = 1;
                } else if (cost < 15 && render != 0) {
                    wk.notice({
                        content: '恢复实时渲染'
                    })
                    render = 0;
                }
            }
        }

        // 是否支持markdown语法
        this.enableMarkdown = function (ok) {
            markdown = ok;
            if (!ok) {
                tools.hide();
                _this.removeClass('f-w6').addClass('f-w12');
                _this.removeClass('f-btn');
                previewBox.hide();
            } else {
                tools.show();
                _this.addClass('f-btn');
                previewBox.show();
            }
        }

        // 获得当前行的内容 0:当前行 1:上一行
        var getLineContent = function (line) {
            var selectStart = _this.selection('getPos').start;
            var beforeWords = subStr(_this.val(), 0, selectStart);
            var wordArray = beforeWords.split('\n');
            var lastLine = wordArray[wordArray.length - line - 1];
            return lastLine;
        }

        /* ************** *
         * ** 事件监听 ** *
         * ************** */

        // 输入框按键监听
        _this.on("keyup keydown", function (e) {
            if (e.keyCode == 13 && e.type == "keyup") {
                var lastLine = getLineContent(1);

                if (subStr(lastLine, 0, 2) == "> " && subStr(lastLine, 2, 3) != "") {
                    _this.selection('insert', {
                        text: '> ',
                        mode: 'before'
                    });
                }

                if (subStr(lastLine, 0, 3) == "1. " && subStr(lastLine, 3, 4) != "") {
                    _this.selection('insert', {
                        text: '1. ',
                        mode: 'before'
                    });
                }

                if (subStr(lastLine, 0, 2) == "- " && subStr(lastLine, 2, 3) != "") {
                    _this.selection('insert', {
                        text: '- ',
                        mode: 'before'
                    });
                }
            }

            if (e.type == "keyup") {
                _this.freshPreview();
            }
        });

        return this;
    }

    $.fn.editor.defaults = {
        uploadUrl: '',
        uploadParams: []
    };
});
