ctrl.$onEnter = function (param) {
    articleId = param.id

    getArticleInfo(param.id, function (data) {
        document.title = data.title
        vm.article = data
    })

    getComments(function (data) {
        vm.comments = data

        require(['timeago'], function () {
            $('.comments .timeago').timeago()
        })
    })
}

ctrl.$onRendered = function () {
    initSticky()
}

ctrl.$onBeforeUnload = function () {

}
