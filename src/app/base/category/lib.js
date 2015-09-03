// 提交发帖
function createArticle(content) {
    console.log(content)
    wk.post({
        url: '/api/app/articles',
        data: {
            title: $('#j-editor-title').val(),
            content: content
        },
        done: function (data) {

        },
        fail: function () {

        }
    })
}