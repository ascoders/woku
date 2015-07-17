'use strict'

define(["jquery", "text!public/avalon.page.html"], function ($, templateHtml) {

    var uiName = 'page'

    avalon.ui[uiName] = function (element, data, vmodels) {

        var innerHTML = element.innerHTML
        avalon.clearHTML(element)

        // 参数
        var opts = data[uiName + "Options"]

        var vm = avalon.define({
            $id: data[uiName + "Id"],

            // 分页显示数组
            list: [],

            // 是否显示
            show: true,

            // 是否处于加载中
            isLoading: false,

            // 当前页数
            page: 1,

            // 总页数
            allPage: 1,

            // 页面url以及参数，为
            href: '',

            // url中添加的参数名，会根据相同组件数量修改后缀
            $limit: 'limit',
            $page: 'page',

            // 初始化
            $init: function () { // 初始化
                if (typeof opts.onInit === "function") {
                    opts.onInit(opts)
                }
                if (typeof vm.onInit === "function") {
                    vm.onInit.call(element, vm, options, vmodels)
                }

                // 填充参数
                vm.page = opts.page

                // 如果需要首屏加载，执行jump
                if (opts.ajaxInit) {
                    vm.jump(opts.page)
                }

                // 填充模版
                element.innerHTML = templateHtml

                avalon.scan(element, [vm].concat(vmodels))
            },

            // 销毁方法
            $remove: function () {
                element.innerHTML = ""
            },

            // 生成分页
            // count 总数量
            createPagin: function (count) {
                // 计算总页数
                vm.allPage = Math.ceil(parseFloat(count) / parseFloat(opts.limit))

                // 页数小于等于1，则隐藏分页按钮
                if (vm.allPage <= 1) {
                    vm.show = false
                    return
                }

                // 当前页数不在范围内则退出
                if (vm.page <= 0 || vm.page > vm.allPage) {
                    return
                }

                // 计算中间页
                var tempList = []
                if (vm.allPage < 7) {
                    for (var i = 1; i <= vm.allPage; i++) {
                        tempList.push(i)
                    }
                } else {
                    if (vm.page < 5) {
                        for (var i = 1; i <= 5; i++) {
                            tempList.push(i)
                        }
                        tempList.push(-1)
                        tempList.push(vm.allPage)
                    } else {
                        tempList.push(1)
                        tempList.push(-1)
                        if (vm.allPage - vm.page < 4) {
                            for (var i = vm.allPage - 4; i <= vm.allPage; i++) {
                                tempList.push(i)
                            }
                        } else {
                            for (var i = vm.page - 2; i <= vm.page + 2; i++) {
                                tempList.push(i)
                            }
                            tempList.push(-1)
                            tempList.push(vm.allPage)
                        }
                    }
                }

                vm.list.clear()
                vm.list.pushArray(tempList)

                // 刷新页面参数
                vm.freshHref()
            },

            // 刷新页面参数
            freshHref: function () {
                var addOn = '?'
                if (location.search !== '') {
                    addOn = location.search + '&'
                }

                vm.href = location.pathname + vm.$limit + '=' + opts.limit + '&' + vm.$page + '='
            },

            jump: function (page) {
                // 加载中不会触发跳转
                if (vm.isLoading) {
                    return
                }

                vm.isLoading = true
                vm.page = page

                // 生成请求参数
                var data = $.extend(opts.ajax.data, {
                    page: vm.page,
                    lastId: '',
                    limit: opts.limit
                })

                // 请求获取分页信息
                wk.get({
                    url: opts.ajax.url,
                    data: data,
                    success: function (data) {
                        // 调用回调函数
                        opts.ajax.success(data)

                        // 设置分页
                        vm.createPagin(data.count)

                        // 恢复loading
                        vm.isLoading = false
                    }
                })
            }
        })

        return vm
    }

    avalon.ui[uiName].defaults = {
        // 开启url模式，在分页按钮上只有url参数，没有监听
        urlMode: true,

        // 当前页数
        page: 1,

        // 每页显示数量
        limit: 1,

        // 获取数据回调
        ajax: {},

        // 首屏数据使用ajax初始化
        ajaxInit: false
    }

    return avalon
})