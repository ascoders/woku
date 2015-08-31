/*!
 * jquery.fn.selection
 * @author 云淡然 http://qianduanblog.com
 * @for ie9(含)+、chrome、firefox
 * @version 1.0
 * 2013年10月13日13:54:48
 */



/**
 * 1. 获取当前光标的开始位置
 * $("#input").selection().start;
 *
 * 2. 获取当前光标的结束位置
 * $("#input").selection().end;
 *
 * 3. 获取选中的文本内容
 * $("#input").selection().val;
 *
 * 4. 选中文本
 * $("#input").selection().select("text");
 *
 * 6. 设置光标的起始和结束位置
 * $("#input").selection().select(start);
 * $("#input").selection().select(start,end);
 *
 * 5. 定位光标
 * $("#input").selection().to(position);
 *
 * 7. 定位光标到文本起始位置
 * $("#input").selection().toStart();
 *
 * 8. 定位光标到文本结束位置
 * $("#input").selection().toEnd();
 *
 * 9. 插入文本到当前光标之前并选中该文本
 * $("#input").selection().before("text");
 *
 * 10. 插入文本到当前光标之后并选中该文本
 * $("#input").selection().after("text");
 *
 * 11. 替换当前选中的文本并选中该文本
 * $("#input").selection().replace("text");
 *
 * 12. 移除当前选中的文本
 * $("#input").selection().remove();
 *
 * 13. 在当前文本之前插入文本并选中该文本
 * $("#input").selection().prepend("text");
 *
 * 14. 在当前文本之后插入文本并选中该文本
 * $("#input").selection().append("text");
 *
 * 15. 在当前光标位置开始向前删除指定长度文本
 * $("#input").selection().backspace(length);
 *
 * 16. 在当前光标位置开始向后删除指定长度文本
 * $("#input").selection().delete(length);
 *
 */



/**
 * 插件参考
 * https://developer.mozilla.org/en-US/docs/Web/API/document.activeElement?redirectlocale=en-US&redirectslug=DOM%2Fdocument.activeElement
 * http://www.cnblogs.com/rainman/archive/2011/02/27/1966482.html
 * http://mrthink.net/text-field-jquery-extend/
 * http://madapaja.github.io/jquery.selection/
 */

define('selection', [], function () {
    var doc = window.document;
    $.fn.selection = function () {
        var $this = $(this).eq(0),
            elem = $this[0],
            position = [],
            val = "",
            value = "",
            length = 0;
        if (!_isNodeName(elem, "input") && !_isNodeName(elem, "textarea")) return;

        if (!$this.length) return;

        position = _getSelectionPosition(elem);
        val = _getSelectionValue(elem);
        value = $this.val();
        length = value.length;

        return {
            // 1. 获取当前光标的开始位置
            // $().selection().start;
            start: position[0],

            // 2. 获取当前光标的结束位置
            // $().selection().end;
            end: position[1],

            // 3. 获取选中的文本内容
            // $().selection().val
            val: val,

            // 4. 设置选中文本
            // $().selection().select(selectVal);
            // 5. 设置选中的范围
            // $().selection().select(strat);
            // $().selection().select(strat,end);
            select: function () {
                var args = arguments,
                    argL = args.length,
                    start = 0,
                    end = 0,
                    temp;
                // string
                if (argL === 1 && $.type(args[0]) === "string") {
                    // 开始位置
                    start = value.indexOf(args[0]);
                    end = start + args[0].length;
                    return start !== -1 ? _setSelection(elem, start, end) : false;
                }
                // number
                else if (argL === 1 && $.type(args[0]) === "number") {
                    start = Math.abs(parseInt(args[0], 10));
                    end = length;
                    return _setSelection(elem, start, end);
                }
                // number+number
                else if (argL === 2 && $.type(args[0]) === "number" && $.type(args[1]) === "number") {
                    start = Math.abs(parseInt(args[0], 10));
                    end = Math.abs(parseInt(args[1], 10));
                    if (start > end) {
                        temp = end;
                        end = start;
                        start = temp;
                    }
                    return _setSelection(elem, start, end);
                }
            },

            // 6. 设置光标的位置
            // $().selection().to(start);
            to: function (start) {
                return this.select(start, start);
            },

            // 7. 定位光标到文本起始位置
            // $().selection().toStart();
            toStart: function () {
                return this.select(0, 0);
            },

            // 8. 定位光标到文本结束位置
            // $().selection().toEnd();
            toEnd: function () {
                return this.select(length, length);
            },

            // 9. 插入文本到当前光标之前并选中该文本
            // $().selection().before(insertVal,isSelect);
            before: function (insertVal, isSelect) {
                if (_isStrOrNum(insertVal)) {
                    return _changeSelection(elem, insertVal, "before", isSelect);
                }
                return false;
            },

            // 10. 插入文本到当前光标之后并选中该文本
            // $().selection().after(insertVal,isSelect);
            after: function (insertVal, isSelect) {
                if (_isStrOrNum(insertVal)) {
                    return _changeSelection(elem, insertVal, "after", isSelect);
                }
                return false;
            },

            // 11. 替换当前选中的文本并选中该文本
            // $().selection().replace(replaceVal,isSelect);
            replace: function (replaceVal, isSelect) {
                if (_isStrOrNum(replaceVal)) {
                    return _changeSelection(elem, replaceVal, "replace", isSelect);
                }
                return false;
            },

            // 12. 移除当前选中的文本
            // $().selection().remove();
            remove: function () {
                return _changeSelection(elem, "", "replace");
            },

            // 13. 在当前文本之前插入文本并选中该文本
            // $().selection().prepend(prependVal,isSelect);
            prepend: function (prependVal, isSelect) {
                this.toStart();
                if (_isStrOrNum(prependVal)) {
                    return _changeSelection(elem, prependVal, "before", isSelect);
                }
                return false;
            },

            // 14. 在当前文本之后插入文本并选中该文本
            // $().selection().append(appendVal,isSelect);
            append: function (appendVal, isSelect) {
                this.toEnd();
                if (_isStrOrNum(appendVal)) {
                    return _changeSelection(elem, appendVal, "before", isSelect);
                }
                return false;
            },

            // 15. 在当前光标位置开始向前删除指定长度(最小为0)文本
            // $().selection().backspace(length|0);
            backspace: function (length) {
                var len = 0;
                if ($.type(length) === "number") {
                    len = Math.abs(parseInt(length, 10));
                }
                return _changeSelection(elem, "", "backspace", len);
            },

            // 16. 在当前光标位置开始向后删除指定长度(最小为0)文本
            // $().selection().delete(length|0);
            "delete": function (length) {
                var len = 0;
                if ($.type(length) === "number") {
                    len = Math.abs(parseInt(length, 10));
                }
                return _changeSelection(elem, "", "delete", len);
            }
        };
    }

    /**
     * 判断元素是否为该标签
     * @version 1.0
     * @date 2013年6月29日22:50:27
     * @param  {Object} node元素
     * @param  {String} 标签名称
     * @return {Boolean} 如果是返回true，否则返回false
     */

    function _isNodeName(elem, name) {
        return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    }

    /**
     * 判断值是否为字符串或者数值
     * @param  {String/Number} 字符串或数值
     * @return {Boolean}
     * @version 1.0
     * 2013年9月23日15:23:04
     */

    function _isStrOrNum(val) {
        return $.type(val) === "string" || $.type(val) === "number";
    }


    /**
     * 获得输入框的光标位置
     * @version  1.0
     * @date 2013年7月11日20:52:55
     * @link http://www.cnblogs.com/rainman/archive/2011/02/27/1966482.html
     * @link http://mrthink.net/text-field-jquery-extend/
     * @param  {Object} 输入框对象
     * @return {Number} 位置
     */

    function _getSelectionPosition(elem) {
        var sel, range, dupRange, pos = [],
            ae;
        elem.focus();
        // html5
        if (doc.activeElement && doc.activeElement === elem) {
            ae = doc.activeElement;
            pos.push(ae.selectionStart, ae.selectionEnd);
            return pos;
        }
        // ie
        else if (doc.selection) {
            sel = doc.selection;
            range = sel.createRange();
            dupRange = range.duplicate();
            dupRange.moveToElementText(elem);
            dupRange.setEndPoint('EndToEnd', range);
            elem.selectionStart = dupRange.text.length - range.text.length;
            elem.selectionEnd = elem.selectionStart + range.text.length;
            pos.push(elem.selectionStart, elem.selectionEnd);
            return pos;
        }
        return [0, 0];
    }



    /**
     * 获得输入框中选中的文字
     * @version  1.0
     * @date 2013年7月11日22:30:33
     * @link https://developer.mozilla.org/en-US/docs/Web/API/document.activeElement?redirectlocale=en-US&redirectslug=DOM%2Fdocument.activeElement
     * @todo 还没有完善
     * @param  {Object} 输入框对象
     * @return {String} 选中的文字
     */

    function _getSelectionValue(elem) {
        var position = _getSelectionPosition(elem),
            start = position[0],
            end = position[1];
        if (start === -1 || end === -1) return null;
        if (doc.activeElement) {
            return doc.activeElement.value.substring(start, end);
        } else {
            //
        }
        return null;
    }



    /**
     * 设置新选中
     * @version 1.0
     * @date 2013年7月11日22:31:00
     * @param {Object} 输入框对象
     * @param {Number} 开始位置
     * @param {Number} 结束位置
     * @return {String} 返回选中的文字
     */

    function _setSelection(elem, start, end) {
        var range;
        elem.focus();
        if (doc.activeElement && doc.activeElement === elem) {
            elem.setSelectionRange(start, end);
        } else if (doc.selection) {
            range = elem.createTextRange();
            range.moveEnd('character', -elem.value.length);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        } else {
            return false;
        }
        return _getSelectionValue(elem);
    }



    /**
     * 改变选择的文字
     * @version  1.1
     * @date 2013年7月13日18:25:48
     * @date 2013年7月11日22:33:19
     * @param  {Object} 输入框对象
     * @param  {String} 字符串
     * @param  {String} 操作类型：before/after/replace/backspace/delete
     * @param  {Number} 操作的长度，只在删除的时候起作用
     * @return {undefined}
     */

    function _changeSelection(elem, string, type, length) {
        var val = elem.value,
            newVal = "",
            len = val.length,
            size = String(string).length,
            start = 0,
            end = 0,
            newStart = 0,
            newEnd = 0;

        elem.focus();

        // html5
        if (doc.activeElement && doc.activeElement === elem) {
            start = doc.activeElement.selectionStart;
            end = doc.activeElement.selectionEnd;

            switch (type) {
                // 前插
            case "before":
                newVal = val.slice(0, start) + string + val.slice(start, len);
                newStart = start;
                newEnd = start + size;
                break;

                // 后插
            case "after":
                newVal = val.slice(0, end) + string + val.slice(end, len);
                newStart = end;
                newEnd = end + size;
                break;

                // 替换
            case "replace":
                newVal = val.slice(0, start) + string + val.slice(end, len);
                newStart = start;
                newEnd = start + size;
                break;

                // 前删
            case "backspace":
                newStart = end - length;
                if (newStart < 0) newStart = 0;
                newEnd = newStart;
                newVal = val.slice(0, newStart) + val.slice(end, len);
                break;

                // 后删
            case "delete":
                newStart = start;
                newEnd = start + length;
                if (newEnd > len) newEnd = len;
                newVal = val.slice(0, start) + val.slice(newEnd, len);
                newEnd = start;
                break;
            }

            elem.value = newVal;

            if (Boolean(length) === true) {
                _setSelection(elem, newStart, newEnd);
            } else {
                _setSelection(elem, newEnd, newEnd);
            }
        } else return false;
    }
})
