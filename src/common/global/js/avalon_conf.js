// avalon_init.js
//过滤markdown标签
avalon.filters.cleanmark = function (str) {
    //移除所有 * ` [ ] # - >
    str = str
        .replace(/[!.*](.*)/g, '【图片】')
        .replace(/\*/g, '')
        .replace(/\`/g, '')
        .replace(/\[/g, '')
        .replace(/\]/g, '')
        .replace(/\#/g, '')
        .replace(/\-/g, '')
        .replace(/\>/g, '')

    return str
}

// 已经加载jq了
avalon.modules.jquery = {
    exports: jQuery,
    state: 2
}

//处理小数点
avalon.filters.toFixed = function (str, number) {
    str = str.toFixed(number)
    return str
}

require.config({
    baseUrl: '/static',
    paths: {
        'jquery.qrcode': 'http://cdn.bootcss.com/jquery.qrcode/1.0/jquery.qrcode.min', // 二维码
        'jquery.autocomplete': 'http://cdn.bootcss.com/jquery.devbridge-autocomplete/1.2.7/jquery.devbridge-autocomplete.min', // 输入框自动补全
        'dropzone': 'http://cdn.bootcss.com/dropzone/3.12.0/dropzone-amd-module.min', // 拖拽上传
        'prettify': 'http://cdn.bootcss.com/prettify/r298/prettify.min', // code美化
        'md5': 'http://cdn.bootcss.com/blueimp-md5/1.1.0/js/md5.min', // md5加密
        'echarts': 'http://cdn.bootcss.com/echarts/2.1.10/echarts-all', // 百度表格
        'cookie': 'http://cdn.bootcss.com/Cookies.js/1.2.1/cookies.min.js', // 操作cookie

        // textarea大小自适应高度
        'autosize': 'plugin/autosize',

        // avalon插件
        'mmState': 'plugin/avalon/mmState',
        'mmRouter': 'plugin/avalon/mmRouter',
        'mmHistory': 'plugin/avalon/mmHistory',
        'mmPromise': 'plugin/avalon/mmPromise',

        // jquery插件
        'timeago': 'plugin/jquery/timeago',
        'selection': 'plugin/jquery/selection',
        'typetype': 'plugin/jquery/jquery.typetype', // 模拟输入
        'taboverride': 'plugin/jquery/taboverride', // tab键变为缩进
        'contextMenu': 'plugin/query/jquery.contextMenu', // 右键菜单

        // markdown解析
        'marked': 'plugin/marked/marked',

        // extend插件
        'editor': 'plugin_extend/editor/editor', // 编辑器
        'avalon.table': 'plugin_extend/avalon.table/avalon.table', // 富表格
        'avalon.page': 'plugin_extend/avalon.page/avalon.page' // 分页
    },
    shim: {
        'md5': {
            exports: 'md5'
        },
        'echarts': {
            exports: 'echarts'
        }
    }
})
