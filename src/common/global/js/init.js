// init.js

//获取登陆用户信息
wk.get({
    url: '/api/users/current',
    done: function (data) {
        if (data === false) {
            return
        }

        global.my.setInfo(data)
    },
    fail: function () {
        global.$myDeferred.resolve(); // 未登录
    }
})
