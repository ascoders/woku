ctrl.$onEnter = function (param, rs, rj) {
    // 获取分类信息
    wk.get({
        url: '/api/app/categorys/' + param.name,
        done: function (data) {
            vm.category = data
        }
    })
}

ctrl.$onRendered = function () {
    //实例化markdown编辑器
    var edit = $("#j-editor").editor();
    edit.createDom()
}
