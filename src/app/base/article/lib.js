// 当前文章id
var articleId

// 提交回复
function createComment(element, content) {
    $(element).addClass('loading')
    wk.post({
        url: '/api/app/comments',
        data: {
            article: articleId,
            content: content
        },
        done: function (data) {

        },
        fail: function (message) {

        },
        always: function () {
            $(element).removeClass('loading')
        }
    })
}

// 获取文章内容
function getArticleInfo(articleId, callback) {
    wk.get({
        url: '/api/app/articles/' + articleId,
        done: function (data) {
            callback(data)
        },
        fail: function () {
            avalon.router.navigate('/404')
        }
    })
}

// 初始化右边栏粘贴
function initSticky() {
    $('.ui.sticky').sticky({
        context: '#j-container',
        offset: 80,
        observeChanges: true
    })
}

// 获得评论
function getComments(callback) {
    wk.get({
        url: '/api/app/comments/',
        data: {
            article: articleId
        },
        done: function (data) {
            // 将用户信息放入数组中
            for (var key in data.lists) {
                for (var _key in data.users) {
                    if (data.users[_key].id === data.lists[key].author) {
                        data.users[_key].portrait = wk.userImage(data.users[_key].portrait)
                        data.lists[key].author = data.users[_key]
                        break
                    }
                }
            }

            callback(data.lists)
        }
    })
}
