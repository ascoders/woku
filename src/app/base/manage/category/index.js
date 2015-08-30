ctrl.$onEnter = function (param, rs, rj) {
    document.title = '管理 - 分类'
    avalon.vmodels['app/base/manage'].type = param.type

    // 获取分类列表
    getCategorys(function (data) {
        vm.categorys = data
    })
}

ctrl.$onRendered = function () {
    initCategoryForm()
    initCategoryModal()
}

ctrl.$onBeforeUnload = function () {

}
