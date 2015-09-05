ctrl.$onEnter = function (param) {
    getCategoryInfo(param.id, function (data) {
        document.title = data.name
        vm.category = data
    })

    getArticleLists(param.id, function (data) {
        vm.articles = data.list

        require(['timeago'], function () {
            $('.timeago').timeago()
        })
    })
}

ctrl.$onRendered = function () {
    initEditor()
}

ctrl.$onBeforeUnload = function () {
    // 卸载editor
    // edit.unload()
}
