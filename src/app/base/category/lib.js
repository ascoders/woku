// 编辑器事例
var edit

// 初始化发帖编辑器
function initEditor() {
    // 实例化markdown编辑器
    require(['editor'], function () {
        edit = $("#j-editor").editor({
            onSubmit: createArticle,
            submitName: '发布'
        })

        // 渲染textarea
        edit.load()
    })
}

// 提交发帖
function createArticle(content) {
    // 如果标题为空，使用内容前15个字
    var title = $('#j-editor-title').val()

    if (title === '') {
        title = content.substr(0, 10)
    }

    edit.loading()
    wk.post({
        url: '/api/app/articles',
        data: {
            category: vm.category.id,
            title: title,
            content: content
        },
        done: function (data) {
            // 跳转到文章页面
            avalon.router.navigate('/app/' + avalon.vmodels['app/base'].app.path + '/article/' + data.id)
        },
        fail: function (message) {
            edit.error(message)
        },
        always: function () {
            edit.unloading()
        }
    })
}

// 获取分类信息
function getCategoryInfo(categoryId, callback) {
    wk.get({
        url: '/api/app/categorys/' + categoryId,
        done: function (data) {
            callback(data)
        }
    })
}

// 获取文章列表
function getArticleLists(categoryId, callback) {
    wk.get({
        url: '/api/app/articles',
        data: {
            category: categoryId
        },
        done: function (data) {
            callback(data)
        }
    })
}
