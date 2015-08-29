// 创建分类表单
var categoryForm

// 创建分类模态框
var categoryModal

// 初始化创建分类表单
function initCategoryForm() {
    categoryForm = $('#j-create-category-modal .ui.form');
    categoryForm.form({
        fields: {
            name: {
                identifier: 'name',
                rules: [{
                    type: 'empty',
                    prompt: '<i class="block layout icon"></i>分类名称：请填写'
                }, {
                    type: 'minLength[1]',
                    prompt: '<i class="block layout icon"></i>分类名称：至少1位'
                }, {
                    type: 'maxLength[10]',
                    prompt: '<i class="block layout icon"></i>分类名称：最多10位'
                }]
            }
        }
    })
}

// 初始化创建分类模态框
function initCategoryModal() {
    categoryModal = $('#j-create-category-modal')
    categoryModal.modal({
        blurring: true,
        onApprove: function () {
            categoryForm.form('validate form')

            // 如果验证不通过，窗口不关闭
            if (!categoryForm.form('is valid')) {
                return false
            }

            // 提交按钮loading
            $('#j-create-category-modal .actions .ok').addClass('loading')

            var name = categoryForm.find('input[name="name"]').val()

            // 创建新app
            wk.post({
                url: '/api/apps/categorys',
                data: {
                    app: avalon.vmodels['app/base'].app.id,
                    name: name
                },
                done: function () {

                },
                fail: function (message) {
                    var errorMessage = message

                    if (message.indexOf('Duplicate') > -1 && message.indexOf('name') > -1 && message.indexOf(name) > -1) {
                        errorMessage = '名称 ' + name + ' 已被占用'
                    }

                    categoryForm.form("add errors", [errorMessage])
                    categoryForm.addClass('error')
                },
                always: function () {
                    // 提交按钮unloading
                    $('#j-create-category-modal .actions .ok').removeClass('loading')
                }
            })

            // 不会自动关闭
            return false
        }
    })
}
