var vm = avalon.define({
    // 文章信息
    article: {},

    // 评论
    form: {
        content: '', // 回复内容
        submit: function () { // 提交
            createComment(this, vm.form.content)
        }
    },

    // 评论列表
    comments: {}
})
