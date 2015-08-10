// avalon_init.js
//过滤markdown标签
avalon.filters.cleanmark = function (str) {
	//移除所有 * ` [ ] # - >
	str = str
		.replace(/[!.*](.*)/g, "【图片】")
		.replace(/\*/g, "")
		.replace(/\`/g, "")
		.replace(/\[/g, "")
		.replace(/\]/g, "")
		.replace(/\#/g, "")
		.replace(/\-/g, "")
		.replace(/\>/g, "")

	return str
}

//处理小数点
avalon.filters.toFixed = function (str, number) {
	str = str.toFixed(number)
	return str
}

require.config({
	baseUrl: "/static",
	paths: {
		"jquery.autosize": "http://cdn.bootcss.com/autosize.js/1.18.15/jquery.autosize.min", // textarea大小自适应高度
		"jquery.selection": "http://cdn.bootcss.com/jquery.selection/1.0.1/jquery.selection.min", //表单选择
		"jquery.qrcode": "http://cdn.bootcss.com/jquery.qrcode/1.0/jquery.qrcode.min", // 二维码
		"jquery.autocomplete": "http://cdn.bootcss.com/jquery.devbridge-autocomplete/1.2.7/jquery.devbridge-autocomplete.min", // 输入框自动补全
		"dropzone": "http://cdn.bootcss.com/dropzone/3.12.0/dropzone-amd-module.min", // 拖拽上传
		"prettify": "http://cdn.bootcss.com/prettify/r298/prettify.min", // code美化
		"md5": "http://cdn.bootcss.com/blueimp-md5/1.1.0/js/md5.min", // md5加密
		"echarts": 'http://cdn.bootcss.com/echarts/2.1.10/echarts-all', // 百度表格

		"mmState": 'plugin/avalon/mmState',
		"mmRouter": 'plugin/avalon/mmRouter',
		"mmHistory": 'plugin/avalon/mmHistory',
		"mmPromise": 'plugin/avalon/mmPromise',
		"cookie": "http://cdn.bootcss.com/Cookies.js/1.2.1/cookies.min.js", // 操作cookie
		"jquery.typetype": "plugin/jquery/jquery.typetype", // 模拟输入
		"jquery.taboverride": "plugin/jquery/taboverride", // tab键变为缩进
		"jquery.contextMenu": "jplugin/query/jquery.contextMenu", // 右键菜单
		"marked": "plugin/marked/marked", // markdown解析
		"frontia": "plugin/baidu/baidu.frontia.1.0.0", // 百度社会化组件

		"editor": "plugin_extend/editor/editor", // 编辑器
		"avalon.table": "plugin_extend/avalon.table/avalon.table", // 富表格
		"avalon.page": "plugin_extend/avalon.page/avalon.page" // 分页
	},
	shim: {
		'jquery.timeago': {
			deps: ['jquery']
		},
		'jquery.ui': {
			deps: ['jquery']
		},
		'jquery.autosize': {
			deps: ['jquery']
		},
		'jquery.taboverride': {
			deps: ['jquery']
		},
		'jquery.selection': {
			deps: ['jquery']
		},
		'jquery.qrcode': {
			deps: ['jquery']
		},
		'jquery.typetype': {
			deps: ['jquery']
		},
		'jquery.autocomplete': {
			deps: ['jquery']
		},
		'jquery.tree': {
			deps: ['jquery']
		},
		'md5': {
			exports: 'md5'
		},
		'frontia': {
			exports: 'baidu.frontia'
		},
		'jquery.contextMenu': {
			deps: ['jquery']
		},
		'echarts': {
			exports: "echarts"
		}
	}
})